import {getNewsPost, getNews, formatDate} from '@/lib/content';
import {ogAccent, ogImage} from '@/lib/og';

// Link preview image, served as a real .png file (see lib/og.tsx)
export const dynamic = 'force-static';

export function generateStaticParams() {
  return getNews().map((p) => ({slug: p.slug}));
}

export async function GET(_req: Request, {params}: {params: Promise<{slug: string}>}) {
  const p = getNewsPost((await params).slug);
  return ogImage({
    label: 'News',
    title: p.title,
    description: p.description,
    meta: `${p.readingMinutes} min read · ${formatDate(p.date)}`,
    accent: ogAccent.news,
  });
}
