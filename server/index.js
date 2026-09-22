import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { attachPublicRoutes } from './public.js';
import { createCursosRouter } from './cursos.js';
import { attachGzipJson, attachSpaStatic } from './static.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 80);

attachGzipJson(app);
attachPublicRoutes(app);
app.use('/api/cursos', createCursosRouter());

if (process.env.NODE_ENV === 'production') {
  attachSpaStatic(app, path.resolve(__dirname, '../dist'));
}

app.listen(port, '0.0.0.0', () => {
  console.log(`API de cursos em http://0.0.0.0:${port}`);
});
