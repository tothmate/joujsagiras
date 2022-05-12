import { NextApiRequest, NextApiResponse } from "next";
import { createCanvas, registerFont } from "canvas";
import store from "../../src/SupabaseStore";
import { StickerStoreErrorType } from "../../src/models";
import { drawPreview } from "../../src/canvas";
import { saveOswaldIfNeeded } from "../../src/font";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await store.load(req.query.stickerId as string);
  const format = (req.query.format as string) === "png" ? "png" : "jpeg";
  result.match(
    async (sticker) => {
      const fontFilepath = "/tmp/Oswald-VariableFont_wght.ttf";
      saveOswaldIfNeeded(fontFilepath);
      registerFont(fontFilepath, { family: "Oswald" });
      const canvas = createCanvas(1200, 628);
      await drawPreview(canvas.getContext("2d"), sticker.source.image, sticker.reason.text);
      const screenshot = format === "png" ? canvas.createPNGStream() : canvas.createJPEGStream();

      res.setHeader("Content-Type", `image/${format}`);
      if (!process.env.IS_LOCAL) {
        res.setHeader("Cache-Control", "max-age=2678400, public");
      }
      res.status(200).send(screenshot);
    },
    async (error) => {
      if (error?.type === StickerStoreErrorType.NotFound) {
        res.status(404).json({ error: "not_found" });
      } else {
        res.status(500).json({ error: error?.message });
      }
    }
  );
}
