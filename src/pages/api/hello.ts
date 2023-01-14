// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  fetch('https://jsonplaceholder.typicode.com/todos').then((resp) => resp.json()).then((data) => {
    res.status(200).json(data)
  }).catch((e) => res.status(500).json(e))
}
