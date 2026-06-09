import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET(context: APIContext) {
  const base = context.site ?? new URL('https://hernansilva.com');
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const items = posts
    .map((p) => {
      const url = new URL(`/blog/${p.slug}/`, base).href;
      return `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
      <category>${esc(p.data.category)}</category>
      <description>${esc(p.data.excerpt)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hernan Silva — Blog</title>
    <link>${new URL('/blog/', base).href}</link>
    <atom:link href="${new URL('/rss.xml', base).href}" rel="self" type="application/rss+xml" />
    <description>Short pieces on AI and automation, IT and managed services, and the occasional personal reflection.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
