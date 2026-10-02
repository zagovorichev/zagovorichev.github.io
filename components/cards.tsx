import {ViewTransition} from 'react';
import Link from 'next/link';
import {ArrowRight, ArrowUpRight, Clock, Play} from 'lucide-react';
import {TopicIcon} from './icons';
import {formatDate, type ClaudeKind, type LinkItem, type PostMeta, type Video} from '@/lib/content';

/** Shared by the guide card and the guide page header: on navigation the icon tile morphs between them. */
export const guideIconTransition = (slug: string) => `guide-icon-${slug}`;

export function GuideCard({guide}: {guide: PostMeta}) {
  return (
    <Link href={`/guides/${guide.slug}/`} className="card guide-card" data-section="guides">
      <ViewTransition name={guideIconTransition(guide.slug)} share="morph" default="none">
        <span className="topic-tile">
          <TopicIcon name={guide.icon} />
        </span>
      </ViewTransition>
      <h3>{guide.title}</h3>
      <p className="muted clamp-3">{guide.description}</p>
      <div className="card-meta">
        <span>
          <Clock size={14} /> {guide.readingMinutes} min
        </span>
        {guide.tags.slice(0, 2).map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}

export function NewsItem({post}: {post: PostMeta}) {
  return (
    <Link href={`/news/${post.slug}/`} className="news-item" data-section="news">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <div>
        <h3>{post.title}</h3>
        <p className="muted">{post.description}</p>
      </div>
      <ArrowRight size={18} className="news-arrow" />
    </Link>
  );
}

export function VideoCard({video}: {video: Video}) {
  return (
    <a href={video.url} target="_blank" rel="noopener noreferrer" className="card video-card" data-section="videos">
      <div className="video-thumb">
        {video.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail
          <img src={video.thumbnail} alt="" loading="lazy" />
        ) : null}
        <span className="play">
          <Play size={22} fill="currentColor" />
        </span>
      </div>
      <div className="video-body">
        <h3>{video.title}</h3>
        {video.channel && <span className="muted small">{video.channel}</span>}
        {video.note && <p className="note">{video.note}</p>}
      </div>
    </a>
  );
}

export function LinkCard({link, guideTitle}: {link: LinkItem; guideTitle?: string}) {
  return (
    <div className="card link-card" data-section="links">
      <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-main">
        <span className="monogram" aria-hidden="true">
          {link.title.charAt(0)}
        </span>
        <span>
          <span className="link-title">
            {link.title} <ArrowUpRight size={15} />
          </span>
          <span className="muted small">{link.host}</span>
        </span>
      </a>
      <p className="muted">{link.description}</p>
      {link.note && <p className="note">{link.note}</p>}
      {link.guide && guideTitle && (
        <Link href={`/guides/${link.guide}/`} className="related">
          Related guide: {guideTitle}
        </Link>
      )}
    </div>
  );
}

const claudeKindLabel: Record<ClaudeKind, string> = {
  'claude-md': 'CLAUDE.md',
  skill: 'Skill',
  command: 'Command',
  hook: 'Hook',
  workflow: 'Workflow',
};

export function ClaudeCard({post, featured}: {post: PostMeta; featured?: boolean}) {
  return (
    <Link
      href={`/claude/${post.slug}/`}
      className={`card claude-card${featured ? ' featured' : ''}`}
      data-section="claude"
    >
      <span className="claude-card-top">
        {post.kind && <span className="kind-badge">{claudeKindLabel[post.kind]}</span>}
        <span className="card-meta-inline">
          <Clock size={14} /> {post.readingMinutes} min
        </span>
      </span>
      <h3>{post.title}</h3>
      <p className="muted">{post.description}</p>
      <span className="read-more">
        Read <ArrowRight size={16} />
      </span>
    </Link>
  );
}
