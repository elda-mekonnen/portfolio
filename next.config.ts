import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// GitHub Pages serves the site under /<repo>. The deploy workflow sets NEXT_PUBLIC_BASE_PATH=/portfolio;
// locally it's unset, so `npm run dev` stays at http://localhost:3000.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  // Static HTML export: GitHub Pages can only serve files, not run a Next.js server.
  output: "export",
  basePath,
  // Each route becomes /route/index.html, which GitHub Pages serves without extra config.
  trailingSlash: true,
  // The default image optimizer needs a server; serve images as-is instead.
  images: { unoptimized: true },
  // Cache Components / partial prefetching (PPR) need a server, so they're off for the static export.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Plugins are passed by name (strings) so they work with Turbopack.
// remark-mdx-frontmatter exposes each file's YAML frontmatter as `export const frontmatter`.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", "remark-frontmatter", "remark-mdx-frontmatter"],
  },
});

export default withMDX(nextConfig);
