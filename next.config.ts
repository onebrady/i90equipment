import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {},
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.filestackcontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.files.smartsuite.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /src/,
    });
    return config;
  },
};

export default nextConfig;
