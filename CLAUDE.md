# zagovorichev.github.io

Personal developer log of Oleksandr Zagovorychev — Next.js 16 static export + MDX, deployed to GitHub Pages
by GitHub Actions on every push to `main`. English only.

**For any work on this site use the `zagovorichev-site` skill** (`.claude/skills/zagovorichev-site/`):
sections and content formats, design system, deployment and verification scripts.

Quick map:
- Content: `content/guides/*.mdx`, `content/claude/*.mdx` (anonymized!), `content/news/*.mdx`, `content/videos.yaml`, `content/links.yaml`
- Pages: `app/`, components: `components/`, styles and tokens: `app/globals.css`, site config: `lib/site.ts`
- Before pushing: `bash .claude/skills/zagovorichev-site/scripts/verify.sh`

Never invent Oleksandr's opinions, notes or biography — ask him.

Git workflow (Oleksandr's rule): commit straight to `main`, one commit per task, each verified before push.
If a branch is used anyway, merge it into `main` and delete it (remote and local) right after.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
