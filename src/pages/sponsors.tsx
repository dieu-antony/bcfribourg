import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Layout from "~/lib/components/Layout";
import Sponsor from "~/lib/components/Sponsor";
import { Title } from "~/lib/components/Title";

export default function Sponsors() {
  const t = useTranslations("Sponsors");

  return (
    <Layout>
      <div className="flex w-full flex-col items-center">
        <Title>
          {t("title")}
        </Title>

        <div className="mx-5 mb-8 w-full max-w-[1100px] space-y-12">
           {/* Gold */}
           <section className="border border-gray-200 hidden bg-white p-8 text-center">
            <div className="flex flex-row items-center justify-center gap-4">
              <Image
                src="/assets/sponsors/shuttles/gold.png"
                alt="Gold sponsor"
                width={64}
                height={64}
                className="mb-4"
              />
              <h2 className="mb-6 text-xl font-bold text-picton-blue-500">
                {t("gold")}
              </h2>
            </div>
            <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
              {/* <Sponsor
                name=""
                file="png"
                link=""
                cn="text-center col-span-3"
              /> */}
            </div>
          </section>


          {/* SILVER */}
          <section className="border border-gray-200 bg-white p-8 text-center">
            <div className="flex flex-row items-center justify-center gap-4">
              <Image
                src="/assets/sponsors/shuttles/silver.png"
                alt="Silver sponsor"
                width={64}
                height={64}
                className="mb-4"
              />
              <h2 className="mb-6 text-xl font-bold text-picton-blue-500">
                {t("silver")}
              </h2>
            </div>
            <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
              <Sponsor
                name="SINEF"
                file="svg"
                link="https://www.sinef.ch/"
                cn="text-center col-span-3"
              />
            </div>
          </section>

          {/* BRONZE */}
          <section className="border border-gray-200 bg-white p-8 text-center">
            <div className="flex flex-row items-center justify-center gap-4">
              <Image
                src="/assets/sponsors/shuttles/bronze.png"
                alt="Bronze sponsor"
                width={64}
                height={64}
                className="mb-4"
              />
              <h2 className="mb-6 text-xl font-bold text-picton-blue-500">
                {t("bronze")}
              </h2>
            </div>
            <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
              <Sponsor
                name="Frimousse"
                file="png"
                link="https://www.fri-mousse.ch/wp/"
                cn="text-center col-span-3"
              />
              
            </div>
          </section>

          {/* Sponsor packages */}
          <section className="mt-8 flex flex-col gap-8 bg-white p-8 text-center shadow-md">
            <h2 className="text-2xl font-bold">{t("subtitle")}</h2>
            <p className="text-lg">{t("desc")}</p>

            <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Bronze */}
              <div className="border border-picton-blue-500 bg-white p-6 shadow-sm">
                <h3 className="my-4 text-xl font-bold text-picton-blue-500">
                  <Image
                    src="/assets/sponsors/shuttles/bronze.png"
                    alt="Bronze sponsors"
                    width={50}
                    height={50}
                    className="mr-2 inline-block"
                  />
                  {t("bronze")}
                </h3>
                <ul className="list-disc space-y-3 pl-6 text-left text-sm text-black sm:text-base">
                  {t.rich("bronzeli", {
                    li: (chunks) => <li>{chunks}</li>,
                  })}
                </ul>
              </div>

              {/* Silver */}
              <div className="border border-picton-blue-500 bg-white p-6 shadow-sm">
                <h3 className="my-4 text-xl font-bold text-picton-blue-500">
                  <Image
                    src="/assets/sponsors/shuttles/silver.png"
                    alt="Silver sponsors"
                    width={50}
                    height={50}
                    className="mr-2 inline-block"
                  />
                  {t("silver")}
                </h3>
                <ul className="list-disc space-y-3 pl-6 text-left text-sm text-black sm:text-base">
                  {t.rich("silverli", {
                    li: (chunks) => <li>{chunks}</li>,
                  })}
                </ul>
              </div>

              {/* Gold */}
              <div className="border border-picton-blue-500 bg-white p-6 shadow-sm">
                <h3 className="my-4 text-xl font-bold text-picton-blue-500">
                  <Image
                    src="/assets/sponsors/shuttles/gold.png"
                    alt="Gold sponsors"
                    width={50}
                    height={50}
                    className="mr-2 inline-block"
                  />
                  {t("gold")}
                </h3>
                <ul className="list-disc space-y-3 pl-6 text-left text-sm text-black sm:text-base">
                  {t.rich("goldli", {
                    li: (chunks) => <li>{chunks}</li>,
                  })}
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
  const messages = (await import(
    `../../messages/${locale}.json`
  )) as IntlMessages;

  return {
    props: {
      messages: messages.default,
    },
  };
}
