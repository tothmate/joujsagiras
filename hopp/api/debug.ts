import { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("-");
  fs.readdirSync(".").forEach((file) => {
    console.log(file);
  });
  console.log("-");
  fs.readdirSync("hopp/pages").forEach((file) => {
    console.log(file);
  });
  console.log("-");
  fs.readdirSync("hopp/pages/api").forEach((file) => {
    console.log(file);
  });
  console.log("-");

  res.status(200).json({});
}
