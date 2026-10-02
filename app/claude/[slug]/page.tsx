import type {Metadata} from 'next';
import PostLayout from '@/components/PostLayout';
import {getClaudePost, getClaudePosts} from '@/lib/content';
import {renderMdx} from '@/lib/mdx';
import {ogImageMeta} from '@/lib/og';

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
    openGraph: {
      type: 'article',
      title: g.title,
      description: g.description,
      publishedTime: g.date,
      images: ogImageMeta(`/claude/${g.slug}/og.png`),
    },
  };
}

export default async function ClaudePostPage({params}: Props) {
  const g = getClaudePost((await params).slug);
  const {content, toc} = await renderMdx(g.source);
  return (
    <PostLayout section="claude" post={g} toc={toc}>
      {content}
    </PostLayout>
  );
}
