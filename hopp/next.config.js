/** @type {import('next').NextConfig} */
module.exports = {
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
        destination: "/api/generate-sticker/?stickerId=:stickerId&format=:format",
      },
    ];
  },
};
