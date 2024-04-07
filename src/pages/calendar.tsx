import { Calendar } from "~/lib/components/ui/calendar";
import { useState, useEffect } from "react";
import { CalendarEvent } from "@prisma/client";
import Select from "react-select";

//TODO: make filter pretty
const calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const formattedDate = date
    ? `${("0" + date.getDate()).slice(-2) + "."}${("0" + (date.getMonth() + 1)).slice(-2) + "."}${date.getFullYear()}`
    : undefined;
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setEvents(data.events);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedFilters.length > 0) {
      const filtered = events.filter((event) =>
        selectedFilters.includes(event.eventType),
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [selectedFilters, events]);

  const getNextEvents = () => {
    if (date) {
      const nextEvents = filteredEvents.filter(
        (event) => new Date(event.start) > date,
      );
      return nextEvents.slice(0, 10);
    }
    return [];
  };

  const nextEvents = getNextEvents();

  //TODO: make the options a part of the db and fetch them here
  const filterOptions = [
    //{ value: "Interclub A", label: "NLA" },
    { value: "Interclub B", label: "NLB" },
    { value: "Interclub 1", label: "1ère Ligue" },
    { value: "Interclub 2", label: "2ème Ligue" },
    //{ value: "Interclub 3", label: "3ème Ligue" },
    { value: "Interclub 4", label: "4ème Ligue" },
    { value: "Events", label: "Événements" },
  ];

  const filteredOptions = filterOptions.filter((option) =>
    selectedFilters.includes(option.value),
  );

  return (
    <>
      <div>calendar {formattedDate}</div>
      <Select
        isMulti
        options={filterOptions}
        closeMenuOnSelect={false}
        onChange={(selectedOptions) => {
          const selectedValues = selectedOptions.map((option) => option.value);
          setSelectedFilters(selectedValues);
        }}
        value={filteredOptions}
        placeholder="Filtrer par type"
      />

      <Calendar
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        captionLayout="dropdown-buttons"
        fromYear={2023}
        toYear={2025}
      />
      <div className="flex flex-col items-center justify-center">
        {nextEvents.map((event) => (
          <div
            key={event.id}
            className="m-5 flex w-full max-w-[1000px] flex-col rounded border bg-slate-50 p-2"
          >
            <div>{event.summary}</div>
            <div>{event.location}</div>
            <div>{new Date(event.start).toLocaleString()}</div>
            <a href={event.url}>Lien</a>
          </div>
        ))}
        <div>
          
        </div>
      </div>
    </>
  );
};

export default calendar;
