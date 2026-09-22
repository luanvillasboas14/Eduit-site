import { Router } from 'express';
import { pool } from './db.js';

const SELECT_LIST = `
  SELECT
    c.id,
    c.slug,
    c.tipo,
    c.titulo,
    c.categoria,
    c.categoria_raw,
    c.category_badge,
    left(c.sobre, 400) AS sobre,
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
      res.json(result.rows);
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
      res.json(result.rows[0]);
    } catch (error) {
      console.error('GET /api/cursos/:slug', error);
      res.status(500).json({ error: 'Falha ao ler curso' });
    }
  });

  return router;
}
