import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CalendarEvent } from "@prisma/client";
import { db } from "~/server/db";
export default function eventDayPage() {
  const router = useRouter();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          const newEvents = data.events.map((event: CalendarEvent) => ({
            ...event,
            id: event.id,
            start: event.start || new Date(event.start),
            end: event.end || new Date(event.end),
            title: event.summary,
            location: event.location,
            url: event.url,
            eventType: event.eventType,
            longitude: event.longitude,
            latitude: event.latitude,
          }));
          setEvents(newEvents);
        }
      });
  }, []);
const eventAtDay = db.calendarEvent.findMany({
    where: {
        start: new Date(),
    },
});
  if (null == null) {
    return <><p>{router.query.eventDate}</p></>;
  } else if (null != null) {
    return <></>;
  } else {
    return (
      <div className="mt-40 flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-9xl font-bold">404</h1>
        <p>Sorry, the event you are looking for does not exist</p>
      </div>
    );
  }
}
