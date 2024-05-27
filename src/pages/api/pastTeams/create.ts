import type { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "~/lib/utils/routeHandler";
import { db } from "~/server/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import type { PastTeam } from "~/lib/types";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession( req, res, authOptions );
  if (session) {
    await RouteHandler(req, res, {
      POST: async function (req, res: NextApiResponse) {
        const team: PastTeam[] = JSON.parse(req.body);
        if (team.length === 0) {
          return res
            .status(400)
            .json({ status: "error", message: "No team / data provided" });
        }

        try {
          const existingTeams = await db.pastTeam.findMany({
            where: {
              url: { in: team.map((team) => team.url) },
              name: { in: team.map((team) => team.name) },
            },
          });

          const existingTeamUrl = existingTeams.map((team) => team.url);
          const existingTeamName = existingTeams.map((team) => team.name);

          const teamsToUpdate = team.filter(
            (team) =>
              existingTeamUrl.includes(team.url) &&
              existingTeamName.includes(team.name),
          );

          const teamsToCreate = team.filter(
            (team) =>
              !existingTeamUrl.includes(team.url) &&
              !existingTeamName.includes(team.name),
          );

          if (teamsToUpdate.length > 0) {
            await Promise.all(
              teamsToUpdate.map(async (team) => {
                const existingTeam = existingTeams.find(
                  (t) => t.url === team.url && t.name === team.name,
                );

                if (existingTeam) {
                  await db.pastTeam.update({
                    where: { id: existingTeam.id },
                    data: {
                      name: team.name,
                      position: team.position,
                      wins: team.wins,
                      losses: team.losses,
                      ties: team.ties,
                      points: team.points,
                      matchRecord: team.matchRecord,
                      setRecord: team.setRecord,
                      gamesRecord: team.gamesRecord,
                      seasonStart: team.seasonStart,
                      leagueId: team.leagueId,
                      url: team.url,
                    },
                  });
                  res.status(200).json({
                    status: "error",
                    message: "Teams updated successfully.",
                  });
                }
              }),
            );
          }
          if (teamsToCreate.length > 0) {
            await db.pastTeam.createMany({
              data: teamsToCreate.map((team) => ({
                id: team.id,
                name: team.name,
                position: team.position,
                wins: team.wins,
                losses: team.losses,
                ties: team.ties,
                points: team.points,
                matchRecord: team.matchRecord,
                setRecord: team.setRecord,
                gamesRecord: team.gamesRecord,
                seasonStart: team.seasonStart,
                leagueId: team.leagueId,
                url: team.url,
              })),
            });
          }

          res.status(200).json({
            status: "success",
            message: team.length + " teams successfully created.",
            data: team,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            status: "error",
            message: "An error occured creating the teams.",
          });
        }
      },
    });
  } else {
    res.status(401).json({ status: "error", message: "Unauthorized" });
  }
}
