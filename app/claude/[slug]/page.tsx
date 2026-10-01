import type {Metadata} from 'next';
import PostLayout from '@/components/PostLayout';
import {getClaudePost, getClaudePosts} from '@/lib/content';
import {renderMdx} from '@/lib/mdx';

type Props = {params: Promise<{slug: string}>};

export const dynamicParams = false;

export function generateStaticParams() {
  return getClaudePosts().map((g) => ({slug: g.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const g = getClaudePost((await params).slug);
  return {
    title: g.title,
    description: g.description,
    alternates: {canonical: `/claude/${g.slug}/`},
    openGraph: {type: 'article', title: g.title, description: g.description, publishedTime: g.date},
  };
}

export default async function ClaudePostPage({params}: Props) {
  const g = getClaudePost((await params).slug);
  return (
    <PostLayout section="claude" post={g}>
      {await renderMdx(g.source)}
    </PostLayout>
  );
}
