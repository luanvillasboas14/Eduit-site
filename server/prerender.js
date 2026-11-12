import { getCourse, listCourses } from './cursos.js';
import { STATIC_PATHS } from './public.js';

const BRAND = 'Cruzeiro do Sul Virtual';
const COURSE_SLUG = /^\/graduacao-cruzeiro\/([a-z0-9-]+)$/;
const POS_SLUG = /^\/pos\/([a-z0-9-]+)$/;
const CACHE_MS = 5 * 60 * 1000;
const cache = new Map();

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function excerpt(value, max = 180) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

function paragraphs(value) {
  return String(value || '')
    .split(/\n{2,}/)
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function asItems(value) {
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return Array.isArray(value) ? value : [];
}

function itemList(items) {
  const list = asItems(items);
  if (list.length === 0) return '';
  const rows = list
    .filter((item) => item && (item.title || item.titulo))
    .map((item) => {
      const title = item.title || item.titulo;
      const description = item.description || item.descricao || '';
      return `<li><strong>${escapeHtml(title)}</strong>${description ? ` ${escapeHtml(description)}` : ''}</li>`;
    });
  return rows.length ? `<ul>${rows.join('')}</ul>` : '';
}

export function buildGraduacaoDocument(rows) {
  const courses = Array.isArray(rows) ? rows : [];
  const items = courses
    .map((course) => {
      const href = `/graduacao-cruzeiro/${encodeURIComponent(course.slug)}`;
      const meta = [course.categoria, course.modalidade, course.duracao].filter(Boolean).join(' · ');
      const summary = excerpt(course.sobre);
      return `<li><a href="${escapeHtml(href)}">${escapeHtml(course.titulo)}</a>${
        meta ? `<p>${escapeHtml(meta)}</p>` : ''
      }${summary ? `<p>${escapeHtml(summary)}</p>` : ''}</li>`;
    })
    .join('');
  return {
    status: 200,
    kind: 'graduacao',
    path: '/graduacao',
    title: `Cursos de Graduação EAD | ${BRAND}`,
    description:
      'Veja a grade de graduação EAD e semipresencial da Cruzeiro do Sul Virtual. Filtre por área, modalidade e fale com um consultor para bolsas.',
    body: `<h1>Encontre o seu curso de Graduação</h1><p>${courses.length} cursos de graduação EAD e semipresencial.</p><ul>${items}</ul>`,
  };
}

export function buildCourseDocument(course) {
  const path = `/graduacao-cruzeiro/${course.slug}`;
  const title = course.meta_title || `${course.titulo} | ${BRAND}`;
  const description =
    course.meta_description ||
    excerpt(course.sobre, 160) ||
    `Conheça o curso de ${course.titulo} ${course.modalidade || 'EAD'} da Cruzeiro do Sul Virtual.`;
  const facts = [course.modalidade, course.duracao, course.formacao, course.categoria].filter(Boolean);
  const about = paragraphs(course.sobre)
    .map((part) => `<p>${escapeHtml(part)}</p>`)
    .join('');
  const learning = itemList(course.aprendizados);
  const audience = itemList(course.indicacoes);
  return {
    status: 200,
    kind: 'curso',
    path,
    title,
    description,
    body: [
      `<h1>${escapeHtml(course.titulo)}</h1>`,
      facts.length ? `<p>${escapeHtml(facts.join(' · '))}</p>` : '',
      about ? `<section><h2>Sobre a formação</h2>${about}</section>` : '',
      learning ? `<section><h2>O que você vai aprender</h2>${learning}</section>` : '',
      audience ? `<section><h2>Para quem é indicado</h2>${audience}</section>` : '',
    ].join(''),
  };
}

export function buildNotFoundDocument(pathname) {
  return {
    status: 404,
    kind: '404',
    path: pathname,
    robots: 'noindex',
    title: `Página não encontrada | ${BRAND}`,
    description: 'A página que você tentou abrir não existe. Volte ao início ou busque um curso, polo ou notícia.',
    body: `<h1>Página não encontrada</h1><p>O endereço ${escapeHtml(pathname)} não existe.</p><p><a href="/">Voltar ao início</a> · <a href="/graduacao">Ver graduação</a></p>`,
  };
}

function isKnownShell(pathname) {
  if (STATIC_PATHS.includes(pathname)) return true;
  return pathname.startsWith('/post/');
}

function cached(key) {
  const hit = cache.get(key);
  if (!hit) return undefined;
  if (hit.expires <= Date.now()) {
    cache.delete(key);
    return undefined;
  }
  return hit.doc;
}

function remember(key, doc) {
  cache.set(key, { doc, expires: Date.now() + CACHE_MS });
  return doc;
}

export function documentForGraduacaoCourse(course, pathOnly) {
  if (!course || course.tipo !== 'graduacao') return buildNotFoundDocument(pathOnly);
  return buildCourseDocument(course);
}

export function documentForPosCourse(course, pathOnly) {
  if (!course || course.tipo !== 'pos') return buildNotFoundDocument(pathOnly);
  return null;
}

export async function resolvePrerender(pathname) {
  const pathOnly = String(pathname || '/').split('?')[0] || '/';
  if (POS_SLUG.test(pathOnly) || (isKnownShell(pathOnly) && pathOnly !== '/graduacao')) return null;

  const stored = cached(pathOnly);
  if (stored !== undefined) return stored;

  if (pathOnly === '/graduacao') {
    return remember(pathOnly, buildGraduacaoDocument(await listCourses('graduacao')));
  }

  const courseMatch = pathOnly.match(COURSE_SLUG);
  if (courseMatch) {
    return remember(pathOnly, documentForGraduacaoCourse(await getCourse(courseMatch[1]), pathOnly));
  }

  return buildNotFoundDocument(pathOnly);
}
