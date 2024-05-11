import { RouteHandler } from "~/lib/utils/routeHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>,
) {
  await RouteHandler(req, res, {
    GET: async function (req, res: NextApiResponse) {
      if (req.query.byDay) {
        const events = await db.calendarEvent.findMany({
          where: {
            start: {
              gte: new Date(req.query.byDay.toString()),
              lt: new Date(
                new Date(req.query.byDay.toString()).setDate(
                  new Date(req.query.byDay.toString()).getDate() + 1,
                ),
              ),
            },
          },
        });
        res.status(200).json({ status: "success", events: events });
      }
      else {
        res.status(400).json({ status: "error", message: "No day provided" });
      }
    },
  });
}
