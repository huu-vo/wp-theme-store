/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' for Vercel deployment
  trailingSlash: false,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig