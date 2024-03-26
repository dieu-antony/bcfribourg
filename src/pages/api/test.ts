import { RouteHandler } from "~/lib/utils/routeHandler";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>,
) {
  await RouteHandler(req, res, {
    POST: function (req, res: NextApiResponse<string>) {
      res.send("öaslydjföljkasdfölkj");
    },
  });
}
