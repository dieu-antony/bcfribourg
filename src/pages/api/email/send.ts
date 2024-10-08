import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "~/lib/components/email/emailTemplate";
import { Resend } from "resend";
import { RouteHandler } from "~/lib/utils/routeHandler";
import type { EmailData } from "~/lib/types";


const resend = new Resend(process.env.RESEND_API_KEY);

export default async function send (req: NextApiRequest, res: NextApiResponse<void>) {
  await RouteHandler(req, res, {
    POST: async function (req: NextApiRequest, res: NextApiResponse) {
      const EmailData = JSON.parse(req.body as string) as EmailData;
      try {
        const { data, error } = await resend.emails.send({
          from: "BC Fribourg <site@bcfribourg.ch>",
          to: EmailData.toEmail,
          subject: EmailData.subject ?? "Subject unknown",
          react: EmailTemplate({ ...EmailData }),
          text: EmailData.message ?? "Message unknown",
          reply_to: EmailData.email
        });

        if (error) {
          res.status(400).json({ error, EmailData });
        }

        res.status(200).json({ data });
      } catch (error) {
        res.status(400).json({ error, EmailData });
      }
    },
  });
};
