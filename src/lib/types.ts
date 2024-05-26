import type { League, CalendarEvent, Player } from "@prisma/client";
import { Attendee, BaseComponent, Class, DateType, DateWithTimeZone, Method, Organizer, Transparency, VAlarm, VCalendar, VEvent, VEventStatus, VTimeZone } from "node-ical";
export type TeamWithRatio = PastTeam & { ratio: number };

export type PastTeam = {
  id: string;
  name: string;
  position: number;
  wins: number;
  losses: number;
  ties: number;
  points: number;
  matchRecord: string;
  setRecord: string;
  gamesRecord: string;
  seasonStart: number;
  league: League;
  leagueId: string;
  url: string;
};

export type EmailData = {
  firstName?: string;
  lastName?: string;
  email: string;
  message?: string;
  phone?: string;
  natel?: string;
  address?: string;
  toEmail: string;
  npa?: string;
  gender?: string;
  birthdate?: string;
  avs?: string;
  license?: string;
  subject?: string;
};

export type CalendarEventWithoutID = Omit<CalendarEvent, "id">;

export type TeamWithRatioKey = { seasonStart: number } & { won: number } & {
  lost: number;
} & {
  [key: string]: number;
};

export type PlayerWithoutID = Omit<Player, "id">;


export interface VEventFix extends BaseComponent {
  type: 'VEVENT';
  method: Method;
  dtstamp: DateWithTimeZone;
  uid: string;
  sequence: string;
  transparency: Transparency;
  class: Class;
  summary: {val: string, params: any[]};
  start: DateWithTimeZone;
  datetype: DateType;
  end: DateWithTimeZone;
  eventType: string,
  location: string;
  description: string;
  url: string;
  completion: string;
  created: DateWithTimeZone;
  lastmodified: DateWithTimeZone;
  attendee?: Attendee[] | Attendee;
  /* eslint-disable-next-line @typescript-eslint/ban-types */
  recurrences?: Record<string, Omit<VEvent, 'recurrences'>>;
  status?: VEventStatus;

  // I am not entirely sure about these, leave them as any for now..
  organizer: Organizer;
  exdate: any;
  geo: any;
  recurrenceid: any;

  alarms?: VAlarm[];
}

export type CalendarResponseFix = Record<string, CalendarComponent>;

export type CalendarComponent = VTimeZone | VEventFix | VCalendar;

export interface NodeICalSyncFix {
  parseICSFix: (body: string) => CalendarResponseFix;

  parseFileFix: (file: string) => CalendarResponseFix;
}

export const sync: NodeICalSyncFix = require("node-ical") as NodeICalSyncFix;

