import type {Metadata} from 'next';
import {Rss} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import {NewsItem} from '@/components/cards';
import {getNews} from '@/lib/content';
import {sections} from '@/lib/site';

export const metadata: Metadata = {title: 'News', description: sections.news.blurb};

export default function NewsPage() {
  const news = getNews();
  return (
    <div className="container page">
      <PageHeader section="news" title="News & notes" lead={sections.news.blurb}>
        <a href="/feed.xml" className="btn btn-ghost btn-sm">
          <Rss size={16} /> Subscribe via RSS
        </a>
      </PageHeader>
      <div className="news-list">
        {news.map((p) => (
          <NewsItem key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
