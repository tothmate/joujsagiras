import { NextApiRequest, NextApiResponse } from 'next';
import chromium from 'chrome-aws-lambda';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.headers.host || !req.url || !req.query.reasonSlug || !req.query.stickerId) {
    res.status(400).json({ error: 'sticker not specified' });
    return;
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${req.query.reasonSlug}/${req.query.stickerId}/screenshot`;

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: { width: 1200, height: 630, deviceScaleFactor: 2 },
    executablePath: await chromium.executablePath,
    headless: chromium.headless
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: process.env.IS_LOCAL ? 'networkidle2' : 'networkidle0' });

  const height = await page.evaluate(() => {
    return document.body.clientHeight;
  });

  await page.setViewport({ width: 1200, height: height + 40, deviceScaleFactor: 2 });
  const screenshot = await page.screenshot({ encoding: 'binary' });
  await browser.close();

  res.setHeader('Content-Type', 'image/png');
  if (!process.env.IS_LOCAL) {
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=2678400');
  }
  res.status(200).send(screenshot);
}