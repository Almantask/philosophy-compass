import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {
  output: "export", // 👈 enables static site export with `next export`
  images: {
    domains: ["upload.wikimedia.org"], // 👈 add any remote image domains here
  },
  experimental: {
    typedRoutes: true, // optional but helpful if you're using route types
  },
};

export default withContentlayer(nextConfig);
