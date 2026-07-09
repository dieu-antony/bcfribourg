import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "../utils/utils";
import { Clock, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { inter } from "./Layout";

type Trainer = {
  id: string;
  name: string;
  qualis: string;
  imageUrl: string;
};

type TrainingCardProps = {
  trainers: Trainer[];
  time: {
    start: string;
    day: string;
  };
  target: string;
  className?: string;
};

const TrainingCard = ({
  trainers,
  time,
  target,
  className,
}: TrainingCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      className={cn(
        "group relative m-8 mt-0 flex h-[200px] w-[300px] flex-col gap-2 bg-white shadow-md lg:h-[300] lg:w-[400px]",
        className,
      )}
      whileHover="hovered"
      initial="initial"
      whileTap="clicked"
    >
      <div className="mb-2 w-full bg-picton-blue-700 px-8 py-6 text-white shadow-md">
        <motion.h2
          className="relative w-full text-2xl font-semibold"
          variants={{
            initial: { left: 0 },
            hovered: { left: 5 },
            clicked: { left: 5 },
          }}
        >
          {time.day}
        </motion.h2>
      </div>
      <h3 className="flex gap-2 px-8">
        <Clock className="text-picton-blue-500" />
        {time.start}
      </h3>
      <p className="px-8">{target}</p>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className="flex cursor-pointer gap-2 px-8 text-left outline-none"
            // Desktop Hover Behaviors
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            // Mobile Touch Behavior (Fallback click)
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <User className="text-picton-blue-500" />
            <span className="font-medium text-gray-900">
              {trainers.map((t) => t.name).join(", ")}
            </span>
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="pointer-events-none h-40 w-80 p-2 data-[state=open]:pointer-events-auto"
          // Keeps the popup open when desktop users move their mouse into it
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          side="bottom"
          align="start"
        >
          <div className={`font-sans ${inter.variable} flex h-full flex-col gap-4`}>
            {trainers.map((trainer) => (
              <div key={trainer.id} className="flex h-full items-stretch gap-4">
                {/* Left Side: Image Container */}
                <div className="relative h-full w-28 flex-shrink-0 overflow-hidden rounded-md">
                  {trainer.imageUrl ? (
                    <Image
                      src={trainer.imageUrl}
                      alt={trainer.name}
                      fill
                      sizes="(max-width: 120px) 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-picton-blue-100">
                      <User className="h-8 w-8 text-picton-blue-500" />
                    </div>
                  )}
                </div>

                {/* Right Side: Text details */}
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 py-1">
                  <span className="text-base font-semibold text-gray-900">
                    {trainer.name}
                  </span>
                  {trainer.qualis && (
                    <p className="line-clamp-3 text-sm text-gray-500">
                      {trainer.qualis}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <motion.div
        className="absolute bottom-8 right-0 h-full w-[6px] rounded-l-md rounded-r-none"
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
