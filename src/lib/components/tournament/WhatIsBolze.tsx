import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CURRENT } from "~/lib/editions";
import { Pic } from "./ParallaxPhoto";
import Kicker from "./Kicker";

export default function WhatIsBolze() {
  const t = useTranslations("BolzesTournament");

  return (
    <section
      id="bolze"
      className="mx-4 my-16 grid w-full scroll-mt-24 items-center gap-8 md:my-28 md:grid-cols-2"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-[#166081]/20"
      >
        <Pic
          src={CURRENT.bolzePhoto}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="rounded-2xl border border-[#166081]/15 bg-white/70 p-6 shadow-xl backdrop-blur-md md:p-10"
      >
        <Kicker>Aber c&apos;est quoi le Bolze überhoupt?</Kicker>
        <h2 className="mt-2 text-3xl font-bold text-[#0b3547] lg:text-4xl">
          {t("whatIsBolze.title")}
        </h2>
        <div className="mt-3 h-1 w-12 rounded-full bg-[#d6245f]" />
        <p className="mt-5 text-lg leading-relaxed width-full text-[#0b3547]/80">
          {t("whatIsBolze.text")}
        </p>
      </motion.div>
    </section>
  );
}