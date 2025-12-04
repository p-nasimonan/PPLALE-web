import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pplale.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pple.vr2.info',
        pathname: '/**',
      }
    ],
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60
  },
  experimental: {
    optimizeCss: true,
  },
  serverExternalPackages: ['@vercel/og'],
  // 本番環境用の設定
  assetPrefix: '',
  basePath: '',
  // 動的ルーティングの設定
  trailingSlash: true,
  turbopack: {
    resolveAlias: {
      '@': './src',
    },
  },
};

export default config;
