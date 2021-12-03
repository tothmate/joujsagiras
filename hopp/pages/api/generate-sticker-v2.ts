// For building on vercel: https://github.com/Automattic/node-canvas/issues/1779
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(`${process.env.PWD}/node_modules/canvas/build/Release:`)
) {
  process.env.LD_LIBRARY_PATH = `${process.env.PWD}/node_modules/canvas/build/Release:${
    process.env.LD_LIBRARY_PATH || ""
  }`;
}

import { NextApiRequest, NextApiResponse } from "next";
// import { createCanvas } from "canvas";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.headers.host || !req.url || !req.query.reasonSlug || !req.query.stickerId) {
    res.status(400).json({ error: "sticker not specified" });
    return;
  }

  res.status(200).json({ path: process.env.LD_LIBRARY_PATH });

  //   const canvas = createCanvas(200, 200);
  //   const ctx = canvas.getContext("2d");

  //   ctx.font = "30px Impact";
  //   ctx.rotate(0.1);
  //   ctx.fillText("Awesome!", 50, 100);

  //   var text = ctx.measureText("Awesome!");
  //   ctx.strokeStyle = "rgba(0,0,0,0.5)";
  //   ctx.beginPath();
  //   ctx.lineTo(50, 102);
  //   ctx.lineTo(50 + text.width, 102);
  //   ctx.stroke();

  //   const screenshot = canvas.createPNGStream();

  //   res.setHeader("Content-Type", "image/png");
  //   if (!process.env.IS_LOCAL) {
  //     res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=2678400");
  //   }
  //   res.status(200).send(screenshot);
}
