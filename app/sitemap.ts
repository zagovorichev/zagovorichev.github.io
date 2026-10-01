import type {MetadataRoute} from 'next';
import {getArticles} from '@/lib/content';
import {site} from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {url: `${site.url}/`},
    ...getArticles().map((a) => ({url: `${site.url}/article/${a.slug}/`, lastModified: a.date})),
  ];
}
