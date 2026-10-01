import type {Metadata} from 'next';
import PageHeader from '@/components/PageHeader';
import {ClaudeCard} from '@/components/cards';
import {SectionTile} from '@/components/icons';
import {getClaudePosts} from '@/lib/content';
import {sections} from '@/lib/site';

export const metadata: Metadata = {title: 'Claude', description: sections.claude.blurb};

export default function ClaudePage() {
  const posts = getClaudePosts();
  const overview = posts.filter((p) => p.kind === 'claude-md' || p.kind === 'workflow');
  const parts = posts.filter((p) => !overview.includes(p));

  return (
    <div className="container page">
      <PageHeader section="claude" title="Developing with Claude" lead={sections.claude.blurb}>
        <p className="muted claude-note">
          Real setups from my projects, documented piece by piece. Project names, repositories and domain details are
          removed on purpose — the patterns are what matter.
        </p>
      </PageHeader>

      {overview.length > 0 && (
        <section className="section claude-overview">
          <h2 className="subheading">Start here</h2>
          <div className="card-grid">
            {overview.map((p) => (
              <ClaudeCard key={p.slug} post={p} featured />
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <h2 className="subheading">Skills, commands and hooks</h2>
        {parts.length > 0 ? (
          <div className="card-grid">
            {parts.map((p) => (
              <ClaudeCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <div className="empty" data-section="claude">
            <SectionTile section="claude" size="lg" />
            <h3>One article per skill — in progress</h3>
            <p className="muted">Each skill, slash command and hook of the workflow gets its own detailed write-up.</p>
          </div>
        )}
      </section>
    </div>
  );
}
