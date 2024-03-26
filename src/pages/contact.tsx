import Head from "next/head";
import FormItem from "~/lib/components/FormItem";

const contact = (props) => {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>{" "}
      <div className="flex h-full min-h-max w-full flex-col items-center justify-center pt-16">
        <div className="rounded-sm m-5 w-full max-w-[1000px] bg-gray-100 p-5">
          <form>
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
                  />
                  <FormItem
                    className="sm:col-span-3"
                    label="name"
                    type="text"
                    labelName="Prénom"
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="name"
                    type="email"
                    labelName="Adresse email"
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="subject"
                    type="select"
                    labelName="Sujet"
                    options={[
                      "Information",
                      "Compétition",
                      "Entraînement",
                      "Site internet",
                      "Autre",
                    ]}
                  />
                  <FormItem
                    className="sm:col-span-6"
                    label="message"
                    type="textarea"
                    labelName="Message"
                  />
                  <button
                    type="submit"
                    className="sm:col-span-6 rounded-md bg-picton-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-picton-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default contact;
