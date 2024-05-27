import Head from "next/head";
import FormItem from "~/lib/components/FormItem";
import { useState } from "react";
import { Toaster } from "~/lib/components/ui/sonner";
import { toast } from "sonner";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("Information");

  async function onContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const toEmail = (subject: string) => {
      switch (subject) {
        case "Information":
          return "president@bcfribourg.ch";
        case "Compétition":
          return "technique@bcfribourg.ch";
        case "Entraînement Adultes":
          return "technique@bcfribourg.ch";
        case "Entraînement Juniors":
          return "juniors@bcfribourg.ch";
        case "Site internet":
          return "webmaster@bcfribourg.ch";
        case "Autre":
          return "secretaire@bcfribourg.ch";
        default:
          "secretaire@bcfribourg.ch";
      }
    };

    const emailTo = toEmail(subject);

    const data = {
      lastName: lastName,
      firstName: firstName,
      email: email,
      message: message,
      subject: subject,
      toEmail: emailTo,
      gender: "",
      address: "",
      npa: "",
      birthdate: "",
      avs: "",
      phone: "",
      natel: "",
      license: "",
    };
    await fetch("/api/email/send", {
      method: "POST",
      body: JSON.stringify(data),
    });
    toast.success("Votre demande a bien été envoyée !");
    setLastName("");
    setFirstName("");
    setEmail("");

    //FIXME: setSubject and setMessage don't work
    setMessage("");
    setSubject("Information");
  }

  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <div className="flex h-full min-h-max w-full flex-col items-center justify-center pt-16">
        <div className="m-5 w-full max-w-[1000px] rounded-sm bg-white p-5">
          <form onSubmit={onContactSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-picton-blue-500">
                  Contact
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Contacte nous !
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <FormItem
                    className="sm:col-span-3"
                    label="name"
                    type="text"
                    labelName="Nom"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    value={lastName}
                  />
                  <FormItem
                    className="sm:col-span-3"
                    label="name"
                    type="text"
                    labelName="Prénom"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    value={firstName}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="name"
                    type="email"
                    labelName="Adresse email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    value={email}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="subject"
                    type="select"
                    labelName="Sujet"
                    options={[
                      "Information",
                      "Compétition",
                      "Entraînement Adultes",
                      "Entraînement Juniors",
                      "Site internet",
                      "Autre",
                    ]}
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="message"
                    type="textarea"
                    labelName="Message"
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    value={message}
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-picton-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-picton-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-span-6"
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Toaster richColors />
      </div>
    </>
  );
};

export default Contact;
