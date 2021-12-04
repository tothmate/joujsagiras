import { Image, loadImage } from "canvas";

// By Ken Fyrstenberg Nilsen
function drawImageProp(ctx: CanvasRenderingContext2D, img: Image) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  let iw = img.width,
    ih = img.height,
    r = Math.min(w / iw, h / ih),
    nw = iw * r, // new prop. width
    nh = ih * r, // new prop. height
    cx,
    cy,
    cw,
    ch,
    ar = 1;

  // decide which gap to fill
  if (nw < w) ar = w / nw;
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh; // updated
  nw *= ar;
  nh *= ar;

  // calc source rectangle
  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * 0.5;
  cy = (ih - ch) * 0.5;

  // make sure source rectangle is valid
  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  // fill image in dest. rectangle
  ctx.drawImage(img as unknown as CanvasImageSource, cx, cy, cw, ch, 0, 0, w, h);
}

export async function drawPreview(ctx: CanvasRenderingContext2D, imageUrl?: string, text?: string) {
  const canvas = ctx.canvas;
  const heightRatio = 0.25;
  const textSizeRatio = 0.55;

  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (imageUrl) {
    try {
      const image = await loadImage(imageUrl);
      drawImageProp(ctx, image);
    } catch (e) {}
  }

  if (text) {
    ctx.globalCompositeOperation = "saturation";
    ctx.fillStyle = "#00000099";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";

    ctx.save();
    ctx.translate(0, (1 - heightRatio) * canvas.height);
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height * heightRatio);
    ctx.rotate(-(2 * Math.PI) / 180);
    ctx.fillStyle = "#5ac8fa";
    ctx.fillRect(-100, 0, canvas.width + 100, canvas.height * heightRatio);
    ctx.fillStyle = "#000000";
    ctx.font = `${canvas.height * heightRatio * textSizeRatio}px Oswald, sans-serif`;
    ctx.fillText(
      `HOPP! EZ ${text.toUpperCase()}.`,
      canvas.width * 0.02,
      canvas.height * heightRatio * (0.5 + 0.5 * textSizeRatio),
      canvas.width
    );
    ctx.restore();
  }
}
