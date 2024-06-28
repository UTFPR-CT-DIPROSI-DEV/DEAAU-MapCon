import type { NextApiRequest, NextApiResponse } from "next";
import captureWebsite from "capture-website";
// import { getSession } from "next-auth/react";
import { getServerSession } from 'next-auth/next';
import db from "../../../lib/back/db";
import { v1 as uuidv1 } from "uuid";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await getSession({ req });
    const session = await getServerSession(req , res, {});;

  if (session) {
    console.log(req.body);
    if (!req.body.is_protesto) {
      await db("crawling.crawling_news")
        .where({ url: req.body.url })
        .update({ tipo: false });
    } else {
      // Marca como protesto
      await db("crawling.crawling_news")
        .where({ url: req.body.url })
        .update({ tipo: true });

      // Pega um nome único para o screenshot que será gerado
      const img_name = uuidv1();

      // Tira o screenshot
      await captureWebsite.file(
        req.body.url,
        `public/images/news/${img_name}.jpeg`,
        {
          launchOptions: {
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          },
          fullPage: true,
          scaleFactor: 0.5,
          quality: 0.5,
          type: "jpeg",
        }
      );

      if (typeof req.body.existente == "number") {
        // Vincula com um protesto já existente

        // Adicionar fonte
        await db("fonte").insert({
          fonte_protesto_num_seq_fonte_protesto: 22,
          protesto_num_seq_protesto: req.body.existente,
          referencia: req.body.url,
        });
        // Adicionar documento
        await db("screenshot").insert({
          id: img_name,
          id_protesto: req.body.existente,
        });
      } else {
        const ret = await db("protesto")
          .insert({
            data_protesto: req.body.data,
            tema_protesto: req.body.titulo,
          })
          .returning("*");

        // Adicionar fonte
        await db("fonte").insert({
          fonte_protesto_num_seq_fonte_protesto: 22,
          protesto_num_seq_protesto: ret[0]["num_seq_protesto"],
          referencia: req.body.url,
        });
        // Adicionar documento
        await db("screenshot").insert({
          id: img_name,
          id_protesto: ret[0]["num_seq_protesto"],
        });
      }
    }

    res.status(200).json({ ok: "Gerou" });
  }
};
