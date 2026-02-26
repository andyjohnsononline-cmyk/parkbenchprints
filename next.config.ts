import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/parkbenchprints",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
