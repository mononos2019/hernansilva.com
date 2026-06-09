import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const base = context.site ?? new URL('https://hernansilva.com');
  const today = new Date().toISOString().slice(0, 10);

  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const entries = [
    { loc: new URL('/', base).href, lastmod: today },
    { loc: new URL('/blog/', base).href, lastmod: today },
    ...posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((p) => ({
        loc: new URL(`/blog/${p.slug}/`, base).href,
        lastmod: p.data.date.toISOString().slice(0, 10),
      })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </url>`)
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
