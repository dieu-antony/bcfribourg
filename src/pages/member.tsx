import Head from "next/head";
import FormItem from "~/lib/components/FormItem";
import { useState } from "react";
import { Toaster } from "~/lib/components/ui/sonner";
import { toast } from "sonner";

const Member = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [gender, setGender] = useState("Masculin");
  const [address, setAddress] = useState("");
  const [npa, setNpa] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [avs, setAvs] = useState("");
  const [phone, setPhone] = useState("");
  const [natel, setNatel] = useState("");
  const [license, setLicense] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    const subject = "inscription";
    const toEmail = "caissier@bcfribourg.ch";

    const data = {
      lastName: lastName,
      firstName: firstName,
      gender: gender,
      address: address,
      npa: npa,
      birthdate: birthdate,
      avs: avs,
      phone: phone,
      natel: natel,
      license: license,
      email: email,
      message: message,
      subject: subject,
      toEmail: toEmail,
    };
    await fetch("/api/email/send", {
      method: "POST",
      body: JSON.stringify(data),
    });
    toast.success("Votre demande a bien été envoyée !");
    setLastName("");
    setFirstName("");
    setGender("Masculin");
    setAddress("");
    setNpa("");
    setBirthdate("");
    setAvs("");
    setPhone("");
    setNatel("");
    setLicense("");
    setEmail("");

    //FIXME: setMessage don't work
    setMessage("");

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
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                  <FormItem
                    className="sm:col-span-3"
                    label="firstName"
                    type="text"
                    labelName="Prénom"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="gender"
                    type="select"
                    labelName="Sexe"
                    options={["Masculin", "Féminin", "Autre"]}
                    onChange={(e) => setGender(e.target.value)}
                    value="Masculin"
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="address"
                    type=""
                    labelName="Adresse"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="npa"
                    type=""
                    labelName="NPA, Localité"
                    required
                    onChange={(e) => setNpa(e.target.value)}
                    value={npa}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="year"
                    type="date"
                    labelName="Date de naissance"
                    required
                    onChange={(e) => setBirthdate(e.target.value)}
                    value={birthdate}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="avs"
                    type="avs"
                    labelName="Numéro AVS (pour juniors)"
                    onChange={(e) => setAvs(e.target.value)}
                    value={avs}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="phone"
                    type="tel"
                    labelName="Tel Privé"
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="natel"
                    type="tel"
                    labelName="Natel"
                    onChange={(e) => setNatel(e.target.value)}
                    value={natel}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="license"
                    type=""
                    labelName="Numéro de license (si titulaire d'une license Swiss Badminton)"
                    onChange={(e) => setLicense(e.target.value)}
                    value={license}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="email"
                    type="email"
                    labelName="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />

                  <FormItem
                    className="sm:col-span-6"
                    label="message"
                    type="textarea"
                    labelName="Message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
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
