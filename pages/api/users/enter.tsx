import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler, { Response } from "../../../libs/server/withHandler";
import twilio from "twilio";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { phone, email } = req.body;
  if (!phone && !email) return res.status(400).json({ ok: false });
  const user = phone ? { phone } : { email };
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  // upsert는 update와 insert 합친 기능 찾아서 업데이트하거나 없으면 생성하는데
  // 여기선 찾기만 하거나 생성하기만 해서 update를 빈객체 전달
  // const user = await client.user.upsert({
  //   where: {
  //     ...payload,
  //   },
  //   create: {
  //     name: "Anonymous",
  //     ...payload,
  //   },
  //   update: {},
  // });

  const token = await client.token.create({
    data: {
      payload,
      user: {
        // connectOrCreate으로 관계가 있는 애를 찾거나 생성할 수 있다. connect는 기존에 있는 user를 찾기만 할 것이고, create는 만들기만 한다.
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_SERVICE_ID,
    //   to: process.env.TWILIO_PHONE!,
    //   body: `Your login token is ${payload}`,
    // });
    // console.log(message);
  }
  res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
