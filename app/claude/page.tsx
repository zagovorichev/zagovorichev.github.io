import type {Metadata} from 'next';
import PageHeader from '@/components/PageHeader';
import PipelineStrip from '@/components/PipelineStrip';
import {ClaudeCard} from '@/components/cards';
import {getClaudePosts, type ClaudeTrack, type PostMeta} from '@/lib/content';
import {sections} from '@/lib/site';

export const metadata: Metadata = {title: 'Claude', description: sections.claude.blurb};

const tracks: Array<{key: Exclude<ClaudeTrack, 'overview'>; title: string; lead: string}> = [
  {
    key: 'discovery',
    title: 'Discovery track',
    lead: 'Read-only reverse engineering of legacy code, one bounded phase at a time.',
  },
  {
    key: 'delivery',
    title: 'Delivery pipeline',
    lead: 'Ticket-driven development behind hash-bound human approvals.',
  },
  {key: 'standalone', title: 'Standalone skills', lead: 'Useful on their own, outside the pipeline.'},
  {key: 'guardrails', title: 'Hooks and guards', lead: 'The parts that enforce the rules instead of hoping for them.'},
];

export default function ClaudePage() {
  const posts = getClaudePosts();
  const byTrack = (t: ClaudeTrack): PostMeta[] => posts.filter((p) => (p.track ?? 'overview') === t);
  const overview = byTrack('overview');

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

      {tracks.map((t) => {
        const items = byTrack(t.key);
        if (items.length === 0) return null;
        return (
          <section key={t.key} className="section">
            <h2 className="subheading">{t.title}</h2>
            <p className="muted track-lead">{t.lead}</p>
            {t.key === 'delivery' && <PipelineStrip />}
            <div className="card-grid">
              {items.map((p) => (
                <ClaudeCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
