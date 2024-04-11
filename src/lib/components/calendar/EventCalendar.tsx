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
import { CalendarIcon, MapPin } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "~/lib/utils";
import { inter } from "~/pages/_app";
import clsx from "clsx";
import { CalendarEvent } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Clock8 } from "lucide-react";

const EventCalendar = ({ events }: { events: CalendarEvent[] }) => {
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
            <div className="bg-gray-400 text-center border" key={index}>
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
              className={clsx("text-center border", {
                "bg-picton-blue-500": isToday(day),
              })}
            >
              {format(day.toString(), "d")}
              {events
                .filter((event) => isSameDay(event.start, day))
                .map((event) => {
                  return (
                    <div
                      key={event.summary}
                      className={`font-sans ${inter.variable} bg-picton-blue-500 text-white p-1 rounded-md text-nowrap`}
                    >
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <div
                                  className={`flex font-sans ${inter.variable}`}
                                >
                                  {event.summary}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div
                                  className={`flex font-sans ${inter.variable} gap-1`}
                                >
                                  <div>{event.summary}</div>
                                  <div>({format(event.start, "HH:mm")})</div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              <div
                                className={`flex font-sans ${inter.variable}`}
                              >
                                {event.summary}
                              </div>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              <div className="flex flex-col gap-1">
                                <div
                                  className={`flex font-sans ${inter.variable} gap-1`}
                                >
                                  <Clock8 className="size-5" />{format(event.start, "dd.MM.yyyy")}{": "}
                                  {format(event.start, "HH:mm")} -{" "}
                                  {format(event.end, "HH:mm")}
                                </div>
                                <div
                                  className={`flex font-sans ${inter.variable} gap-1`}
                                >
                                  <MapPin className="size-5" /> {event.location}
                                </div>
                              </div>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>
                              <p className={`font-sans ${inter.variable}`}>
                                Close
                              </p>
                            </AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  );
                })}
            </div>
          );
        })}
        {Array.from({ length: 35 - startingDayIndex - daysInMonth.length }).map(
          (_, index) => {
            return (
              <div className="bg-gray-400 text-center border" key={index}>
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
