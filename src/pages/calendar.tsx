import { Calendar } from "~/lib/components/ui/calendar";
import React from "react";

const calendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <>
      <div>calendar</div>
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
