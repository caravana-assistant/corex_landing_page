#!/usr/bin/env bash
# bundle-for-it.sh — produce both deployment deliverables for IT into deploy/:
#   1. deploy/corex-stage2-landing-YYYY-MM-DD.zip   (multi-file, hashed assets)
#   2. deploy/corex-stage2-landing-YYYY-MM-DD.html  (one self-contained file)
# Plus deploy/DEPLOY-FOR-IT.md (kept in sync with the project root copy).
# Run from project root: ./scripts/bundle-for-it.sh
set -euo pipefail

DATE=$(date +%Y-%m-%d)
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"
DIST_SINGLE="$ROOT/dist-single"
DEPLOY="$ROOT/deploy"
ZIP="$DEPLOY/corex-stage2-landing-${DATE}.zip"
# Drop-in name so IT can upload to web root with no rename.
SINGLE_HTML="$DEPLOY/index.html"

cd "$ROOT"
mkdir -p "$DEPLOY"

echo "→ [1/4] Building production multi-file bundle…"
pnpm build

echo "→ [2/4] Building self-contained single-file bundle…"
BUILD_SINGLE=1 pnpm build
python3 scripts/inline-singlefile.py
cp "$DIST_SINGLE/corex-stage2-landing-single.html" "$SINGLE_HTML"

echo "→ [3/4] Preparing multi-file zip…"
cp "$ROOT/DEPLOY-FOR-IT.md" "$DIST/" 2>/dev/null || true
rm -f "$DIST/icons.svg" "$DIST/vite.svg"
rm -f "$ZIP"
( cd "$DIST" && zip -rq "$ZIP" . )

echo "→ [4/4] Refreshing deploy/ folder…"
cp "$ROOT/DEPLOY-FOR-IT.md" "$DEPLOY/DEPLOY-FOR-IT.md"
# Drop a small README so anyone opening the folder knows what's what
cat > "$DEPLOY/README.md" <<EOF
# CoreX Stage 2 Landing — Deploy folder

All artifacts ready to send to IT live in this folder.

## What's inside

- \`index.html\` — **single self-contained HTML file** (built ${DATE}).
  Drop straight into the web root. No companion folder needed.
  Recommended for plain hosting that doesn't run Node.
- \`corex-stage2-landing-${DATE}.zip\` — multi-file bundle (hashed CSS/JS,
  brand images, favicon). Better for CDNs and cache-aware setups.
- \`DEPLOY-FOR-IT.md\` — full deployment notes for the IT team. Cover
  letter explaining both options, server config tips, cache headers.

## How to regenerate

From the project root:

\`\`\`bash
bash scripts/bundle-for-it.sh
\`\`\`

That rebuilds both files into this folder with today's date.

Files are gitignored (regeneratable). Don't worry about committing them.
EOF

echo ""
echo "  Multi-file zip (best caching):"
ls -lh "$ZIP" | awk '{print "    " $5 "\t" $NF}'
echo ""
echo "  Single-file HTML (one file, no deps):"
ls -lh "$SINGLE_HTML" | awk '{print "    " $5 "\t" $NF}'
echo ""
echo "  Deploy folder ready: $DEPLOY"
