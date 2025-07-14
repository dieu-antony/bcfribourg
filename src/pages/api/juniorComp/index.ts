import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "~/server/db";
import { RouteHandler } from "~/lib/utils/routeHandler";
import type { JuniorComp } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  await RouteHandler(req, res, {
    GET: async (_req, res) => {
      try {
        const data = await db.juniorComp.findMany({ orderBy: { date: "asc" } });
        return res.status(200).json({ status: "success", data });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ status: "error", message: "Failed to fetch entries" });
      }
    },

    POST: async (req, res) => {
      if (!session) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized" });
      }
      const { type, location, date } = req.body as JuniorComp;

      if (!type || !location || !date) {
        return res
          .status(400)
          .json({ status: "error", message: "Missing required fields" });
      }

      try {
        const newEntry = await db.juniorComp.create({
          data: {
            type,
            location,
            date: new Date(date),
          },
        });
        return res.status(201).json({ status: "success", data: newEntry });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ status: "error", message: "Failed to create entry" });
      }
    },

    DELETE: async (req, res) => {
      if (!session) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized" });
      }
      const { id } = req.body as JuniorComp;

      if (!id) {
        return res.status(400).json({ status: "error", message: "Missing ID" });
      }

      try {
        await db.juniorComp.delete({ where: { id } });
        return res
          .status(200)
          .json({ status: "success", message: "Entry deleted" });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ status: "error", message: "Failed to delete entry" });
      }
    },
  });
}
