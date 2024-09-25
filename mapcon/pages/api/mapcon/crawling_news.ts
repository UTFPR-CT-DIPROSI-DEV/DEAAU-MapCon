import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
// import { getSession } from 'next-auth/react';
import base from '../../../lib/back/base_query'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    // const session = await getSession({ req });
    const session = await getServerSession(req , res, {});
    if (session) {
        if (req.method == 'GET' && req.query.id) {
            // console.debug('req.query.id', req.query.id)
            res.status(200).json(await base.getModel('crawling.crawling_news', { 'url': req.query.id }))
        } else if (req.method == 'GET') {     
            // console.debug('req.query', req.query)    
            res.status(200).json(await base.getModels('crawling.crawling_news', req.query))
        } else if (req.method == 'PUT'){
            res.status(200).json(await base.updateModel('crawling.crawling_news',{ 'url': req.body.url },req.body))
        } else if (req.method == 'DELETE'){
            res.status(200).json(await base.deleteModel('crawling.crawling_news',{ 'url': req.body.url }))
        }

    } else {
        res.status(401).json({ "Acesso Negado": "Você não possui permissão para acessar esses dados." })

    }

}
