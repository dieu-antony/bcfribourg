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
import {
  CalendarCheck,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CircleEllipsis,
  Link,
  MapPin,
} from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "~/lib/utils/utils";
import { inter } from "~/pages/_app";
import clsx from "clsx";
import type { CalendarEvent } from "@prisma/client";
import { ScrollArea } from "../ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Clock8 } from "lucide-react";
import { translateWeekday } from "~/lib/utils/utils";

const EventCalendar = ({
  events,
}: {
  events: (CalendarEvent & { color: string })[];
}) => {
  // Define needed constants and states
  const [chosenMonth, setChosenMonth] = useState<Date>(new Date());
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const firstDayOfMonth = startOfMonth(chosenMonth);
  const lastDayOfMonth = endOfMonth(chosenMonth);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const eventDaySet = new Set<string>();
  events.forEach((event) => {
    eventDaySet.add(format(event.start, "yyyy-MM-dd"));
  });

  // Define the starting day index (0 = Monday, 6 = Sunday)
  const startingDayIndex =
    getDay(firstDayOfMonth) - 1 === -1 ? 6 : getDay(firstDayOfMonth) - 1;

  // Check which days are in the previous and next month
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
      <div className="grid grid-cols-3 py-2">
        {/* Calendar navigation buttons */}
        <div className="flex gap-1">
          <Button
            onClick={() => setChosenMonth(previousMonth(chosenMonth))}
            className="w-12 border bg-white px-2 py-3 text-black hover:bg-gray-100"
          >
            <ChevronLeft />
          </Button>
          <Button
            onClick={() => setChosenMonth(new Date())}
            className="hidden w-16 border bg-white text-black hover:bg-gray-100 md:flex"
          >
            Today
          </Button>
          <Button
            onClick={() => setChosenMonth(new Date())}
            className="flex w-12 items-center justify-items-center border bg-white p-3 text-black hover:bg-gray-100 md:hidden "
          >
            <CalendarCheck />
          </Button>
          <Button
            onClick={() => setChosenMonth(nextMonth(chosenMonth))}
            className="w-12 border bg-white px-2 py-3 text-black hover:bg-gray-100"
          >
            <ChevronRight />
          </Button>
        </div>
        <h2 className="hidden self-center text-center font-bold md:block">
          {format(chosenMonth, "MMMM yyyy")}{" "}
        </h2>
        <h2 className="block self-center text-center font-bold md:hidden">
          {format(chosenMonth, "MMM yy")}{" "}
        </h2>
        {/* Calendar date choose button */}
        <div className="ml-auto flex flex-grow gap-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-24 justify-start text-left font-normal md:w-[180px]",
                  !chosenMonth && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <p className="hidden md:block">
                  {chosenMonth ? (
                    format(chosenMonth, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </p>
                <p className="block md:hidden">Date</p>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={chosenMonth}
                onSelect={(date) => setChosenMonth((prev) => date ?? prev)}
                initialFocus
                captionLayout="dropdown-buttons"
                fromYear={new Date().getFullYear() - 2}
                toYear={new Date().getFullYear() + 2}
                className={`font-sans ${inter.variable}`}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {weekDays.map((day) => {
          return (
            <div key={day} className="border bg-white text-center font-bold">
              {translateWeekday(day)}
            </div>
          );
        })}
        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return (
            <div
              className="border bg-gray-100 pt-1 text-center text-gray-500"
              key={index}
            >
              {format(
                daysInPreviousMonth[startingDayIndex - 1 - index]?.toString() ??
                  new Date().toString(),
                "d",
              )}
            </div>
          );
        })}
        {daysInMonth.map((day) => {
          return (
            <ScrollArea
              key={day.toString()}
              className={clsx(
                "h-16 border bg-white pt-1 text-center md:h-24 lg:h-32",
                {
                  "bg-picton-blue-200": isToday(day),
                },
              )}
            >
              {format(day.toString(), "d")}

              {/* Mobile view events */}
              <div className="block md:hidden">
                {[...eventDaySet].map((val) => {
                  if (isSameDay(val, day)) {
                    return (
                      <div key={val} className="mt-1 flex justify-center">
                        <a
                          href={`/calendar/day/${new Date(val).toDateString()}`}
                        >
                          <div className="size-5 rounded-full bg-picton-blue-500"/>
                        </a>
                      </div>
                    );
                  }
                })}
              </div>

              {/* Desktop view events */}
              <div className="hidden md:block">
                {events
                  .filter((event) => isSameDay(event.start, day))
                  .map((event) => {
                    const bgcolor = event.color === "black" ? ("bg-" + event.color).toString() : ("bg-" + event.color + "-500").toString();
                    return (
                      <div
                        key={event.summary}
                        className={`font-sans ${inter.variable} m-1 hidden text-nowrap rounded-md ${bgcolor} p-1 text-white sm:block`}
                      >
                        <Dialog>
                          <DialogTrigger className="w-full">
                            <div className={`font-sans ${inter.variable}`}>
                              {event.eventType == "Interclub A"
                                ? "Interclub NLA"
                                : event.eventType == "Interclub B"
                                  ? "Interclub NLB"
                                  : event.eventType == "Interclub 1"
                                    ? "Interclub 1ère Ligue"
                                    : event.eventType == "Interclub 2"
                                      ? "Interclub 2ème Ligue"
                                      : event.eventType == "Interclub 3"
                                        ? "Interclub 3ème Ligue"
                                        : event.eventType == "Interclub 4"
                                          ? "Interclub 4ème Ligue"
                                          : event.summary}
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                <p
                                  className={`flex font-sans ${inter.variable}`}
                                >
                                  {event.summary}
                                </p>
                              </DialogTitle>
                              <DialogDescription>
                                <span className="flex flex-col gap-1">
                                  <span
                                    className={`flex font-sans ${inter.variable} gap-1`}
                                  >
                                    <Clock8 className="size-5" />
                                    {format(event.start, "dd.MM.yyyy")}
                                    {": "}
                                    {format(event.start, "HH:mm")} -{" "}
                                    {format(event.end, "HH:mm")}
                                  </span>
                                  <span
                                    className={`flex font-sans ${inter.variable} gap-1`}
                                  >
                                    <MapPin className="size-5" />{" "}
                                    {event.location}
                                  </span>
                                  <a
                                    className={`flex font-sans ${inter.variable} gap-1 hover:underline`}
                                    href={event.url}
                                    target="_blank"
                                  >
                                    <Link className="size-5" />
                                    Lien
                                  </a>
                                  <a
                                    className={`flex font-sans ${inter.variable} gap-1 hover:underline`}
                                    href={`/calendar/event/${event.id}`}
                                  >
                                    <CircleEllipsis className="size-5" />
                                    Détails
                                  </a>
                                </span>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    );
                  })}
              </div>
            </ScrollArea>
          );
        })}
        {Array.from({ length: 35 - startingDayIndex - daysInMonth.length }).map(
          (_, index) => {
            return (
              <div
                className="border bg-gray-100 pt-1 text-center text-gray-500"
                key={index}
              >
                {format(
                  daysInNextMonth[index]?.toString() ?? new Date().toString(),
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
