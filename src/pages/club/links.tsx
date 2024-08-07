import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Layout from "~/lib/components/Layout";
import { HoverEffect } from "~/lib/components/ui/card-hover-effect";

const Links = () => {
  const t = useTranslations("Links");
  const links = [
    {
      title: "Swiss Badminton",
      description: (
        <Image
          src="/assets/logos/swissbadminton.png"
          width={200}
          height={200}
          alt="Swiss Badminton"
        />
      ),
      link: "https://www.swiss-badminton.ch/",
    },
    {
      title: t("afb"),
      description: (
        <div className="rounded-lg bg-black p-2">
          <Image
            src="/assets/logos/afb.png"
            width={100}
            height={100}
            alt="AFB"
          />
        </div>
      ),
      link: "https://badminton-fribourg.ch/",
    },
    {
      title: "BC Tafers",
      description: (
        <Image
          src="/assets/logos/tafers.jpg"
          width={200}
          height={200}
          alt="BC Tafers"
        />
      ),
      link: "https://bctafers.ch/",
    },
    {
      title: t("afs"),
      description: (
        <Image
          src="/assets/logos/afs.webp"
          width={200}
          height={200}
          alt="AFS"
        />
      ),
      link: "https://www.afs-fvs.ch/fr/",
    },
  ];
  return (
    <Layout>
      <div className="-z-0 mx-auto max-w-5xl px-8">
        <HoverEffect items={links} />
      </div>
    </Layout>
  );
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`) as IntlMessages).default,
    },
  };
}


export default Links;
