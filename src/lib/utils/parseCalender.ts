import * as ical from "node-ical";
import { CalendarEvent } from "@prisma/client";

type CalendarEventWithoutID = Omit<CalendarEvent, "id">;

export function parseCalendar(
  calendar: ical.CalendarResponse,
): CalendarEventWithoutID[] {
  let events: CalendarEventWithoutID[] = [];
  for (let item in calendar) {
    const current = calendar[item];

    if (current && current.type == "VEVENT") {
      const vevent = current as ical.VEvent;

      const data: CalendarEventWithoutID = {
        uid: vevent.uid,
        summary: vevent.summary.val,
        location:
          vevent.location ||
          vevent.summary.val.startsWith("Union Tafers-Fribourg")
            ? "Av. du Général-Guisan 61a, 1700, Fribourg, Switzerland"
            : "Switzerland",
        start: vevent.start,
        url: vevent.url,
      };

      events.push(data);
    }
  }
  return events;
}