import type { CommitteeMember } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { db } from "~/server/db";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    if (req.method === "PUT") {
      if (!session) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized" });
      }
      const { name, email, phone, role, role2, photoUrl } =
        req.body as CommitteeMember;

      const updatedMember = await db.committeeMember.update({
        where: { id },
        data: { name, email, phone, role, role2, photoUrl },
      });

      return res.status(200).json(updatedMember);
    }

    if (req.method === "DELETE") {
      if (!session) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized" });
      }
      await db.committeeMember.delete({ where: { id } });
      return res.status(204).end();
    }

    res.setHeader("Allow", ["PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
