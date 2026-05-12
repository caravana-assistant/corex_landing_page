# corex_stage2_landing

Landing page for **CoreX Fitness League — Stage 2** (Hazza bin Zayed Gymnasium, Al Ain · May 16, 2026).

Stack: Vite 8 + React 19 + TypeScript + Tailwind 4. Pnpm.

## Dev workflow (SMB-aware)

This folder lives on a NAS-mounted SMB share. SMB is **slow for `node_modules`** (~thousands of small files = 35+ min for Next.js install). To stay productive, the dev environment is kept on **local disk** and synced here for commits.

### Local dev source-of-truth

```
/tmp/corex-landing-dev/   ← active dev tree (node_modules + HMR)
```

### This folder (SMB)

```
Apps/corex_stage2_landing/   ← committed source mirror (no node_modules)
```

### Workflow

```bash
# Run dev server (fast on /tmp)
cd /tmp/corex-landing-dev
pnpm dev   # http://localhost:5173

# Sync source back to workspace for commit (excludes node_modules)
rsync -av --exclude=node_modules --exclude=pnpm-lock.yaml \
  /tmp/corex-landing-dev/ \
  "/Users/Shared/workspace/Work Projects/Corex/Apps/corex_stage2_landing/"

# Commit from workspace
cd "/Users/Shared/workspace"
git add "Work Projects/Corex/Apps/corex_stage2_landing/"
git commit
```

### Bootstrap from clean checkout

If `/tmp/corex-landing-dev` doesn't exist (new machine, reboot):

```bash
mkdir -p /tmp && cp -R "/Users/Shared/workspace/Work Projects/Corex/Apps/corex_stage2_landing/" /tmp/corex-landing-dev/
cd /tmp/corex-landing-dev
pnpm install   # ~3s on local disk
pnpm dev
```

## Source layout

```
src/
  main.tsx           - React root
  App.tsx            - Page composition
  index.css          - Tailwind + design tokens (CSS vars)
  components/
    Header.tsx       - Sticky header (logo + nav + lang toggle + Register CTA)
    Footer.tsx       - Marquee slogan band + 3-col grid + bottom legal
    Section.tsx      - Reusable section wrapper with stage-marker
  lib/
    site.ts          - Centralized event/copy/links config
```

## Design tokens

CSS variables in `src/index.css`:
- Surfaces: `--color-bg`, `--color-surface`, `--color-border`
- Foreground: `--color-fg`, `--color-fg-muted`, `--color-fg-faint`
- Accent: `--color-ember` (`#ff4d2e`), `--color-highlight` (`#ffd23f`)
- Fonts: `--font-display` (Anton), `--font-sans` (Outfit), `--font-mono` (Geist Mono)

## Status

**Phase 1 done**: layout root, sticky header, footer with marquee, hero with slogan + countdown placeholder + CTAs, design system primitives.

**Next phase**: Stage 1 stat strip → Season 8-stages grid → Categories (11 divisions) → Race Format → Schedule → Race Day Package → Community Day → Registration → Venue → Prizes → Downloads → FAQ → Newsletter.

See `IMPLEMENTATION_PLAN.md` for detail.

## Spec source-of-truth

`../../corex-stage2-landing-spec_v2.md` (gitignored — internal Pyxis doc).
