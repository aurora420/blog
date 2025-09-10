/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
      ],
    },

    basePath: "",
    assetPrefix: "",
    trailingSlash: true,
  }
  
  module.exports = nextConfig
  