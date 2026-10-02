# Deployment

## Pipeline

`.github/workflows/deploy.yml` ("Build and deploy"):

- **On every push and pull request:** `npm ci` → `npm run lint` → `npm run build` (static site in `out/`).
- **On push to `main` only:** upload `out/` as a Pages artifact → `actions/deploy-pages` publishes it.
  Takes ~1 minute. PRs only build (a free check that nothing is broken).
- Node 22. Build-time env: `NEXT_PUBLIC_GA_ID` ← repository variable `GA_ID`, default `G-C8QBZ9ZLSZ`
  (set in the workflow only, so local builds never send analytics hits).

No manual deploy step exists or is needed. Nothing is served by a server: no API routes, no ISR,
no middleware, no `next/image` optimization (`images.unoptimized`), `trailingSlash: true`
(every page is `<route>/index.html`). Static route handlers need `export const dynamic = 'force-static'`.

## One-time repository settings (owner only)

- **Settings → Pages → Build and deployment → Source: GitHub Actions.** If it is "Deploy from a branch",
  GitHub also runs its own Jekyll "pages build and deployment" on each push, which races with ours and can
  publish the raw repository (README instead of the site). Symptom: a second workflow named
  "pages build and deployment" in the Actions list.
- Google Analytics 4: property for zagovorichev.github.io, measurement ID `G-C8QBZ9ZLSZ` (default in the
  workflow). To switch property, set **Settings → Secrets and variables → Actions → Variables → `GA_ID`** and
  re-run the workflow. In GA, the web stream's Enhanced measurement must keep "Page changes based on browser
  history events" on — client-side navigation between pages is counted only through it.

## Checking a deployment

1. List runs of workflow `deploy.yml` on branch `main` (GitHub MCP `actions_list` →
   `list_workflow_runs`, then `list_workflow_jobs` for the run).
2. Both jobs `build` and `deploy` must be `success`. If `build` failed, fetch its logs
   (`get_job_logs` with `failed_only`), reproduce locally with `scripts/verify.sh`, fix, push.
3. Report the live URL of the changed page, e.g. `https://zagovorichev.github.io/guides/<slug>/`.
   GitHub Pages CDN may serve the old version for up to ~10 minutes.

## Local preview

```bash
npm install
npm run dev                       # http://localhost:3000 with hot reload
npm run build && npx serve out    # exactly what will be published
```

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Build error naming `content/...` | Missing `title`/`description`/`date`, YAML indentation, or unescaped `{`/`<` in MDX text |
| Page 404 only on the live site | Link without trailing slash to a non-existent route, or slug renamed |
| Live site shows README / old design | Pages source still "Deploy from a branch" (see above), or CDN cache |
| Theme flashes on load | Boot script in `layout.tsx` removed or broken |
| Hydration warning about `<html>` | Keep `suppressHydrationWarning` on `<html>` (theme attribute is set before React) |
