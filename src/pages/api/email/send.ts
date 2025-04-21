import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "~/lib/components/email/emailTemplate";
import { type CreateEmailResponse, Resend } from "resend";
import { RouteHandler } from "~/lib/utils/routeHandler";
import type { EmailData } from "~/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailWithRecaptcha = EmailData & { recaptchaToken?: string };

type RecaptchaResponse = {
  success: boolean;
  score: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

type ResponseData =
  | { data: { id: string } }
  | { error: string; score?: number; EmailData?: EmailData };

async function verifyRecaptcha(token: string): Promise<RecaptchaResponse> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    { method: "POST" },
  );

  const raw = await response.text();

  try {
    const data  = JSON.parse(raw) as RecaptchaResponse;

    if (typeof data === "object" && data !== null && "success" in data) {
      return data;
    }
  } catch (err) {
    console.error("Failed to parse reCAPTCHA response JSON:", err);
  }

  throw new Error("Invalid reCAPTCHA response format");
}

async function sendEmail(emailData: EmailData): Promise<CreateEmailResponse> {
  if (!emailData.toEmail) {
    throw new Error("Missing recipient (toEmail).");
  }

  return resend.emails.send({
    from: "BC Fribourg <site@bcfribourg.ch>",
    to: emailData.toEmail,
    subject: emailData.subject ?? "New contact message",
    react: EmailTemplate({ ...emailData }),
    text: emailData.message ?? "",
    reply_to: emailData.email,
  });
}

export default async function send(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  await RouteHandler(req, res, {
    POST: async (req, res) => {
      const { recaptchaToken, ...emailData } = req.body as EmailWithRecaptcha;

      if (!recaptchaToken) {
        return res.status(400).json({ error: "Missing reCAPTCHA token" });
      }

      try {
        const verification = await verifyRecaptcha(recaptchaToken);

        if (!verification.success || verification.score < 0.5) {
          return res.status(403).json({
            error: "reCAPTCHA verification failed",
            score: verification.score,
            EmailData: emailData,
          });
        }
      } catch (err) {
        console.error("reCAPTCHA verification failed:", err);
        return res.status(500).json({
          error: "Failed to verify reCAPTCHA",
          EmailData: emailData,
        });
      }

      try {
        const result = await sendEmail(emailData);

        if (result.error) {
          console.error("Resend error:", result.error);
          return res.status(400).json({
            error:
              typeof result.error === "string"
                ? result.error
                : (result.error.message ?? "Email sending failed"),
            EmailData: emailData,
          });
        }

        return res.status(200).json({
          data: { id: result.data?.id ?? "unknown" },
        });
      } catch (err) {
        console.error("Email send failed:", err);
        return res.status(500).json({
          error: "Internal server error while sending email",
          EmailData: emailData,
        });
      }
    },
  });
}
