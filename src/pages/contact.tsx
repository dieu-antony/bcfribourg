import Head from "next/head";
import FormItem from "~/lib/components/FormItem";

const contact = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <div className="size-full ">
        <form className="flex flex-col">
          <FormItem label="name" type="input" labelName="Nom et prénom"/>
          <FormItem label="subject" type="select" labelName="Selection" options={["pizza","pasta"]}/>
        </form>
      </div>
    </>
  );
};

export default contact;
