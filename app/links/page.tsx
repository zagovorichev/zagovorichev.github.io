import type {Metadata} from 'next';
import PageHeader from '@/components/PageHeader';
import {LinkCard} from '@/components/cards';
import {getGuides, getLinkGroups} from '@/lib/content';
import {sections} from '@/lib/site';

export const metadata: Metadata = {title: 'Links', description: sections.links.blurb};

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function LinksPage() {
  const groups = getLinkGroups();
  const guideTitles = Object.fromEntries(getGuides().map((g) => [g.slug, g.title]));
  return (
    <div className="container page">
      <PageHeader section="links" title="Links" lead={sections.links.blurb}>
        <nav className="chips" aria-label="Categories">
          {groups.map((g) => (
            <a key={g.category} href={`#${anchor(g.category)}`} className="chip chip-link">
              {g.category} <span className="chip-count">{g.items.length}</span>
            </a>
          ))}
        </nav>
      </PageHeader>
      {groups.map((g) => (
        <section key={g.category} id={anchor(g.category)} className="section">
          <h2 className="subheading">{g.category}</h2>
          <div className="card-grid">
            {g.items.map((l) => (
              <LinkCard key={l.url} link={l} guideTitle={l.guide ? guideTitles[l.guide] : undefined} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
