import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ignoreBuildErrors: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
