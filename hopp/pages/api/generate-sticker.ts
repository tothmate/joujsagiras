import { NextApiRequest, NextApiResponse } from "next";
import { createCanvas, registerFont } from "canvas";
import store from "../../src/SupabaseStore";
import { StickerStoreErrorType } from "../../src/models";
import { drawPreview } from "../../src/canvas";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await store.load(req.query.stickerId as string);
  result.match(
    async (sticker) => {
      registerFont("Oswald-VariableFont_wght.ttf", { family: "Oswald" });
      const canvas = createCanvas(1200, 628);
      await drawPreview(canvas.getContext("2d"), sticker.source.image, sticker.reason.text);
      const screenshot = canvas.createPNGStream();

      res.setHeader("Content-Type", "image/png");
      if (!process.env.IS_LOCAL) {
        res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=2678400");
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
