// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {supabase} from "~/config/supabase";
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.body.state === 'SIGN_UP'){
        const {email, password} = req.body;
        supabase.auth.signUp({email, password}).then(({data, error}) => {
            if(error?.message) res.status(401).json({error, state: req.body.state})
            else res.status(200).json({data, state: req.body.state})
        })
            .catch((error) => res.status(500).json(error))
    }
    else {
        const {email, password} = req.body;
        supabase.auth.signInWithPassword({email, password}).then(({data, error}) => {
            if(error?.message) res.status(401).json({error, state: req.body.state})
            else res.status(200).json({data, state: req.body.state})
        })
            .catch((error) => res.status(500).json(error))
    }
}
