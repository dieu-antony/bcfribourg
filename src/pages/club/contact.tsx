import FormItem from "~/lib/components/FormItem";
import { useState } from "react";
import { Toaster } from "~/lib/components/ui/sonner";
import { toast } from "sonner";
import type { EmailData } from "~/lib/types";
import { useTranslations } from "next-intl";
import { toEmail } from "~/lib/utils/utils";
import Layout from "~/lib/components/Layout";
import type { GetStaticPropsContext } from "next";
import CotisationTable from "~/lib/components/CotisationTable";
import { useRecaptcha } from "~/lib/hooks/useRecaptcha";

type ErrorResponse = {
  error: string;
  score?: number;
  EmailData?: EmailData;
};

const Contact = () => {
  const t = useTranslations("Contact");

  const defaultEmailData: EmailData = {
    subject: "information",
    lastName: "",
    firstName: "",
    email: "",
    message: "",
    toEmail: "",
  };

  const [emailData, setEmailData] = useState<EmailData>(defaultEmailData);

  const { requestToken } = useRecaptcha();

  const [loading, setLoading] = useState(false);

  async function onContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const form = e.currentTarget;

    const token = await requestToken("contact_form");

    if (!token) {
      toast.error("reCAPTCHA validation failed. Please try again.");
      setLoading(false);
      return;
    }

    const emailTo = toEmail(emailData.subject!);

    const data = {
      ...emailData,
      toEmail: emailTo,
      recaptchaToken: token,
    };

    try {
      const res = await fetch("/api/email/send", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success(t("success"));
        setEmailData(defaultEmailData);
        form.reset();
      } else {
        const errorData = (await res.json()) as ErrorResponse;
        toast.error(
          errorData.error ?? "Something went wrong. Please try again.",
        );
      }
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Fetch error:", err);
      }
      toast.error("Network error or server is unreachable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="my-8 flex h-full min-h-max w-full flex-col items-center justify-center">
        <div className="mx-5 w-full max-w-[1000px] rounded-sm bg-white p-5 shadow-md">
          <form onSubmit={onContactSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h1 className="text-xl font-semibold leading-7 text-picton-blue-500">
                  {t("title")}
                </h1>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {t("description")}
                </p>
                <CotisationTable />

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <FormItem
                    className="sm:col-span-3"
                    label="lastname"
                    type="text"
                    labelName={t("lastname")}
                    onChange={(e) =>
                      setEmailData({ ...emailData, lastName: e.target.value })
                    }
                    required={true}
                    value={emailData.lastName}
                  />
                  <FormItem
                    className="sm:col-span-3"
                    label="firstname"
                    type="text"
                    labelName={t("firstname")}
                    onChange={(e) =>
                      setEmailData({ ...emailData, firstName: e.target.value })
                    }
                    required
                    value={emailData.firstName}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="email"
                    type="email"
                    labelName="Email"
                    onChange={(e) =>
                      setEmailData({ ...emailData, email: e.target.value })
                    }
                    required={true}
                    value={emailData.email}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="subject"
                    type="select"
                    labelName={t("subject")}
                    options={[
                      { value: "Information", label: t("information") },
                      { value: "Competition", label: t("comp") },
                      { value: "Entrainement adulte", label: t("adultTraining") },
                      { value: "Entrainement junior", label: t("juniorTraining") },
                      { value: "Website", label: t("website") },
                      { value: "Evenement", label: t("events") },
                      { value: "Autre", label: t("other") },
                    ]}
                    onChange={(e) =>
                      setEmailData({ ...emailData, subject: e.target.value })
                    }
                    value={emailData.subject}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="message"
                    type="textarea"
                    labelName={t("message")}
                    onChange={(e) =>
                      setEmailData({ ...emailData, message: e.target.value })
                    }
                    required={true}
                    value={emailData.message}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className={`rounded-md bg-picton-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-picton-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-span-6 ${loading ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    {loading ? "..." : t("send")}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Toaster richColors />
      </div>
    </Layout>
  );
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;

  return {
    props: {
      messages: messages.default,
    },
  };
}

export default Contact;
