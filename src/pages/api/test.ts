import { RouteHandler } from "~/lib/utils/routeHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { Player } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>,
) {
  await RouteHandler(req, res, {
    POST: async function (req, res: NextApiResponse) {
      /*  const teams = [
        {
          name: "Union Tafers-Fribourg 1",
          leagueId: "clulbl0h50000gow5oi37n70b",
        },
        {
          name: "Union Tafers-Fribourg 2",
          leagueId: "clulbl0h50001gow5zok4ow8q",
        },
        {
          name: "Union Tafers-Fribourg 3",
          leagueId: "clulbl0h50002gow5yzvicafr",
        },
        {
          name: "Union Tafers-Fribourg 4",
          leagueId: "clulbl0h50003gow5s5a08uvz",
        },
        {
          name: "Union Tafers-Fribourg 5",
          leagueId: "clulbl0h50005gow5tjdgp1ax",
        },
        {
          name: "Union Tafers-Fribourg 6",
          leagueId: "clulbl0h50005gow5tjdgp1ax",
        },
      ];

      await db.team.createMany({
        data: teams,
      });

      res.status(200).json({ status: "success" });

      const players: Omit<Player, "id">[] = [
        {
          firstName: "Antony",
          lastName: "Dieu",
          captain: false,
          gender: "M",
          teamId: "clulbre0e0004u7jqrr2dh669",
        },
        {
          firstName: "Lea",
          lastName: "Briguet",
          captain: false,
          gender: "F",
          teamId: "clulbre0e0003u7jq0ncqb3m0",
        },
        {
          firstName: "Colette",
          lastName: "Jungo",
          captain: true,
          gender: "F",
          teamId: "clulbre0e0004u7jqrr2dh669",
        },
        {
          firstName: "Yann",
          lastName: "Kurzo",
          captain: true,
          gender: "M",
          teamId: "clulbre0e0005u7jqka5i5ifw",
        },
        {
          firstName: "Sven",
          lastName: "Eng",
          captain: false,
          gender: "M",
          teamId: "clulbre0e0005u7jqka5i5ifw",
        },
        {
          firstName: "Adrien",
          lastName: "Chavy",
          captain: false,
          gender: "M",
          teamId: "clulbre0e0004u7jqrr2dh669",
        },
        {
          firstName: "Philippe",
          lastName: "Etter",
          captain: false,
          gender: "M",
          teamId: "clulbre0e0003u7jq0ncqb3m0",
        },
        {
          firstName: "Nicole",
          lastName: "Schaller",
          captain: true,
          gender: "F",
          teamId: "clulbre0e0000u7jqtvkfr5fv",
        },
        {
          firstName: "Benedikt",
          lastName: "Schaller",
          captain: false,
          gender: "M",
          teamId: "clulbre0e0000u7jqtvkfr5fv",
        },
      ];*/

    },
  });
}
