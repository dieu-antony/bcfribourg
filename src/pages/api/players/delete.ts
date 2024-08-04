import type { Player } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "~/lib/utils/routeHandler";
import { db } from "~/server/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession( req, res, authOptions );
  if (session) {
  await RouteHandler(req, res, {
    POST: async function (req, res: NextApiResponse) {
      const players: Player[] = JSON.parse(req.body as string);

      try {
        const playerToDelete = await db.player.findMany({
          where: {
            id: { in: players.map((player) => player.id) },
          },
        });

        if (playerToDelete.length > 0) {
          await db.player.deleteMany({
            where: {
              id: { in: playerToDelete.map((player) => player.id) },
            },
          });
        }

        res.status(200).json({
          status: "success",
          message: "Player successfully deleted.",
          data: players,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          status: "error",
          message: "An error occured deleting the event.",
        });
      }
    },
  });
} else {
  res.status(401).json({ status: "error", message: "Unauthorized" });
}
}
