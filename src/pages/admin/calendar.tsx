import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Router from "next/router";
import { Button } from "~/lib/components/ui/button";
import { EventDatabaseTable } from "~/lib/components/dataTables/eventTable/EventDatabaseTable";
import { Toaster } from "~/lib/components/ui/sonner";
import { EventDatabaseColumns } from "~/lib/components/dataTables/eventTable/EventDatabaseColumns";
import type { DatabaseColumnsProps } from "~/lib/components/dataTables/eventTable/EventDatabaseColumns";
import { toast } from "sonner";
import { type CalendarEventWithoutID, sync } from "~/lib/types";
import { findLonLat, parseCalendar } from "~/lib/utils/parseCalender";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/lib/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/lib/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { inter } from "../_app";
import crypto from "crypto";

const Calendar = () => {
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);

  const [events, setEvents] = useState<CalendarEventWithoutID[]>([]);
  const [eventsToCreate, setEventsToCreate] = useState({
    eventType: "Events",
  } as CalendarEventWithoutID);
  const [tableData, setTableData] = useState<DatabaseColumnsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    async function getDatabaseEvents() {
      const response = await fetch("/api/events");
      const data: {
        status: "success" | "loading" | "error";
        events: DatabaseColumnsProps[];
        message: string;
      } = await response.json();
      if (data.status === "success") {
        setTableData(
          data.events.map((event: DatabaseColumnsProps) => ({
            id: event.id,
            eventType: event.eventType,
            summary: event.summary,
            location: event.location,
            url: event.url,
            start: event.start,
          })),
        );
      }
    }
    getDatabaseEvents();
  }, []);

  function onFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setEvents([]);
    const files = e.target.files;
    if (!files) return;

    for (const file of files) {
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

        const data = sync.parseICSFix(content);
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
  async function onEventSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    eventsToCreate.longitude = (await findLonLat(eventsToCreate.location!)).lon;
    eventsToCreate.latitude = (await findLonLat(eventsToCreate.location!)).lat;
    eventsToCreate.uid = crypto.randomBytes(20).toString("hex");
    const eventsAsArray = [];
    eventsAsArray.push(eventsToCreate);
    const response = await fetch("/api/events/create", {
      method: "POST",
      body: JSON.stringify(eventsAsArray),
    });
    const data = await response.json();
    if (data.status === "success") {
      toast.success(data.message);
    }
    if (data.status === "error") {
      toast.error(data.message);
    }
    setEventsToCreate({} as CalendarEventWithoutID);
  }

  async function deleteAllEvents() {
    confirmDelete ? setConfirmDelete(false) : setConfirmDelete(true);
    if (!confirmDelete) return;
    const response = await fetch("/api/events/delete", {
      method: "POST",
      body: JSON.stringify(tableData),
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
      <>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  Calendar
                  <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className={`font-sans ${inter.variable}`}
                >
                  <DropdownMenuItem>
                    <BreadcrumbLink href="/admin/icdata">
                      IC Data
                    </BreadcrumbLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BreadcrumbLink href="/admin/players">
                      Players
                    </BreadcrumbLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BreadcrumbLink href="/admin/calendar">
                      Calendar
                    </BreadcrumbLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-6 flex flex-col items-center justify-center gap-2">
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

          {/* Create single event */}
          <div className="container bg-slate-50 py-5">
            <h2>Create Event</h2>
            <p>Please fill out all the required fields to create an event.</p>
            <form onSubmit={onEventSubmit} className="flex flex-col">
              <label htmlFor="title">Title/Summary</label>
              <input
                id="title"
                className="form-input"
                onChange={(e) =>
                  setEventsToCreate({
                    ...eventsToCreate,
                    summary: e.target.value,
                  })
                }
                required
              />
              <label htmlFor="location">Location (optional)</label>
              <input
                id="start"
                className="form-input"
                onChange={(e) =>
                  setEventsToCreate({
                    ...eventsToCreate,
                    location: e.target.value,
                  })
                }
              />
              <label htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                type="datetime-local"
                className="form-input"
                onChange={(e) =>
                  setEventsToCreate({
                    ...eventsToCreate,
                    start: new Date(e.target.value),
                  })
                }
                required
              />
              <label htmlFor="endDate">End Date</label>
              <input
                id="endDate"
                type="datetime-local"
                className="form-input"
                onChange={(e) =>
                  setEventsToCreate({
                    ...eventsToCreate,
                    end: new Date(e.target.value),
                  })
                }
                required
              />
              <label htmlFor="url">Url (optional)</label>
              <input
                id="url"
                type="url"
                className="form-input"
                onChange={(e) =>
                  setEventsToCreate({
                    ...eventsToCreate,
                    url: e.target.value,
                  })
                }
              />
              <input
                type="submit"
                value="Submit"
                className="m-1 mt-2 rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:cursor-not-allowed"
                disabled={loading}
              />
            </form>
          </div>
          <div className="flex flex-row gap-2 pt-10">
            <Button
              onClick={deleteAllEvents}
              className="bg-red-500 hover:bg-red-600"
            >
              {confirmDelete ? "Yes, delete all Events" : "Delete All Events"}
            </Button>
            {confirmDelete && (
              <Button
                onClick={() => setConfirmDelete(false)}
                className="bg-green-500 hover:bg-green-600"
              >
                Nevermind
              </Button>
            )}
          </div>
          <div className="container mx-auto pb-10">
            <EventDatabaseTable
              columns={EventDatabaseColumns}
              data={tableData}
            />
          </div>
          <Toaster richColors />
        </div>
      </>
    );
  }
};

export default Calendar;
