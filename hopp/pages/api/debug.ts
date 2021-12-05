import { NextApiRequest, NextApiResponse } from "next";
import { createCanvas, registerFont } from "canvas";
import { saveOswaldIfNeeded } from "../../src/font";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const fontFilepath = "/tmp/Oswald-VariableFont_wght.ttf";
  saveOswaldIfNeeded(fontFilepath);
  registerFont(fontFilepath, { family: "Oswald" });
  const canvas = createCanvas(1200, 628);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#000000";
  ctx.font = "12px serif";
  ctx.save();
  ctx.translate(0, 86);
  ctx.scale(86.0 / 12.0, 86.0 / 12.0);
  ctx.fillText("HOPP", 0, 0, 50000);
  ctx.restore();
  ctx.fillText("HOPP", 0, 150);
  ctx.fillText("HOPP", 0, 250, 50000);

  const screenshot = canvas.createPNGStream();
  res.setHeader("Content-Type", "image/png");
  res.status(200).send(screenshot);
}
