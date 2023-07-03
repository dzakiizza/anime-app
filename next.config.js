/** @type {import('next').NextConfig} */
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

module.exports = nextConfig;
