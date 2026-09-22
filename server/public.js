import { pool } from './db.js';

const STATIC_PATHS = [
  '/',
  '/graduacao',
  '/pos-graduacao',
  '/blog',
  '/busca',
  '/educacao',
  '/comunicacao',
  '/gestao-negocios',
  '/saude',
  '/tecnologia',
  '/arquitetura-design',
  '/direito-ciencia-politica',
  '/engenharia-tecnologia',
  '/graduacao-semipresencial',
  '/graduacao-gastronomia',
  '/pos-educacao',
  '/pos-comunicao',
  '/pos-gestao-negocios',
  '/pos-saude',
  '/pos-direito',
  '/pos-engenharia',
  '/blog/categories/cursos',
  '/blog/categories/cursos-de-pos-graduacao',
  '/blog/categories/curiosidades/dicas',
  '/blog/categories/financeiro',
  '/blog/categories/duvidas-academicas',
  '/polo-cruzeiro-do-sul-barra-funda',
  '/polo-sapopemba',
  '/polo-butanta-morumbi',
  '/polo-tabao-da-serra-centro',
  '/polo-taboao-da-serra-mituizi',
  '/polo-ibirapuera',
  '/polo-vila-prudente',
  '/polo-campinas',
  '/polo-capivari',
  '/polo-itapira',
  '/polo-cruzeiro-do-sul-santana-2',
  '/polo-cruzeiro-do-sul-vila-mariana',
  '/polo-freguesia-do-o',
];

function siteOrigin() {
  return (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://banco-site-eduit.6tqx2r.easypanel.host').replace(/\/$/, '');
}

function siteHost() {
  try {
    return new URL(siteOrigin()).hostname;
  } catch {
    return 'banco-site-eduit.6tqx2r.easypanel.host';
  }
}

function llmsTxt() {
  const origin = siteOrigin();
  return `# Cruzeiro do Sul Virtual

> Cursos de graduação e pós-graduação EAD da Cruzeiro do Sul Virtual. Consulte bolsas, polos de apoio e formas de ingresso.

Este site publica o catálogo de cursos, polos de apoio presencial, blog e formulário para falar com um consultor.

## Páginas principais

- [Início](${origin}/): apresentação da Cruzeiro do Sul Virtual
- [Graduação EAD](${origin}/graduacao): lista de cursos de graduação
- [Pós-graduação e MBA](${origin}/pos-graduacao): especializações e MBAs
- [Blog](${origin}/blog): notícias, dicas e dúvidas acadêmicas
- [Busca](${origin}/busca): pesquisa de cursos, polos e posts

## Dados para agentes

- [Sitemap](${origin}/sitemap.xml): índice de URLs públicas
- [API de cursos](${origin}/api/cursos): catálogo em JSON
- [Catálogo ARD](${origin}/.well-known/ai-catalog.json): manifesto ai-catalog.json
`;
}

function aiCatalog() {
  const origin = siteOrigin();
  const host = siteHost();
  return {
    specVersion: '1.0',
    host: {
      displayName: 'Cruzeiro do Sul Virtual',
      documentationUrl: `${origin}/`,
    },
    entries: [
      {
        identifier: `urn:air:${host}:site:web`,
        displayName: 'Cruzeiro do Sul Virtual',
        type: 'text/html',
        url: `${origin}/`,
        description: 'Site de graduação e pós-graduação EAD, polos de apoio e atendimento a leads.',
        tags: ['educacao', 'ead', 'graduacao', 'pos-graduacao'],
        capabilities: ['CourseCatalog', 'CampusLocator', 'LeadForm'],
        representativeQueries: [
          'quais cursos de graduação EAD estão disponíveis',
          'como falar com um consultor sobre bolsas',
          'onde fica o polo de apoio mais próximo',
        ],
      },
      {
        identifier: `urn:air:${host}:site:llms`,
        displayName: 'llms.txt',
        type: 'text/markdown',
        url: `${origin}/llms.txt`,
        description: 'Resumo em Markdown da estrutura do site para agentes de IA.',
      },
      {
        identifier: `urn:air:${host}:site:cursos`,
        displayName: 'API de cursos',
        type: 'application/json',
        url: `${origin}/api/cursos`,
        description: 'Catálogo JSON de graduação e pós-graduação.',
        capabilities: ['CourseCatalog'],
        representativeQueries: [
          'listar cursos de graduação',
          'buscar especializações de pós-graduação',
        ],
      },
      {
        identifier: `urn:air:${host}:site:sitemap`,
        displayName: 'Sitemap',
        type: 'application/xml',
        url: `${origin}/sitemap.xml`,
        description: 'Índice de URLs públicas do site.',
      },
    ],
  };
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function courseUrls() {
  try {
    const result = await pool.query('SELECT slug, tipo, url_path FROM cursos ORDER BY titulo');
    return result.rows.map((row) => {
      if (row.url_path && String(row.url_path).startsWith('/')) return row.url_path;
      return row.tipo === 'pos' ? `/pos/${row.slug}` : `/graduacao-cruzeiro/${row.slug}`;
    });
  } catch (error) {
    console.error('sitemap cursos', error);
    return [];
  }
}

async function blogUrls() {
  const url = (process.env.VITE_SUPABASE_URL || '').replace(/\/rest\/v1\/?$/, '');
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const response = await fetch(`${url}/rest/v1/blog_posts?select=id`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    if (!response.ok) return [];
    const rows = await response.json();
    return Array.isArray(rows) ? rows.map((row) => `/post/${row.id}`) : [];
  } catch (error) {
    console.error('sitemap blog', error);
    return [];
  }
}

export function attachPublicRoutes(app) {
  app.get('/api/site-config', (_req, res) => {
    const supabaseUrl = (process.env.VITE_SUPABASE_URL || '').replace(/\/rest\/v1\/?$/, '');
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
    res.json({ supabaseUrl, supabaseAnonKey });
  });

  app.get('/robots.txt', (_req, res) => {
    const origin = siteOrigin();
    res
      .type('text/plain')
      .send(`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  });

  app.get('/llms.txt', (_req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(llmsTxt());
  });

  const sendCatalog = (_req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.json(aiCatalog());
  };
  app.get('/ai-catalog.json', sendCatalog);
  app.get('/.well-known/ai-catalog.json', sendCatalog);

  app.get('/sitemap.xml', async (_req, res) => {
    const origin = siteOrigin();
    const extra = [...(await courseUrls()), ...(await blogUrls())];
    const urls = [...new Set([...STATIC_PATHS, ...extra])];
    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${xmlEscape(`${origin}${path}`)}</loc>
    <changefreq>weekly</changefreq>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
    res.type('application/xml').send(body);
  });
}
