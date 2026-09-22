import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
import { pool } from './db.js';
import { localImage } from './midia.js';

const courseCopy = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'course-copy.json'), 'utf8'),
);

function foldTitle(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const copyByTitle = new Map(courseCopy.map((item) => [item.key, item]));

function applyCopy(row) {
  if (!row || typeof row !== 'object') return row;
  const copy = copyByTitle.get(foldTitle(row.titulo));
  if (!copy) return row;
  const next = { ...row };
  if ('sobre' in row && copy.sobre) next.sobre = copy.sobre;
  if ('aprendizados' in row && copy.aprendizados?.length) next.aprendizados = copy.aprendizados;
  if ('indicacoes' in row && copy.indicacoes?.length) next.indicacoes = copy.indicacoes;
  if ('areas_atuacao' in row && copy.areas_atuacao?.length) next.areas_atuacao = copy.areas_atuacao;
  if ('mercado_trabalho' in row && copy.mercado) next.mercado_trabalho = copy.mercado;
  return next;
}

function withLocalImage(row) {
  const source = applyCopy(row);
  if (!source || typeof source !== 'object') return source;
  if (source.slug) return { ...source, imagem: `/cursos/${source.slug}.webp` };
  return { ...source, imagem: localImage(source.imagem) };
}

const SELECT_LIST = `
  SELECT
    c.id,
    c.slug,
    c.tipo,
    c.titulo,
    c.categoria,
    c.categoria_raw,
    c.category_badge,
    c.sobre,
    c.imagem,
    c.url_path,
    c.formacao,
    c.duracao,
    c.modalidade,
    c.preco,
    c.img_alt,
    c.featured
  FROM cursos c
`;

const SELECT_DETAIL = `
  SELECT
    c.id,
    c.slug,
    c.tipo,
    c.titulo,
    c.categoria,
    c.categoria_raw,
    c.category_badge,
    c.sobre,
    c.imagem,
    c.url_path,
    c.formacao,
    c.duracao,
    c.modalidade,
    c.preco,
    c.meta_title,
    c.meta_description,
    c.img_alt,
    c.mercado_trabalho,
    c.area_atuacao_texto,
    c.indicacao_texto,
    c.aprendizados,
    c.indicacoes,
    c.areas_atuacao,
    c.featured,
    COALESCE(
      json_agg(
        json_build_object(
          'id', o.id,
          'chave', o.chave,
          'duracao', o.duracao,
          'parcelas', o.parcelas,
          'modalidade', o.modalidade,
          'formacao', o.formacao,
          'valor', o.valor
        )
        ORDER BY o.id
      ) FILTER (WHERE o.id IS NOT NULL),
      '[]'::json
    ) AS ofertas
  FROM cursos c
  LEFT JOIN curso_ofertas o ON o.curso_id = c.id
`;

export function createCursosRouter() {
  const router = Router();

  router.get('/', async (req, res) => {
    const tipo = typeof req.query.tipo === 'string' ? req.query.tipo : null;
    if (tipo && tipo !== 'graduacao' && tipo !== 'pos') {
      res.status(400).json({ error: 'tipo inválido' });
      return;
    }
    try {
      const result = tipo
        ? await pool.query(`${SELECT_LIST} WHERE c.tipo = $1 ORDER BY c.titulo`, [tipo])
        : await pool.query(`${SELECT_LIST} ORDER BY c.tipo, c.titulo`);
      res.json(result.rows.map(withLocalImage));
    } catch (error) {
      console.error('GET /api/cursos', error);
      res.status(500).json({ error: 'Falha ao ler cursos' });
    }
  });

  router.get('/:slug', async (req, res) => {
    try {
      const result = await pool.query(`${SELECT_DETAIL} WHERE c.slug = $1 GROUP BY c.id`, [
        req.params.slug,
      ]);
      if (!result.rows[0]) {
        res.status(404).json({ error: 'Curso não encontrado' });
        return;
      }
      res.json(withLocalImage(result.rows[0]));
    } catch (error) {
      console.error('GET /api/cursos/:slug', error);
      res.status(500).json({ error: 'Falha ao ler curso' });
    }
  });

  return router;
}
