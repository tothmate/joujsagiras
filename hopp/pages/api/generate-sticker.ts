import { NextApiRequest, NextApiResponse } from "next";
import chromium from "chrome-aws-lambda";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.headers.host || !req.url || !req.query.reasonSlug || !req.query.stickerId) {
    res.status(400).json({ error: "sticker not specified" });
    return;
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${req.query.reasonSlug}/${req.query.stickerId}/screenshot`;

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: { width: 1200, height: 630, deviceScaleFactor: 2 },
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  page.on("AAA close", (msg: any) => {
    console.log("close", msg);
  });
  page.on("AAA console", (msg: any) => {
    console.log("console", msg);
  });
  page.on("AAA dialog", (msg: any) => {
    console.log("dialog", msg);
  });
  page.on("AAA domcontentloaded", (msg: any) => {
    console.log("domcontentloaded", msg);
  });
  page.on("AAA error", (msg: any) => {
    console.log("error", msg);
  });
  page.on("AAA frameattached", (msg: any) => {
    console.log("frameattached", msg);
  });
  page.on("AAA framedetached", (msg: any) => {
    console.log("framedetached", msg);
  });
  page.on("AAA framenavigated", (msg: any) => {
    console.log("framenavigated", msg);
  });
  page.on("AAA load", (msg: any) => {
    console.log("load", msg);
  });
  page.on("AAA metrics", (msg: any) => {
    console.log("metrics", msg);
  });
  page.on("AAA pageerror", (msg: any) => {
    console.log("pageerror", msg);
  });
  page.on("AAA popup", (msg: any) => {
    console.log("popup", msg);
  });
  page.on("AAA request", (msg: any) => {
    console.log("request", msg);
  });
  page.on("AAA requestfailed", (msg: any) => {
    console.log("requestfailed", msg);
  });
  page.on("AAA requestfinished", (msg: any) => {
    console.log("requestfinished", msg);
  });
  page.on("AAA response", (msg: any) => {
    console.log("response", msg);
  });
  page.on("AAA workercreated", (msg: any) => {
    console.log("workercreated", msg);
  });
  page.on("AAA workerdestroyed", (msg: any) => {
    console.log("workerdestroyed", msg);
  });

  console.log("goto", url);

  page.setDefaultTimeout(5000);

  try {
    await page.goto(url, { waitUntil: "networkidle0" });
  } catch (e) {
    console.log("error", e);
  }

  const height = await page.evaluate(() => {
    return document.body.clientHeight;
  });

  await page.setViewport({ width: 600, height: height + 40, deviceScaleFactor: 2 });
  const screenshot = await page.screenshot({ encoding: "binary" });
  await browser.close();

  res.setHeader("Content-Type", "image/png");
  if (!process.env.IS_LOCAL) {
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=2678400");
  }
  res.status(200).send(screenshot);
}
