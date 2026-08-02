import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All photography is pre-optimized WebP. Direct serving also keeps local,
    // Netlify, Vercel and Cloudflare deployments consistent.
    unoptimized: true,
  },
};

export default nextConfig;
