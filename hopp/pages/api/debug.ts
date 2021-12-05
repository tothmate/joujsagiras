import { NextApiRequest, NextApiResponse } from "next";
import { createCanvas } from "canvas";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#000000";
  ctx.font = "24px Arial";
  ctx.scale(2, 2);
  ctx.fillText("HOPP", 0, 50);

  ctx.font = "12px Arial";
  ctx.scale(2, 2);
  ctx.fillText("HOPP", 0, 100);

  const screenshot = canvas.createPNGStream();
  res.setHeader("Content-Type", "image/png");
  res.status(200).send(screenshot);
}
