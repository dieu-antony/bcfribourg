import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AccentBar from "~/lib/components/AccentBar";
import { cn } from "~/lib/utils/utils";
import type { TrainingEntry } from "~/lib/types";
import type { SeasonDuration } from "@prisma/client";
import Image from "next/image";

type TrainingDayKey =
  | "1Monday"
  | "2Tuesday"
  | "3Wednesday"
  | "4Thursday"
  | "5Friday"
  | "6Saturday"
  | "7Sunday";

type GroupKey = "Adults" | "Juniors" | "FreePlay";

const DAY_ORDER: TrainingDayKey[] = [
  "1Monday",
  "2Tuesday",
  "3Wednesday",
  "4Thursday",
  "5Friday",
  "6Saturday",
  "7Sunday",
];

const TARGET_GROUP: Record<string, GroupKey> = {
  LowerLeagues: "Adults",
  UpperLeagues: "Adults",
  Licensed: "Adults",
  LowLeagues: "Adults",
  Unlicensed: "Adults",
  All: "Adults",
  JuniorsOlder: "Juniors",
  JuniorsYounger: "Juniors",
  JuniorsAll: "Juniors",
  JuniorsAdvanced: "Juniors",
  FreePlay: "FreePlay",
};

const GROUP_BADGE: Record<GroupKey, string> = {
  Adults:
    "bg-picton-blue-700 text-white hover:bg-picton-blue-800 focus-visible:ring-picton-blue-700",
  Juniors:
    "bg-picton-blue-100 text-picton-blue-700 hover:bg-picton-blue-200 focus-visible:ring-picton-blue-500",
  FreePlay:
    "border border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50 focus-visible:ring-gray-400",
};

// Small coloured dot in front of the session, so groups are scannable at a glance
const GROUP_DOT: Record<GroupKey, string> = {
  Adults: "bg-picton-blue-700",
  Juniors: "bg-picton-blue-300",
  FreePlay: "bg-gray-300",
};

type Props = {
  trainings: TrainingEntry[];
  holidays: SeasonDuration;
  className?: string;
};

const TrainingSummary = ({ trainings, holidays, className }: Props) => {
  const t = useTranslations("Index.trainings");
  const tt = useTranslations("Training");

  const day = (key: TrainingDayKey) => tt(`Adults.${key}`);

  const target = (value: string) => {
    const group = TARGET_GROUP[value];
    if (!group) return value;
    return tt(`${group}.${value}`);
  };

  const grouped = useMemo(
    () =>
      DAY_ORDER.map((key) => ({
        day: key,
        sessions: trainings.filter((session) => session.day === key),
      })).filter((group) => group.sessions.length > 0),
    [trainings],
  );

  const [todayIndex, setTodayIndex] = useState<number | null>(null);

  useEffect(() => {
    setTodayIndex((new Date().getDay() + 6) % 7);
  }, []);

  const nextDay = useMemo(() => {
    if (todayIndex === null) return null;
    for (let offset = 0; offset < 7; offset++) {
      const key = DAY_ORDER[(todayIndex + offset) % 7];
      if (key && grouped.some((group) => group.day === key)) return key;
    }
    return null;
  }, [todayIndex, grouped]);

  if (grouped.length === 0) return null;

  return (
    <section
      aria-labelledby="training-summary-heading"
      className={cn(
        "relative flex w-full flex-col items-center overflow-hidden px-4 py-14 sm:px-8 md:py-20",
        className,
      )}
    >
      {/* Background: faded photo + soft gradient so the card always pops */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 select-none"
      >
        <Image
          src="/training_bg.jpg"
          alt=""
          fill
          className="object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b opacity-50 from-white via-white/60 to-picton-blue-50" />
      </div>

      {/* Header */}
      <div className="flex w-full max-w-[1000px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-picton-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-picton-blue-700">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            {holidays.start.toString()} – {holidays.end.toString()}
          </span>
          <h2
            id="training-summary-heading"
            className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="max-w-xl text-base text-gray-700">{t("subtitle")}</p>
        </div>

        <Link
          href="/club/contact"
          className="group inline-flex items-center justify-center gap-2 self-start rounded-md bg-picton-blue-700 px-5 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-picton-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-picton-blue-700 focus-visible:ring-offset-2 sm:self-auto"
        >
          {t("cta")}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>

      {/* Schedule card */}
      <div className="relative mt-8 w-full max-w-[1000px] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5">
        <ul className="divide-y divide-gray-100">
          {grouped.map(({ day: dayKey, sessions }) => {
            const isNext = dayKey === nextDay;
            return (
              <li
                key={dayKey}
                className={cn(
                  "relative grid gap-3 px-5 py-5 transition-colors md:grid-cols-[10rem_minmax(0,1fr)] md:gap-6 md:px-8",
                  isNext ? "bg-picton-blue-50/70" : "hover:bg-gray-50/70",
                )}
              >
                {/* Accent stripe on the next training day */}
                {isNext && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 bg-picton-blue-700"
                  />
                )}

                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1.5">
                  <p
                    className={cn(
                      "text-lg font-bold",
                      isNext ? "text-picton-blue-800" : "text-gray-900",
                    )}
                  >
                    {day(dayKey)}
                  </p>
                  <span
                    aria-hidden={!isNext}
                    className={cn(
                      "inline-block rounded-full bg-picton-blue-700 px-2.5 py-0.5 text-xs font-semibold text-white",
                      !isNext && "invisible hidden md:inline-block",
                    )}
                  >
                    {t("next")}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {sessions.map((session) => {
                    const group = TARGET_GROUP[session.target] ?? "Adults";
                    return (
                      <div
                        key={session.id}
                        className="grid items-center gap-x-4 gap-y-2 rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-sm sm:grid-cols-[8rem_minmax(0,1fr)_auto]"
                      >
                        <span className="inline-flex items-center gap-2 text-sm font-semibold tabular-nums text-gray-900">
                          <Clock
                            className="h-4 w-4 text-picton-blue-500"
                            aria-hidden
                          />
                          {session.time}
                        </span>
                        <span className="flex items-center gap-2 text-gray-800">
                          <span
                            aria-hidden="true"
                            className={cn(
                              "h-2 w-2 shrink-0 rounded-full",
                              GROUP_DOT[group],
                            )}
                          />
                          {target(session.target)}
                        </span>
                        <Link
                          href={`/training/${group === "FreePlay" ? "free_play" : group.toLowerCase()}`}
                          className={cn(
                            "justify-self-start whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 sm:justify-self-end",
                            GROUP_BADGE[group],
                          )}
                        >
                          {t(`group.${group}`)}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Venue footer, inside the card */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-gray-100 bg-gray-50 px-5 py-4 text-sm text-gray-700 md:px-8">
          <MapPin
            className="h-4 w-4 shrink-0 text-picton-blue-500"
            aria-hidden
          />
          <span>{t("venue")}</span>
          <Link
            href="/#salle"
            className="inline-flex items-center gap-1 font-semibold text-picton-blue-700 underline-offset-2 hover:text-picton-blue-500 hover:underline"
          >
            {t("directions")}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <AccentBar />
      </div>
    </section>
  );
};

export default TrainingSummary;
