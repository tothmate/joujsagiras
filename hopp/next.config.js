/** @type {import('next').NextConfig} */
module.exports = {
  basePath: '/hopp',
  reactStrictMode: false,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/create',
        permanent: true,
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/:reasonSlug/:stickerId.png',
        destination: '/api/generate-sticker/?reasonSlug=:reasonSlug&stickerId=:stickerId',
      },
    ]
  }
}
