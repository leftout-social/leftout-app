// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {supabase} from "~/config/supabase";
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {first_name, last_name, gender, age, id, current_city} = req.body;
    supabase.from('users').insert([{
      id,
        first_name,
        last_name,
        gender,
        age,
        current_city
    }]).then(({data, error}) => {
        if(error?.message) res.status(401).json({error})
        else res.status(200).json({data})
    })
}
