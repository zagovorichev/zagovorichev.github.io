---
name: zagovorichev-site
description: Maintain Oleksandr Zagovorychev's personal site zagovorichev.github.io (Next.js + MDX on GitHub Pages). Use for ANY work on this site — adding or editing guides, news posts, videos or links; changing pages, components, styles, colors, icons or the logo; checking or fixing the GitHub Actions deployment; previewing or verifying the site. Trigger even for short requests like "add this video", "save this link with my note", "write a guide about X", "post a news note", "change the accent color", "why is the site not updated".
---

# zagovorichev.github.io — site maintenance

Personal developer log of **Oleksandr Zagovorychev** (Senior Software Engineer). It is his public face:
keep it accurate, professional and consistent. Site language is **English only**.

- Live: https://zagovorichev.github.io — repo `zagovorichev/zagovorichev.github.io`, branch `main`
- Stack: Next.js 16 App Router with `output: 'export'` (fully static), React 19, TypeScript, MDX via
  `@mdx-js/mdx` compiled at build time, plain CSS with design tokens, `lucide-react` icons
- Every push to `main` builds and deploys automatically (see [deployment](references/deployment.md))

## Sections

| Section | URL | Source of truth | Accent |
|---|---|---|---|
| Home | `/` | `app/page.tsx` (hero, section cards, latest items) | brand green |
| Guides — his how-to articles | `/guides/`, `/guides/<slug>/` | `content/guides/<slug>.mdx` | green |
| Videos — videos he recommends | `/videos/` | `content/videos.yaml` | red |
| Links — useful websites + his notes | `/links/` | `content/links.yaml` | blue |
| News — short notes on what he follows | `/news/`, `/news/<slug>/` | `content/news/<date>-<slug>.mdx` | amber |
| About | `/about/` | `app/about/page.tsx` | violet |
| RSS (guides + news) | `/feed.xml` | `app/feed.xml/route.ts` | — |

Section names, URLs, blurbs and menu order live in `lib/site.ts` (`sections`, `navOrder`).

## Choose the workflow

1. **Content change** (most requests) → edit files in `content/` only. Formats and ready-to-copy
   templates: [references/content.md](references/content.md).
2. **Design / layout change** → read [references/design-system.md](references/design-system.md) first;
   reuse tokens and existing component classes instead of adding one-off styles.
3. **Deployment question or failure** → [references/deployment.md](references/deployment.md).

## Non-negotiable rules

- **Never invent his opinions.** Notes, recommendations, "what I found there", "why it's worth
  watching" must come from Oleksandr. If he only gives a URL, write a neutral one-sentence
  `description` of what the resource is, leave `note` out, and ask him for the note.
- **Never invent biography facts** (employers, years, achievements) for About or anywhere else.
- Always set `date` (YYYY-MM-DD, today for new items). Lists are sorted newest-first automatically.
- Keep slugs lowercase-kebab-case; they become URLs — don't rename published slugs without reason.
- Images: put under `public/images/<section>/<slug>/`, reference as `/images/...`, give meaningful alt text.
- Don't add dependencies or runtime services for things CSS/SVG can do; the site must stay fully static.

## Finish every change the same way

```bash
bash .claude/skills/zagovorichev-site/scripts/verify.sh   # content checks + lint + typecheck + build
```

For visual changes also take screenshots (light, dark, mobile) and look at them before pushing:

```bash
node .claude/skills/zagovorichev-site/scripts/screenshot.mjs / /guides/ /links/
```

Then commit with a clear message and push to `main` (that publishes the site). After pushing, check the
"Build and deploy" workflow run on GitHub and report the result with the live URL of the changed page.
