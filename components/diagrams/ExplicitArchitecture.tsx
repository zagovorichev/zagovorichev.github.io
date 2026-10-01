/*
 * Diagrams for the "Explicit Architecture — the short version" guide.
 * Drawn with the site's tokens so they follow the light/dark theme:
 * domain = guides green, application = links blue, primary adapters = about violet,
 * secondary adapters = news amber, events = videos red.
 */

type Tone = 'domain' | 'app' | 'primary' | 'secondary' | 'event' | 'neutral';

const tone: Record<Tone, {stroke: string; fill: string}> = {
  domain: {stroke: 'var(--c-guides)', fill: 'var(--c-guides-soft)'},
  app: {stroke: 'var(--c-links)', fill: 'var(--c-links-soft)'},
  primary: {stroke: 'var(--c-about)', fill: 'var(--c-about-soft)'},
  secondary: {stroke: 'var(--c-news)', fill: 'var(--c-news-soft)'},
  event: {stroke: 'var(--c-videos)', fill: 'var(--c-videos-soft)'},
  neutral: {stroke: 'var(--border-strong)', fill: 'var(--surface)'},
};

function Box({
  x,
  y,
  w,
  h,
  t = 'neutral',
  title,
  sub,
  dashed,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  t?: Tone;
  title: string;
  sub?: string;
  dashed?: boolean;
}) {
  const c = tone[t];
  const cx = x + w / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={c.fill}
        stroke={c.stroke}
        strokeWidth={1.5}
        strokeDasharray={dashed ? '5 4' : undefined}
      />
      <text x={cx} y={sub ? y + h / 2 - 3 : y + h / 2 + 4} textAnchor="middle" className="dg-title">
        {title}
      </text>
      {sub && (
        <text x={cx} y={y + h / 2 + 13} textAnchor="middle" className="dg-sub">
          {sub}
        </text>
      )}
    </g>
  );
}

