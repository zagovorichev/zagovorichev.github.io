import type {Metadata} from 'next';
import PageHeader from '@/components/PageHeader';
import {VideoCard} from '@/components/cards';
import {SectionTile} from '@/components/icons';
import {getVideos} from '@/lib/content';
import {sections} from '@/lib/site';

export const metadata: Metadata = {title: 'Videos', description: sections.videos.blurb};

export default function VideosPage() {
  const videos = getVideos();
  return (
    <div className="container page">
      <PageHeader section="videos" title="Videos" lead={sections.videos.blurb} />
      {videos.length > 0 ? (
        <div className="card-grid">
          {videos.map((v) => (
            <VideoCard key={v.url} video={v} />
          ))}
        </div>
      ) : (
        <div className="empty" data-section="videos">
          <SectionTile section="videos" size="lg" />
          <h2>The first picks are on the way</h2>
          <p className="muted">Talks and tutorials I recommend will appear here, each with a short note on why.</p>
        </div>
      )}
    </div>
  );
}
