const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
module.exports = {
  i18n,
  basePath: "/hopp",
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/create",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/:reasonSlug/:stickerId.:format",
        destination: "/api/generate-sticker/?stickerId=:stickerId&format=:format&reasonSlug=:reasonSlug",
      },
    ];
  },
};
