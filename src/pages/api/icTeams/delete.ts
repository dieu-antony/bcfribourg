import type { ICTeam } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }

  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed" });
  }

  try {
    const parsedBody = req.body as ICTeam[];

    // Validate request body
    if (!Array.isArray(parsedBody) || parsedBody.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Request body must be a non-empty array.",
      });
    }

    const teamIdsToDelete = parsedBody.map((team: ICTeam) => team.id);

    // Check if teams exist
    const existingTeams = await db.iCTeam.findMany({
      where: { id: { in: teamIdsToDelete } },
    });

    if (existingTeams.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No matching teams found to delete.",
      });
    }

    // Check if any players are linked to these teams
    const linkedPlayers = await db.player.findMany({
      where: { teamId: { in: teamIdsToDelete } },
      take: 1, // just need to know if at least one exists
    });

    if (linkedPlayers.length > 0) {
      return res.status(400).json({
        status: "error",
        message:
          "Cannot delete team(s) because there are players linked to them. Please remove the players first.",
      });
    }

    // If no players linked, proceed with deletion
    await db.iCTeam.deleteMany({
      where: { id: { in: teamIdsToDelete } },
    });

    return res.status(200).json({
      status: "success",
      message: `${existingTeams.length} team(s) successfully deleted.`,
      data: existingTeams,
    });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while deleting teams.",
    });
  }
}
