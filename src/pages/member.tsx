import FormItem from "~/lib/components/FormItem";
import { useState } from "react";
import { Toaster } from "~/lib/components/ui/sonner";
import { toast } from "sonner";
import type { EmailData } from "~/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/lib/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/lib/components/ui/table";
import { useTranslations } from "next-intl";
import type { GetStaticPropsContext } from "next";
import Layout from "~/lib/components/Layout";
import Link from "next/link";
import { SquareMousePointer } from "lucide-react";

const Member = () => {
  const t = useTranslations("Member");

  const getCurrentYear = (): number => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    if (currentMonth >= 7) {
      return currentDate.getFullYear();
    } else {
      return currentDate.getFullYear() - 1;
    }
  };

  const cotisation = [
    { catégorie: "Adultes", années: "", cotisation: "270.-", license: "60.-" },
    {
      catégorie: "Juniors U19",
      années:
        (getCurrentYear() - 18).toString() +
        " - " +
        (getCurrentYear() - 17).toString(),
      cotisation: "200.-",
      license: "40.-",
    },
    {
      catégorie: "Juniors U17",
      années:
        (getCurrentYear() - 16).toString() +
        " - " +
        (getCurrentYear() - 15).toString(),
      cotisation: "190.-",
      license: "30.-",
    },
    {
      catégorie: "Juniors U15",
      années:
        (getCurrentYear() - 14).toString() +
        " - " +
        (getCurrentYear() - 13).toString(),
      cotisation: "150.-",
      license: "30.-",
    },
    {
      catégorie: "Juniors U13",
      années: (getCurrentYear() - 12).toString() + " - ",
      cotisation: "120.-",
      license: "",
    },
  ];

  const [emailData, setEmailData] = useState({
    gender: "Masculin",
  } as EmailData);

  const [loading, setLoading] = useState(false);

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    const subject = "Inscription";
    const toEmail = "caissier@bcfribourg.ch";

    const data = {
      ...emailData,
      subject: subject,
      toEmail: toEmail,
    };
    await fetch("/api/email/send", {
      method: "POST",
      body: JSON.stringify(data),
    });
    toast.success(t("success"));
    setEmailData({ gender: "Masculin" } as EmailData);
    setLoading(false);
    form.reset();
  }

  return (
    <Layout>
      <div className="flex min-h-max w-full flex-col items-center justify-center my-8">
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
                <Link href="/club/contact" className="w-auto flex text-center gap-1 flex-row my-1 text-sm leading-6 text-black hover:text-picton-blue-500 duration-100 transition-colors underline-offset-2 hover:underline">
                 <SquareMousePointer size="20px"/>{t("contact")}
                </Link>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold text-picton-blue-500">
                      {t("fee")}
                    </AccordionTrigger>
                    <AccordionContent>
                      <Table className="shadow-md">
                        <TableHeader>
                          <TableRow>
                            <TableHead>{t("category")}</TableHead>
                            <TableHead>{t("years")}</TableHead>
                            <TableHead>{t("fee")}</TableHead>
                            <TableHead>{t("licence")}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cotisation.map((cotisation) => (
                            <TableRow key={cotisation.catégorie}>
                              <TableCell>{cotisation.catégorie}</TableCell>
                              <TableCell>{cotisation.années}</TableCell>
                              <TableCell>{cotisation.cotisation}</TableCell>
                              <TableCell>{cotisation.license}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <FormItem
                    className="sm:col-span-3"
                    label="name"
                    type="text"
                    labelName={t("lastname")}
                    required={true}
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
                    required={true}
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
                    required={true}
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
                    required={true}
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
                    required={true}
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
                    required={false}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="phone"
                    type="tel"
                    labelName={t("phone")}
                    required={true}
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
                    required={false}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="email"
                    type="email"
                    labelName="Email"
                    required={true}
                    onChange={(e) =>
                      setEmailData({ ...emailData, email: e.target.value })
                    }
                    value={emailData.email}
                  />

                  <FormItem
                    className="sm:col-span-6"
                    label="message"
                    type="textarea"
                    labelName={t("message")}
                    onChange={(e) =>
                      setEmailData({ ...emailData, message: e.target.value })
                    }
                    value={emailData.message}
                    required={false}
                  />
                  <button
                    disabled={loading}
                    type="submit"
                    className="rounded-md bg-picton-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-picton-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-span-6"
                  >
                    {t("send")}
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
