function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isBullet(line: string): boolean {
  return /^[•\-*]\s+/.test(line);
}

function bulletText(line: string): string {
  return line.replace(/^[•\-*]\s+/, '').trim();
}

function isHeading(line: string): boolean {
  const text = line.trim();
  if (!text || isBullet(text)) return false;
  if (text.endsWith('?')) return text.length <= 180;
  if (text.length > 90 || /[.!]$/.test(text)) return false;
  return text.split(/\s+/).length <= 12;
}

function listHtml(items: string[]): string {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function tableHtml(cells: string[]): string {
  const headers = cells.slice(0, 3);
  const body = cells.slice(3);
  const rows: string[] = [];
  for (let index = 0; index < body.length; index += 3) {
    rows.push(`<tr>${body.slice(index, index + 3).map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`);
  }
  return `<div class="article-table"><table><thead><tr>${headers
    .map((cell) => `<th>${escapeHtml(cell)}</th>`)
    .join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
}

/** Transforma o texto plano do blog em HTML semântico (títulos, listas e tabelas). */
export function articleBodyHtml(content: string): string {
  const blocks = content
    .replace(/\u00a0/g, ' ')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  const html: string[] = [];
  let index = 0;

  while (index < blocks.length) {
    const lines = blocks[index].split('\n').map((line) => line.trim()).filter(Boolean);

    if (lines.length > 0 && lines.every(isBullet)) {
      const items = lines.map(bulletText);
      index += 1;
      while (index < blocks.length) {
        const next = blocks[index].split('\n').map((line) => line.trim()).filter(Boolean);
        if (!next.every(isBullet)) break;
        items.push(...next.map(bulletText));
        index += 1;
      }
      html.push(listHtml(items));
      continue;
    }

    if (lines.length === 1 && lines[0].length <= 90 && !lines[0].endsWith('?') && !isBullet(lines[0])) {
      const run: string[] = [];
      let cursor = index;
      while (cursor < blocks.length) {
        const next = blocks[cursor].split('\n').map((line) => line.trim()).filter(Boolean);
        if (next.length !== 1 || next[0].length > 90 || next[0].endsWith('?') || isBullet(next[0])) break;
        run.push(next[0]);
        cursor += 1;
      }
      const usable = run.length - (run.length % 3);
      if (usable >= 9) {
        html.push(tableHtml(run.slice(0, usable)));
        for (const leftover of run.slice(usable)) {
          html.push(isHeading(leftover) ? `<h2>${escapeHtml(leftover)}</h2>` : `<p>${escapeHtml(leftover)}</p>`);
        }
        index = cursor;
        continue;
      }
    }

    if (lines.length === 1 && isHeading(lines[0])) {
      html.push(`<h2>${escapeHtml(lines[0])}</h2>`);
    } else {
      html.push(`<p>${lines.map(escapeHtml).join('<br>')}</p>`);
    }
    index += 1;
  }

  return html.join('');
}
