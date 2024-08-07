import { Link2, Mail, Smartphone } from "lucide-react";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Layout from "~/lib/components/Layout";

const Tournament = () => {
  const t = useTranslations("Tournament");
  return (
    <Layout>
      <Image
        src="/assets/tournament.jpg"
        alt="Tournois Swiss Badminton"
        width={1920}
        height={1080}
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

            <span className="self-center font-semibold">Antony Dieu</span>
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
            <span>078 692 53 87</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`) as IntlMessages).default
    }
  };
}


export default Tournament;
