import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Layout from "~/lib/components/Layout";
import Sponsor from "~/lib/components/Sponsor";
import { Title } from "~/lib/components/Title";
import { db } from "~/server/db";
import type { Sponsor as SponsorType } from "@prisma/client"; // adjust this if the type is elsewhere

type Props = {
  sponsors: SponsorType[];
};

export default function SponsorsPage({ sponsors }: Props) {
  const t = useTranslations("Sponsors");

  const goldSponsors = sponsors.filter((s) => s.tier === 1);
  const silverSponsors = sponsors.filter((s) => s.tier === 2);
  const bronzeSponsors = sponsors.filter((s) => s.tier === 3);

  const renderSponsorSection = (
    tierLabel: string,
    iconPath: string,
    sponsors: SponsorType[],
  ) => {
    if (sponsors.length === 0) return null;
    return (
      <section className="border border-gray-200 bg-white p-8 text-center">
        <div className="flex flex-row items-center justify-center gap-4">
          <Image
            src={iconPath}
            alt={`${tierLabel} sponsor`}
            width={64}
            height={64}
            className="mb-4"
          />
          <h2 className="mb-6 text-xl font-bold text-picton-blue-500">
            {tierLabel}
          </h2>
        </div>
        <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((sponsor) => (
            <Sponsor
              key={sponsor.id}
              name={sponsor.name}
              imgUrl={sponsor.logoUrl}
              link={sponsor.link}
              cn="text-center col-span-3"
            />
          ))}
        </div>
      </section>
    );
  };

  return (
    <Layout>
      <div className="flex w-full flex-col items-center">
        <Title>{t("title")}</Title>

        <div className="mx-5 my-8 w-full max-w-[1100px] space-y-12">
          {renderSponsorSection(
            t("gold"),
            "/assets/sponsors/shuttles/gold.png",
            goldSponsors,
          )}
          {renderSponsorSection(
            t("silver"),
            "/assets/sponsors/shuttles/silver.png",
            silverSponsors,
          )}
          {renderSponsorSection(
            t("bronze"),
            "/assets/sponsors/shuttles/bronze.png",
            bronzeSponsors,
          )}

          {/* Sponsor Packages Section */}
          <section className="mt-8 flex flex-col gap-8 bg-white p-8 text-center shadow-md">
            <h2 className="text-2xl font-bold">{t("subtitle")}</h2>
            <p className="text-lg">{t("desc")}</p>

            <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Bronze Package */}
              <div className="border border-picton-blue-500 bg-white p-6 shadow-sm">
                <h3 className="my-4 text-xl font-bold text-picton-blue-500">
                  <Image
                    src="/assets/sponsors/shuttles/bronze.png"
                    alt="Bronze"
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

              {/* Silver Package */}
              <div className="border border-picton-blue-500 bg-white p-6 shadow-sm">
                <h3 className="my-4 text-xl font-bold text-picton-blue-500">
                  <Image
                    src="/assets/sponsors/shuttles/silver.png"
                    alt="Silver"
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

              {/* Gold Package */}
              <div className="border border-picton-blue-500 bg-white p-6 shadow-sm">
                <h3 className="my-4 text-xl font-bold text-picton-blue-500">
                  <Image
                    src="/assets/sponsors/shuttles/gold.png"
                    alt="Gold"
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

  const sponsors = await db.sponsor.findMany({
    orderBy: { tier: "asc" },
  });

  return {
    props: {
      messages: messages.default,
      sponsors,
    },
    revalidate: 604800,
  };
}
