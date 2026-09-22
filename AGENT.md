### 2026-09-16 - Graduação a partir do CMS Wix

- **Decisão:** Conteúdo de graduação (duração, formação, textos, meta, imagem) vem do export `graduacao.csv` do Wix. Preços continuam no CSV `preço+gradua.csv`. Slugs/URLs do banco não são alterados. Sync: `python scripts/import_cursos.py --sync-wix-grad`.
- **Contexto:** O import antigo inventava “5 semestres” para tecnólogo. O CMS tem 4/6/8/10/2 semestres.
- **Alternativas descartadas:** Reimport com TRUNCATE (quebraria IDs/slugs). Inferir duração pela formação.
- **Impacto:** 128 cursos de graduação atualizados no Postgres. Recarregar o site basta para a API refletir.

### 2026-09-16 - SEO, 404, sitemap, GA4 e busca

- **Decisão:** Metas por rota no front (`src/lib/seo.ts`), 404 real no catch-all do React Router, `sitemap.xml`/`robots.txt` no Express, GA4 via `VITE_GA_MEASUREMENT_ID` (sem ID no código), busca do Header em `/busca` separada dos filtros locais (acentos ignorados), recomendações determinísticas em `src/lib/recommendations.ts`.
- **Contexto:** Checklist de pendências sem mudar layout, API de cursos ou banco.
- **Alternativas descartadas:** Biblioteca de SEO/analytics; sitemap estático no build; redirecionar 404 para a Home.
- **Impacto:** Produção precisa de `VITE_GA_MEASUREMENT_ID` no build. Sitemap/canonical usam `SITE_URL` (hoje `https://banco-site-eduit.6tqx2r.easypanel.host`). Trocar para `https://eduit.com.br` quando o domínio definitivo estiver no ar.

### 2026-09-22 - PageSpeed (LCP, JS, gzip, imagens)

- **Decisão:** Gzip + cache no Express, code-split das rotas, listagem de cursos sem textos longos, WebP nas fotos de polo/banners, hero em `/hero.webp` com preload, GA adiado.
- **Contexto:** Relatórios PageSpeed desktop/mobile da home. Sem lib nova no app e sem mudança de layout.
- **Alternativas descartadas:** Pacote `compression`; reescrever o front; carregar todas as páginas no bundle inicial.
- **Impacto:** Home baixa menos JS/JSON. Polos deixam de puxar PNGs de ~2 MB. Reconverter imagens: `npx sharp` + `node scripts/compress-images.mjs` (sharp só no script, não no app).

### 2026-09-16 - Cursos no Postgres site_anhanguera

- **Decisão:** Catálogo de graduação e pós vive no Postgres `site_anhanguera`. O front Vite não conecta no banco; a API Express em `/api/cursos` lê as tabelas `cursos` e `curso_ofertas`.
- **Contexto:** Excel `BD - Eduit Graduação completa.xlsx` + CSV `preço+gradua.csv`. 128 graduações e 280 pós importados.
- **Alternativas descartadas:** Ler Postgres no browser (vaza senha). Importar só no Supabase (o pedido era o banco EasyPanel). Gerar JSON estático no build (não atualiza sem redeploy).
- **Impacto:** `npm run dev` sobe a API junto com o Vite. Produção usa `node server/index.js` servindo `dist` + API. Variáveis `DATABASE_*` ficam só no servidor.
