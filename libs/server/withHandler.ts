import { NextApiRequest, NextApiResponse } from "next";

export interface Response {
  ok: boolean;
  [key: string]: any;
}

type method = "GET" | "POST" | "DELETE";

interface Config {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void | Promise<any>;
  isPrivate?: boolean;
}

export default function withHandler({
  methods,
  handler,
  isPrivate = true,
}: Config) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method && !methods.includes(req.method as method)) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "need login" });
    }
    // if (!isPrivate && req.session.user) {
    //   return res.status(401).json({ ok: false, error: "don be accessed" });
    // }
    // 위에 부분은 api 쪽은 방어가 되지만 페이지에서는 처리가 안됨
    // console.log(isPrivate);
    // private인데 로그인해있는 경우
    // private인데 로그인하지 않은 경우 0
    // public인데 로그인해 있는 경우 0
    // public인데 로그인하지 않은 경우
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  };
}
