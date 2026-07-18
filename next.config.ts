import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com"
      }
    ]
  },
  experimental: {
    optimizePackageImports: ["react-icons", "framer-motion", "chart.js"]
  }
};

export default nextConfig;
