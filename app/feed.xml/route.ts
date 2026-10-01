import {getClaudePosts, getGuides, getNews} from '@/lib/content';
import {site} from '@/lib/site';

export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const items = [
    ...getGuides().map((p) => ({...p, path: `/guides/${p.slug}/`})),
    ...getNews().map((p) => ({...p, path: `/news/${p.slug}/`})),
    ...getClaudePosts().map((p) => ({...p, path: `/claude/${p.slug}/`})),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(site.name)} — ${esc(site.tagline)}</title>
<link>${site.url}/</link>
<description>${esc(site.description)}</description>
<language>en</language>
<atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    (i) => `<item>
<title>${esc(i.title)}</title>
<link>${site.url}${i.path}</link>
<guid>${site.url}${i.path}</guid>
<pubDate>${new Date(i.date).toUTCString()}</pubDate>
<description>${esc(i.description)}</description>
</item>`,
  )
  .join('\n')}
</channel>
</rss>`;
  return new Response(xml, {headers: {'Content-Type': 'application/rss+xml; charset=utf-8'}});
}
