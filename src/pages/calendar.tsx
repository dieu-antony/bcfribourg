import { Calendar } from "~/lib/components/ui/calendar";
import React from "react";

//TODO: add event list
const calendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const formattedDate = date
    ? `${("0" + date.getDate()).slice(-2) + "."}${("0" + (date.getMonth() + 1)).slice(-2) + "."}${date.getFullYear()}`
    : undefined;

  return (
    <>
      <div>calendar {formattedDate}</div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </>
  );
};

export default calendar;
