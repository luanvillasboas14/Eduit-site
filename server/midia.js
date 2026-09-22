import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Router } from 'express';

const CACHE_DIR = path.resolve(process.env.MIDIA_CACHE || '/tmp/eduit-midia');
const ALLOWED_HOSTS = new Set(['i.ibb.co']);

function safeTarget(raw) {
  if (!raw) return null;
  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' || !ALLOWED_HOSTS.has(url.hostname)) return null;
  return url;
}

export function localImage(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('/api/midia')) return url;
  if (!safeTarget(url)) return url;
  return `/api/midia?u=${encodeURIComponent(url)}`;
}

export function createMidiaRouter() {
  const router = Router();

  router.get('/', async (req, res) => {
    const target = safeTarget(typeof req.query.u === 'string' ? req.query.u : '');
    if (!target) {
      res.status(400).end();
      return;
    }

    const id = createHash('sha256').update(target.toString()).digest('hex');
    const bodyPath = path.join(CACHE_DIR, id);
    const metaPath = `${bodyPath}.json`;

    try {
      const [body, metaRaw] = await Promise.all([readFile(bodyPath), readFile(metaPath, 'utf8')]);
      const meta = JSON.parse(metaRaw);
      res.setHeader('Content-Type', meta.type || 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=604800');
      res.send(body);
      return;
    } catch {
      /* cache miss */
    }

    try {
      const upstream = await fetch(target, {
        headers: { Accept: 'image/*', 'User-Agent': 'EduitSite/1.0' },
        redirect: 'follow',
      });
      const type = upstream.headers.get('content-type') || '';
      if (!upstream.ok || !type.startsWith('image/')) {
        res.status(502).end();
        return;
      }
      const body = Buffer.from(await upstream.arrayBuffer());
      await mkdir(CACHE_DIR, { recursive: true });
      await Promise.all([
        writeFile(bodyPath, body),
        writeFile(metaPath, JSON.stringify({ type })),
      ]);
      res.setHeader('Content-Type', type);
      res.setHeader('Cache-Control', 'public, max-age=604800');
      res.send(body);
    } catch (error) {
      console.error('GET /api/midia', error);
      res.status(502).end();
    }
  });

  return router;
}
