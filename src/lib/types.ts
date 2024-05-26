import type { League, CalendarEvent, Player } from "@prisma/client";

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
