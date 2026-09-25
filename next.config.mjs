import { createMDX } from 'fumadocs-mdx/next';

// Static export for GitHub Pages. The deploy workflow sets BASE_PATH to
// "/<repo-name>"; locally it is empty.
const basePath = process.env.BASE_PATH || '';

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  // Plain <img> and fetch() URLs do not get basePath on their own.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  reactStrictMode: true,
};

export default createMDX()(config);
