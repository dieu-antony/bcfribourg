import Head from "next/head";
import FormItem from "~/lib/components/FormItem";
import { useState } from "react";
import { Toaster } from "~/lib/components/ui/sonner";
import { toast } from "sonner";
import { EmailData } from "~/lib/types";

const Member = () => {
  const [emailData, setEmailData] = useState({
    gender: "Masculin",
  } as EmailData);

  const [loading, setLoading] = useState(false);

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    const subject = "inscription";
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
    toast.success("Votre demande a bien été envoyée !");
    setEmailData({gender: "Masculin"} as EmailData);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Devenir membre</title>
      </Head>
      <div className="flex h-full min-h-max w-full flex-col items-center justify-center pt-16">
        <div className="m-5 w-full max-w-[1000px] rounded-sm bg-white p-5">
          <form onSubmit={onFormSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-picton-blue-500">
                  Demande d&apos;admission
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
                    labelName="Prénom"
                    required
                    onChange={(e) =>
                      setEmailData({ ...emailData, firstName: e.target.value })
                    }
                    value={emailData.firstName}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="gender"
                    type="select"
                    labelName="Sexe"
                    options={["Masculin", "Féminin", "Autre"]}
                    onChange={(e) =>
                      setEmailData({ ...emailData, gender: e.target.value })
                    }
                    value="Masculin"
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="address"
                    type=""
                    labelName="Adresse"
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
                    labelName="NPA, Localité"
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
                    labelName="Date de naissance"
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
                    labelName="Numéro AVS (pour juniors)"
                    onChange={(e) =>
                      setEmailData({ ...emailData, avs: e.target.value })
                    }
                    value={emailData.avs}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="phone"
                    type="tel"
                    labelName="Tel Privé"
                    required
                    onChange={(e) =>
                      setEmailData({ ...emailData, phone: e.target.value })
                    }
                    value={emailData.phone}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="natel"
                    type="tel"
                    labelName="Natel"
                    onChange={(e) =>
                      setEmailData({ ...emailData, natel: e.target.value })
                    }
                    value={emailData.natel}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="license"
                    type=""
                    labelName="Numéro de license (si titulaire d'une license Swiss Badminton)"
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

                  <FormItem
                    className="sm:col-span-6"
                    label="message"
                    type="textarea"
                    labelName="Message"
                    onChange={(e) =>
                      setEmailData({ ...emailData, message: e.target.value })
                    }
                    value={emailData.message}
                  />
                  <button
                    disabled={loading}
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

export default Member;
