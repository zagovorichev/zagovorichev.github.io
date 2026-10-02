import fs from 'node:fs';
import path from 'node:path';
import {ImageResponse} from 'next/og';
import {site} from './site';

/**
 * Open Graph card (what Telegram, LinkedIn, Slack, X show in link previews), rendered at build time.
 * Served by `og.png/route.tsx` handlers rather than the `opengraph-image` convention: in a static
 * export that convention writes files without an extension, which GitHub Pages serves as
 * application/octet-stream, and some preview crawlers reject that.
 */
export const ogSize = {width: 1200, height: 630};

/** Metadata `openGraph.images` entry for an `og.png` route. */
export const ogImageMeta = (url: string) => [{url, ...ogSize, type: 'image/png'}];

// Dark theme tokens from globals.css (satori can't read CSS variables)
const c = {bg: '#0b1017', text: '#e7ebf1', muted: '#9aa5b6', faint: '#6d7889', border: '#212c3a', brand: '#0b7a5d'};
export const ogAccent = {guides: '#2fbf93', claude: '#3cc7e0', news: '#f2a541', site: '#2fbf93'};

const font = (weight: 400 | 600 | 800) =>
  fs.readFileSync(path.join(process.cwd(), `node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff`));

/** Cuts text at a word boundary so it fits the card. */
const clip = (text: string, max: number) =>
  text.length <= max ? text : `${text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[\s,.;:—-]+$/, '')}…`;

function Logo() {
  return (
    <svg width="56" height="56" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="9" fill={c.brand} />
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

/** Renders a link-preview card: label, title, description and footer on the site's dark background. */
export function ogImage({
  label,
  title,
  description,
  meta,
  accent,
}: {
  label: string;
  title: string;
  description: string;
  meta?: string;
  accent: string;
}) {
  const t = clip(title, 90);
  const titleSize = t.length <= 30 ? 76 : t.length <= 60 ? 64 : 54;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '64px 72px',
          background: c.bg,
          backgroundImage: `radial-gradient(circle at 92% 8%, ${accent}38 0%, transparent 42%), radial-gradient(circle at 8% 110%, #6a9cff22 0%, transparent 40%)`,
          color: c.text,
          fontFamily: 'Inter',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <Logo />
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: 26, fontWeight: 600}}>{site.name}</span>
            <span style={{fontSize: 20, color: c.faint}}>{site.tagline}</span>
          </div>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center'}}>
          <span
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              padding: '6px 16px',
              marginBottom: 24,
              border: `2px solid ${accent}`,
              borderRadius: 999,
              color: accent,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            {label}
          </span>
          <span style={{fontSize: titleSize, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5}}>{t}</span>
          <span style={{marginTop: 22, fontSize: 28, lineHeight: 1.4, color: c.muted}}>{clip(description, t.length > 60 ? 68 : 130)}</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 24,
            borderTop: `1px solid ${c.border}`,
            fontSize: 22,
            color: c.faint,
          }}
        >
          <span style={{color: accent, fontWeight: 600}}>{site.url.replace('https://', '')}</span>
          {meta && <span>{meta}</span>}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        {name: 'Inter', data: font(400), weight: 400},
        {name: 'Inter', data: font(600), weight: 600},
        {name: 'Inter', data: font(800), weight: 800},
      ],
    },
  );
}
