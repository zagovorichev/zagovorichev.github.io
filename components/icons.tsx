import type {SVGProps} from 'react';
import {
  BookOpen,
  Cloud,
  Code2,
  Database,
  Flame,
  FlaskConical,
  GitBranch,
  KanbanSquare,
  Network,
  RefreshCcw,
  Repeat,
  Server,
  Settings,
  ShieldCheck,
  SquareTerminal,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type {SectionKey} from '@/lib/site';

/**
 * Logo mark: a branching tree drawn as a commit graph — the "blog tree" idea,
 * expressed in the language of version control.
 */
export function LogoMark({size = 32, ...props}: SVGProps<SVGSVGElement> & {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="9" fill="var(--brand)" />
      <g fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
        <path d="M16 26V9.5" />
        <path d="M16 21.5c0-3.2-6.5-3-6.5-7.3" />
        <path d="M16 17c0-3 6.5-2.8 6.5-6.8" />
      </g>
      <g fill="#fff">
        <circle cx="16" cy="8.4" r="2.6" />
        <circle cx="9.5" cy="13" r="2.4" />
        <circle cx="22.5" cy="9.3" r="2.4" />
      </g>
      <circle cx="16" cy="26" r="1.6" fill="#fff" opacity="0.7" />
    </svg>
  );
}

const duo = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Duotone section icons: soft fill in the section tint + crisp stroke. */
const sectionPaths: Record<SectionKey, React.ReactNode> = {
  guides: (
    <>
      <path d="M3 5.8c0-.4.3-.8.8-.8H9a3 3 0 0 1 3 3v12a2.6 2.6 0 0 0-2.6-2.6H3.8a.8.8 0 0 1-.8-.8Z" fill="currentColor" fillOpacity=".16" />
      <path d="M21 5.8c0-.4-.3-.8-.8-.8H15a3 3 0 0 0-3 3v12a2.6 2.6 0 0 1 2.6-2.6h5.6a.8.8 0 0 0 .8-.8Z" fill="currentColor" fillOpacity=".3" />
      <path {...duo} d="M3 5.8c0-.4.3-.8.8-.8H9a3 3 0 0 1 3 3v12a2.6 2.6 0 0 0-2.6-2.6H3.8a.8.8 0 0 1-.8-.8Z" />
      <path {...duo} d="M21 5.8c0-.4-.3-.8-.8-.8H15a3 3 0 0 0-3 3v12a2.6 2.6 0 0 1 2.6-2.6h5.6a.8.8 0 0 0 .8-.8Z" />
      <path {...duo} d="M6 9h3M6 12.3h3M15 9h3" />
    </>
  ),
  claude: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="3" fill="currentColor" fillOpacity=".14" />
      <rect {...duo} x="2.5" y="4" width="19" height="16" rx="3" />
      <path {...duo} d="M2.5 8h19" />
      <path {...duo} d="m6.5 12 2.5 2-2.5 2" />
      <path d="M16 10.6l.75 1.65 1.65.75-1.65.75L16 15.4l-.75-1.65-1.65-.75 1.65-.75Z" fill="currentColor" />
      <path {...duo} d="M11 16h2" />
    </>
  ),
  videos: (
    <>
      <rect x="2.5" y="4" width="19" height="13.5" rx="3" fill="currentColor" fillOpacity=".16" />
      <rect {...duo} x="2.5" y="4" width="19" height="13.5" rx="3" />
      <path d="M10 8.2v5.1a.5.5 0 0 0 .75.43l4.3-2.55a.5.5 0 0 0 0-.86l-4.3-2.55a.5.5 0 0 0-.75.43Z" fill="currentColor" />
      <path {...duo} d="M8 21h8" />
    </>
  ),
  links: (
    <>
      <circle cx="12" cy="12" r="9.5" fill="currentColor" fillOpacity=".14" />
      <path {...duo} d="M10.2 13.8a3.6 3.6 0 0 0 5.1 0l2.7-2.7a3.6 3.6 0 0 0-5.1-5.1l-1.2 1.2" />
      <path {...duo} d="M13.8 10.2a3.6 3.6 0 0 0-5.1 0L6 12.9a3.6 3.6 0 0 0 5.1 5.1l1.2-1.2" />
    </>
  ),
  news: (
    <>
      <rect x="3" y="4" width="14" height="16" rx="2" fill="currentColor" fillOpacity=".16" />
      <path {...duo} d="M17 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2" />
      <rect x="6.5" y="7.5" width="7" height="4" rx="1" fill="currentColor" fillOpacity=".45" />
      <path {...duo} d="M6.5 14.5h7M6.5 17h4.5" />
    </>
  ),
  about: (
    <>
      <circle cx="12" cy="8" r="4" fill="currentColor" fillOpacity=".25" />
      <circle {...duo} cx="12" cy="8" r="4" />
      <path d="M4 20.5c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5Z" fill="currentColor" fillOpacity=".14" />
      <path {...duo} d="M4 20.5c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
    </>
  ),
};

