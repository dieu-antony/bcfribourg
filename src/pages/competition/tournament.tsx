import { Link2, Mail, Smartphone } from "lucide-react";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Layout from "~/lib/components/Layout";
import TournamentImg from "../../../public/assets/tournament.webp";
import { db } from "~/server/db";

type Contact = {
  name: string;
  phone: string;
};

const Tournament = ({ contact }: { contact: Contact }) => {
  const t = useTranslations("Tournament");
  return (
    <Layout>
      <Image
        src={TournamentImg}
        alt="Tournois Swiss Badminton Fribourg"
        className="left-0 top-0 z-0 max-h-[400px] w-full object-cover"
        priority
        loading="eager"
      />
      <div className="top-40 m-8 flex max-w-[1000px] flex-col self-center">
        <div className="flex flex-col gap-2 bg-white p-5 shadow-md">
          <h1 className="text-xl font-semibold text-picton-blue-500">
            {t("title")}
          </h1>
          <div className="flex flex-col gap-4">
            <span>{t("desc1")}</span>
            <div className="flex">
              <Link
                href="https://www.swiss-badminton.ch/"
                className="flex flex-row items-center gap-2 hover:text-picton-blue-500"
                target="_blank"
              >
                <Link2 className="h-4 w-4" /> <span>Swiss Badminton</span>
              </Link>
            </div>
            <span>{t("desc2")}</span>

            <span className="self-center font-semibold">{contact.name}</span>
          </div>
          <div className="mt-2 grid max-w-[300px] grid-cols-2 place-items-center justify-center self-center">
            <Link
              className="mb-2 hover:text-picton-blue-500"
              href="/club/contact"
            >
              <Mail />
            </Link>
            <Smartphone className="mb-2" />
            <Link className="hover:text-picton-blue-500" href="/club/contact">
              Email
            </Link>
            <span>{contact.phone}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;

  const contact = await db.contact.findFirst({
    where: { position: "Tournament" },
  });

  return {
    props: {
      messages: messages.default,
      contact,
    },
    revalidate: 604800,
  };
}

export default Tournament;
