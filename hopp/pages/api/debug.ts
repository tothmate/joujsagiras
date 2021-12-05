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
  ctx.font = "86px Oswald, sans-serif";
  ctx.fillText("HOPP! EZ NEM ELLENŐRIZHETŐ.", 0, 121, 1200);

  const screenshot = canvas.createPNGStream();
  res.setHeader("Content-Type", "image/png");
  res.status(200).send(screenshot);
}
