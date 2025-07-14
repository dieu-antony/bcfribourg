import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/lib/components/ui/accordion";
import ScrollToTop from "~/lib/components/ScrollToTop";
import HistoryCard from "~/lib/components/HistoryCard";
import { useTranslations } from "next-intl";
import Layout from "~/lib/components/Layout";
import { useMemo, useCallback } from "react";
import type { GetStaticPropsContext } from "next";
import { db } from "~/server/db";
import type { HistoryEvent } from "@prisma/client";

type GroupedEvents = Record<
  string,
  {
    title: string;
    description: string;
    imgFile?: string | null;
  }[]
>;

type Props = {
  historyEvents: HistoryEvent[];
  rawEvents: Record<string, string>;
};

const History = ({ historyEvents, rawEvents }: Props) => {
  const t = useTranslations("History");

  const groupedEvents: GroupedEvents = useMemo(() => {
    const grouped: GroupedEvents = {};

    const firstDecadeLabel = "1969 - 1979";
    grouped[firstDecadeLabel] = [
      {
        title: t("events.start"),
        description: t("events.startDesc"),
      },
    ];

    historyEvents.forEach((event) => {
      if (event.year < 1969) return;

      const yearKey = event.year.toString();
      if (!(yearKey in rawEvents)) return;

      const decadeStart =
        event.year >= 1969 && event.year <= 1979
          ? 1969
          : Math.floor(event.year / 10) * 10;
      const decadeEnd = decadeStart + 9;
      const decadeLabel = `${decadeStart} - ${decadeEnd}`;

      if (!grouped[decadeLabel]) grouped[decadeLabel] = [];

      grouped[decadeLabel].push({
        title: yearKey,
        description: rawEvents[yearKey]!,
        imgFile: event.imageUrl,
      });
    });

    return grouped;
  }, [historyEvents, rawEvents, t]);

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Layout>
      <div className="mt-8 flex justify-center">
        <div className="m-5 mt-0 flex w-full max-w-[1000px] flex-col gap-4 rounded bg-white p-5 shadow-md">
          <h1 className="text-2xl font-bold text-picton-blue-500">
            {t("title")}
          </h1>
          <p>{t("description")}</p>
        </div>
      </div>

      <div className="mx-5 mb-8 w-full max-w-[1000px] self-center">
        <Accordion
          type="single"
          collapsible
          className="w-full rounded bg-white shadow-md"
        >
          {Object.entries(groupedEvents)
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([decade, events], idx) => (
              <AccordionItem key={decade} value={`item-${idx + 1}`}>
                <AccordionTrigger
                  className="justify-around"
                  onClick={scrollTop}
                >
                  {decade}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="relative w-full">
                    {events.map((item, index) => (
                      <HistoryCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        imgUrl={item.imgFile ?? undefined}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>

      <ScrollToTop />
    </Layout>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = await import(`../../../messages/${locale}.json`) as IntlMessages;
  const historyEvents = await db.historyEvent.findMany({
    orderBy: { year: "asc" },
  });

  return {
    props: {
      messages: messages.default,
      historyEvents,
      rawEvents: messages.default.History.events,
    },
    revalidate: 604800,
  };
}

export default History;
