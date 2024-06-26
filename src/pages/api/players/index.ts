import { RouteHandler } from "~/lib/utils/routeHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>,
) {
  await RouteHandler(req, res, {
    GET: async function (req, res: NextApiResponse) {
      const playersByTeam = await db.iCTeam.findMany({
        select: {
          id: true,
          name: true,
          url: true,
          players: true,
          league: {
        select: {
          name: true,
        },
          },
        },
      });

      res.status(200).json({ status: "success", players: playersByTeam });
    },
  });
}
