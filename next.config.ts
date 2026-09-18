import type { NextConfig } from "next";

// Static export so the site can be hosted on GitHub Pages.
// BASE_PATH is set by the deploy workflow to "/<repo-name>".
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.BASE_PATH || "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
