// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {supabase} from "~/config/supabase";
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
   const {id} = req.query;
   supabase.from('users').select('*').eq('id', id).then(({data, error}) => {
       if(error?.message) res.status(401).json(error)
       else res.status(200).json(data)
   })
}
