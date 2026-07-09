import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { db } from "~/server/db";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { name, qualis, imageUrl } = req.body as {
      name?: string;
      qualis?: string;
      imageUrl?: string;
    };

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    try {
      const trainer = await db.trainer.create({
        data: {
          name,
          qualis: qualis ?? "",
          imageUrl: imageUrl ?? "",
        },
      });
      return res.status(201).json(trainer);
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Failed to create trainer",
      });
    }
  }

  if (req.method === "GET") {
    const trainers = await db.trainer.findMany({ orderBy: { name: "asc" } });
    return res.status(200).json(trainers);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: "Method not allowed" });
}
