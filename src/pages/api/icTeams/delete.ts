import type { ICTeam } from "@prisma/client";
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
      const ICTeam: ICTeam[] = JSON.parse(req.body);

      try {
        const teamToDelete = await db.iCTeam.findMany({
          where: {
            id: { in: ICTeam.map((team) => team.id) },
          },
        });

        if (teamToDelete.length > 0) {
          await db.iCTeam.deleteMany({
            where: {
              id: { in: ICTeam.map((team) => team.id) },
            },
          });
        }

        res.status(200).json({
          status: "success",
          message: "Team successfully deleted.",
          data: ICTeam,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          status: "error",
          message: "An error occured deleting the team.",
        });
      }
    },
  });
} else {
  res.status(401).json({ status: "error", message: "Unauthorized" });
}
}
