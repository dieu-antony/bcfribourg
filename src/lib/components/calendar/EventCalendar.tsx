import { useState } from "react";
import {
  format,
  endOfMonth,
  startOfMonth,
  eachDayOfInterval,
  getDay,
  isToday,
  isSameDay,
} from "date-fns";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "~/lib/utils";
import { inter } from "~/pages/_app";
import clsx from "clsx";
import { CalendarEvent } from "@prisma/client";


const EventCalendar = ({ events }:{events: CalendarEvent[]}) => {
  const [chosenMonth, setChosenMonth] = useState<Date>(new Date());
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const firstDayOfMonth = startOfMonth(chosenMonth);
  const lastDayOfMonth = endOfMonth(chosenMonth);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
  const startingDayIndex =
    getDay(firstDayOfMonth) - 1 === -1 ? 6 : getDay(firstDayOfMonth) - 1;
  console.log(startingDayIndex);

  const previousMonth = (chosenMonth: Date) => {
    return new Date(chosenMonth.getFullYear(), chosenMonth.getMonth() - 1);
  };
  const nextMonth = (chosenMonth: Date) => {
    return new Date(chosenMonth.getFullYear(), chosenMonth.getMonth() + 1);
  };
  const daysInPreviousMonth = eachDayOfInterval({
    start: startOfMonth(previousMonth(chosenMonth)),
    end: endOfMonth(previousMonth(chosenMonth)),
  }).reverse();
  const daysInNextMonth = eachDayOfInterval({
    start: startOfMonth(nextMonth(chosenMonth)),
    end: endOfMonth(nextMonth(chosenMonth)),
  });

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Button onClick={() => setChosenMonth(previousMonth(chosenMonth))}>
            Previous Month
          </Button>
          <Button onClick={() => setChosenMonth(nextMonth(chosenMonth))}>
            Next Month
          </Button>
        </div>
        <h2 className="text-center">{format(chosenMonth, "MMMM yyyy")} </h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !chosenMonth && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {chosenMonth ? (
                format(chosenMonth, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={chosenMonth}
              onSelect={(date) => setChosenMonth((prev) => date || prev)}
              initialFocus
              captionLayout="dropdown-buttons"
              fromYear={2022}
              toYear={2025}
              className={`font-sans ${inter.variable}`}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-7">
        {weekDays.map((day) => {
          return (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          );
        })}
        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return (
            <div className="bg-gray-400 text-center" key={index}>
              {format(
                daysInPreviousMonth[startingDayIndex - 1 - index]?.toString() ||
                  new Date().toString(),
                "d",
              )}
            </div>
          );
        })}
        {daysInMonth.map((day) => {
          return (
            <div
              key={day.toString()}
              className={clsx("text-center", {
                "bg-picton-blue-500": isToday(day),
              })}
            >
              {format(day.toString(), "d")}
              {events
                  .filter((event) => isSameDay(event.start, day))
                  .map((event) => {
                    return <div key={event.summary}>{event.summary}</div>;
                  })}
            </div>
          );
        })}
        {Array.from({ length: 35 - startingDayIndex - daysInMonth.length }).map(
          (_, index) => {
            return (
              <div className="bg-gray-400 text-center" key={index}>
                {format(
                  daysInNextMonth[index]?.toString() || new Date().toString(),
                  "d",
                )}
                
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
