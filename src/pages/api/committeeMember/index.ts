import type { CommitteeMember } from "@prisma/client";
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
      const members = await db.committeeMember.findMany();
      return res.status(200).json(members);
    }

    if (req.method === "POST") {
      if (!session) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized" });
      }
      const { name, email, role, role2, photoUrl } =
        req.body as CommitteeMember;

      if (!name || !email || !role || !photoUrl) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newMember = await db.committeeMember.create({
        data: { name, email, role, role2, photoUrl },
      });

      return res.status(201).json(newMember);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
