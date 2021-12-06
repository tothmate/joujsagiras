console.log("before", process.env.LD_LIBRARY_PATH);
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(`${process.env.PWD}/node_modules/canvas/build/Release:`)
) {
  process.env.LD_LIBRARY_PATH = `${process.env.PWD}/node_modules/canvas/build/Release:${
    process.env.LD_LIBRARY_PATH || ""
  }`;
}
console.log("after", process.env.LD_LIBRARY_PATH);

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
        source: "/:reasonSlug/:stickerId.png",
        destination: "/api/generate-sticker/?stickerId=:stickerId",
      },
    ];
  },
};
