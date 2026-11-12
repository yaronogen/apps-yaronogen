import type { NextConfig } from "next";

/**
 * Fully static export: `next build` writes plain HTML/CSS/JS to `out/`, which any static host
 * (GitHub Pages, Cloudflare Pages, IONOS webspace) can serve. No Node server is needed.
 */
const config: NextConfig = {
  output: "export",
  trailingSlash: true, // /tally/privacy/ -> /tally/privacy/index.html: works on every static host
  images: { unoptimized: true }, // images are pre-optimized by scripts/optimize-images.ts
  poweredByHeader: false,
  reactStrictMode: true,
};

export default config;
