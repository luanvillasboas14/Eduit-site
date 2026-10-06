function decodeEntities(value: string) {
  let prev = '';
  let cur = value;
  for (let i = 0; i < 3 && cur !== prev; i += 1) {
    prev = cur;
    cur = cur
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)));
  }
  return cur;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const BULLET = /^[•\-*]\s+/;

function isBullet(line: string) {
  return BULLET.test(line);
}

function bulletText(line: string) {
  return line.replace(BULLET, '').trim();
}

function isHeading(line: string) {
  const text = line.trim();
  if (!text || isBullet(text)) return false;
  if (text.endsWith('?')) return text.length <= 180;
  if (text.length > 90 || /[.!]$/.test(text)) return false;
  return text.split(/\s+/).length <= 12;
}

function listHtml(items: string[]) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function tableHtml(cells: string[]) {
  const head = cells.slice(0, 3);
  const body = cells.slice(3);
  const rows: string[] = [];
  for (let i = 0; i < body.length; i += 3) {
    rows.push(`<tr>${body.slice(i, i + 3).map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`);
  }
  return `<div class="article-table"><table><thead><tr>${head.map((cell) => `<th>${escapeHtml(cell)}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
}

function linesOf(block: string) {
  return block.split('\n').map((line) => line.trim()).filter(Boolean);
}

/** Posts antigos são texto puro. O site publicado transforma esse texto em parágrafos, títulos e listas. */
function formatPlain(content: string) {
  const blocks = content.replace(/\u00a0/g, ' ').split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  const out: string[] = [];
  let i = 0;
  while (i < blocks.length) {
    const lines = linesOf(blocks[i]);
    if (lines.length > 0 && lines.every(isBullet)) {
      const items = lines.map(bulletText);
      i += 1;
      while (i < blocks.length) {
        const more = linesOf(blocks[i]);
        if (!more.every(isBullet)) break;
        items.push(...more.map(bulletText));
        i += 1;
      }
      out.push(listHtml(items));
      continue;
    }
    if (lines.length === 1 && lines[0].length <= 90 && !lines[0].endsWith('?') && !isBullet(lines[0])) {
      const cells: string[] = [];
      let j = i;
      while (j < blocks.length) {
        const row = linesOf(blocks[j]);
        if (row.length !== 1 || row[0].length > 90 || row[0].endsWith('?') || isBullet(row[0])) break;
        cells.push(row[0]);
        j += 1;
      }
      const usable = cells.length - (cells.length % 3);
      if (usable >= 9) {
        out.push(tableHtml(cells.slice(0, usable)));
        for (const rest of cells.slice(usable)) {
          out.push(isHeading(rest) ? `<h2>${escapeHtml(rest)}</h2>` : `<p>${escapeHtml(rest)}</p>`);
        }
        i = j;
        continue;
      }
    }
    out.push(
      lines.length === 1 && isHeading(lines[0])
        ? `<h2>${escapeHtml(lines[0])}</h2>`
        : `<p>${lines.map(escapeHtml).join('<br>')}</p>`,
    );
    i += 1;
  }
  return out.join('');
}

const EDITOR_TAG =
  /(?:<|&lt;)(?:br|b|strong|i|em|u|p|div|h2|h3|ul|ol|li|blockquote|a)(?:\s|\/|>|&gt;)/i;

function isEditorHtml(content: string) {
  return EDITOR_TAG.test(content);
}

function sanitizeHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/\son\w+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/\son\w+\s*=\s*[^\s>]+/gi, '')
    .replace(/javascript:/gi, '');
}

export function prepareArticleHtml(raw: string) {
  const source = (raw || '').replace(/\u200b/g, '');
  if (isEditorHtml(source) || isEditorHtml(decodeEntities(source))) {
    return { kind: 'html' as const, html: sanitizeHtml(decodeEntities(source)) };
  }
  return { kind: 'plain' as const, html: formatPlain(decodeEntities(source)) };
}

export function directCoverUrl(url: string | undefined) {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    const page = parsed.pathname.replace(/\/$/, '');
    if (parsed.hostname.includes('google.') && page === '/imgres') {
      const inner = parsed.searchParams.get('imgurl');
      if (inner && inner.startsWith('https://')) return inner;
    }
  } catch {
    return url;
  }
  return url;
}
