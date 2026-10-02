import Link from 'next/link';
import {ArrowLeft, Calendar, Clock} from 'lucide-react';
import {SectionTile, TopicIcon} from './icons';
import Toc from './Toc';
import {formatDate, type Post} from '@/lib/content';
import type {TocItem} from '@/lib/mdx';
import {sections, type SectionKey} from '@/lib/site';

export default function PostLayout({
  section,
  post,
  toc = [],
  children,
}: {
  section: Extract<SectionKey, 'guides' | 'news' | 'claude'>;
  post: Post;
  toc?: TocItem[];
  children: React.ReactNode;
}) {
  // short articles read fine without a table of contents
  const showToc = toc.length >= 3;
  return (
    <article className={showToc ? 'container post has-toc' : 'container post'} data-section={section}>
      <Link href={sections[section].href} className="back-link">
        <ArrowLeft size={16} /> {section === 'claude' ? 'All Claude articles' : `All ${sections[section].title.toLowerCase()}`}
      </Link>
      <header className="post-header">
        {section === 'guides' ? (
          <span className="topic-tile topic-tile-lg">
            <TopicIcon name={post.icon} size={28} />
          </span>
        ) : (
          <SectionTile section={section} size="lg" />
        )}
        {post.subtitle && <p className="eyebrow">{post.subtitle}</p>}
        <h1>{post.title}</h1>
        <p className="lead">{post.description}</p>
        <div className="post-meta">
          <span>
            <Calendar size={15} /> <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span>
            <Clock size={15} /> {post.readingMinutes} min read
          </span>
          {post.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </header>
      {showToc && (
        <details className="toc-inline">
          <summary>On this page</summary>
          <Toc items={toc} />
        </details>
      )}
      <div className="prose">{children}</div>
      {showToc && (
        <aside className="toc-side">
          <Toc items={toc} title="On this page" />
        </aside>
      )}
    </article>
  );
}
