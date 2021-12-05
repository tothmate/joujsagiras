import { NextApiRequest, NextApiResponse } from "next";
import { createCanvas, registerFont } from "canvas";
import { saveOswaldIfNeeded } from "../../src/font";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const fontFilepath = "/tmp/Oswald-VariableFont_wght.ttf";
  saveOswaldIfNeeded(fontFilepath);
  registerFont(fontFilepath, { family: "Oswald" });

  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext("2d");

  ctx.font = "4px Oswald";

  ctx.fillStyle = "#000000";
  ctx.scale(6, 6);
  ctx.fillText("HOPP", 0, 50, 2000);

  const screenshot = canvas.createPNGStream();
  res.setHeader("Content-Type", "image/png");
  res.status(200).send(screenshot);
}
