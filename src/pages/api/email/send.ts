import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "~/lib/components/email/emailTemplate";
import { Resend } from "resend";
import { RouteHandler } from "~/lib/utils/routeHandler";

export type EmailData = {
  firstName?: string;
  lastName?: string;
  email: string;
  message?: string;
  phone?: string;
  natel?: string;
  address?: string;
  toEmail: string;
  npa?: string;
  gender?: string;
  birthdate?: string;
  avs?: string;
  license?: string;
  subject?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse<void>) => {
  await RouteHandler(req, res, {
    POST: async function (req, res: NextApiResponse) {
      const EmailData: EmailData = JSON.parse(req.body);
      try {
        const { data, error } = await resend.emails.send({
          from: "BC Fribourg <onboarding@resend.dev>",
          to: EmailData.toEmail,
          subject: EmailData.subject || "Subject unknown",
          react: EmailTemplate({ ...EmailData }),
          text: EmailData.message || "Message unknown",
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
