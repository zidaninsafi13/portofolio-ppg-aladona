import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/portofolio-ppg-aladona" : "");

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Bikin Next.js jadi static website
  output: "export",

  // Biar URL static lebih aman di GitHub Pages
  trailingSlash: true,

  // Repo GitHub Pages lu bukan username.github.io,
  // jadi perlu subpath nama repository
  basePath,

  assetPrefix: basePath ? `${basePath}/` : "",

  // GitHub Pages tidak punya Next.js Image Optimization server
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
