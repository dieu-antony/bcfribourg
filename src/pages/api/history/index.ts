import type { HistoryEvent } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { db } from "~/server/db";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  try {
    if (req.method === "GET") {
      const history = await db.historyEvent.findMany({
        orderBy: { year: "asc" },
      });
      return res.status(200).json(history);
    }

    if (req.method === "POST") {
      if (!session) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized" });
      }
      const { year, imageUrl } = req.body as HistoryEvent;

      if (!year) {
        return res
          .status(400)
          .json({ message: "Missing required field: year" });
      }

      const newEntry = await db.historyEvent.create({
        data: {
          year,
          imageUrl,
        },
      });

      return res
        .status(201)
        .json({ data: newEntry, message: "History event added successfully." });
    }

    if (req.method === "DELETE") {
      if (!session) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized" });
      }
      const { id } = req.body as HistoryEvent;

      if (!id) {
        return res.status(400).json({ message: "Missing history entry ID" });
      }

      const deleted = await db.historyEvent.delete({
        where: { id },
      });

      return res.status(200).json({
        data: deleted,
        message: "History event deleted successfully.",
      });
    }

    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("API error in /api/history:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
