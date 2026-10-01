import type {Metadata} from 'next';
import PageHeader from '@/components/PageHeader';
import {GuideCard} from '@/components/cards';
import {TopicIcon} from '@/components/icons';
import {getGuides, getPlannedTopics} from '@/lib/content';
import {sections} from '@/lib/site';

export const metadata: Metadata = {title: 'Guides', description: sections.guides.blurb};

export default function GuidesPage() {
  const guides = getGuides();
  const planned = getPlannedTopics();
  return (
    <div className="container page">
      <PageHeader section="guides" title="Guides" lead={sections.guides.blurb} />
      <div className="card-grid">
        {guides.map((g) => (
          <GuideCard key={g.slug} guide={g} />
        ))}
      </div>

      {planned.length > 0 && (
        <section className="section">
          <h2 className="subheading">In the queue</h2>
          <div className="card-grid planned">
            {planned.map((t) => (
              <div key={t.title} className="card planned-card" data-section="guides">
                <span className="topic-tile">
                  <TopicIcon name={t.icon} />
                </span>
                <h3>{t.title}</h3>
                <p className="muted">{t.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
