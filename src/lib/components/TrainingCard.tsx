import { cn } from "../utils/utils";

type TrainingCardProps = {
    trainer: string;
    time: {
        start: string;
        day: string;
    }
    target: string;
    className?: string;
    }
const TrainingCard = ({trainer, time, target, className}:TrainingCardProps) => {
  return (
    <div className={cn("bg-white m-8 mt-0 p-8 lg:w-[400px] lg:h-[300] h-[200px] w-[300px] gap-2 flex flex-col shadow-sm", className)}>
        <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-lg">{time.day}</h1>
            <h2>{time.start}</h2>
        </div>
        <p>{target}</p>
        <p>{trainer}</p>
    </div>
  )
}

export default TrainingCard;
