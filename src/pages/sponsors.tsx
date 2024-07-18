import { useTranslations } from "next-intl";
import Sponsor from "~/lib/components/Sponsor";
import { Separator } from "~/lib/components/ui/separator";
import { loadTranslationMessages } from "~/lib/utils/utils";

export default function sponsors() {
  const t = useTranslations("sponsors");
  return (
    <>
      <div className="flex w-full flex-col items-center">
        <h1 className="mx-5 my-12 text-3xl font-bold text-black underline underline-offset-8">
          {t("title")}
        </h1>
        <div className="mx-5 mb-8 max-w-[1000px]  px-8">
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
          <Separator className="my-16 bg-black" />
          <section className="mt-8 flex flex-col gap-8 text-center">
            <h3 className="text-2xl font-bold">{t("subtitle")}</h3>
            <p className="text-lg">{t("desc")} </p>
            <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div>
                <h3 className="my-4 text-xl font-bold text-picton-blue-500">
                  {t("main")}
                </h3>
                <ul className="flex list-disc flex-col gap-2 text-left font-sans text-black">
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
                <ul className="flex list-disc flex-col gap-2 text-left text-black">
                  <li>{t("importantli1")}</li>
                  <li>{t("importantli2")}</li>
                  <li>{t("importantli3")}</li>
                </ul>
              </div>
              <div>
                <h3 className="my-4 text-xl font-bold text-picton-blue-500">
                  {t("support")}
                </h3>
                <ul className="flex list-disc flex-col gap-2 text-left text-black">
                  <li>{t("supportli1")}</li>
                  <li>{t("supportli2")}</li>
                </ul>
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}
export async function getStaticProps({ locale }: { locale: string }) {
  const messages = await loadTranslationMessages(locale);
  return {
    props: {
      messages,
    },
  };
}
