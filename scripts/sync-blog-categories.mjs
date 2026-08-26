import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const ORIGIN = 'https://www.eduit.com.br';
const dryRun = process.argv.includes('--dry-run');

async function request(url, { method = 'GET', headers = {}, body } = {}) {
  const response = await fetch(url, {
    method,
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Accept: 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  return { status: response.status, body: text };
}

async function getWixCodeInstance() {
  const res = await request(`${ORIGIN}/_api/v1/access-tokens`);
  if (res.status !== 200) throw new Error(`access-tokens ${res.status}`);
  const json = JSON.parse(res.body);
  const instance = json.apps?.['675bbcef-18d8-41f5-800e-131ec9e08762']?.instance;
  if (!instance) throw new Error('Instância Wix Code não encontrada');
  return instance;
}

async function queryCollection(instance, dataCollectionId, pageSize = 100) {
  const items = [];
  for (let offset = 0; offset < 2000; offset += pageSize) {
    const res = await request(`${ORIGIN}/_api/cloud-data/v2/items/query`, {
      method: 'POST',
      headers: {
        Authorization: instance,
        instance,
        'Content-Type': 'application/json',
      },
      body: {
        dataCollectionId,
        query: {
          paging: { limit: pageSize, offset },
        },
      },
    });
    if (res.status !== 200) {
      throw new Error(`query ${dataCollectionId} ${res.status} ${res.body.slice(0, 200)}`);
    }
    const json = JSON.parse(res.body);
    const pageItems = json.dataItems || [];
    items.push(...pageItems);
    const meta = json.pagingMetadata || {};
    if (pageItems.length < pageSize || meta.hasNext === false) break;
  }
  return items;
}

function labelOf(category, categoriesById) {
  return categoriesById.get(category)?.label || null;
}

async function main() {
  const instance = await getWixCodeInstance();
  const categoryItems = await queryCollection(instance, 'Blog/Categories', 50);
  const categoriesById = new Map(
    categoryItems.map((item) => [
      item.id,
      {
        id: item.id,
        label: item.data.label,
        path: item.data.fullCategoryPageUrl,
        count: item.data.postCount,
      },
    ]),
  );

  console.log('Categorias Wix:');
  for (const category of categoriesById.values()) {
    console.log(`  ${category.path} → ${category.label} (${category.count})`);
  }

  const postItems = await queryCollection(instance, 'Blog/Posts', 100);
  const seen = new Set();
  const updates = [];
  for (const item of postItems) {
    const data = item.data || {};
    const slug = data.slug;
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    const names = [...new Set((data.categories || []).map((id) => labelOf(id, categoriesById)).filter(Boolean))];
    const primary = labelOf(data.mainCategory, categoriesById) || names[0];
    if (!primary) continue;
    updates.push({
      id: slug,
      category: primary,
      badge: primary,
      tags: names,
    });
  }

  const counts = {};
  for (const row of updates) {
    for (const name of row.tags) counts[name] = (counts[name] || 0) + 1;
  }
  console.log(`\nPosts classificados: ${updates.length}`);
  console.log('Por categoria:', counts);
  console.log('Por categoria principal:', updates.reduce((acc, row) => {
    acc[row.category] = (acc[row.category] || 0) + 1;
    return acc;
  }, {}));

  fs.writeFileSync(path.join(__dirname, 'blog-category-map.json'), JSON.stringify(updates, null, 2));

  if (dryRun) {
    console.log('Dry-run: mapa salvo, banco não alterado');
    return;
  }

  const baseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').replace(/\/rest\/v1\/?$/, '');
  const secret = process.env.SUPABASE_SECRET_KEY || '';
  if (!baseUrl || !secret) {
    throw new Error('Defina SUPABASE_URL e SUPABASE_SECRET_KEY para gravar no banco');
  }

  let updated = 0;
  let missing = 0;
  for (const row of updates) {
    const response = await fetch(`${baseUrl}/rest/v1/blog_posts?id=eq.${encodeURIComponent(row.id)}`, {
      method: 'PATCH',
      headers: {
        apikey: secret,
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        category: row.category,
        badge: row.badge,
        tags: row.tags,
      }),
    });
    if (!response.ok) {
      throw new Error(`Falha ao atualizar ${row.id}: ${response.status} ${await response.text()}`);
    }
    updated += 1;
  }
  console.log(`Atualizados ${updated} posts no Supabase (${missing} sem match)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
