import {getClaudePost, getClaudePosts, formatDate} from '@/lib/content';
import {ogAccent, ogImage} from '@/lib/og';

// Link preview image, served as a real .png file (see lib/og.tsx)
export const dynamic = 'force-static';

export function generateStaticParams() {
  return getClaudePosts().map((p) => ({slug: p.slug}));
}

export async function GET(_req: Request, {params}: {params: Promise<{slug: string}>}) {
  const p = getClaudePost((await params).slug);
  return ogImage({
    label: 'Claude Code',
    title: p.title,
    description: p.description,
    meta: `${p.readingMinutes} min read · ${formatDate(p.date)}`,
    accent: ogAccent.claude,
  });
}
