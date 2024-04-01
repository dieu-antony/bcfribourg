import { RouteHandler } from "~/lib/utils/routeHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>,
) {
  await RouteHandler(req, res, {
    GET: async function (req, res: NextApiResponse) {
      const events = await db.calendarEvent.findMany();
      res.status(200).json({status: "success", events: events});
    },
  });
}
