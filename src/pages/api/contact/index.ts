import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { RouteHandler } from "~/lib/utils/routeHandler";

type ContactPayload = {
  id?: string;
  name: string;
  phone: string;
  position: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  await RouteHandler(req, res, {
    GET: async (_req, res) => {
      try {
        const contacts = await db.contact.findMany();
        res.status(200).json({ status: "success", data: contacts });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ status: "error", message: "Failed to fetch contacts" });
      }
    },

    POST: async (req, res) => {
      if (!session) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized" });
      }

      const { name, phone, position } = req.body as ContactPayload;

      if (!name || !phone || !position) {
        return res
          .status(400)
          .json({ status: "error", message: "Missing required fields" });
      }

      try {
        const existingContact = await db.contact.findFirst({
          where: { position },
        });

        let contact;

        if (existingContact) {
          // Update existing contact instead
          contact = await db.contact.update({
            where: { id: existingContact.id },
            data: { name, phone },
          });
        } else {
          // Create new contact
          contact = await db.contact.create({
            data: { name, phone, position },
          });
        }

        res.status(200).json({
          status: "success",
          data: contact,
          message: existingContact
            ? "Contact updated based on existing position"
            : "New contact created",
        });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ status: "error", message: "Failed to save contact" });
      }
    },

    PUT: async (req, res) => {
      if (!session) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized" });
      }

      const { id, name, phone, position } = req.body as ContactPayload;

      if (!id || !name || !phone || !position) {
        return res
          .status(400)
          .json({ status: "error", message: "Missing required fields" });
      }

      try {
        const updated = await db.contact.update({
          where: { id },
          data: { name, phone, position },
        });

        res.status(200).json({ status: "success", data: updated });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ status: "error", message: "Failed to update contact" });
      }
    },

    DELETE: async (req, res) => {
      if (!session) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized" });
      }

      const { id } = req.body as ContactPayload;

      if (!id) {
        return res
          .status(400)
          .json({ status: "error", message: "Missing contact ID" });
      }

      try {
        await db.contact.delete({ where: { id } });
        res.status(200).json({ status: "success", message: "Contact deleted" });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ status: "error", message: "Failed to delete contact" });
      }
    },
  });
}
