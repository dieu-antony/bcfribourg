import { useTranslations } from "next-intl";
import type { GetStaticPropsContext } from "next/types";
import Layout from "~/lib/components/Layout";
import BackgroundGradientAnimation from "~/lib/components/ui/background-gradient-animation";
import { FadeUpOnScroll } from "~/lib/components/ui/fade-up-on-scroll";
import Image from "next/image";
import { Separator } from "~/lib/components/ui/separator";
import { CldImage } from "next-cloudinary";
import { motion, MotionConfig } from "framer-motion";
import { Band } from "~/lib/components/tournament/Band";
import RegisterBand from "~/lib/components/tournament/RegisterBand";
import img1 from "../../public/assets/tournament/Carousel-01.jpg";
import img2 from "../../public/assets/tournament/Carousel-02.jpg";
import img3 from "../../public/assets/tournament/Carousel-03.jpg";
import img4 from "../../public/assets/tournament/Carousel-04.jpg";
import img5 from "../../public/assets/tournament/Carousel-05.jpg";
import img6 from "../../public/assets/tournament/Carousel-06.jpg";
import img7 from "../../public/assets/tournament/Carousel-07.jpg";
import img8 from "../../public/assets/tournament/Carousel-08.jpg";
import img9 from "../../public/assets/tournament/Carousel-09.jpg";
import img10 from "../../public/assets/tournament/Carousel-10.jpg";

import { PhotoCarousel } from "~/lib/components/tournament/PhotoCarousel";
import { CURRENT } from "~/lib/editions";
import Hero from "~/lib/components/tournament/Hero";
import DownloadsSection from "~/lib/components/tournament/DownloadSection";
import SponsorCta from "~/lib/components/tournament/SponsorsCTA";
import SkylineEdge from "~/lib/components/tournament/SkylineEdge";
import Kicker from "~/lib/components/tournament/Kicker";
import FunicularBackground from "~/lib/components/tournament/FuniculaireBackground";
import WhatIsBolze from "~/lib/components/tournament/WhatIsBolze";
import CustomCursor from "~/lib/components/tournament/Cursor";

const myImages = [
  { src: img1, alt: "Image 1" },
  { src: img2, alt: "Image 2" },
  { src: img3, alt: "Image 3" },
  { src: img4, alt: "Image 4" },
  { src: img5, alt: "Image 5" },
  { src: img6, alt: "Image 6" },
  { src: img7, alt: "Image 7" },
  { src: img8, alt: "Image 8" },
  { src: img9, alt: "Image 9" },
  { src: img10, alt: "Image 10" },
];

type Tier = "Gold" | "Silver" | "Bronze";

const TIERS: Record<
  Tier,
  { width: number; height: number; grid: string; label: string }
> = {
  Gold: {
    width: 340,
    height: 220,
    grid: "grid-cols-1 sm:grid-cols-2 gap-12",
    label: "from-yellow-400 to-amber-500",
  },
  Silver: {
    width: 240,
    height: 160,
    grid: "grid-cols-2 sm:grid-cols-3 gap-10",
    label: "from-gray-300 to-gray-500",
  },
  Bronze: {
    width: 160,
    height: 110,
    grid: "grid-cols-2 sm:grid-cols-4 gap-8",
    label: "from-orange-300 to-orange-600",
  },
};

type Props = {
  sponsors: { public_id: string; folder: string; link: string | undefined }[];
};

const glassCard =
  "rounded-2xl border border-white/40 bg-white/60 shadow-xl backdrop-blur-md";

