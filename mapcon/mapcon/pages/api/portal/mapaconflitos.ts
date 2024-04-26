import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import db from '../../../lib/back/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {



    if (req.method == 'GET') {

        const teste = await db.raw(`SELECT num_seq_protesto, tema_protesto, data_protesto,latitude,longitude FROM protesto p INNER JOIN geolocalizacao g ON p.num_seq_protesto = g.protesto_num_seq_protesto WHERE status = 0;`);

        res.status(200).json(teste.rows)
    }

}
