import { format } from "date-fns";
import { Mail, Smartphone, File } from "lucide-react";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import AccentBar from "~/lib/components/AccentBar";
import Layout from "~/lib/components/Layout";
import { Title } from "~/lib/components/Title";
import TrainingCard from "~/lib/components/TrainingCard";
import type { Contact, DurationEntry, TrainingEntry } from "~/lib/types";
import { db } from "~/server/db";

type Props = {
  trainings: TrainingEntry[];
  holidays: DurationEntry;
  contact: Contact;
};

type TrainingDayKey =
  | "1Monday"
  | "2Tuesday"
  | "3Wednesday"
  | "4Thursday"
  | "5Friday"
  | "6Saturday"
  | "7Sunday";

type TargetKey =
  | "Licensed"
  | "LowerLeagues"
  | "UpperLeagues"
  | "All"
  | "FreePlay";

const Adults = ({ trainings, holidays, contact }: Props) => {
  const t = useTranslations("Training.Adults");

  return (
    <Layout>
      <Title>{t("title")}</Title>

      <div className="flex flex-col place-items-center justify-center md:grid md:grid-cols-2">
        <div className="relative m-8 mb-0 flex w-[300px] flex-col gap-4 bg-white p-8 shadow-md md:col-span-2 md:w-[664px] md:place-self-center lg:w-[864px]">
          {t.rich("desc", {
            a: (chunks) => (
              <Link
                className="font-semibold underline hover:text-picton-blue-500"
                href="/#salle"
              >
                {chunks}
              </Link>
            ),
            p: (chunks) => <p>{chunks}</p>,
          })}
          <AccentBar />
        </div>

        {trainings.map((training, i) => (
          <TrainingCard
            key={training.id}
            className={
              i % 2 === 0
                ? "mt-8 md:place-self-end"
                : "md:mt-8 md:place-self-start"
            }
            time={{
              start: training.time,
              day: t(training.day as TrainingDayKey),
            }}
            trainer={training.trainer}
            target={t(training.target as TargetKey)}
          />
        ))}

        <div className="relative m-8 mt-0 flex h-[200px] w-[300px] flex-col gap-6 bg-white p-8 shadow-md md:col-span-2 md:h-[200px] md:w-[664px] md:place-self-center lg:w-[864px]">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">{t("contact.title")}</h2>
            <span>{contact.name}</span>
          </div>
          <div className="grid grid-cols-2 place-items-center justify-center ">
            <Link
              className="mb-2 hover:text-picton-blue-500"
              href="/club/contact"
            >
              <Mail />
            </Link>
            <Smartphone className="mb-2" />
            <Link className="hover:text-picton-blue-500" href="/club/contact">
              Email
            </Link>
            <span>{contact.phone}</span>
          </div>
          <AccentBar />
        </div>

        <div className="relative m-8 mt-0 flex h-[350px] w-[300px] flex-col gap-6 bg-white p-8 shadow-md md:col-span-2 md:h-[275px] md:w-[664px] md:place-self-center lg:w-[864px]">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">{t("holidays.title")}</h2>
            <p className="mb-4">{t("holidays.desc")}</p>
            <a
              href={holidays.link}
              className="flex flex-row gap-1 hover:text-picton-blue-500"
              target="_blank"
            >
              <File /> {t("holidays.file")}
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">
              {t("holidays.seasonDuration")}
            </h2>
            <span>
              {holidays.start} {t("holidays.until")} {holidays.end}
            </span>
          </div>
          <AccentBar />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;

  const trainings = await db.training.findMany({
    orderBy: { day: "asc" },
    where: {
      type: "Adults",
    },
  });

  const holidaysRaw = await db.seasonDuration.findFirst();

  const holidays = holidaysRaw
    ? {
        ...holidaysRaw,
        start: format(holidaysRaw.start, "dd.MM.yyyy"),
        end: format(holidaysRaw.end, "dd.MM.yyyy"),
      }
    : { start: "", end: "", link: "", id: "" };

  const contact = await db.contact.findFirst({
    where: { position: "AdultsTraining" },
  });

  return {
    props: {
      messages: messages.default,
      trainings,
      holidays,
      contact,
    },
    revalidate: 604800,
  };
}

export default Adults;
