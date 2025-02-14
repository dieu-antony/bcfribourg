import { motion } from "framer-motion";
import { cn } from "../utils/utils";
import { Clock, User } from "lucide-react";

type TrainingCardProps = {
  trainer: string;
  time: {
    start: string;
    day: string;
  };
  target: string;
  className?: string;
};
const TrainingCard = ({
  trainer,
  time,
  target,
  className,
}: TrainingCardProps) => {
  return (
    <motion.div
      className={cn(
        "relative m-8 mt-0 group flex h-[200px] w-[300px] flex-col gap-2 bg-white p-8 shadow-md lg:h-[300] lg:w-[400px]",
        className,
      )}
      whileHover="hovered"
      initial="initial"
      whileTap="clicked"
    >
      <div className="flex flex-col gap-2">
        <motion.h1 className="text-lg font-semibold relative"
        variants={{
          initial: { left: 0 },
          hovered: { left: 5 },
          clicked: { left: 5 },
        }}
        >{time.day}</motion.h1>
        <h2 className="flex gap-2"><Clock className="text-picton-blue-500"/>{time.start}</h2>
      </div>
      <p>{target}</p>
      <p className="flex gap-2"><User className="text-picton-blue-500"/>{trainer}</p>
      <motion.div
        className="absolute right-0 top-8 h-full w-[6px] rounded-r-none rounded-l-md"
        variants={{
          initial: { height: "3rem", backgroundColor: "#00afef" },
          hovered: { height: "4rem", backgroundColor: "#0091d4" },
          clicked: { height: "4rem", backgroundColor: "#0091d4" },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default TrainingCard;
