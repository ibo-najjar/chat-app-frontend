/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "192.168.1.21"],
  },
  experimental: {
    appDir: true,
  },
  pageDir: "src/app",
};

module.exports = nextConfig;