export function SectionIcon({section, size = 24}: {section: SectionKey; size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {sectionPaths[section]}
    </svg>
  );
}

/** Colored tile with a section icon; color comes from `data-section` CSS tokens. */
export function SectionTile({section, size = 'md'}: {section: SectionKey; size?: 'sm' | 'md' | 'lg'}) {
  const px = {sm: 18, md: 24, lg: 30}[size];
  return (
    <span className={`tile tile-${size}`} data-section={section}>
      <SectionIcon section={section} size={px} />
    </span>
  );
}

const topicIcons: Record<string, LucideIcon> = {
  users: Users,
  'shield-check': ShieldCheck,
  network: Network,
  terminal: SquareTerminal,
  kanban: KanbanSquare,
  flask: FlaskConical,
  code: Code2,
  refresh: RefreshCcw,
  repeat: Repeat,
  github: GitBranch,
  flame: Flame,
  server: Server,
  cloud: Cloud,
  settings: Settings,
  database: Database,
};

/** Topic icon for a guide (frontmatter `icon`), falls back to a book. */
export function TopicIcon({name, size = 22}: {name?: string; size?: number}) {
  const Icon = (name && topicIcons[name]) || BookOpen;
  return <Icon size={size} strokeWidth={1.75} aria-hidden="true" />;
}

/**
 * Hero illustration: the log as a growing commit tree. Nodes take the section colors,
 * so the picture doubles as a legend for the site.
 */
export function HeroTree() {
  const node = (cx: number, cy: number, s: SectionKey, r = 9) => (
    <g data-section={s}>
      <circle cx={cx} cy={cy} r={r + 7} className="hero-halo" />
      <circle cx={cx} cy={cy} r={r} className="hero-node" />
    </g>
  );
  return (
    <svg viewBox="0 0 360 300" className="hero-tree" role="img" aria-label="A branching commit tree">
      <defs>
        <pattern id="dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" className="hero-dot" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="360" height="300" rx="28" fill="url(#dots)" />
      <g className="hero-branches" fill="none" strokeWidth="5" strokeLinecap="round">
        <path d="M180 284V54" />
        <path d="M180 236c0-34-84-30-84-70V128" />
        <path d="M180 200c0-30 88-28 88-64V92" />
        <path d="M96 166c0-26-44-22-44-50" />
        <path d="M268 136c0-22 44-20 44-48" />
      </g>
      {node(180, 54, 'guides', 13)}
      {node(96, 128, 'videos')}
      {node(268, 92, 'links')}
      {node(52, 112, 'news', 7)}
      {node(312, 84, 'about', 7)}
      <g data-section="guides">
        <circle cx="180" cy="150" r="6" className="hero-node" />
        <circle cx="180" cy="284" r="7" className="hero-node" />
      </g>
    </svg>
  );
}

export function GitHubMark({size = 20}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
