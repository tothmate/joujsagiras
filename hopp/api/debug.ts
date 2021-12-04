import { VercelRequest, VercelResponse } from "@vercel/node";
import { registerFont } from "canvas";
import fs from "fs";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.query.f) {
    fs.readdirSync(req.query.f as string).forEach((file) => {
      console.log(file);
    });
  }

  registerFont("Oswald-VariableFont_wght.ttf", { family: "Oswald" });
  res.status(200).json({});
}
