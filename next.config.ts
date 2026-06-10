import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma", "stripe"],
  async redirects() {
    return [
      { source: "/ubicacion", destination: "/es/ubicacion", permanent: false },
      { source: "/location",  destination: "/en/ubicacion", permanent: false },
    ];
  },
};

export default nextConfig;
