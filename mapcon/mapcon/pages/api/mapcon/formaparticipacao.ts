import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import base from '../../../lib/back/base_query'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getSession({ req })

    if (session) {

        if (req.method == 'GET' && req.query.id) {
            res.status(200).json(await base.getModel('forma_participacao', { 'num_seq_forma_participacao': req.query.id }))
        } else if (req.method == 'GET') {
            res.status(200).json(await base.getModels('forma_participacao', req.query))
        } else if (req.method == 'POST') {
            res.status(200).json(await base.addModel('forma_participacao', req.body))
        } else if (req.method == 'PUT'){
            res.status(200).json(await base.updateModel('forma_participacao',{ 'num_seq_forma_participacao': req.body.num_seq_forma_participacao },req.body))
        } else if (req.method == 'DELETE'){
            console.log(req)
            res.status(200).json(await base.deleteModel('forma_participacao',{ 'num_seq_forma_participacao': req.body.num_seq_forma_participacao }))
        }

    } else {

        res.status(401).json({ "Acesso Negado": "Você não possui permissão para acessar esses dados." })

    }

}
