import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(root, 'src', 'assets', 'images');
const publicDir = path.join(root, 'public');

const POLO_FILES = [
  'barra funda.png',
  'campinas.png',
  'capivari.png',
  'frequecia do o.png',
  'itapira.png',
  'mituzi.png',
  'morumbi.png',
  'Polo_Ibirapuera.png',
  'Polo_Vila prudente.png',
  'santana.png',
  'sapopemba.png',
  'taboao centro.png',
  'vila mariana.png',
];

async function toWebp(input, output, width, quality) {
  await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toFile(output);
  const before = fs.statSync(input).size;
  const after = fs.statSync(output).size;
  console.log(`${path.basename(output)} ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`);
}

async function main() {
  fs.mkdirSync(publicDir, { recursive: true });

  for (const file of POLO_FILES) {
    const input = path.join(imagesDir, file);
    if (!fs.existsSync(input)) continue;
    await toWebp(input, path.join(imagesDir, file.replace(/\.[^.]+$/, '.webp')), 1200, 72);
  }

  const heroIn = path.join(imagesDir, 'Banner_Novo site cruzeiro.png');
  if (fs.existsSync(heroIn)) {
    await toWebp(heroIn, path.join(publicDir, 'hero.webp'), 1920, 78);
  }

  for (const file of ['graduação.jpg', 'pos grad.jpg', 'Cabeçalho (9).jpg']) {
    const input = path.join(imagesDir, file);
    if (!fs.existsSync(input)) continue;
    await toWebp(input, path.join(imagesDir, file.replace(/\.[^.]+$/, '.webp')), 1600, 76);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
