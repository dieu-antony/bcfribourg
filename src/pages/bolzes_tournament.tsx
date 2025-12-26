import { useTranslations } from "next-intl";
import Link from "next/link";
import type { GetStaticPropsContext } from "next/types";
import React from "react";
import Layout from "~/lib/components/Layout";
import { Title } from "~/lib/components/Title";
import BackgroundGradientAnimation from "~/lib/components/ui/background-gradient-animation";
import { CountdownTimer } from "~/lib/components/ui/countdown";
import { FadeUpOnScroll } from "~/lib/components/ui/fade-up-on-scroll";
import { FlipWords } from "~/lib/components/ui/flip-words";
import { TextHoverEffect } from "~/lib/components/ui/text-hover-effect";
import Image from "next/image";
import { Separator } from "~/lib/components/ui/separator";
import { CldImage } from "next-cloudinary";
import cloudinary from "cloudinary";
import type { CloudinarySearchResult } from "~/lib/types";

type Props = {
  sponsors: { public_id: string; folder: string }[];
};

function BolzesTournament({ sponsors }: Props) {
  const t = useTranslations("BolzesTournament");

  return (
    <Layout>
      <div className="relative flex w-full flex-1 flex-col items-center">
        <BackgroundGradientAnimation />

        <div className="relative z-10 mt-12 flex w-full max-w-5xl flex-col items-center px-4 sm:mt-32">
          <Title>
            <TextHoverEffect text={t("title")} />
          </Title>

          <div className="relative mx-auto mt-8 max-w-[80%] text-center sm:mt-16">
            <h2 className="absolute left-0 top-0 w-full translate-x-[3px] translate-y-[3px] text-5xl font-bold leading-snug tracking-tighter text-picton-blue-600">
              14.02. - 15.02.2026
            </h2>
            <h2 className="relative w-full text-5xl font-bold leading-snug tracking-tighter text-black">
              14.02. - 15.02.2026
            </h2>
          </div>

          <button className="relative my-16 p-[3px] sm:my-24">
            <Link
              href="https://sb.tournamentsoftware.com/sport/tournament?id=41BA949F-B13D-4B10-B469-154FA7B79B20"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-picton-blue-500" />
              <div className="group relative rounded-[6px] bg-black px-8 py-2 text-white transition duration-200 hover:bg-transparent">
                {t("registerButton")}
              </div>
            </Link>
          </button>

          <FadeUpOnScroll>
            <h3 className="my-8 text-2xl font-bold text-black">
              {t("subtitle")}
            </h3>

            <div className="my-8 mb-16 text-xl text-gray-700">
              {t("description")}
              <FlipWords
                words={[t("flipWord1"), t("flipWord2"), t("flipWord3")]}
                className="text-xl text-gray-700"
              />
            </div>

            <CountdownTimer
              className="mb-8"
              targetDate={new Date("2026-02-14T00:00:00Z")}
            />

            <Separator className="my-16 h-2 w-full bg-picton-blue-500" />
          </FadeUpOnScroll>

          <FadeUpOnScroll>
            <div className="mx-8 my-16 flex flex-col gap-8 sm:my-28 sm:grid sm:grid-cols-3 sm:items-center sm:justify-between">
              <p className="text-lg text-gray-700">{t("additionalInfo")}</p>
              <Image
                src="/assets/rwmwaqiml4xeeqla7fvc.jpeg"
                alt="Bolzes Tournament"
                width={800}
                height={450}
                className="col-span-2 rounded-lg shadow-lg"
              />
            </div>
          </FadeUpOnScroll>

          <FadeUpOnScroll>
            <div className="mx-8 my-16 flex flex-col gap-8 sm:my-28 sm:grid sm:grid-cols-3 sm:items-center sm:justify-between">
              <p className="block text-lg text-gray-700 sm:hidden">
                {t("location")}
              </p>
              <div className="col-span-2 rounded-lg shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d784.3839087216775!2d7.1574026921674605!3d46.79675680697938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e69280b78e8a5%3A0x1e473553195c8fad!2sRue%20Antoine-de-Saint-Exup%C3%A9ry%2014%2C%201700%20Fribourg!5e0!3m2!1sen!2sch!4v1755359021166!5m2!1sen!2sch"
                  className="mt-2 aspect-video w-full justify-self-center border-0"
                ></iframe>
              </div>
              <p className="hidden text-lg text-gray-700 sm:block">
                {t("location")}
              </p>
            </div>
          </FadeUpOnScroll>

          {/* <FadeUpOnScroll> */}
          <div className="mx-8 my-16 flex flex-col">
            <h2 className="mb-4 self-center text-5xl font-bold">
              {t("OfficialSponsors")}
            </h2>
            <Separator className="my-4 mb-16 h-1 w-8 place-self-center bg-picton-blue-500" />

            <div className="mt-8 space-y-16">
              {[
                "Gold" as const,
                "Silver" as const,
                "Bronze" as const,
                // "Donation" as const,
              ].map((tier) => {
                const tierImages = sponsors.filter((s) =>
                  s.folder.includes(tier),
                );

                if (tierImages.length === 0) return null;

                return (
                  <div key={tier} className="mb-12 flex flex-col">
                    <h3 className="mb-8 place-self-center text-2xl font-semibold">
                      {t(tier)}
                    </h3>
                    {tierImages.length === 1 ? (
                      // Single centered image
                      <div className="flex justify-center">
                        <CldImage
                          src={tierImages[0]!.public_id}
                          width={300}
                          height={200}
                          crop="fit"
                          alt={tier}
                          className="rounded-lg"
                        />
                      </div>
                    ) : (
                      // Grid for 2+ images
                      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
                        {tierImages.map((img) => (
                          <div
                            key={img.public_id}
                            className="flex justify-center"
                          >
                            <CldImage
                              src={img.public_id}
                              width={300}
                              height={200}
                              crop="fit"
                              alt={tier}
                              className="rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <Separator className="col-span-3 my-4 mt-12 h-1 w-full bg-gray-300" />
                  </div>
                );
              })}
            </div>
          </div>
          {/* </FadeUpOnScroll> */}
        </div>
      </div>
    </Layout>
  );
}

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../messages/${locale}.json`
  )) as IntlMessages;

  let sponsorsData: { public_id: string; folder: string }[] = [];

  try {
    // Direct Cloudinary fetch at build time
    const result = (await cloudinary.v2.search
      .expression("asset_folder:Sponsors/Tournament/*")
      .execute()) as CloudinarySearchResult;

    sponsorsData = result.resources.map(
      (asset: { public_id: string; asset_folder: string }) => ({
        public_id: asset.public_id,
        folder: asset.asset_folder.split("/").pop() ?? "",
      }),
    );
  } catch (err) {
    console.warn(
      "Sponsors fetch failed at build time, returning empty array:",
      err,
    );
  }

  return {
    props: {
      messages: messages.default,
      sponsors: sponsorsData,
    },
    revalidate: 60 * 60 * 24,
  };
}

export default BolzesTournament;
