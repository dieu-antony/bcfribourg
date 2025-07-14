import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "~/server/db";
import { RouteHandler } from "~/lib/utils/routeHandler";
import type { SeasonDuration } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  return RouteHandler(req, res, {
    GET: async (_req, res) => {
      const duration = await db.seasonDuration.findFirst();
      return res.status(200).json(duration);
    },
    POST: async (req, res) => {
      if (!session) return res.status(401).json({ error: "Unauthorized" });

      const { link, start, end } = req.body as SeasonDuration;

      if (!link || !start || !end) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const existingDuration = await db.seasonDuration.findFirst();

      if (existingDuration) {
        // Update existing
        const updatedDuration = await db.seasonDuration.update({
          where: { id: existingDuration.id },
          data: {
            link,
            start: new Date(start),
            end: new Date(end),
          },
        });

        return res.status(200).json(updatedDuration);
      } else {
        // Create new
        const newDuration = await db.seasonDuration.create({
          data: {
            link,
            start: new Date(start),
            end: new Date(end),
          },
        });

        return res.status(201).json(newDuration);
      }
    },
  });
}
