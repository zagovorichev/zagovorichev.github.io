import type {Metadata} from 'next';
import PageHeader from '@/components/PageHeader';
import {GuideCard} from '@/components/cards';
import {getGuides} from '@/lib/content';
import {sections} from '@/lib/site';

export const metadata: Metadata = {title: 'Guides', description: sections.guides.blurb};

export default function GuidesPage() {
  const guides = getGuides();
  return (
    <div className="container page">
      <PageHeader section="guides" title="Guides" lead={sections.guides.blurb} />
      <div className="card-grid">
        {guides.map((g) => (
          <GuideCard key={g.slug} guide={g} />
        ))}
      </div>
    </div>
  );
}
