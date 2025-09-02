import { useState, useEffect } from "react";
import type { CalendarEvent } from "@prisma/client";
import Select from "react-select";
import EventCalendar from "~/lib/components/calendar/EventCalendar";
import chroma from "chroma-js";
import type { GetStaticPropsContext } from "next";
import Layout from "~/lib/components/Layout";
import { useTranslations } from "next-intl";

type CalendarProps = {
  initialEvents: CalendarEvent[];
};

const Calendar = ({ initialEvents }: CalendarProps) => {
  const t = useTranslations("Calendar");
  const [events] = useState<CalendarEvent[]>(initialEvents);
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  /* eslint-disable */
  // Styles for the filter (unknown react-select types)
  const colorStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: "white" }),
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
            ? data.color
            : isFocused
              ? color.alpha(0.1).css()
              : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
            ? chroma.contrast(color, "white") > 2
              ? "white"
              : "black"
            : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles: any, { data }: any) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles: any, { data }: any) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles: any, { data }: any) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };
  /* eslint-enable */

  // Filter events based on the selected filters
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

  const filterOptions = [
    //{ value: "Interclub A", label: t("NLA"), color: "orange" },
    { value: "Interclub B", label: t("NLB"), color: "purple" },
    { value: "Interclub 1", label: t("1"), color: "blue" },
    { value: "Interclub 2", label: t("2"), color: "red" },
    //{ value: "Interclub 3", label: t("3"), color: "yellow" },
    { value: "Interclub 4", label: t("4"), color: "green" },
    { value: "Events", label: t("events"), color: "black" },
  ];

  // Get the color of the event type
  function getColorByEvent(eventType: string) {
    return (
      filterOptions.find((option) => option.value === eventType)?.color ??
      "black"
    );
  }

  // Get the selected options
  const filteredOptions = filterOptions.filter((option) =>
    selectedFilters.includes(option.value),
  );

  return (
    <Layout>
      <div className="mx-2 my-8 flex flex-col items-center">
        <div className="">
          <Select
            instanceId={"filter"}
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
            placeholder={t("filter")}
            className="z-10"
            styles={colorStyles}
          />
        </div>

        <div className="w-full md:w-11/12">
          <EventCalendar
            events={filteredEvents.map((ev) => {
              return { ...ev, color: getColorByEvent(ev.eventType) };
            })}
          />
        </div>
      </div>
    </Layout>
  );
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/events`);
  const data = (await res.json()) as {
    events: CalendarEvent[];
    status: string;
  };

  const newEvents = data.events.map((event: CalendarEvent) => ({
    ...event,
    start: event.start ?? new Date(event.start),
    end: event.end ?? new Date(event.end),
    title: event.summary,
    location: event.location,
    url: event.url,
    eventType: event.eventType,
    longitude: event.longitude,
    latitude: event.latitude,
  }));

  return {
    props: {
      messages: messages.default,
      initialEvents: newEvents,
    },
    revalidate: 60 * 60 * 24,
  };
}

export default Calendar;
