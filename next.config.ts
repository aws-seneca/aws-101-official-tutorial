import type { NextConfig } from "next";

// Static export so the site can be hosted on GitHub Pages.
// BASE_PATH is set by the deploy workflow to "/<repo-name>".
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // next/image prefixes basePath on its own; plain links to files in public/ do not,
  // so expose it to the client bundle for the "open full size" links.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
