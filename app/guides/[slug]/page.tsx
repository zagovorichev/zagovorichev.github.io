import type {Metadata} from 'next';
import PostLayout from '@/components/PostLayout';
import {getGuide, getGuides} from '@/lib/content';
import {renderMdx} from '@/lib/mdx';
import {ogImageMeta} from '@/lib/og';

type Props = {params: Promise<{slug: string}>};

export const dynamicParams = false;

export function generateStaticParams() {
  return getGuides().map((g) => ({slug: g.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const g = getGuide((await params).slug);
  return {
    title: g.title,
    description: g.description,
    alternates: {canonical: `/guides/${g.slug}/`},
    openGraph: {
      type: 'article',
      title: g.title,
      description: g.description,
      publishedTime: g.date,
      images: ogImageMeta(`/guides/${g.slug}/og.png`),
    },
  };
}

export default async function GuidePage({params}: Props) {
  const g = getGuide((await params).slug);
  const {content, toc} = await renderMdx(g.source);
  return (
    <PostLayout section="guides" post={g} toc={toc}>
      {content}
    </PostLayout>
  );
}
