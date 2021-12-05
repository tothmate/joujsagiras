import { NextApiRequest, NextApiResponse } from "next";
import { createCanvas, registerFont } from "canvas";
import { saveOswaldIfNeeded } from "../../src/font";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const fontFilepath = "/tmp/Oswald-VariableFont_wght.ttf";
  saveOswaldIfNeeded(fontFilepath);
  registerFont(fontFilepath, { family: "Oswald" });
  const canvas = createCanvas(1200, 628);

  const imageUrl = "https://cdn.nwmgroups.hu/s/img/i/2006/20200629chinas-state-media-warns-soros.jpg";
  const text = "HOPP! EZ NEM ELLENŐRIZHETŐ.";
  const ctx = canvas.getContext("2d");

  const heightRatio = 0.25;
  const textSizeRatio = 0.55;

  ctx.fillStyle = "#000000";
  ctx.font = `${canvas.height * heightRatio * textSizeRatio}px Oswald, sans-serif`;
  ctx.fillText(text, canvas.width * 0.02, canvas.height * heightRatio * (0.5 + 0.5 * textSizeRatio), canvas.width);

  const screenshot = canvas.createPNGStream();

  res.setHeader("Content-Type", "image/png");
  res.status(200).send(screenshot);
}
