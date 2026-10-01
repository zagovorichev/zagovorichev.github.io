# Design system

Goal: calm, professional, content-first. One brand color, one hue per section, generous whitespace,
cards with subtle borders, crisp hand-made SVG. Light and dark themes are equal citizens.

## Files

| What | Where |
|---|---|
| Tokens, all styles | `app/globals.css` (single file, sections marked with `=====` headers) |
| Fonts, theme boot script, metadata | `app/layout.tsx` (Inter → `--font-sans`, JetBrains Mono → `--font-mono`) |
| Header + mobile menu, theme toggle | `components/Header.tsx`, `components/ThemeToggle.tsx` |
| Footer | `components/Footer.tsx` |
| Cards (guide, news, video, link) | `components/cards.tsx` |
| Page title block | `components/PageHeader.tsx` |
| Guide/news article layout | `components/PostLayout.tsx` |
| Logo, section icons, hero art, GitHub mark, topic icons | `components/icons.tsx` |
| Favicon | `app/icon.svg` (same drawing as `LogoMark`, fixed brand color) |
| MDX element overrides | `components/mdx-components.tsx` |

## Color tokens

Always use variables, never raw hex in components.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#ffffff` | `#0b1017` | page background |
| `--bg-subtle` | `#f6f8fa` | `#0f1620` | footer, code, hovers |
| `--surface` | `#ffffff` | `#121a25` | cards |
| `--border` / `--border-strong` | `#e4e8ee` / `#cfd6df` | `#212c3a` / `#2e3b4c` | dividers, outlines |
| `--text` / `--text-muted` / `--text-faint` | `#0f172a` / `#556174` / `#8a94a6` | `#e7ebf1` / `#9aa5b6` / `#6d7889` | text levels |
| `--brand` / `--brand-hover` / `--brand-soft` | `#0b7a5d` / `#086449` / `#e6f4ef` | `#2fbf93` / `#4fd3a9` / 13% | primary buttons, eyebrow, focus |
| `--brand-2` | `#2563eb` | `#6a9cff` | second stop of the hero gradient |

Section hues (`--c-<section>` and `--c-<section>-soft`):

| Section | Light | Dark |
|---|---|---|
| guides | `#0b7a5d` | `#2fbf93` |
| videos | `#d6334a` | `#ff6b81` |
| links | `#2563eb` | `#6a9cff` |
| news | `#b86200` | `#f2a541` |
| about | `#7046e0` | `#a98bff` |

**Scoping:** put `data-section="<key>"` on an element and everything inside can use `--accent` and
`--accent-soft`. That is how cards, tiles, nav items, notes and links get their section color —
prefer this over new color rules. Contrast: accents on white are ≥ 4.5:1; keep it that way when tuning.

Other tokens: `--radius` 14px (cards), `--radius-sm` 9px, `--max` 1160px content width,
`--header-h` 68px, `--shadow-sm` / `--shadow-md` (hover).

## Theme

`<html data-theme="light|dark">` is set before paint by the inline script in `layout.tsx`
(saved choice in `localStorage.theme`, else system preference). Dark values live under
`:root[data-theme='dark']`. Any new token needs both a light and a dark value.

## Typography

Inter for everything, JetBrains Mono for code. Headings: tight letter-spacing (-0.02…-0.035em),
800 weight for page/hero titles. Body 16px / 1.6; article prose 1.05rem / 1.75.
Utility classes: `.eyebrow` (small uppercase label), `.lead` (large muted intro), `.muted`, `.small`.

## Components (CSS classes)

- Layout: `.container`, `.page`, `.narrow`, `.section`, `.split` (2 columns → 1 on mobile), `.stack`
- Grids: `.card-grid` (auto-fill, min 300px), `.section-grid` (4 → 2 → 1)
- Cards: `.card` (+ `a.card` hover lift), `.section-card`, `.guide-card`, `.video-card`, `.link-card`
- Bits: `.btn .btn-primary | .btn-ghost | .btn-sm`, `.chip`, `.chip-link`, `.tile .tile-sm|md|lg`,
  `.topic-tile`, `.note` (his comment, accent left border), `.empty` (empty state), `.section-heading`,
  `.see-all`, `.news-list/.news-item`, `.monogram`
- Article: `.post`, `.post-header`, `.post-meta`, `.prose` (all MDX output)

Breakpoints used: 1000px, 900px (mobile menu), 820px (hero stacks), 760px, 560px (single column,
16px gutters). Always check 390px width: no horizontal scroll.

## Icons and SVG

- **Logo** `LogoMark`: rounded square in `--brand` with a white branching "commit tree"
  (trunk + two branches + three nodes). Keep `app/icon.svg` in sync if it changes.
- **Section icons** `SectionIcon` / `SectionTile`: hand-drawn duotone 24×24 —
  soft fill (`fillOpacity` .14–.45 of `currentColor`) + 1.7px round stroke. New section icons must
  follow the same recipe so the set stays coherent.
- **Hero** `HeroTree`: dotted grid + commit tree whose nodes use the section colors (a visual legend).
- **UI glyphs and topic icons**: `lucide-react`, size 14–22, strokeWidth 1.75. Lucide has no brand
  logos — the GitHub mark is a custom `GitHubMark`.

## Adding a new section (checklist)

1. Content source in `content/` + loader in `lib/content.ts`.
2. Key, title, href, blurb in `lib/site.ts` (`SectionKey`, `sections`, `navOrder`).
3. Hue tokens `--c-<key>` / `--c-<key>-soft` (light + dark) and a `[data-section='<key>']` rule.
4. Duotone icon in `sectionPaths` (`components/icons.tsx`).
5. Page `app/<key>/page.tsx` using `PageHeader`; card component in `components/cards.tsx`.
6. Home: section card count in `app/page.tsx`, optional "latest" block; sitemap entry in `app/sitemap.ts`.
7. Screenshots in light, dark and mobile.
