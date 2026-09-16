### 2026-09-16 - Cursos no Postgres site_anhanguera

- **Decisão:** Catálogo de graduação e pós vive no Postgres `site_anhanguera`. O front Vite não conecta no banco; a API Express em `/api/cursos` lê as tabelas `cursos` e `curso_ofertas`.
- **Contexto:** Excel `BD - Eduit Graduação completa.xlsx` + CSV `preço+gradua.csv`. 128 graduações e 280 pós importados.
- **Alternativas descartadas:** Ler Postgres no browser (vaza senha). Importar só no Supabase (o pedido era o banco EasyPanel). Gerar JSON estático no build (não atualiza sem redeploy).
- **Impacto:** `npm run dev` sobe a API junto com o Vite. Produção usa `node server/index.js` servindo `dist` + API. Variáveis `DATABASE_*` ficam só no servidor.
