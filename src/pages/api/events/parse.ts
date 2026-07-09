import type { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "~/lib/utils/routeHandler";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { sync } from "~/server/ical";
import { parseCalendar } from "~/lib/utils/parseCalender";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    await RouteHandler(req, res, {
      POST: async function (req, res: NextApiResponse) {
        try {
          const body =
            typeof req.body === "string" ? req.body : String(req.body);
          const data = sync.parseICSFix(body);
          const events = await parseCalendar(data);
          res.status(200).json({ status: "success", events });
        } catch (error) {
          console.log(error);
          res.status(400).json({
            status: "error",
            message: "Failed to parse the calendar file.",
          });
        }
      },
    });
  } else {
    res.status(401).json({ status: "error", message: "Unauthorized" });
  }
}