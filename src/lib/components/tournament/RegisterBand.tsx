import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Band } from "./Band";
import { RegisterButton } from "./RegisterButton";
import { FlipWords } from "../ui/flip-words";
import { CountdownTimer } from "../ui/countdown";
import { CURRENT } from "~/lib/editions";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

export default function RegisterBand({ link }: { link: string }) {
  const t = useTranslations("BolzesTournament");

  return (
    <Band tone="azure">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <motion.h2 variants={item} className="text-3xl font-bold sm:text-5xl">
          {t("band.title")}{" "}
          <span className="text-[#ffd1e1] underline decoration-[#d6245f] decoration-3 underline-offset-8">
            {t("band.highlight")}
          </span>
        </motion.h2>
        <motion.div variants={item} className="max-w-xl text-lg text-white/80">
          {t("description")}
          <FlipWords
            words={[t("flipWord1"), t("flipWord2"), t("flipWord3")]}
            className="text-lg text-white/80"
          />
        </motion.div>
        <CountdownTimer targetDate={new Date(CURRENT.countdownTo)} />

        <motion.div variants={item}>
          <RegisterButton link={link} />
        </motion.div>
      </motion.div>
    </Band>
  );
}
