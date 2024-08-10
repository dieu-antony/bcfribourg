import { motion } from "framer-motion";
import { cn } from "../utils/utils";

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
        "relative m-8 mt-0 group flex h-[200px] w-[300px] flex-col gap-2 bg-white p-8 shadow-sm lg:h-[300] lg:w-[400px]",
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
        <h2>{time.start}</h2>
      </div>
      <p>{target}</p>
      <p>{trainer}</p>
      <motion.div
        className="absolute right-0 top-8 h-full w-[6px] rounded-r-none rounded-l-md  bg-gray-200 group-hover:bg-picton-blue-500"
        variants={{
          initial: { height: "3rem", backgroundColor: "#e5e7eb" },
          hovered: { height: "4rem", backgroundColor: "#00afef" },
          clicked: { height: "4rem", backgroundColor: "#00afef" },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default TrainingCard;
