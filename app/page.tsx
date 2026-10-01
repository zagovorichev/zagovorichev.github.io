import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {HeroTree, SectionTile} from '@/components/icons';
import {GuideCard, LinkCard, NewsItem, VideoCard} from '@/components/cards';
import {getGuides, getLinkGroups, getNews, getVideos} from '@/lib/content';
import {sections, site, type SectionKey} from '@/lib/site';

export default function Home() {
  const guides = getGuides();
  const news = getNews();
  const videos = getVideos();
  const linkGroups = getLinkGroups();
  const links = linkGroups.flatMap((g) => g.items);
  const guideTitles = Object.fromEntries(guides.map((g) => [g.slug, g.title]));

  const counts: Record<Exclude<SectionKey, 'about'>, string> = {
    guides: `${guides.length} guides`,
    videos: videos.length ? `${videos.length} videos` : 'Coming soon',
    links: `${links.length} links`,
    news: `${news.length} ${news.length === 1 ? 'note' : 'notes'}`,
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              {site.role} · {site.tagline}
            </p>
            <h1>
              Hi, I&apos;m Oleksandr.
              <br />
              <span className="gradient-text">I write down what works.</span>
            </h1>
            <p className="lead">
              Practical guides for problems I have solved, the videos and websites that actually helped, and short
              notes on the tech I follow.
            </p>
            <div className="hero-actions">
              <Link href="/guides/" className="btn btn-primary">
                Read the guides <ArrowRight size={18} />
              </Link>
              <Link href="/about/" className="btn btn-ghost">
                About me
              </Link>
            </div>
          </div>
          <div className="hero-art">
            <HeroTree />
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-grid">
          {(Object.keys(counts) as Array<keyof typeof counts>).map((key) => (
            <Link key={key} href={sections[key].href} className="card section-card" data-section={key}>
              <SectionTile section={key} />
              <h2>{sections[key].title}</h2>
              <p className="muted">{sections[key].blurb}</p>
              <span className="section-count">
                {counts[key]} <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <SectionHeading section="guides" title="Latest guides" />
        <div className="card-grid">
          {guides.slice(0, 6).map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </section>

      {videos.length > 0 && (
        <section className="container section">
          <SectionHeading section="videos" title="Worth watching" />
          <div className="card-grid">
            {videos.slice(0, 3).map((v) => (
              <VideoCard key={v.url} video={v} />
            ))}
          </div>
        </section>
      )}

      <section className="container section split">
        <div>
          <SectionHeading section="news" title="News & notes" />
          <div className="news-list">
            {news.slice(0, 4).map((p) => (
              <NewsItem key={p.slug} post={p} />
            ))}
          </div>
        </div>
        <div>
          <SectionHeading section="links" title="Useful links" />
          <div className="stack">
            {links
              .filter((l) => l.note || l.guide)
              .slice(0, 3)
              .map((l) => (
                <LinkCard key={l.url} link={l} guideTitle={l.guide ? guideTitles[l.guide] : undefined} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({section, title}: {section: SectionKey; title: string}) {
  return (
    <div className="section-heading" data-section={section}>
      <h2>
        <SectionTile section={section} size="sm" />
        {title}
      </h2>
      <Link href={sections[section].href} className="see-all">
        See all <ArrowRight size={16} />
      </Link>
    </div>
  );
}
