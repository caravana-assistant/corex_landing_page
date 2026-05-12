# CoreX Stage 2 Landing — Deployment Notes

This is a **fully static page**. No server-side runtime, no database, no
Node.js needed. Anything that serves an HTML file works — Apache, Nginx,
IIS, S3, CloudFront, even a USB drive.

You receive **two deliverables**, pick whichever fits your hosting:

## Option 1 — Single self-contained HTML file (recommended for plain hosting)

`index.html` — **one file**, ~810 KB (~430 KB gzipped). All CSS,
JavaScript, brand images and favicon are inlined as base64 inside this
file.

How to deploy:

1. Upload `index.html` to your web root (e.g. `public_html/`).
2. Done. Open in a browser.

That's it. No companion folder, no asset paths, no renaming needed.
Works on any host that serves an HTML file.

Cache header recommendation: `Cache-Control: no-cache, must-revalidate`
on this file — it changes whenever we redeploy.

## Option 2 — Multi-file bundle (recommended for CDN / cache-aware setups)

`corex-stage2-landing-YYYY-MM-DD.zip` — ~318 KB. Contents:

```
index.html               ← entry point (~1 KB, references hashed assets)
favicon.jpg              ← browser tab icon
brand/                   ← logos and hero background image
  hero-bg.jpg
  logo-white.jpg
  logo.png
  x.jpg
assets/
  index-<hash>.css       ← compiled CSS (~41 KB / ~8 KB gzipped)
  index-<hash>.js        ← compiled React bundle (~235 KB / ~70 KB gzipped)
DEPLOY-FOR-IT.md         ← this file (do not deploy)
```

The hashed filenames are content-addressed, so browsers cache them safely.
Total page weight: ~80 KB gzipped (excluding Google Fonts).

### How to deploy

Apache / Nginx / IIS:
1. Unzip and upload the **entire contents** (except this MD) to web root,
   e.g. `public_html/corex-stage2/`.
2. Make sure the server serves `index.html` for the directory request.

S3 / CloudFront / Object storage:

```
aws s3 sync ./ s3://your-bucket/ --exclude "*.md" --delete
```

Set CloudFront's "default root object" to `index.html`.

Subfolder under existing site (`https://example.com/stage-2/`):
The build needs to be regenerated with `base: "/stage-2/"` in
`vite.config.ts`, otherwise the asset URLs (`/assets/...`, `/brand/...`)
will 404. Ask the dev team for that variant.

### Recommended HTTP headers (multi-file only)

| Path | Cache-Control |
|------|---------------|
| `index.html` | `no-cache, must-revalidate` |
| `assets/*`, `brand/*`, `favicon.jpg` | `public, max-age=31536000, immutable` |

`index.html` references new asset hashes on every deploy, so it must
not be cached aggressively. Everything else has a content hash and can
live in caches forever.

## Browser support (both options)

Modern evergreen browsers (Chrome / Edge / Firefox / Safari last 2
versions). Uses CSS `color-mix()`, `mask-image`, and modern flex/grid.

## External services the page links to

The page itself is fully static, but it links out to:

- Registration form — https://in.abudhabimarathon.events/corex--stage-2
- WhatsApp group — https://chat.whatsapp.com/K2aHcGZjRNO6hN99ZVqhFD
- Google Maps — https://maps.app.goo.gl/Vziib3gBaDeKczSo8
- Instagram — @corexchallenge.ae, @abudhabisc, @abudhabi360
- Google Fonts — Anton, Outfit, Geist Mono

If your network blocks Google Fonts the page falls back to system
fonts (sans-serif / monospace).

## Updating later

- Single-file: replace the `.html`, users get the update on next page load.
- Multi-file: replace the folder contents — `index.html` references new
  asset hashes so caches clear automatically.

## Source / who maintains it

Vite + React + TypeScript + Tailwind 4 project. Source repo is
maintained internally by the project team (Pyxis / Palms Sports
operations). Send feedback or change requests to the WhatsApp group
above.
