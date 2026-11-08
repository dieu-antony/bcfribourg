import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ParallaxPhoto } from "./ParallaxPhoto";
import { CURRENT } from "~/lib/editions";
import { RegisterButton } from "./RegisterButton";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Hero({ photos }: { photos: string[] }) {
  const t = useTranslations("BolzesTournament");
  const words = t("title").split(" ");

  return (
    <div className="relative w-full overflow-hidden">

      {[
        { color: "#d6245f", delay: 0.4 },
        { color: "#166081", delay: 0.15 },
      ].map((c) => (
        <motion.div
          key={c.color}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30"
          style={{ backgroundColor: c.color, transformOrigin: "top" }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: c.delay }}
        />
      ))}

      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      >
        <ParallaxPhoto
          photos={photos}
          tint="from-[#0b3547]/80 via-[#166081]/45 to-[#0b3547]/90"
        >
          <div className="mx-auto flex min-h-[90svh] max-w-5xl flex-col items-center justify-center px-4 pt-24 pb-40 text-center">
            <h1 className="flex flex-wrap justify-center gap-x-4 text-5xl font-extrabold uppercase tracking-tight text-white sm:text-8xl">
              {words.map((w, i) => (
                <span key={i} className="overflow-hidden pb-2">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.9 + i * 0.12 }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="mt-6 rounded-full bg-[#166081] px-6 py-2 text-xl font-semibold tracking-widest text-[#e6f4fa] sm:text-3xl"
            >
              {CURRENT.dateLabel}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="mt-10"
            >
              <RegisterButton link={CURRENT.registerUrl}/>
            </motion.div>

          </div>
        </ParallaxPhoto>
      </motion.div>
    </div>
  );
}