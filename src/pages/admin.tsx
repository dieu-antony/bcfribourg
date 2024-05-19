import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Router from "next/router";
import * as ical from "node-ical";
import {
  CalendarEventWithoutID,
  parseCalendar,
} from "~/lib/utils/parseCalender";
import { FormEvent } from "react";
import { Toaster } from "~/lib/components/ui/sonner";
import { toast } from "sonner";
import Head from "next/head";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/lib/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { inter } from "./_app";
import { cn } from "~/lib/utils/utils"
import { Button } from "~/lib/components/ui/button";
import { Calendar } from "~/lib/components/ui/calendar";
import { DatabaseTable } from "~/lib/components/dataTable/DatabaseTable";
import {
  DatabaseColumns,
  DatabaseColumnsProps,
} from "~/lib/components/dataTable/DatabaseColumns";
import { PastTeam } from "./api/pastTeams/create";

const admin = () => {
  const [events, setEvents] = useState<CalendarEventWithoutID[]>([]);
  const [teams, setTeams] = useState<PastTeam[]>([]);
  const [loading, setLoading] = useState(false);
  const [eventDate, setEventDate] = useState<Date>();
  const [tableData, setTableData] = useState<DatabaseColumnsProps[]>([]);

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
      setLoading(true);
      const toastId = toast.loading("Uploading events...");

      const reader = new FileReader();

      reader.addEventListener("load", async function (e) {
        const content = e.target?.result;
        if (!content) return;
        if (typeof content !== "string") return;

        const data = ical.sync.parseICS(content);
        const parsedEvents = await parseCalendar(data);
        setEvents((prev) => [...prev, ...parsedEvents]);
        setLoading(false);
        toast.dismiss(toastId);
        toast.success("Events uploaded successfully");
      });

      reader.readAsText(file);
    }
  }

  async function onCalendarSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (events.length === 0) return;

    const selectedType = (
      document.getElementById("league") as HTMLSelectElement
    )?.value;
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

 async function onTeamFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setTeams([]);
    const file = e.target.files?.[0];
    console.log(file);
    if (!file) return;

    setLoading(true);
    const toastId = toast.loading("Uploading teams...");

    const reader = new FileReader();
    
    reader.addEventListener("load", async function (e) {
      console.log("reader")
      const parsedTeams = await file.text().then((text) => JSON.parse(text));
      console.log("parsed")
      setTeams((prev) => [...prev, ...parsedTeams]);
      setLoading(false);
      toast.dismiss(toastId);
      toast.success("Teams uploaded successfully");
    });
    reader.readAsText(file);
  }

  async function onTeamSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (teams.length === 0) return;

    const response = await fetch("/api/pastTeams/create", {
      method: "POST",
      body: JSON.stringify(teams),
    });
    const data = await response.json();
    if (data.status === "success") {
      toast.success(data.message);
    }
    if (data.status === "error") {
      toast.error(data.message);
    }
  }

  async function getDatabaseEvents() {
    const response = await fetch("/api/events");
    const data = await response.json();
    if (data.status === "success") {
      setTableData(
        data.events.map((event: any) => ({
          id: event.id,
          eventType: event.eventType,
          summary: event.summary,
          location: event.location,
          url: event.url,
          start: event.start,
        })),
      );
      console.log(tableData);
    }
  }
  if (status === "authenticated") {
    return (
      <>
        <Head>
          <title>Admin</title>
        </Head>
        <div className="mt-6 flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold">Admin</h1>
          <h2 className="text-xl">
            Logged in as <span className="font-bold">{data.user?.email}</span>
          </h2>

          <div className="container">
            <h2 className="text-xl">
              Upload SwissBadminton Interclub Calendar
            </h2>
            <form onSubmit={onCalendarSubmit}>
              <input
                type="file"
                onChange={onFileUpload}
                multiple
                accept=".ics, .ical"
                className="m-1 block w-full rounded-sm border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:max-w-xs sm:text-sm sm:leading-6"
                required
              />
              <select
                name="league"
                id="league"
                className="m-1 block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:max-w-xs sm:text-sm sm:leading-6"
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
                className="m-1 rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:cursor-not-allowed"
                disabled={loading}
              />
            </form>
          </div>
          <div className="container bg-slate-50 py-5">
            <h2>Create Event</h2>
            <p>Please fill out all the required fields to create an event.</p>
            <form /*onSubmit={onEventCreation}*/>
              <label htmlFor="title">Title/Summary</label>
              <input id="title" className="form-input" />
              <label htmlFor="location">Location (optional)</label>
              <input id="start" className="form-input" />
              <label htmlFor="location">Location (optional)</label>
              <input id="location" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !eventDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className={`font-sans mr-2 h-4 w-4 ${inter.variable}`} />
                    {eventDate ? (
                      format(eventDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={eventDate}
                    onSelect={setEventDate}
                    initialFocus
                    className={`font-sans ${inter.variable}`}
                  />
                </PopoverContent>
              </Popover>
              <label htmlFor="location">Location (optional)</label>
              <input id="location" />
              <label htmlFor="location">Location (optional)</label>
              <input id="location" />
              <label htmlFor="location">Location (optional)</label>
              <input id="location" />
              <input
                type="submit"
                value="Submit"
                className="m-1 rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:cursor-not-allowed"
                disabled={loading}
              />
            </form>
          </div>
          <div className="container">
            <h2 className="text-xl">Upload Team Interclub Data (JSON file)</h2>
            <form onSubmit={onTeamSubmit}>
              <input
                type="file"
                onChange={onTeamFileUpload}
                accept=".json"
                className="m-1 block w-full rounded-sm border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:max-w-xs sm:text-sm sm:leading-6"
                required
              />
              <input
                type="submit"
                value="Submit"
                className="m-1 rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:cursor-not-allowed"
                disabled={loading}
              />
            </form>
          </div>
          <Button onClick={getDatabaseEvents}>Get Events</Button>
          <div className="container mx-auto py-10">
            <DatabaseTable columns={DatabaseColumns} data={tableData} />
          </div>
          <Toaster richColors />
        </div>
      </>
    );
  }
};

export default admin;
