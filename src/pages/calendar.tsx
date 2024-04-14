import { useState, useEffect } from "react";
import { CalendarEvent } from "@prisma/client";
import Select from "react-select";
import Head from "next/head";
import EventCalendar from "~/lib/components/calendar/EventCalendar";

//TODO: make filter pretty
const calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          const newEvents = data.events.map((event: CalendarEvent) => ({
            ...event,
            start: event.start || new Date(event.start),
            end: event.end || new Date(event.end),
            title: event.summary,
            location: event.location,
            url: event.url,
            eventType: event.eventType,
            longitude: event.longitude,
            latitude: event.latitude,
          }));
          setEvents(newEvents);
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
      <Head>
        <title>Calendar</title>
      </Head>
      <div className="flex flex-col items-center m-2">
        <div className="">
          <Select
            isMulti
            options={filterOptions}
            closeMenuOnSelect={false}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions.map(
                (option) => option.value,
              );
              setSelectedFilters(selectedValues);
            }}
            value={filteredOptions}
            placeholder="Filtrer par type"
            className="z-10"
          />
        </div>

        <div className="md:w-11/12 w-full">
          <EventCalendar events={filteredEvents} />
        </div>
      </div>
    </>
  );
};

export default calendar;
