# Site maintenance guide (for Claude)

Personal site of Oleksandr Zagovorychev: https://zagovorichev.github.io — Next.js 16 static export, MDX, GitHub Pages.
Every push to `main` is built and deployed by `.github/workflows/deploy.yml`. Content is English only.

## Content model — edit these, not the code

| Section | Where | Format |
|---|---|---|
| Guides (my how-to articles) | `content/guides/<slug>.mdx` | MDX with frontmatter, URL `/guides/<slug>/` |
| News / notes | `content/news/<yyyy-mm-dd>-<slug>.mdx` | MDX with frontmatter, URL `/news/<slug>/` |
| Videos | `content/videos.yaml` | list of entries |
| Links | `content/links.yaml` | categories with items |
| Planned guides | `content/planned.json` | title, description, icon |

### Guide / news frontmatter
```yaml
---
title: "Title"
subtitle: "Optional eyebrow line above the title (guides)"
description: "One or two sentences; used on cards, in RSS and as meta description"
icon: terminal          # guides only, see TopicIcon in components/icons.tsx
tags: [docker, devops]
date: 2026-10-01
---
```
Body: Markdown + GFM. `<Muted>text</Muted>` renders secondary grey text. Fenced code blocks are highlighted
(use a language, e.g. ```bash). Images go to `public/images/<section>/<slug>/` and are referenced as `/images/...`.

Guide icons available: users, shield-check, network, terminal, kanban, flask, code, refresh, repeat, github,
flame, server, cloud, settings, database. Add new ones in `topicIcons` (lucide-react) if needed.

### Video entry
```yaml
- title: "Talk title"
  url: https://www.youtube.com/watch?v=VIDEO_ID   # YouTube gets a thumbnail automatically
  channel: Channel or conference
  date: 2026-10-01
  note: What I learned / why it is worth watching (my words)
  tags: [architecture]
```

### Link entry (inside a category in links.yaml)
```yaml
- title: Site name
  url: https://example.com/
  description: What the site is (neutral, one sentence)
  note: What I found there / why I recommend it (my words, optional)
  guide: zsh            # optional slug of a related guide
```

## Rules
- Notes, opinions and recommendations must come from Oleksandr — never invent them. If he gives only a URL,
  write a neutral `description` and ask for the `note`.
- Newest items first is automatic (by `date`); always set `date`.
- Before pushing run `npm run lint && npm run build` — the build validates frontmatter.

## Design system
Tokens are CSS variables in `app/globals.css` (light + dark). Each section has its own hue
(`--c-guides` green, `--c-videos` red, `--c-links` blue, `--c-news` amber, `--c-about` violet); components pick
it up through `data-section="<key>"` → `--accent` / `--accent-soft`. Logo, section icons and the hero illustration
are hand-written SVG in `components/icons.tsx`; UI glyphs come from `lucide-react`.
