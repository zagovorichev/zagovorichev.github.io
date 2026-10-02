import type {Metadata} from 'next';
import PostLayout from '@/components/PostLayout';
import {getNews, getNewsPost} from '@/lib/content';
import {renderMdx} from '@/lib/mdx';
import {ogImageMeta} from '@/lib/og';

type Props = {params: Promise<{slug: string}>};

export const dynamicParams = false;

export function generateStaticParams() {
  return getNews().map((g) => ({slug: g.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const g = getNewsPost((await params).slug);
  return {
    title: g.title,
    description: g.description,
    alternates: {canonical: `/news/${g.slug}/`},
    openGraph: {
      type: 'article',
      title: g.title,
      description: g.description,
      publishedTime: g.date,
      images: ogImageMeta(`/news/${g.slug}/og.png`),
    },
  };
}

export default async function NewsPostPage({params}: Props) {
  const g = getNewsPost((await params).slug);
  const {content, toc} = await renderMdx(g.source);
  return (
    <PostLayout section="news" post={g} toc={toc}>
      {content}
    </PostLayout>
  );
}
