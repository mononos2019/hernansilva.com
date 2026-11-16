// Build-time helpers for images that live in /public.
// See scripts/prepare-images.mjs for how the optimized copies are produced.
import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = path.resolve('public');
const sizeCache = new Map<string, { width: number; height: number } | null>();

const exists = (src: string) => fs.existsSync(path.join(PUBLIC_DIR, src));

function readSize(buf: Buffer): { width: number; height: number } | null {
  // PNG
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // JPEG: walk the markers until a Start Of Frame segment
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + len;
    }
    return null;
  }
  // WebP
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8X') return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
  }
  return null;
}

/** Intrinsic size of a /public image (e.g. "/images/blog/1.jpg"), or null if unknown. */
export function imageSize(src: string): { width: number; height: number } | null {
  if (!src || !src.startsWith('/')) return null;
  const clean = src.split('?')[0];
  if (sizeCache.has(clean)) return sizeCache.get(clean)!;
  let size = null;
  try {
    size = readSize(fs.readFileSync(path.join(PUBLIC_DIR, clean)));
  } catch {
    size = null;
  }
  sizeCache.set(clean, size);
  return size;
}

/** Optimized (resized/compressed) copy of a /public image, or the original if there is none. */
export function optimizedSrc(src: string): string {
  if (!src || !src.startsWith('/')) return src;
  const jpg = `/optimized${src.replace(/\.(png|jpe?g|webp)$/i, '.jpg')}`;
  if (/\.(png|jpe?g|webp)$/i.test(src) && exists(jpg)) return jpg;
  const same = `/optimized${src}`;
  if (exists(same)) return same;
  return src;
}

/** Small WebP card thumbnail for a blog image, or the optimized/original image if there is none. */
export function blogThumb(src: string): string {
  const m = /^\/images\/blog\/([^/]+)\.(jpe?g|png|webp)$/i.exec(src || '');
  if (m) {
    const thumb = `/optimized/images/blog/thumbs/${m[1]}.webp`;
    if (exists(thumb)) return thumb;
  }
  return optimizedSrc(src);
}
