import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Router from "next/router";
import * as ical from "node-ical";
import {
  CalendarEventWithoutID,
  parseCalendar,
} from "~/lib/utils/parseCalender";
import { FormEvent } from "react";
import { Toaster } from "~/lib/components/ui/sonner"
import { toast } from "sonner";

const admin = () => {
  const [events, setEvents] = useState<CalendarEventWithoutID[]>([]);

  const { status, data } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);

  function onFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setEvents([]);
    const files = e.target.files;
    if (!files) return;

    for (let file of files) {
      if (!file) continue;

      if (file.type !== "text/calendar") {
        continue;
      }

      const reader = new FileReader();

      reader.addEventListener("load", function (e) {
        const content = e.target?.result;
        if (!content) return;
        if (typeof content !== "string") return;

        const data = ical.sync.parseICS(content);
        setEvents((prev) => [...prev, ...parseCalendar(data)]);
      });

      reader.readAsText(file);
    }
  }

  async function onCalendarSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (events.length === 0) return;

    
    const selectedType = (document.getElementById("league") as HTMLSelectElement)?.value;
    const eventsWithType = events.map((event) => ({
      ...event,
      eventType: selectedType,
    }));
    console.log(eventsWithType);
    const response = await fetch("/api/events/create", {
      method: "POST",
      body: JSON.stringify(eventsWithType),
    });
    const data = await response.json();
    if (data.status === "success") {
      toast.success(data.message);
    }
    if (data.status === "error") {
      toast.error(data.message);
    }
  }

  if (status === "authenticated") {
    return (
      <div className="mt-6 flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-bold">Admin</h1>
        <h2 className="text-xl">
          Logged in as <span className="font-bold">{data.user?.email}</span>
        </h2>

        <div>
          <h2 className="text-xl">Upload SwissBadminton Interclub Calendar</h2>
          <form onSubmit={onCalendarSubmit}>
            <input
              type="file"
              onChange={onFileUpload}
              multiple
              accept=".ics, .ical"
              className="block w-full m-1 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:max-w-xs sm:text-sm sm:leading-6"
              required
            />
            <select 
              name="league"
              id="league"
              className="block w-full m-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:max-w-xs sm:text-sm sm:leading-6"
              required
            >
              <option>Interclub A</option>
              <option>Interclub B</option>
              <option>Interclub 1</option>
              <option>Interclub 2</option>
              <option>Interclub 3</option>
              <option>Interclub 4</option>
            </select>
            <input
              type="submit"
              value="Submit"
              className="bg-blue-500 m-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            />
          </form>
        </div>
        <Toaster richColors/>
      </div>
    );
  }
};

export default admin;
