import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { CalendarEvent } from "@prisma/client";
import Map from "~/lib/components/interactiveMap/Map";
import { EmbedGoogleMap } from "~/lib/components/interactiveMap/EmbedGoogleMap";
import { SquareArrowOutUpRight } from "lucide-react";
import { format } from "date-fns";
import { Separator } from "~/lib/components/ui/separator";

export default function eventPage() {
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
            start: event.start ?? new Date(event.start),
            end: event.end ?? new Date(event.end),
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
  const eventExists = events.find((elem) => elem.id === router.query.eventId);
  const event = events.find((elem) => elem.id === router.query.eventId);
  if (
    eventExists != null &&
    event?.location != "Switzerland" &&
    event?.location != "Av. du Général-Guisan 61a, 1700, Fribourg, Switzerland"
  ) {
    return (
      <div className="flex flex-col items-center justify-center md:m-8 md:flex-row ">
        <div className="flex flex-col items-center">
          <h1 className="rounded-sm bg-picton-blue-400 p-2 font-semibold">
            {event?.summary ?? ""}
          </h1>
          <Map
            location={event?.location?.toString() ?? ""}
            latitude={event?.latitude ?? 46.81177897206209}
            longitude={event?.longitude ?? 7.147400994098687}
          />
        </div>
        <aside className="flex flex-col bg-gray-200 p-6">
          <div className="flex flex-col">
            <h1 className="bg-picton-blue-400 p-2">Détails</h1>
            <h2 className="ml-1 mt-2 font-bold">Début</h2>
            <p className="ml-1">{format(event?.start ?? "", "HH:mm")}</p>
            <Separator className="my-2 bg-black" />
            <h2 className="ml-1 font-bold">Fin</h2>
            <p className="ml-1">{format(event?.end ?? "", "HH:mm")}</p>
            <Separator className="my-2 bg-black" />
            <h2 className="ml-1 mt-2 font-bold">Lien</h2>
            <a
              href={event?.url}
              className="ml-1 flex items-center gap-1 hover:underline"
              target="_blank"
            >
              <SquareArrowOutUpRight className="size-5" />
              Swiss Badminton
            </a>
            <Separator className="my-2 bg-black" />
            <h2 className="ml-1 mt-2 font-bold">Lieu</h2>
            <p className="ml-1">{event?.location}</p>
          </div>
          <EmbedGoogleMap
            latitude={event?.latitude ?? 46.81177897206209}
            longitude={event?.longitude ?? 7.147400994098687}
            className="mt-2 h-[400px] w-[400px] border-0"
          />
        </aside>
      </div>
    );
  } else if (
    event?.location === "Switzerland" ??
    event?.location === "Av. du Général-Guisan 61a, 1700, Fribourg, Switzerland"
  ) {
    return (
      <div className="flex flex-col items-center justify-center md:m-8 md:flex-row ">
        <div className="flex flex-col items-center">
          <h1 className="rounded-sm bg-picton-blue-400 p-2 font-semibold">
            {event?.summary}
          </h1>
          <Map
            location={event?.location?.toString() ?? ""}
            latitude={event?.latitude ?? 46.81177897206209}
            longitude={event?.longitude ?? 7.147400994098687}
          />
        </div>
        <aside className="flex flex-col bg-gray-200 p-6">
          <div className="flex flex-col">
            <h1 className="bg-picton-blue-400 p-2">Détails</h1>
            <h2 className="ml-1 mt-2 font-bold">Début</h2>
            <p className="ml-1">{format(event?.start ?? "", "HH:mm")}</p>
            <Separator className="my-2 bg-black" />
            <h2 className="ml-1 font-bold">Fin</h2>
            <p className="ml-1">{format(event?.end ?? "", "HH:mm")}</p>
            <Separator className="my-2 bg-black" />
            <h2 className="ml-1 mt-2 font-bold">Lien</h2>
            <a
              href={event?.url}
              className="ml-1 flex items-center gap-1 hover:underline"
              target="_blank"
            >
              <SquareArrowOutUpRight className="size-5" />
              Swiss Badminton
            </a>
            <Separator className="my-2 bg-black" />
            <h2 className="ml-1 mt-2 font-bold">Lieu</h2>
            <p className="ml-1">{event?.location}</p>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1694.185361353271!2d7.1470027257841755!3d46.81204182530239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e77f032055555%3A0x4e14f509540705e5!2sBadminton%20Club%20Fribourg!5e1!3m2!1sen!2sch!4v1714296481160!5m2!1sen!2sch"
            width="400"
            height="400"
            className="mt-2 border-0"
            loading="lazy"
          />
        </aside>
      </div>
    );
  } else {
    return (
      <div className="mt-40 flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-9xl font-bold">404</h1>
        <p>Sorry, the event you are looking for does not exist</p>
      </div>
    );
  }
}
