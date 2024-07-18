import { Mail, Smartphone, File } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import TrainingCard from "~/lib/components/TrainingCard";
import { loadTranslationMessages } from "~/lib/utils/utils";

const adults = () => {
  const t = useTranslations("Training.Adults");

  return (
    <>
      <div className="flex flex-col place-items-center justify-center md:grid md:grid-cols-2">
        <TrainingCard
          className="mt-8 transition duration-200 hover:translate-x-1 md:place-self-end"
          time={{ start: "18h00 - 20h00", day: t("monday18.title") }}
          trainer="Manuel Helfer"
          target={t("monday18.description")}
        />
        <TrainingCard
          className="transition duration-200 hover:translate-x-1 md:mt-8 md:place-self-start"
          time={{ start: "20h00 - 22h00", day: t("monday20.title") }}
          trainer="Manuel Helfer"
          target={t("monday20.description")}
        />
        <TrainingCard
          className="transition duration-200 hover:translate-x-1 md:place-self-end"
          time={{ start: "20h00 - 22h00", day: t("wednesday20.title")}}
          trainer="Anna Lartchenko-Fischer"
          target={t("wednesday20.description")}
        />
        <TrainingCard
          className="transition duration-200 hover:translate-x-1 md:place-self-start"
          time={{ start: "19h00 - 21h00", day: t("thursday19.title") }}
          trainer="Anna Lartchenko-Fischer"
          target={t("thursday19.description")}
        />
        <div className="m-8  mt-0 flex h-[200px] w-[300px] flex-col gap-4 bg-white p-8 shadow-sm transition duration-200 hover:translate-x-1 md:place-self-end lg:h-[300] lg:w-[400px]">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">{t("holidays.title")}</h1>
            <a
              href="https://www.fr.ch/sites/default/files/2020-06/calendrier-majoritaire-202425.pdf"
              className="flex flex-row gap-1 hover:text-picton-blue-500"
              target="_blank"
            >
              <File /> {t("holidays.file")}
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">{t("holidays.seasonDuration")}</h1>
            <span>26.08.2024 {t("holidays.until")} 26.06.2025</span>
          </div>
        </div>
        <div className="m-8 mt-0 flex h-[200px] w-[300px] flex-col gap-6 bg-white p-8 shadow-sm transition duration-200 hover:translate-x-1 md:place-self-start lg:h-[300] lg:w-[400px]">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">{t("contact.title")}</h1>
            <span>Philippe Etter</span>
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
            <span>079 488 15 38</span>
          </div>
        </div>
      </div>
    </>
  );
};
export async function getStaticProps({ locale }: { locale: string }) {
  const messages = await loadTranslationMessages(locale);
  return {
    props: {
      messages,
    },
  };
}

export default adults;
