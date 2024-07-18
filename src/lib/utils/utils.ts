import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function abbreviateTeamName(inputText: string): string {
  const regex = /Union Tafers-Fribourg ([1-9])/;

  const match: RegExpMatchArray | null = inputText.match(regex);

  if (match) {
    const digit: string = match[1]!;
    const abbreviatedText = `UTF ${digit}`;
    return abbreviatedText;
  } else {
    return inputText;
  }
}

export function getLeagueFromId(id: string) {
  switch (id) {
    case "clvzb9fvi0000132rf2m0p5mn":
      return "1";
    case "clvzbaizc0000ji7z4hvz8bzd":
      return "2";
    case "clvzbav2u0000xmtyuu85b6fu":
      return "3";
    case "clvzbazur00009r4ruxq9hltm":
      return "4";
    case "clvzbb65d00005qy3z10kl2no":
      return "5";
    case "clvzbbfot00001o6wxykabs64":
      return "A";
    case "clvzbblao0000nrcwt4za7q9h":
      return "B";
    case "clvzbbpa50000ajf04h7hmwv2":
      return "C";
    default:
      return "Unknown";
  }
}

export function getWinLossRecord(input: string): { won: number; lost: number } {
  const [x, y] = input.split("-");
  return {
    won: parseInt(x!),
    lost: parseInt(y!),
  };
}

export function turnLeagueToNumber(league: string) {
  switch (league) {
    case "A":
      return "10";
    case "B":
      return "20";
    case "C":
      return "30";
    case "1":
      return "40";
    case "2":
      return "50";
    case "3":
      return "60";
    case "4":
      return "70";
    case "5":
      return "80";
    default:
      return "0";
  }
}

export const toEmail = (subject: string) => {
  switch (subject) {
    case "Information":
      return "president@bcfribourg.ch";
    case "Compétition":
      return "technique@bcfribourg.ch";
    case "Entraînement Adultes":
      return "technique@bcfribourg.ch";
    case "Entraînement Juniors":
      return "juniors@bcfribourg.ch";
    case "Site internet":
      return "webmaster@bcfribourg.ch";
    case "Evènements":
      return "event@bcfribourg.ch";
    case "Autre":
      return "secretaire@bcfribourg.ch";
    default:
      "secretaire@bcfribourg.ch";
  }
};

export const getEventDescription = (
  eventType: string,
  t: (key: string) => string,
): string => {
  const eventTypeMap: Record<string, string> = {
    "Interclub A": "NLA",
    "Interclub B": "NLB",
    "Interclub 1": "1",
    "Interclub 2": "2",
    "Interclub 3": "3",
    "Interclub 4": "4",
  };

  const description = eventTypeMap[eventType];

  return description ? ("Interclub " + t(description)) : "";
};
