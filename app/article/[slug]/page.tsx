import type {Metadata} from 'next';
import {getArticle, getArticleSlugs} from '@/lib/content';
import {renderMdx} from '@/lib/mdx';

type Props = {params: Promise<{slug: string}>};

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const a = getArticle(slug);
  return {
    title: a.title,
    description: a.description,
    alternates: {canonical: `/article/${slug}/`},
    openGraph: {
      type: 'article',
      title: a.title,
      description: a.description,
      publishedTime: a.date,
      ...(a.image && {images: a.image}),
    },
  };
}

export default async function ArticlePage({params}: Props) {
  const {slug} = await params;
  const a = getArticle(slug);

  return (
    <article className="container section article">
      {a.subtitle && <p className="text-muted kicker">{a.subtitle}</p>}
      <h1>{a.title}</h1>
      <time className="text-muted article-date" dateTime={a.date}>
        {new Date(a.date).toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})}
      </time>
      {await renderMdx(a.source)}
    </article>
  );
}
