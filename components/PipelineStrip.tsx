import Link from 'next/link';

type Step = {label: string; slug: string; gate?: string; optional?: boolean};

const steps: Step[] = [
  {label: 'task', slug: 'skill-ticket-task', gate: 'A'},
  {label: 'implementer', slug: 'skill-ticket-implementer', gate: 'B'},
  {label: 'review', slug: 'skill-ticket-review'},
  {label: 'review-auditor', slug: 'skill-ticket-review-auditor'},
  {label: 'triage', slug: 'skill-ticket-triage'},
  {label: 'fixer', slug: 'skill-ticket-fixer', gate: 'C', optional: true},
  {label: 'qa', slug: 'skill-ticket-qa', gate: 'D'},
  {label: 'pr', slug: 'skill-ticket-pr', gate: 'E'},
];

/** The delivery pipeline as a row of linked stages; letters mark the human approval gates. */
export default function PipelineStrip() {
  return (
    <figure className="pipeline" data-section="claude">
      <ol className="pipeline-steps">
        {steps.map((s) => (
          <li key={s.slug} className={s.optional ? 'optional' : undefined}>
            <Link href={`/claude/${s.slug}/`} className="pipeline-step">
              {s.gate && (
                <span className="gate" title={`Approval gate ${s.gate}`}>
                  {s.gate}
                </span>
              )}
              {s.label}
            </Link>
          </li>
        ))}
      </ol>
      <figcaption className="muted small">
        Orchestrated by <Link href="/claude/skill-ticket-workflow/">ticket-workflow</Link>. Letters are human approval
        gates; the fixer is optional and sends the review chain round again.
      </figcaption>
    </figure>
  );
}
