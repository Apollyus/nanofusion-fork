import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath removed to prevent /admin/admin/ double-pathing
  // @ts-ignore - Next.js 16 workspace configuration
  turbopack: {
    root: "..",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'mgmtkdwvhgrzefmyucvr.supabase.co',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
};

export default nextConfig;
