# Content formats and recipes

All content lives in `content/`. Loader: `lib/content.ts` (validates required fields at build time —
a missing `title`/`description`/`date` fails the build with the file name).

## Guide — `content/guides/<slug>.mdx`

Step-by-step instructions written by Oleksandr. URL: `/guides/<slug>/`.

~~~mdx
---
title: "Traefik to Dockerize Local Development"
subtitle: "Docker containers with Traefik"        # optional eyebrow above the title
description: "One or two sentences. Used on cards, in RSS and as the meta description."
icon: network                                       # topic icon, see list below
tags: [docker, devops]                              # 1–3 short lowercase tags
date: 2026-10-01
---

Intro paragraph — what problem this solves.

## Step 1 — Install

```bash
sudo apt install zsh
```

- Term. <Muted>Secondary explanation in grey.</Muted>

> Tip or warning as a blockquote.

![Diagram of the setup](/images/guides/traefik/diagram.png)
~~~

Body rules:
- Start sections at `##` (the page already has the `h1`). `##`/`###` get anchor ids automatically.
- Fenced code blocks **with a language** (`bash`, `ts`, `yaml`, `php`, …) get syntax highlighting
  (rehype-pretty-code, themes github-light / github-dark-dimmed).
- GFM works: tables, task lists, autolinks, strikethrough.
- Custom MDX component: `<Muted>…</Muted>`. External links open in a new tab automatically;
  internal links (`/guides/zsh/`) use client navigation. Images open full-size on click.
- In MDX, `{` `}` `<` `>` in plain text must be escaped (`\{`) or put in `code`.

Topic icons (`icon:`), mapped in `components/icons.tsx` → `topicIcons`:
`users, shield-check, network, terminal, kanban, flask, code, refresh, repeat, github, flame, server,
cloud, settings, database`. Unknown/missing → book icon. To add one, import it from `lucide-react` and
add a key to `topicIcons`.

Reading time is computed (200 wpm). The home page shows the 6 newest guides.

## News post — `content/news/<yyyy-mm-dd>-<slug>.mdx`

Short note (a few paragraphs) about a release, an idea or data he follows. URL: `/news/<file-name>/`.

```mdx
---
title: "Next.js 17 released"
description: "What changed and what it means for static sites."
date: 2026-10-21
tags: [nextjs]
---

Two–five short paragraphs. Link the source: [release notes](https://example.com).
```

No `icon`/`subtitle` for news. The home page shows the 4 newest.

## Video — `content/videos.yaml`

A YAML list (keep `[]` when empty — the page then shows a "coming soon" state).

```yaml
- title: "Exact video title"
  url: https://www.youtube.com/watch?v=VIDEO_ID
  channel: Channel or conference name   # optional
  date: 2026-10-01                      # when it was added
  note: Why it's worth watching — his words only
  tags: [architecture]                  # optional
```

YouTube URLs (`watch?v=`, `youtu.be/`, `shorts/`, `embed/`) get the thumbnail
`https://i.ytimg.com/vi/<id>/hqdefault.jpg` automatically. Other hosts show a tinted placeholder.
The home page shows 3 newest videos (section hidden while the list is empty).

## Link — `content/links.yaml`

Categories, each with items. Categories render in file order; add new ones where they fit.

```yaml
- category: Developer tools
  items:
    - title: mkcert
      url: https://github.com/FiloSottile/mkcert
      description: Zero-config tool for locally trusted development HTTPS certificates.   # neutral, required
      note: What he found there / why he recommends it — his words only                 # optional
      guide: traefik                                                                    # optional guide slug
```

`host` is derived from the URL. Cards show a monogram tile (first letter) — no external favicon requests.
The home page "Useful links" block shows the first 3 links that have a `note` or `guide`.

## Recipes

- **"Add this video: <url>, note: …"** → append to `videos.yaml` with today's date; use the real video
  title (ask if unknown — don't guess); `note` = his words, lightly edited for English only.
- **"Save this site"** → pick an existing category or create a fitting one; neutral `description`;
  his `note` if given; link `guide` if one of his guides covers it.
- **"Write a guide about X"** → draft from his notes/commands; keep his voice; ask for missing steps
  rather than inventing commands; choose `icon` and 1–3 tags.
- **"Post news"** → new file named with today's date; title states the fact; cite the source link.
- **Editing old guides** → fix typos and broken formatting freely; don't change the meaning.

After any content change run `scripts/verify.sh`.
