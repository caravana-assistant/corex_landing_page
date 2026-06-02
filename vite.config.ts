import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "node:path";
import fs from "fs";
import { execSync } from "child_process";

// Set BUILD_SINGLE=1 to inline EVERYTHING (css/js/images) into one index.html.
// Default build keeps separate hashed assets for cache-friendly deploys.
const SINGLE = process.env.BUILD_SINGLE === "1";

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
let gitHash = "unknown";
try { gitHash = execSync("git rev-parse --short HEAD").toString().trim(); } catch { /* not a git repo (e.g. Vercel build) */ }

export default defineConfig({
  // ASP.NET host serves under /landingnodejs/; Vercel (and dev) serve at root.
  // Set DEPLOY_TARGET=aspnet for the ASP.NET bundle; default base is "/".
  base: process.env.DEPLOY_TARGET === "aspnet" ? "/landingnodejs/" : "/",
  plugins: [
    react(),
    tailwindcss(),
    ...(SINGLE ? [viteSingleFile()] : []),
  ],
  build: SINGLE
    ? {
        outDir: "dist-single",
        // Inline images and other assets up to a generous limit so the
        // single index.html truly is self-contained.
        assetsInlineLimit: 5 * 1024 * 1024, // 5 MB
        cssCodeSplit: false,
        rollupOptions: { output: { inlineDynamicImports: true } },
      }
    : undefined,
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __GIT_HASH__: JSON.stringify(gitHash),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
