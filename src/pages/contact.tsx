import Head from "next/head";
import FormItem from "~/lib/components/FormItem";

const contact = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>{" "}
      <div className="max-w-[1000px] m-5 bg-gray-100 p-5 self-center">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <FormItem label="name" type="input" labelName="Nom et prénom" />
              <FormItem
                label="subject"
                type="select"
                labelName="Selection"
                options={["pizza", "pasta"]}
              />
            </div>
          </div>
        </div>
      </form>
      </div>
    </>
  );
};

export default contact;
