import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/wix-blog.json'), 'utf8'));

const baseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').replace(/\/rest\/v1\/?$/, '');
const secret = process.env.SUPABASE_SECRET_KEY || '';

if (!baseUrl || !secret) {
  console.error('Defina SUPABASE_URL e SUPABASE_SECRET_KEY');
  process.exit(1);
}

function cleanContent(text) {
  return String(text || '')
    .replace(/^data-hook="post-description">\s*/i, '')
    .replace(/<footer class="[^"]*"\s*$/i, '')
    .trim();
}

const rows = posts.map((post, index) => ({
  id: post.id,
  category: post.category || 'Blog',
  badge: post.badge || post.category || 'Blog',
  title: post.title,
  summary: post.summary || '',
  content: cleanContent(post.content),
  date: post.date || '',
  read_time: post.readTime || '',
  image: post.image || null,
  is_featured: index === 0 || Boolean(post.isFeatured),
  author_name: post.author?.name || 'Eduit',
  author_role: post.author?.role || 'Blog Eduit',
  author_avatar: post.author?.avatar || null,
  tags: post.tags || [],
}));

const chunkSize = 25;
for (let i = 0; i < rows.length; i += chunkSize) {
  const chunk = rows.slice(i, i + chunkSize);
  const response = await fetch(`${baseUrl}/rest/v1/blog_posts?on_conflict=id`, {
    method: 'POST',
    headers: {
      apikey: secret,
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(chunk),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Falha no lote ${i / chunkSize + 1}: ${response.status} ${body}`);
  }

  console.log(`Enviado ${Math.min(i + chunkSize, rows.length)}/${rows.length}`);
}

console.log(`Pronto: ${rows.length} postagens no Supabase`);
