import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "~/server/db";
import { RouteHandler } from "~/lib/utils/routeHandler";
import type { Training } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  return RouteHandler(req, res, {
    GET: async (_req, res) => {
      const trainings = await db.training.findMany({ orderBy: { time: "asc" } });
      return res.status(200).json(trainings);
    },
    POST: async (req, res) => {
      if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { day, time, target, trainer, type } = req.body as Training;

      if (!day || !time || !target || !trainer || !type) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newTraining = await db.training.create({
        data: { day, time, target, trainer, type },
      });

      return res.status(201).json(newTraining);
    },
    DELETE: async (req, res) => {
      if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { id } = req.body as Training;

      if (!id) {
        return res.status(400).json({ error: "Missing training ID" });
      }

      await db.training.delete({ where: { id } });

      return res.status(204).end();
    },
  });
}
