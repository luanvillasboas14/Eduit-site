import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import express from 'express';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {createCursosRouter} from './server/cursos.js';
import {attachPublicRoutes} from './server/public.js';

function cursosApiPlugin(): Plugin {
  const api = express();
  attachPublicRoutes(api);
  api.use('/api/cursos', createCursosRouter());
  return {
    name: 'cursos-api',
    configureServer(server) {
      server.middlewares.use(api);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), cursosApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
