import { Calendar } from "~/lib/components/ui/calendar";
import React from "react";
import { CalendarEvent } from "@prisma/client";

//TODO: add event list
const calendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const formattedDate = date
    ? `${("0" + date.getDate()).slice(-2) + "."}${("0" + (date.getMonth() + 1)).slice(-2) + "."}${date.getFullYear()}`
    : undefined;
  const [events, setEvents] = React.useState<CalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = React.useState<CalendarEvent[]>([]);
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setEvents(data.events);
        }
      });
  }, []);

  React.useEffect(() => {
    if (selectedFilters.length > 0) {
      const filtered = events.filter((event) => selectedFilters.includes(event.eventType));
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [selectedFilters, events]);

  const getNextEvents = () => {
    if (date) {
      const nextEvents = filteredEvents.filter((event) => new Date(event.start) > date);
      return nextEvents.slice(0, 10);
    }
    return [];
  };

  const nextEvents = getNextEvents();

  const handleFilterClick = (filter: string) => {
    if (filter === "Tous") {
      setSelectedFilters([]);
    } else {
      setSelectedFilters((prevFilters) => {
        if (prevFilters.includes(filter)) {
          return prevFilters.filter((f) => f !== filter);
        } else {
          return [...prevFilters, filter];
        }
      });
    }
  };

  return (
    <>
      <div>calendar {formattedDate}</div>
      <div>
        <button onClick={() => handleFilterClick("Tous")} className={`bg-picton-blue-500 hover:bg-picton-blue-400 h-10 w-32 ${selectedFilters.length === 0 ? 'bg-picton-blue-400' : ''}`}>Tous</button>
        <button onClick={() => handleFilterClick("Interclub A")} className={`bg-picton-blue-500 hover:bg-picton-blue-400 h-10 w-32 ${selectedFilters.includes("Interclub A") ? 'bg-picton-blue-400' : ''}`}>NLA</button>
        <button onClick={() => handleFilterClick("Interclub B")} className={`bg-picton-blue-500 hover:bg-picton-blue-400 h-10 w-32 ${selectedFilters.includes("Interclub B") ? 'bg-picton-blue-400' : ''}`}>NLB</button>
        <button onClick={() => handleFilterClick("Interclub 1")} className={`bg-picton-blue-500 hover:bg-picton-blue-400 h-10 w-32 ${selectedFilters.includes("Interclub 1") ? 'bg-picton-blue-400' : ''}`}>1ère Ligue</button>
        <button onClick={() => handleFilterClick("Interclub 2")} className={`bg-picton-blue-500 hover:bg-picton-blue-400 h-10 w-32 ${selectedFilters.includes("Interclub 2") ? 'bg-picton-blue-400' : ''}`}>2ème Ligue</button>
        <button onClick={() => handleFilterClick("Interclub 3")} className={`bg-picton-blue-500 hover:bg-picton-blue-400 h-10 w-32 ${selectedFilters.includes("Interclub 3") ? 'bg-picton-blue-400' : ''}`}>3ème Ligue</button>
        <button onClick={() => handleFilterClick("Interclub 4")} className={`bg-picton-blue-500 hover:bg-picton-blue-400 h-10 w-32 ${selectedFilters.includes("Interclub 4") ? 'bg-picton-blue-400' : ''}`}>4ème Ligue</button>
        <button onClick={() => handleFilterClick("Événements")} className={`bg-picton-blue-500 hover:bg-picton-blue-400 h-10 w-32 ${selectedFilters.includes("Événements") ? 'bg-picton-blue-400' : ''}`}>Événements</button>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <div className="flex flex-col items-center justify-center">
        {nextEvents.map((event) => (
          <div
            key={event.id}
            className="flex m-5 w-full max-w-[1000px] flex-col rounded border bg-slate-50 p-2"
          >
            <div>{event.summary}</div>
            <div>{event.location}</div>
            <div>{new Date(event.start).toLocaleString()}</div>
            <a href={event.url}>Lien</a>
          </div>
        ))}
      </div>
    </>
  );
};

export default calendar;
