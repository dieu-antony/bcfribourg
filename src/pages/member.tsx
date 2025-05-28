import FormItem from "~/lib/components/FormItem";
import { useState } from "react";
import { Toaster } from "~/lib/components/ui/sonner";
import { toast } from "sonner";
import type { EmailData } from "~/lib/types";
import { useTranslations } from "next-intl";
import type { GetStaticPropsContext } from "next";
import Layout from "~/lib/components/Layout";
import Link from "next/link";
import { SquareMousePointer } from "lucide-react";
import CotisationTable from "~/lib/components/CotisationTable";
import { useRecaptcha } from "~/lib/hooks/useRecaptcha";

const Member = () => {
  const t = useTranslations("Member");
  const { requestToken } = useRecaptcha();

  const defaultEmailData: EmailData = {
    gender: "Masculin",
    comms: "Email",
    lastName: "",
    firstName: "",
    address: "",
    npa: "",
    birthdate: "",
    avs: "",
    phone: "",
    license: "",
    email: "",
    message: "",
    subject: "Inscription",
    toEmail: "caissier@bcfribourg.ch",
  };

  const [emailData, setEmailData] = useState<EmailData>(defaultEmailData);
  const [loading, setLoading] = useState(false);

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const form = e.currentTarget;

    if (!emailData.email || !emailData.firstName || !emailData.lastName) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const token = await requestToken("member_application");

    if (!token) {
      toast.error("reCAPTCHA validation failed.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/email/send", {
        method: "POST",
        body: JSON.stringify({
          ...emailData,
          recaptchaToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = (await res.json()) as {
        error?: string;
        data?: { id: string };
      };

      if (res.ok) {
        toast.success(t("success"));
        setEmailData(defaultEmailData);
        form.reset();
      } else {
        toast.error(result?.error ?? "Something went wrong.");
      }
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Email form error:", err);
      }
      toast.error("An unknown error occurred.");
    }

    setLoading(false);
  }

  return (
    <Layout>
      <div className="my-8 flex min-h-max w-full flex-col items-center justify-center">
        <div className="mx-5 w-full max-w-[1000px] rounded-sm bg-white p-5 shadow-md">
          <form onSubmit={onFormSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-xl font-semibold leading-7 text-picton-blue-500">
                  {t("title")}
                </h2>
                <p className="my-1 text-sm leading-6 text-gray-600">
                  {t("description")}
                </p>
                <Link
                  href="/club/contact"
                  className="my-1 flex w-auto flex-row gap-1 text-center text-sm leading-6 text-black underline-offset-2 transition-colors duration-100 hover:text-picton-blue-500 hover:underline"
                >
                  <SquareMousePointer size="20px" />
                  {t("contact")}
                </Link>
                <CotisationTable />

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <FormItem
                    className="sm:col-span-3"
                    label="name"
                    type="text"
                    labelName={t("lastname")}
                    required
                    onChange={(e) =>
                      setEmailData({ ...emailData, lastName: e.target.value })
                    }
                    value={emailData.lastName}
                  />
                  <FormItem
                    className="sm:col-span-3"
                    label="firstName"
                    type="text"
                    labelName={t("firstname")}
                    required
                    onChange={(e) =>
                      setEmailData({ ...emailData, firstName: e.target.value })
                    }
                    value={emailData.firstName}
                  />
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {t("gender")}
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      onChange={(e) =>
                        setEmailData({ ...emailData, gender: e.target.value })
                      }
                      value={emailData.gender}
                      className="form-select block w-full rounded-md border-0 bg-gray-50 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500  sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="Masculin">{t("m")}</option>
                      <option value="Féminin">{t("f")}</option>
                      <option value="Autre">{t("other")}</option>
                    </select>
                  </div>
                  <FormItem
                    className="sm:col-span-6"
                    label="address"
                    type=""
                    labelName={t("address")}
                    required
                    onChange={(e) =>
                      setEmailData({ ...emailData, address: e.target.value })
                    }
                    value={emailData.address}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="npa"
                    type=""
                    labelName={t("npa")}
                    required
                    onChange={(e) =>
                      setEmailData({ ...emailData, npa: e.target.value })
                    }
                    value={emailData.npa}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="year"
                    type="date"
                    labelName={t("dob")}
                    required
                    onChange={(e) =>
                      setEmailData({ ...emailData, birthdate: e.target.value })
                    }
                    value={emailData.birthdate}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="avs"
                    type="avs"
                    labelName={t("avs")}
                    onChange={(e) =>
                      setEmailData({ ...emailData, avs: e.target.value })
                    }
                    value={emailData.avs}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="phone"
                    type="tel"
                    labelName={t("phone")}
                    required
                    onChange={(e) =>
                      setEmailData({ ...emailData, phone: e.target.value })
                    }
                    value={emailData.phone}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="license"
                    type=""
                    labelName={t("sblicence")}
                    onChange={(e) =>
                      setEmailData({ ...emailData, license: e.target.value })
                    }
                    value={emailData.license}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="email"
                    type="email"
                    labelName="Email"
                    required
                    onChange={(e) =>
                      setEmailData({ ...emailData, email: e.target.value })
                    }
                    value={emailData.email}
                  />
                  <label
                    htmlFor="comms"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("comms")}
                  </label>
                  <select
                    name="comms"
                    id="comms"
                    onChange={(e) =>
                      setEmailData({ ...emailData, comms: e.target.value })
                    }
                    value={emailData.comms}
                    className="form-select block w-full rounded-md border-0 bg-gray-50 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500  sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="Email">{t("email")}</option>
                    <option value="Letter">{t("letter")}</option>
                  </select>
                  <FormItem
                    className="sm:col-span-6"
                    label="message"
                    type="textarea"
                    labelName={t("message")}
                    onChange={(e) =>
                      setEmailData({ ...emailData, message: e.target.value })
                    }
                    value={emailData.message}
                  />
                  <button
                    disabled={loading}
                    type="submit"
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
    `../../messages/${locale}.json`
  )) as IntlMessages;
  return {
    props: {
      messages: messages.default,
    },
  };
}

export default Member;
