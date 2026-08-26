import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_JSON = path.join(ROOT, 'src/data/wix-blog.json');
const SITEMAP = 'https://www.eduit.com.br/blog-posts-sitemap.xml';

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept-Language': 'pt-BR,pt;q=0.9',
        },
      },
      (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve({ status: res.statusCode || 0, body }));
      },
    );
    req.on('error', reject);
    req.setTimeout(25000, () => {
      req.destroy(new Error('timeout'));
    });
  });
}

async function getRetry(url, attempts = 6) {
  for (let i = 1; i <= attempts; i++) {
    const res = await get(url);
    if (res.status === 429 || res.status >= 500) {
      const wait = 4000 * i;
      console.log(`  ${res.status} — espera ${wait}ms (${url})`);
      await sleep(wait);
      continue;
    }
    return res;
  }
  throw new Error(`falhou após retries: ${url}`);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function decodeHtml(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripHtml(html) {
  const cut = html.length > 120000 ? html.slice(0, 120000) : html;
  return decodeHtml(
    cut
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|h1|h2|h3|h4|li|blockquote)>/gi, '\n')
      .replace(/<li[^>]*>/gi, '• ')
      .replace(/<[^>]+>/g, '')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim(),
  );
}

function betweenHook(html, startHook, endHook) {
  const start = html.indexOf(`data-hook="${startHook}"`);
  const end = html.indexOf(`data-hook="${endHook}"`);
  if (start < 0) return '';
  return html.slice(start, end > start ? end : start + 80000);
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${String(d.getUTCDate()).padStart(2, '0')} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function parsePost(html, url) {
  let ld = {};
  const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (ldMatch) {
    try {
      ld = JSON.parse(ldMatch[1]);
    } catch {
      ld = {};
    }
  }

  const slug = decodeURIComponent(url.split('/post/')[1] || '').replace(/\/$/, '');
  const title =
    ld.headline ||
    (html.match(/property="og:title" content="([^"]*)"/) || [])[1] ||
    stripHtml(betweenHook(html, 'post-title', 'time-ago')) ||
    slug;

  const summary =
    (html.match(/property="og:description" content="([^"]*)"/) || [])[1] ||
    ld.description ||
    '';

  let image = '';
  if (ld.image?.url) image = ld.image.url;
  else image = (html.match(/property="og:image" content="([^"]*)"/) || [])[1] || '';
  image = image.replace(/\\u002F/g, '/');

  const bodyHtml = betweenHook(html, 'post-description', 'post-footer');
  let content = stripHtml(bodyHtml);
  content = content
    .replace(/^data-hook="post-description">\s*/i, '')
    .replace(/<footer class="[^"]*"\s*$/i, '')
    .trim();
  if (!content || content.length < 40) content = decodeHtml(summary);

  const readTime =
    (html.match(/data-hook="time-to-read"[^>]*>([^<]+)/) || [])[1]?.trim() ||
    `${Math.max(2, Math.round(content.split(/\s+/).length / 200))} min de leitura`;

  const category =
    (html.match(/\/blog\/categories\/[^"]+"[^>]*>([^<]+)/) || [])[1]?.trim() || 'Blog';

  const date = formatDate(ld.datePublished || (html.match(/property="article:published_time" content="([^"]*)"/) || [])[1]);

  const authorName = ld.author?.name || 'Eduit';

  return {
    id: slug,
    category,
    badge: category,
    title: decodeHtml(title),
    summary: decodeHtml(summary).trim(),
    content,
    date,
    readTime,
    image,
    author: {
      name: authorName,
      role: 'Blog Eduit',
    },
    tags: [category],
  };
}

async function main() {
  console.log('Baixando sitemap...');
  const sm = await getRetry(SITEMAP);
  const urls = [...sm.body.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decodeURIComponent(m[1]));
  console.log(`${urls.length} posts no sitemap`);

  let posts = [];
  if (fs.existsSync(OUT_JSON)) {
    posts = JSON.parse(fs.readFileSync(OUT_JSON, 'utf8'));
    console.log(`Retomando com ${posts.length} já salvos`);
  }
  const done = new Set(posts.map((p) => p.id));
  const maxNew = Number(process.env.MAX_NEW || 80);
  let added = 0;

  for (let i = 0; i < urls.length; i++) {
    if (added >= maxNew) {
      console.log(`Pausa após ${added} novos (retome o script para continuar)`);
      break;
    }
    const url = urls[i];
    const slug = decodeURIComponent(url.split('/post/')[1] || '').replace(/\/$/, '');
    if (done.has(slug)) continue;
    process.stdout.write(`[${i + 1}/${urls.length}] ${url}\n`);
    try {
      const res = await getRetry(url);
      if (res.status !== 200) {
        console.log(`  skip status ${res.status}`);
        continue;
      }
      const post = parsePost(res.body, url);
      if (!post.title) {
        console.log('  skip sem título');
        continue;
      }
      posts.push(post);
      done.add(post.id);
      added += 1;
      fs.writeFileSync(OUT_JSON, JSON.stringify(posts, null, 2), 'utf8');
    } catch (err) {
      console.log('  erro', err && err.message ? err.message : err);
    }
    await sleep(400);
  }

  if (posts.length) posts[0].isFeatured = true;

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(posts, null, 2), 'utf8');
  console.log(`Salvo ${posts.length} posts em ${OUT_JSON}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
