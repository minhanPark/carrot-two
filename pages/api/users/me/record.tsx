import { Kind } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";
import withHandler, { Response } from "../../../../libs/server/withHandler";
import { withApiSession } from "../../../../libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {
    session: { user },
    query: { kind },
  } = req;
  // 만약 위와 같이 처리했을 시 kind가 이상하면 에러 띄우는 게 좋은듯함
  const records = await client.record.findMany({
    where: {
      userId: user?.id,
      kind: kind as Kind,
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              favs: true,
            },
          },
        },
      },
    },
  });
  res.json({
    ok: true,
    records,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
