/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: "public",
  register: true,
  skipWaiting: true,
  scope: "/",
  disable: process.env.NODE_ENV !== "production",
});


const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s4.anilist.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
