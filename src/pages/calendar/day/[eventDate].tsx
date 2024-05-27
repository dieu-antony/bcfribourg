import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { CalendarEvent } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/lib/components/ui/accordion";

export default function EventDayPage() {
  const router = useRouter();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const queryDate = router.query.eventDate as string;
  useEffect(() => {
    if (!router.isReady) return;
    fetch(`/api/events/filter/${queryDate}`)
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
  }, [router.isReady, queryDate]);

  if (events.length != 0) {
    return (
      <div>
        <p>{router.query.eventDate}</p>

        <Accordion type="single" collapsible>
          {events.map((event) => (
            <AccordionItem key={event.id} value={event.id}>
              <AccordionTrigger>{event.summary}</AccordionTrigger>
              <AccordionContent>
                <p>{event.location}</p>
                <a href={`/calendar/event/${event.id}`} className="hover:underline">Détails</a>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  } else if (events.length == 0) {
    return (
      <div className="mt-40 flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-9xl font-bold">404</h1>
        <p>Sorry, there are no events on this day</p>
      </div>
    );
  }
}
