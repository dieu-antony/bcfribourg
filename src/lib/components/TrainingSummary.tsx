import { MapPin } from "lucide-react";
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
  FreePlay: "FreePlay",
};

const GROUP_BADGE: Record<GroupKey, string> = {
  Adults: "bg-picton-blue-700 text-white",
  Juniors: "bg-picton-blue-100 text-picton-blue-700",
  FreePlay: "border border-gray-300 text-gray-500",
};

type Props = {
  trainings: TrainingEntry[];
  holidays: SeasonDuration;
  className?: string;
};

const TrainingSummary = ({ trainings, holidays, className }: Props) => {
  const t = useTranslations("Index.trainings");
  const tt = useTranslations("Training");

  const day = (key: TrainingDayKey) =>
    tt(`Adults.${key}`);

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
        "flex w-full flex-col items-center justify-center p-8 relative overflow-hidden pb-12",
        className,
      )}
    >
      <div className="flex w-full max-w-[1000px] flex-col items-start justify-between p-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2 place-self-start">
          <h2 id="training-summary-heading" className="text-2xl font-extrabold">
            {t("title")}
          </h2>
          <p className="text-md text-gray-700">
            {t("subtitle") + " " + holidays.start.toString() + " - " + holidays.end.toString() + "."}
          </p>
        </div>
        <Link
          href="/club/contact"
          className="mt-2 flex gap-2 rounded-md border-2 border-picton-blue-700 p-2 text-lg font-semibold text-picton-blue-700 hover:bg-picton-blue-700 hover:text-white"
        >
          {t("cta")}
        </Link>
      </div>

      <div className="aria-hidden:true pointer-events-none absolute inset-0 -z-10 select-none">
        <Image
          src="/training_bg.jpg"
          alt="Badminton Club Fribourg Badminton Fribourg"
          fill
          aria-hidden="true"
          className="object-cover opacity-20 grayscale"
        />
      </div>

      <div className="relative mt-4 w-full max-w-[1000px] bg-white p-6 shadow-md md:mt-8 md:p-8">
        <ul className="divide-y divide-gray-100">
          {grouped.map(({ day: dayKey, sessions }) => (
            <li
              key={dayKey}
              className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-4"
            >
              <div>
                <p className="font-semibold text-gray-900">{day(dayKey)}</p>
                <span
                  aria-hidden={dayKey !== nextDay}
                  className={cn(
                    "mt-1 inline-block rounded-full bg-picton-blue-100 px-2 py-0.5 text-xs font-semibold text-picton-blue-700",
                    dayKey !== nextDay && "invisible",
                  )}
                >
                  {t("next")}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {sessions.map((session) => {
                  const group = TARGET_GROUP[session.target] ?? "Adults";
                  return (
                    <div
                      key={session.id}
                      className="grid gap-x-3 gap-y-1 sm:grid-cols-[6rem_minmax(0,1fr)_auto] sm:items-center"
                    >
                      <span className="text-sm tabular-nums text-gray-500">
                        {session.time}
                      </span>
                      <span className="text-gray-800">
                        {target(session.target)}
                      </span>
                      <Link
                        href={`/training/${group === "FreePlay" ? "free_play" : group.toLowerCase()}`}
                        className={cn(
                          "justify-self-start whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold",
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
          ))}
        </ul>
        <AccentBar />
      </div>

      <p className="mt-5 flex w-full max-w-[1000px] flex-wrap items-center gap-2 px-4 text-sm text-gray-700">
        <MapPin className="h-4 w-4 shrink-0 text-picton-blue-500" aria-hidden />
        <span>{t("venue")}</span>
        <Link
          href="/#salle"
          className="font-semibold text-picton-blue-700 underline underline-offset-2 hover:text-picton-blue-500"
        >
          {t("directions")}
        </Link>
      </p>
    </section>
  );
};

export default TrainingSummary;
