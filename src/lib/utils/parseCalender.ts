/* eslint-disable */

import type { CalendarEventWithoutID, CalendarResponseFix } from "../types";

export async function findLonLat(address: string) {
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

export async function parseCalendar(
  calendar: CalendarResponseFix,
): Promise<CalendarEventWithoutID[]> {
  const events: CalendarEventWithoutID[] = [];
  for (const item in calendar) {
    const current = calendar[item];

    if (current && current.type == "VEVENT") {
      const vevent = current;
      const location =
        vevent.location ||
        (vevent.summary.val.startsWith("Union Tafers-Fribourg") ||
        vevent.summary.val.startsWith("Union Fribourg-Tafers")
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
        summary: vevent.summary.val,
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
