import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler, { Response } from "../../../libs/server/withHandler";
import { withApiSession } from "../../../libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    body: { question },
    session: { user },
  } = req;
  const post = await client.post.create({
    data: {
      question,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({
    ok: true,
    post,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));