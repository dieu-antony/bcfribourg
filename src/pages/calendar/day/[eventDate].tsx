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
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import Layout from "~/lib/components/Layout";

type EventDayPageProps = {
  initialResources: CalendarEvent[];
};

const EventDayPage = ({ initialResources }: EventDayPageProps) => {
  const t = useTranslations("Calendar");
  const router = useRouter();
  const [events, setEvents] = useState<CalendarEvent[]>(initialResources);
  const queryDate = router.query.eventDate as string;
  const [loading, setLoading] = useState(false);

  // Fetch events from the API
  useEffect(() => {
    const fetchData = async () => {
      if (!router.isReady) return;
      setLoading(true);

      try {
        const res = await fetch(`/api/events/filter/${queryDate}`);
        const data: { status: "success" | "error"; events: CalendarEvent[] } =
          await res.json();

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
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [router.isReady, queryDate]);

  if (loading) {
    return (
      <Layout>
        <span />
      </Layout>
    );
  }

  // Check for events to display the event or a 404 message
  if (events.length !== 0) {
    return (
      <Layout>
        <div className="mx-4 mt-8 w-full max-w-[1000px] self-center bg-white p-4 shadow-md lg:mt-16">
          <p className="text-xl font-semibold text-picton-blue-500">
            {router.query.eventDate}
          </p>
          <Accordion type="single" collapsible>
            {events.map((event) => (
              <AccordionItem key={event.id} value={event.id}>
                <AccordionTrigger>{event.summary}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  <p>
                    <span className="font-semibold">{t("location")}:</span>{" "}
                    {event.location}
                  </p>
                  <Link
                    href={`/calendar/event/${event.id}`}
                    className="flex flex-row items-center gap-1 hover:underline"
                  >
                    <ArrowUpRightFromSquareIcon className="h-4 w-4" />
                    {t("details")}
                  </Link>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mt-40 flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-9xl font-bold">404</h1>
        <p>Sorry, there are no events on this day</p>
        <Button onClick={() => router.back()} className="hover:opacity-80">
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
  const eventDates = data.events.map((event: CalendarEvent) =>
    new Date(event.start).toDateString(),
  );

  const paths = eventDates.flatMap(
    (date) =>
      locales?.map((locale) => ({
        params: { eventDate: date },
        locale,
      })) ?? [],
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const messages = (
    (await import(`../../../../messages/${locale}.json`)) as IntlMessages
  ).default;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/events/filter/${params!.eventDate?.toString()}`,
  );
  const data: { status: string; events: CalendarEvent[] } =
    await response.json();

  return {
    props: {
      messages,
      initialResources: data.events,
    },
  };
};

export default EventDayPage;
