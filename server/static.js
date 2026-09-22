import { createReadStream, existsSync, statSync } from 'fs';
import path from 'path';
import { createGzip } from 'zlib';

const MIME = {
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
};

const GZIP_TYPES = new Set([
  '.js',
  '.css',
  '.html',
  '.svg',
  '.json',
  '.xml',
  '.txt',
  '.map',
]);

function wantsGzip(req) {
  return String(req.headers['accept-encoding'] || '').includes('gzip');
}

function cacheControl(filePath) {
  const base = path.basename(filePath);
  if (base === 'index.html') return 'no-cache';
  if (/-[a-zA-Z0-9_-]{8}\./.test(base)) return 'public, max-age=31536000, immutable';
  return 'public, max-age=86400';
}

function safeResolve(root, urlPath) {
  const decoded = decodeURIComponent((urlPath || '/').split('?')[0]);
  const resolved = path.resolve(root, `.${decoded}`);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) return null;
  return resolved;
}

function sendFile(req, res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || 'application/octet-stream';
  res.setHeader('Content-Type', type);
  res.setHeader('Cache-Control', cacheControl(filePath));
  res.setHeader('X-Content-Type-Options', 'nosniff');

  const stream = createReadStream(filePath);
  stream.on('error', () => {
    if (!res.headersSent) res.status(500).end();
  });

  if (GZIP_TYPES.has(ext) && wantsGzip(req)) {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Vary', 'Accept-Encoding');
    stream.pipe(createGzip({ level: 6 })).pipe(res);
    return;
  }

  stream.pipe(res);
}

export function attachSpaStatic(app, distDir) {
  const dist = path.resolve(distDir);
  const indexFile = path.join(dist, 'index.html');

  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      next();
      return;
    }
    if (req.path.startsWith('/api')) {
      next();
      return;
    }

    const target = safeResolve(dist, req.path);
    if (target && existsSync(target) && statSync(target).isFile()) {
      sendFile(req, res, target);
      return;
    }

    if (!existsSync(indexFile)) {
      next();
      return;
    }
    sendFile(req, res, indexFile);
  });
}

export function attachGzipJson(app) {
  app.use((req, res, next) => {
    if (!wantsGzip(req)) {
      next();
      return;
    }
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      const raw = Buffer.from(JSON.stringify(body));
      if (raw.length < 800) {
        return originalJson(body);
      }
      const gzipped = createGzip({ level: 6 });
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Content-Encoding', 'gzip');
      res.setHeader('Vary', 'Accept-Encoding');
      gzipped.end(raw);
      gzipped.pipe(res);
      return res;
    };
    next();
  });
}
