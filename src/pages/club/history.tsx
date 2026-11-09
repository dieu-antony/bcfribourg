import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/lib/components/ui/accordion";
import ScrollToTop from "~/lib/components/ScrollToTop";
import HistoryCard from "~/lib/components/HistoryCard";
import HonoraryMembers from "~/lib/components/HonoraryMembers";
import { useTranslations } from "next-intl";
import Layout from "~/lib/components/Layout";
import { useMemo } from "react";
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

  const sortedDecades = useMemo(
    () =>
      Object.entries(groupedEvents).sort(
        ([a], [b]) => parseInt(a) - parseInt(b),
      ),
    [groupedEvents],
  );

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-6 px-5 pb-12 pt-8">
        {/* Intro */}
        <section className="rounded border-l-4 border-picton-blue-500 bg-white p-5 shadow-md sm:p-6">
          <h1 className="text-3xl font-bold text-picton-blue-500">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-prose leading-relaxed text-slate-700">
            {t("description")}
          </p>
        </section>

        {/* Honorary members */}
        <HonoraryMembers
          title={t("honorary.title")}
          description={t("honorary.desc")}
        />

        {/* Timeline */}
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full overflow-hidden rounded bg-white shadow-md"
        >
          {sortedDecades.map(([decade, events], idx) => (
            <AccordionItem key={decade} value={`item-${idx + 1}`}>
              <AccordionTrigger className="px-6 text-lg font-semibold text-slate-900 hover:bg-slate-50 hover:no-underline">
                {decade}
              </AccordionTrigger>
              <AccordionContent>
                <div className="relative ml-9 mr-6 mt-2 border-l-2 border-slate-200 pb-4 sm:ml-12 sm:mr-10">
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
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;
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
