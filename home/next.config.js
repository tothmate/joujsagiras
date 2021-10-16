/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/hopp/:match*',
        destination: 'https://joujsagiras-hopp.vercel.app/hopp/:match*',
      },
    ]
  }
}
