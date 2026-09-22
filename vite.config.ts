import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import express from 'express';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {createCursosRouter} from './server/cursos.js';
import {createMidiaRouter} from './server/midia.js';
import {attachPublicRoutes} from './server/public.js';

function cursosApiPlugin(): Plugin {
  const api = express();
  attachPublicRoutes(api);
  api.use('/api/cursos', createCursosRouter());
  api.use('/api/midia', createMidiaRouter());
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
    build: {
      target: 'es2022',
      cssCodeSplit: true,
      modulePreload: { polyfill: false },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
              return 'react';
            }
            if (id.includes('node_modules/react-router')) {
              return 'router';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'icons';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
