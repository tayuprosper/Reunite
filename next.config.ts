import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      hostname: 'picsum.photos'
    },{
      hostname: 'randomuser.me'
    }]
  }
};

export default nextConfig;