function Markers({id}: {id: string}) {
  return (
    <defs>
      <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 10 5 0 10z" fill="var(--text-muted)" />
      </marker>
      <marker id={`${id}-arrow-e`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 10 5 0 10z" fill="var(--c-videos)" />
      </marker>
    </defs>
  );
}

function Arrow({
  d,
  id,
  dashed,
  event,
  label,
  lx,
  ly,
}: {
  d: string;
  id: string;
  dashed?: boolean;
  event?: boolean;
  label?: string;
  lx?: number;
  ly?: number;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={event ? 'var(--c-videos)' : 'var(--text-muted)'}
        strokeWidth={1.5}
        strokeDasharray={dashed ? '5 4' : undefined}
        markerEnd={`url(#${id}-${event ? 'arrow-e' : 'arrow'})`}
      />
      {label && lx !== undefined && ly !== undefined && (
        <text x={lx} y={ly} textAnchor="middle" className="dg-label">
          {label}
        </text>
      )}
    </g>
  );
}

/* 1. The big picture: application core in the middle, adapters on both sides, dependencies inward */
export function BigPicture() {
  const id = 'ea1';
  const port = (x: number, y: number, t: Tone) => (
    <rect x={x - 8} y={y - 8} width={16} height={16} rx={3} fill="var(--surface)" stroke={tone[t].stroke} strokeWidth={2} />
  );
  return (
    <figure className="diagram">
      <div className="diagram-scroll">
        <svg viewBox="0 0 760 470" role="img" aria-label="Application core with domain model, domain services and application layer in concentric circles; primary adapters on the left and secondary adapters on the right connect through ports; all dependencies point inwards">
          <Markers id={id} />
          <text x={100} y={34} textAnchor="middle" className="dg-heading" style={{fill: 'var(--c-about)'}}>Primary / driving adapters</text>
          <text x={660} y={34} textAnchor="middle" className="dg-heading" style={{fill: 'var(--c-news)'}}>Secondary / driven adapters</text>
          <text x={380} y={34} textAnchor="middle" className="dg-heading">Application core</text>

          <circle cx={380} cy={245} r={170} fill={tone.app.fill} stroke={tone.app.stroke} strokeWidth={1.5} />
          <circle cx={380} cy={245} r={112} fill={tone.domain.fill} stroke={tone.domain.stroke} strokeWidth={1.5} strokeDasharray="5 4" />
          <circle cx={380} cy={245} r={60} fill={tone.domain.stroke} />

          <text x={380} y={100} textAnchor="middle" className="dg-title">Application layer</text>
          <text x={380} y={116} textAnchor="middle" className="dg-sub">use cases · application services</text>
          <text x={380} y={130} textAnchor="middle" className="dg-sub">command handlers · ports</text>
          <text x={380} y={162} textAnchor="middle" className="dg-title">Domain services</text>
          <text x={380} y={241} textAnchor="middle" className="dg-title dg-on-solid">Domain</text>
          <text x={380} y={256} textAnchor="middle" className="dg-title dg-on-solid">model</text>
          <text x={380} y={330} textAnchor="middle" className="dg-sub">entities · value objects</text>
          <text x={380} y={344} textAnchor="middle" className="dg-sub">domain events</text>

          <Box x={20} y={110} w={160} h={52} t="primary" title="Web controller" sub="HTTP / REST / GraphQL" />
          <Box x={20} y={220} w={160} h={52} t="primary" title="CLI command" sub="console, cron" />
          <Box x={20} y={330} w={160} h={52} t="primary" title="Message consumer" sub="queue / webhook" />

          <Box x={580} y={110} w={160} h={52} t="secondary" title="Repository" sub="SQL / ORM adapter" />
          <Box x={580} y={220} w={160} h={52} t="secondary" title="Search / cache" sub="engine adapters" />
          <Box x={580} y={330} w={160} h={52} t="secondary" title="Mailer / queue" sub="notification adapters" />

          <Arrow id={id} d="M180 136 C 215 140, 225 175, 236 182" />
          <Arrow id={id} d="M180 246 L 200 246" />
          <Arrow id={id} d="M180 356 C 215 352, 225 316, 236 308" />
          {port(245, 186, 'primary')}
          {port(210, 246, 'primary')}
          {port(245, 304, 'primary')}

          <Arrow id={id} dashed d="M580 136 C 545 140, 535 175, 524 182" />
          <Arrow id={id} dashed d="M580 246 L 560 246" />
          <Arrow id={id} dashed d="M580 356 C 545 352, 535 316, 524 308" />
          {port(515, 186, 'secondary')}
          {port(550, 246, 'secondary')}
          {port(515, 304, 'secondary')}

          <text x={100} y={410} textAnchor="middle" className="dg-sub">use a port to tell the core what to do</text>
          <text x={660} y={410} textAnchor="middle" className="dg-sub">implement a port the core depends on</text>
          <text x={380} y={448} textAnchor="middle" className="dg-label">every arrow points inwards: the core knows nothing about tools or delivery mechanisms</text>
        </svg>
      </div>
      <figcaption>The big picture. Ports (small squares) belong to the core; adapters live outside it.</figcaption>
    </figure>
  );
}

/* 2. Ports and adapters in detail: uses vs implements */
export function PortsAndAdapters() {
  const id = 'ea2';
  return (
    <figure className="diagram">
      <div className="diagram-scroll">
        <svg viewBox="0 0 760 320" role="img" aria-label="A primary adapter uses a port that the application core implements; the application core uses a port that a secondary adapter implements">
          <Markers id={id} />
          <rect x={240} y={30} width={280} height={250} rx={16} fill={tone.app.fill} stroke={tone.app.stroke} strokeWidth={1.5} />
          <text x={380} y={56} textAnchor="middle" className="dg-heading">Application core</text>

          <Box x={270} y={74} w={220} h={48} t="neutral" title="RegisterUser" sub="port · use-case interface" />
          <Box x={270} y={142} w={220} h={48} t="app" title="RegisterUserService" sub="application service" />
          <Box x={270} y={210} w={220} h={48} t="neutral" title="UserRepository" sub="port · interface owned by the core" />

          <Box x={20} y={74} w={180} h={48} t="primary" title="UserController" sub="primary adapter" />
          <Box x={560} y={210} w={180} h={48} t="secondary" title="SqlUserRepository" sub="secondary adapter" />

          <Arrow id={id} d="M200 98 L 266 98" label="uses" lx={233} ly={90} />
          <Arrow id={id} dashed d="M380 142 L 380 126" />
          <text x={432} y={138} textAnchor="middle" className="dg-label">implements</text>
          <Arrow id={id} d="M380 190 L 380 206" />
          <text x={410} y={203} textAnchor="middle" className="dg-label">uses</text>
          <Arrow id={id} dashed d="M560 234 L 494 234" label="implements" lx={527} ly={226} />

          <text x={110} y={160} textAnchor="middle" className="dg-sub">driving side:</text>
          <text x={110} y={175} textAnchor="middle" className="dg-sub">the adapter calls the core</text>
          <text x={650} y={160} textAnchor="middle" className="dg-sub">driven side:</text>
          <text x={650} y={175} textAnchor="middle" className="dg-sub">the core calls the adapter</text>
          <text x={650} y={190} textAnchor="middle" className="dg-sub">through its own interface</text>

          <text x={380} y={306} textAnchor="middle" className="dg-label">solid = depends on / uses · dashed = implements — both adapters depend on the core, never the reverse</text>
        </svg>
      </div>
      <figcaption>Ports and adapters. On the driven side, dependency inversion keeps the arrow pointing at the core.</figcaption>
    </figure>
  );
}

/* 3. Components (bounded contexts) as vertical slices with a shared kernel and events */
export function Components() {
  const id = 'ea3';
  const col = (x: number, name: string) => (
    <g>
      <rect x={x} y={70} width={200} height={210} rx={14} fill="var(--surface)" stroke="var(--border-strong)" strokeWidth={1.5} />
      <text x={x + 100} y={94} textAnchor="middle" className="dg-heading">{name}</text>
      <Box x={x + 14} y={106} w={172} h={44} t="primary" title="Adapters" sub="UI · persistence" />
      <Box x={x + 14} y={160} w={172} h={44} t="app" title="Application layer" />
      <Box x={x + 14} y={214} w={172} h={52} t="domain" title="Domain layer" sub="own model, own data" />
    </g>
  );
  return (
    <figure className="diagram">
      <div className="diagram-scroll">
        <svg viewBox="0 0 760 400" role="img" aria-label="Three components as vertical slices, each with adapters, application layer and domain layer; they communicate through an event dispatcher and share only a small shared kernel">
          <Markers id={id} />
          <Box x={20} y={16} w={720} h={34} t="event" title="Event dispatcher / message bus" />
          {col(30, 'Users')}
          {col(280, 'Billing')}
          {col(530, 'Reviews')}

          <Arrow id={id} event d="M130 70 L 130 54" />
          <text x={138} y={65} className="dg-label">UserRegistered</text>
          <Arrow id={id} event d="M380 54 L 380 70" />
          <text x={388} y={65} className="dg-label">listens</text>
          <Arrow id={id} event d="M630 54 L 630 70" />

          <text x={255} y={182} textAnchor="middle" className="dg-x">✕</text>
          <text x={505} y={182} textAnchor="middle" className="dg-x">✕</text>

          <Box x={20} y={300} w={720} h={48} t="domain" dashed title="Shared kernel" sub="event classes · shared value types · specifications — the only code components share" />
          <text x={380} y={382} textAnchor="middle" className="dg-label">no direct calls between components (✕): they react to each other&apos;s events and keep their own data</text>
        </svg>
      </div>
      <figcaption>Components. Package by component across the layers; decouple them with events and a tiny shared kernel.</figcaption>
    </figure>
  );
}

/* 4. Flow of control for commands and queries (CQRS) */
export function FlowOfControl() {
  const id = 'ea4';
  const W = 110;
  const xs = [14, 138, 262, 386, 510, 634];
  return (
    <figure className="diagram">
      <div className="diagram-scroll">
        <svg viewBox="0 0 760 330" role="img" aria-label="Command flow: controller, command, command bus, handler, domain and repository, events. Query flow: controller, query, read model, DTO returned to the view">
          <Markers id={id} />
          <text x={14} y={30} className="dg-heading">Command — changes state, returns nothing</text>
          <Box x={xs[0]} y={46} w={W} h={52} t="primary" title="Controller" sub="primary adapter" />
          <Box x={xs[1]} y={46} w={W} h={52} t="neutral" title="Command" sub="plain DTO" />
          <Box x={xs[2]} y={46} w={W} h={52} t="app" title="Command bus" sub="routes to handler" />
          <Box x={xs[3]} y={46} w={W} h={52} t="app" title="Handler" sub="use case" />
          <Box x={xs[4]} y={46} w={W} h={52} t="domain" title="Entities" sub="+ repository port" />
          <Box x={xs[5]} y={46} w={W + 2} h={52} t="event" title="Events" sub="listeners react" />
          {[0, 1, 2, 3].map((i) => (
            <Arrow key={i} id={id} d={`M${xs[i] + W} 72 L ${xs[i + 1] - 4} 72`} />
          ))}
          <Arrow id={id} event d={`M${xs[4] + W} 72 L ${xs[5] - 4} 72`} />
          <Box x={xs[4]} y={128} w={W} h={44} t="secondary" title="Repository" sub="secondary adapter" />
          <Arrow id={id} dashed d={`M${xs[4] + W / 2} 128 L ${xs[4] + W / 2} 102`} />
          <text x={xs[4] + W / 2 + 46} y={120} textAnchor="middle" className="dg-label">implements</text>

          <text x={14} y={214} className="dg-heading">Query — returns data, changes nothing</text>
          <Box x={xs[0]} y={230} w={W} h={52} t="primary" title="Controller" sub="primary adapter" />
          <Box x={xs[1]} y={230} w={W} h={52} t="neutral" title="Query" sub="query object" />
          <Box x={xs[2]} y={230} w={W * 2 + 20} h={52} t="secondary" title="Query service / read model" sub="optimised read, skips the domain model" />
          <Box x={xs[4]} y={230} w={W} h={52} t="neutral" title="DTO" sub="view model" />
          <Box x={xs[5]} y={230} w={W + 2} h={52} t="primary" title="Response" sub="template / JSON" />
          <Arrow id={id} d={`M${xs[0] + W} 256 L ${xs[1] - 4} 256`} />
          <Arrow id={id} d={`M${xs[1] + W} 256 L ${xs[2] - 4} 256`} />
          <Arrow id={id} d={`M${xs[2] + W * 2 + 20} 256 L ${xs[4] - 4} 256`} />
          <Arrow id={id} d={`M${xs[4] + W} 256 L ${xs[5] - 4} 256`} />
          <text x={380} y={316} textAnchor="middle" className="dg-label">writes go through the domain; reads take the shortest safe path to the data</text>
        </svg>
      </div>
      <figcaption>Flow of control. Commands travel through the domain; queries do not need to.</figcaption>
    </figure>
  );
}

export const explicitArchitectureDiagrams = {
  'ea-big-picture': BigPicture,
  'ea-ports-adapters': PortsAndAdapters,
  'ea-components': Components,
  'ea-flow-of-control': FlowOfControl,
};
