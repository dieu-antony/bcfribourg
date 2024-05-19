import { NextApiRequest, NextApiResponse } from "next";
import { CalendarEventWithoutID } from "~/lib/utils/parseCalender";
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
        const calendarEvents: CalendarEventWithoutID[] = JSON.parse(req.body);

        if (calendarEvents.length === 0) {
          return res
            .status(400)
            .json({ status: "error", message: "No events provided" });
        }

        try {
          const existingEvents = await db.calendarEvent.findMany({
            where: {
              uid: { in: calendarEvents.map((event) => event.uid) },
            },
          });

          const existingEventIds = existingEvents.map((event) => event.uid);

          const eventsToUpdate = calendarEvents.filter((event) =>
            existingEventIds.includes(event.uid),
          );

          const eventsToCreate = calendarEvents.filter(
            (event) => !existingEventIds.includes(event.uid),
          );

          if (eventsToUpdate.length > 0) {
            await Promise.all(
              eventsToUpdate.map(async (event) => {
                const existingEvent = existingEvents.find(
                  (e) => e.uid === event.uid,
                );

                if (existingEvent) {
                  await db.calendarEvent.update({
                    where: { uid: event.uid },
                    data: {
                      summary: event.summary,
                      location: event.location,
                      start: new Date(event.start),
                      eventType: event.eventType,
                      longitude: event.longitude,
                      latitude: event.latitude,
                      end: new Date(event.end),
                    },
                  });
                }
              }),
            );
          }
          console.log("events to create" + eventsToCreate);
          if (eventsToCreate.length > 0) {
            await db.calendarEvent.createMany({
              data: eventsToCreate.map((event) => ({
                uid: event.uid,
                summary: event.summary,
                url: event.url,
                location: event.location,
                start: new Date(event.start),
                eventType: event.eventType,
                longitude: event.longitude,
                latitude: event.latitude,
                end: new Date(event.end),
              })),
            });
          }

          res.status(200).json({
            status: "success",
            message: calendarEvents.length + " events successfully created",
            data: calendarEvents,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            status: "error",
            message: "An error occured creating the events.",
          });
        }
      },
    });
  } else {
    res.status(401).json({ status: "error", message: "Unauthorized" });
  }
}
