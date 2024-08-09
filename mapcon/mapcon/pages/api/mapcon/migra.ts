import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer  from "puppeteer";
import { getServerSession } from 'next-auth/next';
import db from "../../../lib/back/db";
import { v1 as uuidv1 } from "uuid";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req , res, {});;

  if (session) {
    console.log(req.body);
    if (!req.body.is_protesto) {
      await db("crawling.crawling_news")
        .where({ url: req.body.url })
        .delete();
    } else {
      // Marca como protesto
      await db("crawling.crawling_news")
        .where({ url: req.body.url })
        .update({ tipo: true });

      // Pega um nome único para o screenshot que será gerado
      const img_name = uuidv1();

      // Tira o screenshot
      let add_screenshot = true;
      try {
        // Launch the browser and open a new blank page
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        // Navigate the page to a URL
        await page.goto(req.body.url, {
          waitUntil: 'networkidle2',
        });
        await page.screenshot({
          path: `public/images/news/${img_name}.jpeg`,
          fullPage: true,
          type: 'jpeg',
        });
        await browser.close();
        // await captureWebsite.file(
        //   req.body.url,
        //   `public/images/news/${img_name}.jpeg`,
        //   {
        //     launchOptions: {
        //       args: ["--no-sandbox", "--disable-setuid-sandbox"],
        //     },
        //     fullPage: true,
        //     scaleFactor: 0.5,
        //     quality: 0.5,
        //     type: "jpeg",
        //   }
        // );
      } catch (e) {
        add_screenshot = false;
        console.log("Erro ao tirar screenshot: ", e);
      }

      if (typeof req.body.existente == "number") {
        // Vincula com um protesto já existente

        // Adicionar fonte
        await db("fonte").insert({
          fonte_protesto_num_seq_fonte_protesto: 22,
          protesto_num_seq_protesto: req.body.existente,
          referencia: req.body.url,
        });
        // Adicionar documento
        if (add_screenshot) {
          await db("screenshot").insert({
            id: img_name,
            id_protesto: req.body.existente,
          });
        }
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
        if (add_screenshot) {
          await db("screenshot").insert({
            id: img_name,
            id_protesto: ret[0]["num_seq_protesto"],
          });
        }

        await db("crawling.crawling_news")
          .where({ url: req.body.url })
          .delete();
      }
    }
    
    res.status(200).json({ ok: "Migrou" });
  }
};
