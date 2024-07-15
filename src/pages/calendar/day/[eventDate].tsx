import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { CalendarEvent } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/lib/components/ui/accordion";
import { ArrowUpRightFromSquareIcon } from "lucide-react";
import { Button } from "~/lib/components/ui/button";

export default function EventDayPage() {
  const router = useRouter();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const queryDate = router.query.eventDate as string;

  // Fetch events from the API
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

  // Check for events to display the event or a 404 message
  if (events.length != 0) {
    return (
      <div className="mx-4 mt-8 max-w-[1000px] bg-white p-4 lg:mt-16">
        <p className="text-xl font-semibold text-picton-blue-500">
          {router.query.eventDate}
        </p>

        <Accordion type="single" collapsible>
          {events.map((event) => (
            <AccordionItem key={event.id} value={event.id}>
              <AccordionTrigger>{event.summary}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <p>
                  <span className="font-semibold">Lieu:</span> {event.location}
                </p>
                <a
                  href={`/calendar/event/${event.id}`}
                  className="flex flex-row items-center gap-1 hover:underline"
                >
                  <ArrowUpRightFromSquareIcon className="h-4 w-4" />
                  Détails
                </a>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }

  return (
    <div className="mt-40 flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 className="text-9xl font-bold">404</h1>
      <p>Sorry, there are no events on this day</p>
      <Button
        onClick={() => router.back()}
        className="hover:opacity-80"
      >
        Return
      </Button>
    </div>
  );
}
