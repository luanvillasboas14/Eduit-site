import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCursosRouter } from './cursos.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 80);

app.use('/api/cursos', createCursosRouter());

if (process.env.NODE_ENV === 'production') {
  const dist = path.resolve(__dirname, '../dist');
  app.use(express.static(dist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      next();
      return;
    }
    res.sendFile(path.join(dist, 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`API de cursos em http://0.0.0.0:${port}`);
});
