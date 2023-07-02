/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
