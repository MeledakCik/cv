import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // --- Pindahkan Proxy ke Sini ---
  async rewrites() {
    return [
      {
        // Semua request ke /api/secure/ dikirim ke URL API Gateway kamu
        source: '/api/secure/:path*',
        destination: `${process.env.API_GATEWAY_URL}/:path*`,
      },
    ]
  },
  // --- Config Image Tetap ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

export default nextConfig;