import * as ical from "node-ical";
import { CalendarEvent } from "@prisma/client";

async function findLonLat(address: string) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.append("q", address);
  url.searchParams.append("format", "geojson");
  url.searchParams.append("limit", "1");
  const response = await fetch(url.toString());
  const data = await response.json();
  return {
    lon: data.features[0].geometry.coordinates[0],
    lat: data.features[0].geometry.coordinates[1],
  };
}

export type CalendarEventWithoutID = Omit<CalendarEvent, "id">;

export async function parseCalendar(
  calendar: ical.CalendarResponse,
): Promise<CalendarEventWithoutID[]> {
  let events: CalendarEventWithoutID[] = [];
  for (let item in calendar) {
    const current = calendar[item];

    if (current && current.type == "VEVENT") {
      const vevent = current as ical.VEvent;
      const location =
        vevent.location ||
        (vevent.summary.startsWith("Union Tafers-Fribourg")
          ? "Av. du Général-Guisan 61a, 1700, Fribourg, Switzerland"
          : "Switzerland");
      const coordinates = await findLonLat(location);
      const lat =
        location == "Av. du Général-Guisan 61a, 1700, Fribourg, Switzerland"
          ? 46.811778972062086
          : coordinates.lat;
      const lon =
        location == "Av. du Général-Guisan 61a, 1700, Fribourg, Switzerland"
          ? 7.147400994098687
          : coordinates.lon;

      const data: CalendarEventWithoutID = {
        uid: vevent.uid,
        summary: vevent.summary,
        location: location,
        start: new Date(vevent.start.getTime()),
        url: vevent.url,
        eventType: vevent.eventType,
        longitude: lon,
        latitude: lat,
        end: new Date(vevent.end.getTime()),
      };
      events.push(data);
    }
  }
  return events;
}
