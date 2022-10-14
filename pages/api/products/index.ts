import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler, { Response } from "../../../libs/server/withHandler";
import { withApiSession } from "../../../libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === "GET") {
    const products = await client.product.findMany({});
    console.log(products);
    res.json({
      ok: true,
      products,
    });
  }
  if (req.method === "POST") {
    const {
      body: { name, price, description },
      session: { user },
    } = req;
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: "xx",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      product,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler })
);