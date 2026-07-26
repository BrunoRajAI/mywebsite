import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles output automatically; standalone is only needed for self-hosting
  // (re-enable with `output: "standalone"` if deploying via Docker / VPS)
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
