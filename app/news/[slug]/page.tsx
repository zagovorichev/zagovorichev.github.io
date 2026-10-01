import type {Metadata} from 'next';
import PostLayout from '@/components/PostLayout';
import {getNews, getNewsPost} from '@/lib/content';
import {renderMdx} from '@/lib/mdx';

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
    openGraph: {type: 'article', title: g.title, description: g.description, publishedTime: g.date},
  };
}

export default async function NewsPostPage({params}: Props) {
  const g = getNewsPost((await params).slug);
  return (
    <PostLayout section="news" post={g}>
      {await renderMdx(g.source)}
    </PostLayout>
  );
}
