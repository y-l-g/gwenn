import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain static HTML in out/, hosted on GitHub Pages (no Node server).
  output: "export",
  images: {
    // No image server on a static host: photos are served as they are.
    unoptimized: true,
    qualities: [70, 80],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
