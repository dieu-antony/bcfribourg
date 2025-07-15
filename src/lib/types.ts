import type { CalendarEvent, Player } from "@prisma/client";
import type {
  Attendee,
  BaseComponent,
  Class,
  DateType,
  DateWithTimeZone,
  Method,
  Organizer,
  Transparency,
  VAlarm,
  VCalendar,
  VEvent,
  VEventStatus,
  VTimeZone,
} from "node-ical";

export type TeamWithRatio = PastTeamProps & { ratio: number };

export type EmailData = {
  firstName?: string;
  lastName?: string;
  email: string;
  message?: string;
  phone?: string;
  address?: string;
  toEmail: string;
  npa?: string;
  gender?: string;
  birthdate?: string;
  avs?: string;
  license?: string;
  subject?: string;
  comms?: string;
};

export type CalendarEventWithoutID = Omit<CalendarEvent, "id">;

export type TeamWithRatioKey = {
  seasonStart: number;
  won: number;
  lost: number;
  [key: string]: number;
};

export type PlayerWithoutID = Omit<Player, "id">;

export interface VEventFix extends BaseComponent {
  type: "VEVENT";
  method: Method;
  dtstamp: DateWithTimeZone;
  uid: string;
  sequence: string;
  transparency: Transparency;
  class: Class;
  summary: { val: string; params: string[] };
  start: DateWithTimeZone;
  datetype: DateType;
  end: DateWithTimeZone;
  eventType: string;
  location: string;
  description: string;
  url: string;
  completion: string;
  created: DateWithTimeZone;
  lastmodified: DateWithTimeZone;
  attendee?: Attendee[] | Attendee;
  /* eslint-disable-next-line @typescript-eslint/ban-types */
  recurrences?: Record<string, Omit<VEvent, "recurrences">>;
  status?: VEventStatus;

  // I am not entirely sure about these, leave them as any for now..
  organizer: Organizer;
  /*exdate: any;
  geo: any;
  recurrenceid: any;*/

  alarms?: VAlarm[];
}

export type PlayerByTeam = {
  id: string;
  name: string;
  players: Player[];
  url: string;
  league: {
    name: string;
  };
  photoUrl: string;
};
export type CalendarResponseFix = Record<string, CalendarComponent>;

export type CalendarComponent = VTimeZone | VEventFix | VCalendar;

export interface NodeICalSyncFix {
  parseICSFix: (body: string) => CalendarResponseFix;
  parseFileFix: (file: string) => CalendarResponseFix;
}

// this is a fix for the node-ical types so eslint will complain
/* eslint-disable */
const nodeIcal = require("node-ical");

export const sync: NodeICalSyncFix = {
  parseICSFix: (body: string): CalendarResponseFix => {
    return nodeIcal.parseICS(body);
  },
  parseFileFix: (file: string): CalendarResponseFix => {
    return nodeIcal.parseFile(file);
  },
};
/* eslint-enable */

export type SearchResult = {
  public_id: string;
  asset_folder: string;
  tags: string[];
};

export type PastTeamProps = {
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
  league: string;
  leagueId: string;
  url: string;
};

export type APIMessageResponse = {
  status: "success" | "error" | "loading";
  message: string;
};

// Database types
export type TrainingEntry = {
  id: string;
  day: string;
  time: string;
  target: string;
  trainer: string;
};

export type DurationEntry = {
  id: string;
  link: string;
  start: string;
  end: string;
};

export type Contact = {
  name: string;
  phone: string;
  position: string;
}

export type Role = 
"president" |
"treasurer" |
"vicePresident" |
"events" |
"secretary" |
"interclubs" |
"sup" |
"junior" |
"media";

export type CommitteeCardProps = {
  info: {
    imgRef: string;
    role: string;
    role2?: string;
    name: string;
    email: string;
  };
};