import { CalendarEvent } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "~/lib/utils/routeHandler";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>,
) {
  await RouteHandler(req, res, {
    POST: async function (req, res: NextApiResponse) {
      const calendarEvents : Omit<CalendarEvent, "id">[] = req.body;

    try {
        // Create entries in the database using Prisma
        await db.calendarEvent.createMany({
            data: calendarEvents.map((event: any) => ({
                // Map the properties of the event to the corresponding database fields
                // For example:
                title: event.title,
                description: event.description,
                uid: event.uid,
                summary: event.summary,
                url: event.url,
                start: event.start,
                // Add more properties as needed
            })),
        });

        res.status(200).end();
    } catch (error) {
        console.error("Error creating events:", error);
        res.status(500).end();
      }
    },
  });
}
