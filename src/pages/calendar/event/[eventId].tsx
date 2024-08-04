import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import type { CalendarEvent } from "@prisma/client";
import Map from "~/lib/components/interactiveMap/Map";
import { EmbedGoogleMap } from "~/lib/components/interactiveMap/EmbedGoogleMap";
import { SquareArrowOutUpRight } from "lucide-react";
import { format } from "date-fns";
import { Separator } from "~/lib/components/ui/separator";
import { useDimensions } from "~/lib/hooks/useDimensions";
import { Button } from "~/lib/components/ui/button";
import type { GetStaticPaths, GetStaticProps } from "next";
import Layout from "~/lib/components/Layout";
import { useTranslations } from "next-intl";

type EventPageProps = {
  initialResources: CalendarEvent[];
};

const EventPage = ({ initialResources }: EventPageProps) => {
  const t = useTranslations("Calendar");

  const router = useRouter();
  const [events, setEvents] = useState<CalendarEvent[]>(initialResources);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSize = useDimensions(chartRef);
  const [loading, setLoading] = useState(false);

  // Fetch events from the API
  useEffect(() => {
    if (!router.isReady) return;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/events");
        const data: { status: string; events: CalendarEvent[] } =
          await response.json();

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
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchEvents();
  }, [router.isReady]);

  // Check if the event exists
  const eventExists = events.find((elem) => elem.id === router.query.eventId);
  const event = events.find((elem) => elem.id === router.query.eventId);

  if (loading) {
    return (
      <Layout>
        <span />
      </Layout>
    );
  }
  // Check for events to display the event or a 404 message
  if (
    eventExists != null &&
    event?.location != "Switzerland" &&
    event?.location != "Av. du Général-Guisan 61a, 1700, Fribourg, Switzerland"
  ) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center md:m-8 md:flex-row ">
          <div className="flex flex-col items-center">
            <h1 className="mt-4 rounded-sm bg-picton-blue-400 p-2 font-semibold shadow-sm">
              {event?.summary ?? ""}
            </h1>
            <div ref={chartRef} className="h-[610px] w-full max-w-[975px]">
              <Map
                location={event?.location?.toString() ?? ""}
                latitude={event?.latitude ?? 46.81177897206209}
                longitude={event?.longitude ?? 7.147400994098687}
                width={chartSize.width}
                height={chartSize.width * 0.61803398875}
              />
            </div>
          </div>
          <aside className="flex flex-col bg-white p-6 shadow-md">
            <div className="flex flex-col">
              <h1 className="bg-picton-blue-400 p-2 shadow-sm">
                {/*{t("details")}*/} details
              </h1>
              <h2 className="ml-1 mt-2 font-bold">{/*t("start")*/}start</h2>
              <p className="ml-1">{format(event?.start ?? "", "HH:mm")}</p>
              <Separator className="my-2 bg-black" />
              <h2 className="ml-1 font-bold">{t("end")}</h2>
              <p className="ml-1">{format(event?.end ?? "", "HH:mm")}</p>
              <Separator className="my-2 bg-black" />
              <h2 className="ml-1 mt-2 font-bold">{t("link")}</h2>
              <a
                href={event?.url}
                className="ml-1 flex items-center gap-1 hover:underline"
                target="_blank"
              >
                <SquareArrowOutUpRight className="size-5" />
                {new URL(event!.url).host}
              </a>
              <Separator className="my-2 bg-black" />
              <h2 className="ml-1 mt-2 font-bold">{t("location")}</h2>
              <p className="ml-1">{event?.location}</p>
            </div>
            <EmbedGoogleMap
              latitude={event?.latitude ?? 46.81177897206209}
              longitude={event?.longitude ?? 7.147400994098687}
              className="mt-2 h-[400px] w-[400px] border-0"
            />
          </aside>
        </div>
      </Layout>
    );
  } else if (
    event?.location ===
      "Av. du Général-Guisan 61a, 1700, Fribourg, Switzerland" ||
    event?.location === "Switzerland"
  ) {
    return (
      <Layout>
        <div className="m-8 flex flex-col items-center justify-center xl:flex-row ">
          <div className="m-2 flex flex-col items-center">
            <h1 className="rounded-sm bg-picton-blue-400 p-2 font-semibold">
              {event?.summary}
            </h1>
            <div ref={chartRef} className="m-2 hidden min-w-[1px] xl:block">
              <Map
                location={event?.location?.toString() ?? ""}
                latitude={event?.latitude ?? 46.81177897206209}
                longitude={event?.longitude ?? 7.147400994098687}
                width={chartSize.width}
                height={chartSize.width * 0.61803398875}
              />
            </div>
          </div>
          <aside className="flex flex-col bg-white p-6">
            <div className="flex flex-col">
              <h1 className="bg-picton-blue-400 p-2">{t("details")}</h1>
              <h2 className="ml-1 mt-2 font-bold">{t("start")}</h2>
              <p className="ml-1">{format(event?.start ?? "", "HH:mm")}</p>
              <Separator className="my-2 bg-black" />
              <h2 className="ml-1 font-bold">{t("end")}</h2>
              <p className="ml-1">{format(event?.end ?? "", "HH:mm")}</p>
              <Separator className="my-2 bg-black" />
              <h2 className="ml-1 mt-2 font-bold">{t("link")}</h2>
              <a
                href={event?.url}
                className="ml-1 flex items-center gap-1 hover:underline"
                target="_blank"
              >
                <SquareArrowOutUpRight className="size-5" />
                {new URL(event.url).host}
              </a>
              <Separator className="my-2 bg-black" />
              <h2 className="ml-1 mt-2 font-bold">{t("location")}</h2>
              <p className="ml-1">{event?.location}</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1694.185361353271!2d7.1470027257841755!3d46.81204182530239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e77f032055555%3A0x4e14f509540705e5!2sBadminton%20Club%20Fribourg!5e1!3m2!1sen!2sch!4v1714296481160!5m2!1sen!2sch"
              className="mt-2 max-h-[400px] min-h-[300px] max-w-[400px] border-0"
              loading="lazy"
            />
          </aside>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mt-40 flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-9xl font-bold">404</h1>
        <p>Sorry, the event you are looking for does not exist</p>
        <Button
          onClick={() => router.push("/calendar")}
          className="hover:opacity-80"
        >
          Return
        </Button>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
  const data: { status: string; events: CalendarEvent[] } =
    await response.json();
  const eventDates = data.events.map((event: CalendarEvent) => event.id);

  const paths = eventDates.flatMap(
    (id: string) =>
      locales?.map((locale) => ({
        params: { eventId: id },
        locale,
      })) ?? [],
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
  const data = await response.json();

  return {
    props: {
      messages,
      initialResources: data.events,
    },
  };
};

export default EventPage;
