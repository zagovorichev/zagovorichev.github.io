# zagovorichev.github.io
Oleksandr Zagovorychev — developer log

[https://zagovorichev.github.io/](https://zagovorichev.github.io/)

Built with [Next.js](https://nextjs.org/) (static export) and MDX, hosted on GitHub Pages. RSS: `/feed.xml`.

## Content

The site has five sections — Guides, Videos, Links, News, About. All content lives in `content/`
(MDX for guides and news, YAML for videos and links). See [CLAUDE.md](CLAUDE.md) for the formats.

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
