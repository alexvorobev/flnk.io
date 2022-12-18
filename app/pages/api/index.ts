// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { get as getRedis } from '../../lib/redis';

type Data = {
  path: string | null;
  uuid: string;
}

type JSONResponse = {
  uuid?: string;
  errors?: Array<{message: string}>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;
  const { hash, userAgent, cookies, address } = JSON.parse(body);
  const { uuid } = cookies;
  const cached = await getRedis(hash);
  let linkPath = '';

  if (cached) {
    linkPath = cached?.replaceAll('"', '') ?? null;
  } else {
    await fetch(`http://localhost:4000/links/${hash}`, {
      method: 'GET',
    }).then(async (result) => {
      const { path } = await result.json();
      linkPath = path;
    });
  }

  if(uuid) {
    res.status(200).json({
      path: linkPath,
      uuid,
    });
  }

  fetch(`http://${process.env.API_URL}/visits`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uuid,
            ip: address,
            ua: userAgent,
            link: hash,
        }),
    }).then(async (result) => {
      const { uuid: newUUID } = await result.json() as JSONResponse;

      if(!uuid) {
        res.status(200).json({
          path: linkPath,
          uuid: newUUID ?? '',
        });
      }
    }).catch(() => {});
}
