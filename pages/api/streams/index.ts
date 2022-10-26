import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler, { Response } from "../../../libs/server/withHandler";
import { withApiSession } from "../../../libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    session: { user },
    body: { name, price, description },
  } = req;
  if (req.method === "GET") {
    const streams = await client.stream.findMany();
    res.json({ ok: true, streams });
  } else if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, stream });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
