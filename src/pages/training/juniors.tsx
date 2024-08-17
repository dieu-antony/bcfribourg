import { Mail, Smartphone, File } from "lucide-react";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Layout from "~/lib/components/Layout";
import { Title } from "~/lib/components/Title";
import TrainingCard from "~/lib/components/TrainingCard";

const Juniors = () => {
  const t = useTranslations("Training.Juniors");
  return (
    <Layout>
      <Title>{t("title")}</Title>
      <div className="flex flex-col place-items-center justify-center md:grid md:grid-cols-2">
        <TrainingCard
          className="mt-8 md:place-self-end"
          time={{ start: "18h00 - 20h00", day: t("tuesday1.title") }}
          trainer={t("tuesday1.trainer")}
          target={t("tuesday1.description")}
        />
        <TrainingCard
          className="md:mt-8 md:place-self-start"
          time={{ start: "18h00 - 20h00", day: t("tuesday2.title") }}
          trainer={t("tuesday2.trainer")}
          target={t("tuesday2.description")}
        />
        <TrainingCard
          className="md:place-self-end"
          time={{ start: "18h00 - 20h00", day: t("thursday18.title") }}
          trainer={t("thursday18.trainer")}
          target={t("thursday18.description")}
        />
        <div className="m-8 mt-0 flex h-[200px] w-[300px] flex-col gap-4 bg-white p-8 shadow-md md:place-self-start lg:h-[300] lg:w-[400px]">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">{t("holidays.title")}</h2>
            <a
              href="https://www.fr.ch/sites/default/files/2024-08/calendrier-majoritaire-202425.pdf"
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
            <span>26.08.2024 {t("holidays.until")} 26.06.2025</span>
          </div>
        </div>
        <div className="m-8 mt-0 flex h-[200px] w-[300px] flex-col gap-6 bg-white p-8 shadow-md md:place-self-end lg:h-[300] lg:w-[400px]">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">{t("contact.title")}</h2>
            <span>Antony Dieu</span>
          </div>
          <div className="grid grid-cols-2 place-items-center justify-center">
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
            <span>078 692 53 87</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;

  return {
    props: {
      messages: messages.default,
    },
  };
}

export default Juniors;
