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
  ctx.font = "86px sans-serif";
  ctx.fillText("HOPP! EZ NEM ELLENŐRIZHETŐ.", 0, 100, 500);

  ctx.font = "46px sans-serif";
  ctx.fillText("HOPP! EZ NEM ELLENŐRIZHETŐ.", 0, 140, 500);

  ctx.font = "26px sans-serif";
  ctx.fillText("HOPP! EZ NEM ELLENŐRIZHETŐ.", 0, 160, 500);

  ctx.font = "16px sans-serif";
  ctx.fillText("HOPP! EZ NEM ELLENŐRIZHETŐ.", 0, 170, 500);

  ctx.fillStyle = "#ff0000";
  ctx.font = "86px sans-serif";
  ctx.fillText("HOPP! EZ NEM ELLENŐRIZHETŐ.", 30, 100, 5000);

  ctx.font = "46px sans-serif";
  ctx.fillText("HOPP! EZ NEM ELLENŐRIZHETŐ.", 30, 140, 5000);

  ctx.font = "26px sans-serif";
  ctx.fillText("HOPP! EZ NEM ELLENŐRIZHETŐ.", 30, 160, 5000);

  ctx.font = "16px sans-serif";
  ctx.fillText("HOPP! EZ NEM ELLENŐRIZHETŐ.", 30, 170, 5000);

  ctx.fillStyle = "#00ff00";
  ctx.font = "86px sans-serif";
  ctx.fillText("HOPP! EZ NEM ELLENŐRIZHETŐ.", 60, 100);

  ctx.font = "46px sans-serif";
  ctx.fillText("HOPP! EZ NEM ELLENŐRIZHETŐ.", 60, 140);

  ctx.font = "26px sans-serif";
  ctx.fillText("HOPP! EZ NEM ELLENŐRIZHETŐ.", 60, 160);

  ctx.font = "16px sans-serif";
  ctx.fillText("HOPP! EZ NEM ELLENŐRIZHETŐ.", 60, 170);

  const screenshot = canvas.createPNGStream();
  res.setHeader("Content-Type", "image/png");
  res.status(200).send(screenshot);
}
