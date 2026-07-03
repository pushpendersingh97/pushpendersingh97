import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/portfolio", destination: "/", permanent: true }];
  },
};

export default nextConfig;
