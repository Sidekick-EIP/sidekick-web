/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    COOKIE_PASSWORD: process.env.COOKIE_PASSWORD,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
