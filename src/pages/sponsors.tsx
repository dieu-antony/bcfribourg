import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Layout from "~/lib/components/Layout";
import Sponsor from "~/lib/components/Sponsor";

export default function Sponsors() {
  const t = useTranslations("Sponsors");
  return (
    <Layout>
      <div className="flex w-full flex-col items-center">
        <div className="h-12 w-full bg-picton-blue-500 my-8">
          <h1 className="pt-2 text-center text-3xl font-bold text-white">
            {t("title")}
          </h1>
        </div>
        <div className="mx-5 mb-8 max-w-[1100px]">
          <div className="bg-white p-8 shadow-md">
            <section className="hidden text-center">
              <h2 className="text-2xl font-bold text-picton-blue-500">
                {t("main")}
              </h2>
              <div>
                <div className="h-[200px]" />
              </div>
            </section>
            <section className="hidden text-center">
              <h2 className="text-2xl font-bold text-picton-blue-500">
                {t("important")}
              </h2>
              <div className="grid grid-cols-2 items-center justify-center gap-4 text-center md:grid-cols-3">
                <div className="h-[200px]" />
              </div>
            </section>
            <section className="text-center">
              <h2 className="text-2xl font-bold text-picton-blue-500">
                {t("support")}
              </h2>
              <div className="mt-8 grid grid-cols-2 items-center justify-center gap-4 text-center md:grid-cols-3">
                <Sponsor name="SINEF" file="svg" link="https://www.sinef.ch/" />
                <Sponsor
                  name="Frimousse"
                  file="png"
                  link="https://www.fri-mousse.ch/wp/"
                />
              </div>
            </section>
          </div>
          <section className="mt-8 flex flex-col gap-8 bg-white p-8 text-center shadow-md">
            <h3 className="text-2xl font-bold">{t("subtitle")}</h3>
            <p className="text-lg">{t("desc")} </p>
            <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div>
                <h3 className="my-4 text-xl font-bold text-picton-blue-500">
                  {t("main")}
                </h3>
                <ul className="flex list-disc flex-col gap-3 text-left font-sans text-black">
                  <li>{t("mainli1")}</li>
                  <li>{t("mainli2")}</li>
                  <li>{t("mainli3")}</li>
                  <li>{t("mainli4")}</li>
                  <li>{t("mainli5")}</li>
                  <li>{t("mainli6")}</li>
                </ul>
              </div>
              <div>
                <h3 className="my-4 text-xl font-bold text-picton-blue-500">
                  {t("important")}
                </h3>
                <ul className="flex list-disc flex-col gap-3 text-left text-black">
                  <li>{t("importantli1")}</li>
                  <li>{t("importantli2")}</li>
                  <li>{t("importantli3")}</li>
                </ul>
              </div>
              <div>
                <h3 className="my-4 text-xl font-bold text-picton-blue-500">
                  {t("support")}
                </h3>
                <ul className="flex list-disc flex-col gap-3 text-left text-black">
                  <li>{t("supportli1")}</li>
                  <li>{t("supportli2")}</li>
                </ul>
              </div>
            </section>
          </section>
        </div>
      </div>
    </Layout>
  );
}
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`) as IntlMessages).default,
    },
  };
}
