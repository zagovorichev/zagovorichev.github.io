# Blog-Tree
Software Developer's Log

[https://zagovorichev.github.io/](https://zagovorichev.github.io/)

Built with [Next.js](https://nextjs.org/) (static export) and MDX, hosted on GitHub Pages.

## Writing

Articles live in `content/articles/<slug>.mdx` and are published at `/article/<slug>/`.

```mdx
---
title: "Article title"
subtitle: "Grey line above the title"
description: "Shown on the home page card and in search results"
image: /images/cards/my-card.png
date: 2026-10-01
---

Regular **Markdown**, plus GitHub tables and task lists.

- Term. <Muted>Secondary explanation in grey</Muted>

![Diagram](/images/articles/<slug>/diagram.png)
```

- Images go to `public/images/...` and are referenced from `/images/...`. Article images open full-size on click.
- The home page lists articles newest first (by `date`).
- "Coming soon" topics are in `content/planned.json`.

Editing a file on GitHub (web editor or github.dev) is enough: the commit to `main` triggers the deploy.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build      # static site in ./out
```

## Deploy

`.github/workflows/deploy.yml` builds every push and pull request; pushes to `main` are published to GitHub Pages
(**Settings → Pages → Build and deployment → Source: GitHub Actions**).

Google Analytics is optional: set the repository variable `GA_ID` (Settings → Secrets and variables → Actions → Variables)
to a `G-XXXXXXXXXX` measurement ID and redeploy.
