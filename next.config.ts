import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /src/,
    });
    return config;
  },
};

export default nextConfig;
