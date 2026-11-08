import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const CountdownTimer: React.FC<{
  className?: string;
  targetDate: Date;
}> = ({ className, targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const t = useTranslations("BolzesTournament");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeBlocks = [
    { label: t("days"), value: timeLeft.days },
    { label: t("hours"), value: timeLeft.hours },
    { label: t("minutes"), value: timeLeft.minutes },
    { label: t("seconds"), value: timeLeft.seconds },
  ];

  return (
    <div
      className={`flex flex-wrap justify-center gap-6 text-center ${className}`}
    >
      {timeBlocks.map((block, i) => (
        <motion.div
          key={block.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-4xl font-extrabold text-[#e6f4fa] sm:text-6xl">
            {block.value}
          </div>
          <div className="mt-1 text-sm uppercase text-gray-400">
            {block.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
