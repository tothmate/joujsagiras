import { NextApiRequest, NextApiResponse } from 'next';
import ogs from 'ts-open-graph-scraper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  if (!url || Array.isArray(url)) {
    res.status(400).json({ error: 'no url' });
    return;
  }

  ogs({ url, ogImageFallback: true })
    .then(({ ogTitle, ogImage }) => res.status(200).json({ title: ogTitle, image: ogImage ? ogImage[0].url : '' }))
    .catch((error) => res.status(500).json({ error: error.message }));
}
