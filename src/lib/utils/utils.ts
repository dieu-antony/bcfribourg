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
  const lowerSubject = subject.toLowerCase();
  switch (lowerSubject) {
    case "information":
      return "president@bcfribourg.ch";
    case "competition":
      return "interclubs@bcfribourg.ch";
    case "entrainement adulte":
      return "info@bcfribourg.ch";
    case "entrainement junior":
      return "juniors@bcfribourg.ch";
    case "website":
      return "webmaster@bcfribourg.ch";
    case "evenement":
      return "event@bcfribourg.ch";
    case "autre":
      return "secretaire@bcfribourg.ch";
    default:
      return "secretaire@bcfribourg.ch";
  }
};

export const getEventDescription = (
  eventType: string,
  locale: string,
) => {
  switch (eventType) {
    case "Interclub A":
      return locale === "fr-CH"
        ? "Interclub NLA"
        : "Interclub NLA";
    case "Interclub B":
      return locale === "fr-CH"
        ? "Interclub NLB"
        : "Interclub NLB";
    case "Interclub 1":
      return locale === "fr-CH"
        ? "Interclub 1ère Ligue"
        : "Interclub 1. Liga";
    case "Interclub 2":
      return locale === "fr-CH"
        ? "Interclub 2ème Ligue"
        : "Interclub 2. Liga";
    case "Interclub 3":
      return locale === "fr-CH"
        ? "Interclub 3ème Ligue"
        : "Interclub 3. Liga";
    case "Interclub 4":
      return locale === "fr-CH"
        ? "Interclub 4ème Ligue"
        : "Interclub 4. Liga";
    default:
      return "";
  }
}
  


