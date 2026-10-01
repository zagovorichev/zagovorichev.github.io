#!/usr/bin/env bash
# Validate content, then lint, typecheck and build exactly like CI does.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

[ -d node_modules ] || npm ci

node .claude/skills/zagovorichev-site/scripts/check-content.mjs
npm run lint
npm run typecheck
npm run build
echo "✔ Ready to push: content valid, lint/typecheck/build passed (output in ./out)"
