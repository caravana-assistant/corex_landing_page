# AI Deployment Rules — CoreX Landing Page

Every AI assistant working on this repository MUST strictly follow these rules before building and compiling deployment assets:

### ⚠️ Mandated Confirmation Required
**ALWAYS ask the USER to confirm the deployment path and hosting environment before running the build (`pnpm bundle`).**

### 📁 ASP.NET MVC `/landingnodejs/` Subfolder Rules
By default, the deployment files are compiled to run under the `/landingnodejs/` subfolder of an ASP.NET MVC application.
- Vite base path inside `vite.config.ts` must be set to `"/landingnodejs/"`.
- All static references to the `brand/` assets and `favicon.jpg` in source files (`index.html`, `src/App.tsx`, `src/components/StageDetail.tsx`, etc.) must be prefixed with `/landingnodejs/`.
- The inliner script `scripts/inline-singlefile.py` is configured to automatically parse, strip, and inline `/landingnodejs/brand/` and `/landingnodejs/favicon.jpg` references. Ensure it continues to inline correctly when creating the single self-contained HTML bundle (`deploy/index.html`).

*Last Updated: 2026-05-25*
