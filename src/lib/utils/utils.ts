export function abbreviateTeamName(inputText: string): string {
    const regex: RegExp = /Union Tafers-Fribourg ([1-9])/;

    const match: RegExpMatchArray | null = inputText.match(regex);

    if (match) {
        const digit: string = match[1] as string;
        const abbreviatedText: string = `UTF ${digit}`;
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

  export function getWinLossRecord(input: string): { won: number, lost: number } {
    const [x, y] = input.split("-");
    return {
      won: parseInt(x as string),
      lost: parseInt(y as string),
    };
  }