import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { RouteHandler } from "~/lib/utils/routeHandler";

type SponsorPayload = {
  id?: string;
  name: string;
  logoUrl: string;
  link: string;
  tier: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  await RouteHandler(req, res, {
    GET: async (_req, res) => {
      try {
        const sponsors = await db.sponsor.findMany({
          orderBy: { tier: "asc" },
        });
        res.status(200).json({ status: "success", data: sponsors });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ status: "error", message: "Failed to fetch sponsors" });
      }
    },

    POST: async (req, res) => {
      if (!session) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized" });
      }

      const { id, name, logoUrl, link, tier } = req.body as SponsorPayload;

      if (!name || !logoUrl || !link || tier === undefined) {
        return res
          .status(400)
          .json({ status: "error", message: "Missing required fields" });
      }

      try {
        let sponsor;

        if (id) {
          sponsor = await db.sponsor.upsert({
            where: { id },
            update: { name, logoUrl, link, tier },
            create: { name, logoUrl, link, tier },
          });
        } else {
          sponsor = await db.sponsor.create({
            data: { name, logoUrl, link, tier },
          });
        }

        res.status(200).json({ status: "success", data: sponsor });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ status: "error", message: "Failed to save sponsor" });
      }
    },

    PUT: async (req, res) => {
      if (!session) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized" });
      }

      const { id, name, logoUrl, link, tier } = req.body as SponsorPayload;

      if (!id || !name || !logoUrl || !link || tier === undefined) {
        return res
          .status(400)
          .json({ status: "error", message: "Missing required fields" });
      }

      try {
        const updated = await db.sponsor.update({
          where: { id },
          data: { name, logoUrl, link, tier },
        });

        res.status(200).json({ status: "success", data: updated });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ status: "error", message: "Failed to update sponsor" });
      }
    },

    DELETE: async (req, res) => {
      if (!session) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized" });
      }

      const { id } = req.body as SponsorPayload;

      if (!id) {
        return res
          .status(400)
          .json({ status: "error", message: "Missing sponsor ID" });
      }

      try {
        await db.sponsor.delete({ where: { id } });
        res.status(200).json({ status: "success", message: "Sponsor deleted" });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ status: "error", message: "Failed to delete sponsor" });
      }
    },
  });
}
