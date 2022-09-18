/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
  },
  images: {
    domains: ["unsplash.com", "pixsorter.com"],
  },
};