function BolzesTournament({ sponsors }: Props) {
  const t = useTranslations("BolzesTournament");

  const facts = [
    { label: t("facts.dateLabel"), value: "13. – 14.02.2027" },
    { label: t("facts.placeLabel"), value: "Pérolles, Fribourg" },
    { label: t("facts.levelLabel"), value: "TOP · A · B · C · D" },
    { label: t("facts.feeLabel"), value: t("facts.fee") },
  ];

  return (
    <Layout>
      <MotionConfig reducedMotion="user">
        <div className="relative flex w-full flex-1 flex-col items-center pb-20 sm:pb-0">
          <CustomCursor />
          <BackgroundGradientAnimation />
          <FunicularBackground />

          {/* Hero */}
          <Hero photos={[CURRENT.heroPhoto]} />

          <SkylineEdge />

          {/* Facts Strip */}

          <Band tone="azure" reveal={false} slant={false} glow={false}>
            <dl className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
              {facts.map((f) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <dt className="text-xs font-semibold uppercase tracking-widest text-[#ffd1e1]">
                    {f.label}
                  </dt>
                  <dd className="mt-2 text-xl font-bold sm:text-2xl">
                    {f.value}
                  </dd>
                  <div className="mx-auto mt-3 h-1 w-8 rounded-full bg-[#d6245f]" />
                </motion.div>
              ))}
            </dl>
          </Band>

          <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-4">
            {/* Information */}

            <FadeUpOnScroll>
              <div
                id="information"
                className="mx-4 my-16 flex scroll-mt-24 flex-col gap-8 md:my-28 md:grid md:grid-cols-3 md:items-center"
              >
                <div className={`${glassCard} p-6`}>
                  <div className="flex flex-col gap-4 text-lg text-gray-700">
                    <Kicker>C&apos;est quoi für a Turnier?</Kicker>
                    {t("additionalInfo")}
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02, rotate: -0.5 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="col-span-2 overflow-hidden rounded-2xl shadow-2xl"
                >
                  <Image
                    src="/assets/tournament/Info_CSB.jpg"
                    alt="Bolzes Tournament"
                    width={800}
                    height={450}
                    className="h-auto w-full object-cover"
                  />
                </motion.div>
              </div>
            </FadeUpOnScroll>

            {/* Carousel */}

            <div className="mx-auto my-12 w-full max-w-[1000px]" id="carousel">
              <FadeUpOnScroll>
                <div className="align-center flex w-full flex-col items-center gap-8">
                  <Kicker>Souvenirs vo de letzte années</Kicker>

                  <PhotoCarousel images={myImages} />
                </div>
              </FadeUpOnScroll>{" "}
            </div>
          </div>

          {/* Register Band */}
          <section id="register" className="w-full">
            <RegisterBand link={CURRENT.registerUrl} />
          </section>

          <div className="relative z-10  flex w-full max-w-5xl flex-col items-center px-4">
            {/* Location*/}
            <FadeUpOnScroll>
              <div
                id="location"
                className="mx-4 my-16 flex scroll-mt-24 flex-col gap-8 md:my-28 md:grid md:grid-cols-3 md:items-center"
              >
                <div className={`${glassCard} p-6 md:order-1`}>
                  <div className="flex flex-col gap-4 text-lg text-gray-700">
                    <Kicker>Où se trouve d&apos;Halla?</Kicker>
                    {t("location")}
                  </div>
                </div>
                <div className="col-span-2 overflow-hidden rounded-2xl shadow-2xl md:order-2">
                  <iframe
                    title="Map"
                    loading="lazy"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d784.3839087216775!2d7.1574026921674605!3d46.79675680697938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e69280b78e8a5%3A0x1e473553195c8fad!2sRue%20Antoine-de-Saint-Exup%C3%A9ry%2014%2C%201700%20Fribourg!5e0!3m2!1sen!2sch!4v1755359021166!5m2!1sen!2sch"
                    className="aspect-video w-full border-0"
                  />
                </div>
              </div>
            </FadeUpOnScroll>

            <WhatIsBolze />

            {/* Downloads */}
            <DownloadsSection />

            {/* Sponsors */}
            <div
              id="sponsors"
              className="mx-4 my-16 flex w-full scroll-mt-24 flex-col"
            >
              <h2 className="mb-4 self-center text-center text-4xl font-bold text-[#0b3547] sm:text-5xl">
                {t("OfficialSponsors")}
              </h2>
              <Separator className="my-4 mb-16 h-1 w-12 place-self-center rounded-full bg-[#d6245f]" />

              <SponsorCta />

              <div className="space-y-12">
                {(["Gold", "Silver", "Bronze"] as const).map((tier) => {
                  const tierImages = sponsors.filter((s) =>
                    s.folder.includes(tier),
                  );
                  if (tierImages.length === 0) return null;

                  const cfg = TIERS[tier];

                  return (
                    <div className={`${glassCard} p-6 sm:p-10`} key={tier}>
                      <div className="mb-8 flex justify-center">
                        <span
                          className={`rounded-full bg-gradient-to-r ${cfg.label} px-5 py-1 text-sm font-bold uppercase tracking-widest text-white shadow`}
                        >
                          {t(tier)}
                        </span>
                      </div>

                      <div
                        className={`grid items-center justify-items-center ${
                          tierImages.length === 1 ? "grid-cols-1" : cfg.grid
                        }`}
                      >
                        {tierImages.map((img) => (
                          <a
                            key={img.public_id}
                            href={img.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <CldImage
                              src={img.public_id}
                              width={cfg.width}
                              height={cfg.height}
                              crop="fit"
                              alt={tier}
                              className="object-contain transition duration-300 hover:scale-110"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </MotionConfig>
    </Layout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../messages/${locale}.json`
  )) as IntlMessages;

  const { v2: cloudinary } = await import("cloudinary");

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  type SponsorAsset = {
    public_id: string;
    asset_folder: string;
    context?: {
      custom?: { Link?: string };
      Link?: string;
    };
  };

  let sponsorsData: {
    public_id: string;
    folder: string;
    link: string | null;
  }[] = [];

  const assetFolder = "asset_folder:" + CURRENT.sponsorsFolder;
  try {
    const result = (await cloudinary.search
      .expression(assetFolder)
      .with_field("context")
      .execute()) as { resources: SponsorAsset[] };

    sponsorsData = result.resources.map((asset) => ({
      public_id: asset.public_id,
      folder: asset.asset_folder.split("/").pop() ?? "",
      link: asset.context?.custom?.Link ?? asset.context?.Link ?? null,
    }));
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
