import { createReadStream, existsSync, readFileSync, statSync } from 'fs';
import path from 'path';
import { createGzip, gzipSync } from 'zlib';

const PUBLIC_ORIGIN = 'https://www.eduit.com.br';

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

export function canonicalHref(pathname) {
  let pathOnly = String(pathname || '/').split('?')[0];
  try {
    pathOnly = decodeURIComponent(pathOnly);
  } catch {
    pathOnly = '/';
  }
  if (!pathOnly.startsWith('/')) pathOnly = `/${pathOnly}`;
  if (pathOnly.length > 1 && pathOnly.endsWith('/')) pathOnly = pathOnly.slice(0, -1);
  if (pathOnly.includes('..') || pathOnly.includes('\\') || pathOnly.includes('\0')) pathOnly = '/';
  return `${PUBLIC_ORIGIN}${encodeURI(pathOnly)}`;
}

function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

export function withCanonical(html, href) {
  const safe = escapeAttr(href);
  const link = `<link rel="canonical" href="${safe}" />`;
  const og = `<meta property="og:url" content="${safe}" />`;
  let next = html;
  if (/<link\s+rel="canonical"[^>]*>/i.test(next)) {
    next = next.replace(/<link\s+rel="canonical"[^>]*>/i, link);
  } else {
    next = next.replace('</head>', `    ${link}\n  </head>`);
  }
  if (/<meta\s+property="og:url"[^>]*>/i.test(next)) {
    next = next.replace(/<meta\s+property="og:url"[^>]*>/i, og);
  } else {
    next = next.replace('</head>', `    ${og}\n  </head>`);
  }
  return next;
}

function sendIndex(req, res, filePath) {
  const html = withCanonical(readFileSync(filePath, 'utf8'), canonicalHref(req.path));
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method === 'HEAD') {
    res.status(200).end();
    return;
  }
  if (wantsGzip(req)) {
    const gzipped = gzipSync(Buffer.from(html), { level: 6 });
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Vary', 'Accept-Encoding');
    res.setHeader('Content-Length', gzipped.length);
    res.end(gzipped);
    return;
  }
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
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
      if (path.basename(target) === 'index.html') {
        sendIndex(req, res, target);
        return;
      }
      sendFile(req, res, target);
      return;
    }

    if (!existsSync(indexFile)) {
      next();
      return;
    }
    sendIndex(req, res, indexFile);
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
