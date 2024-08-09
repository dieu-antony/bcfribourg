import type { CalendarEvent } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "~/lib/utils/routeHandler";
import { db } from "~/server/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession( req, res, authOptions );
  if (session) {
  await RouteHandler(req, res, {
    POST: async function (req, res: NextApiResponse) {
      const calendarEvents = JSON.parse(req.body as string) as CalendarEvent[];

      try {
        const eventToDelete = await db.calendarEvent.findMany({
          where: {
            id: { in: calendarEvents.map((event) => event.id) },
          },
        });

        if (eventToDelete.length > 0) {
          await db.calendarEvent.deleteMany({
            where: {
              id: { in: eventToDelete.map((event) => event.id) },
            },
          });
        }

        res.status(200).json({
          status: "success",
          message: "Event successfully deleted.",
          data: calendarEvents,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          status: "error",
          message: "An error occured deleting the event.",
        });
      }
    },
  });
} else {
  res.status(401).json({ status: "error", message: "Unauthorized" });
}
}
