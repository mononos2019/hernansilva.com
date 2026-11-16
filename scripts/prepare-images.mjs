// Build-time image optimization. Runs before `astro build` / `astro dev` (see package.json).
//
// The original files in public/ are left untouched. Smaller copies are written to
// public/optimized/ (git-ignored) and the templates use them through src/lib/images.ts,
// falling back to the original when no optimized copy exists. That way a new blog
// post can add a large PNG straight from an image tool and still ship a small file.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC = 'public';
const OUT = path.join(PUBLIC, 'optimized');
const MAX_WIDTH = 1200; // post header + og:image
const THUMB_WIDTH = 640; // blog cards are ~350px wide, so this covers 2x screens

const stats = { optimized: 0, thumbs: 0, skipped: 0 };

function upToDate(src, out) {
  return fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs;
}

/** Write `buf` to `out` only if it is meaningfully smaller (25%+) than `src`; otherwise keep using the original. */
function writeIfSmaller(src, out, buf) {
  if (buf.length < fs.statSync(src).size * 0.75) {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, buf);
    stats.optimized++;
  } else {
    if (fs.existsSync(out)) fs.unlinkSync(out);
    stats.skipped++;
  }
}

async function photo(rel) {
  const src = path.join(PUBLIC, rel);
  const out = path.join(OUT, rel.replace(/\.(png|jpe?g|webp)$/i, '.jpg'));
  if (upToDate(src, out)) return;
  const buf = await sharp(src)
    .rotate()
    .flatten({ background: '#ffffff' })
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toBuffer();
  writeIfSmaller(src, out, buf);
}

async function thumb(rel) {
  const src = path.join(PUBLIC, rel);
  const out = path.join(OUT, path.dirname(rel), 'thumbs', path.basename(rel).replace(/\.[^.]+$/, '.webp'));
  if (upToDate(src, out)) return;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(src).rotate().resize({ width: THUMB_WIDTH, withoutEnlargement: true }).webp({ quality: 72 }).toFile(out);
  stats.thumbs++;
}

async function logo(rel, height) {
  const src = path.join(PUBLIC, rel);
  const out = path.join(OUT, rel);
  if (upToDate(src, out)) return;
  // 3x the 35px display height keeps it sharp on high-density screens.
  const buf = await sharp(src).resize({ height, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer();
  writeIfSmaller(src, out, buf);
}

const blogDir = path.join(PUBLIC, 'images', 'blog');
for (const file of fs.readdirSync(blogDir)) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const rel = path.join('images', 'blog', file);
  await photo(rel);
  await thumb(rel);
}
for (const rel of ['images/chicago.jpg', 'images/buenos-aires.jpg']) {
  if (fs.existsSync(path.join(PUBLIC, rel))) await photo(rel);
}
await logo('nav-logo.png', 105);

console.log(`[prepare-images] ${stats.optimized} optimized, ${stats.thumbs} thumbnails, ${stats.skipped} already small enough (output: ${OUT})`);
