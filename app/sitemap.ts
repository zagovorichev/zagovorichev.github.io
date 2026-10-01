import type {MetadataRoute} from 'next';
import {getClaudePosts, getGuides, getNews} from '@/lib/content';
import {navOrder, sections, site} from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {url: `${site.url}/`},
    ...navOrder.map((k) => ({url: `${site.url}${sections[k].href}`})),
    ...getGuides().map((p) => ({url: `${site.url}/guides/${p.slug}/`, lastModified: p.date})),
    ...getNews().map((p) => ({url: `${site.url}/news/${p.slug}/`, lastModified: p.date})),
    ...getClaudePosts().map((p) => ({url: `${site.url}/claude/${p.slug}/`, lastModified: p.date})),
  ];
}
