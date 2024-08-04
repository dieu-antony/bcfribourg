import type { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "~/lib/utils/routeHandler";
import { db } from "~/server/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import type { PlayerWithoutID } from "~/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    await RouteHandler(req, res, {
      POST: async function (req, res: NextApiResponse) {
        const players: PlayerWithoutID[] = JSON.parse(req.body as string);

        if (players.length === 0) {
          return res
            .status(400)
            .json({ status: "error", message: "No players provided" });
        }

        try {
          const existingPlayers = await db.player.findMany({
            where: {
              firstName: { in: players.map((player) => player.firstName) },
              lastName: { in: players.map((player) => player.lastName) },
            },
          });

          const existingPlayerNames = existingPlayers.map(
            (player) => player.firstName + player.lastName,
          );

          const playersToUpdate = players.filter((player) =>
            existingPlayerNames.includes(player.firstName + player.lastName),
          );

          const playersToCreate = players.filter(
            (player) =>
              !existingPlayerNames.includes(player.firstName + player.lastName),
          );

          if (playersToUpdate.length > 0) {
            await Promise.all(
              playersToUpdate.map(async (player) => {
                const existingPlayer = existingPlayers.find(
                  (p) =>
                    p.firstName === player.firstName &&
                    p.lastName === player.lastName,
                );

                if (existingPlayer) {
                  await db.player.update({
                    where: { id: existingPlayer.id },
                    data: {
                      firstName: player.firstName,
                      lastName: player.lastName,
                      teamId: player.teamId,
                      captain: player.captain,
                      gender: player.gender,
                    },
                  });
                }
              }),
            );
          }

          if (playersToCreate.length > 0) {
            await db.player.createMany({
              data: playersToCreate.map((player) => ({
                teamId: player.teamId,
                gender: player.gender,
                captain: player.captain,
                firstName: player.firstName,
                lastName: player.lastName,
              })),
            });
          }

          res.status(200).json({
            status: "success",
            message: players.length + " players successfully created",
            data: players,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            status: "error",
            message: "An error occurred creating the players.",
          });
        }
      },
    });
  } else {
    res.status(401).json({ status: "error", message: "Unauthorized" });
  }
}
