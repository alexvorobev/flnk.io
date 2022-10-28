// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { get as getRedis } from '../../lib/redis';

type Data = {
  path: string | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;
  const { hash, headers, cookies } = JSON.parse(body);
  const cached = await getRedis(hash);

  if (cached) {
    console.log('result was cached');
    res.status(200).json({ path: cached?.replaceAll('"', '') ?? null })
  } else {
    await fetch(`http://localhost:4000/links/${hash}`, {
      method: 'GET',
    }).then(async (result) => {
      // @ts-ignore
      const { path } = await result.json();
      res.status(200).json({ path })
    });
  }
}