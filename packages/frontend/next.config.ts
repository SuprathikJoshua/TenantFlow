import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://tenantflow-backend-5zwo.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
