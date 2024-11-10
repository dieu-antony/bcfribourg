import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import CommitteeCard from "~/lib/components/CommitteeCard";
import Layout from "~/lib/components/Layout";

const Committee = () => {
  const t = useTranslations("Committee");

  const president = {
    imgRef: "/assets/committee/president.webp",
    title: t("president"),
    name: "Philippe Etter",
    email: "president(at)bcfribourg.ch",
    phone: "079 488 15 38",
  };
  const secretary = {
    imgRef: "/assets/committee/secretary.webp",
    title: t("secretary"),
    name: "Antony Dieu",
    email: "secretaire(at)bcfribourg.ch",
    phone: "078 692 53 87",
  };
  const event = {
    imgRef: "/assets/committee/event.webp",
    title: t("events"),
    name: "Colette Jungo",
    email: "event(at)bcfribourg.ch",
    phone: "079 452 45 15",
  };
  const treasurer = {
    imgRef: "/assets/committee/treasurer.webp",
    title: t("vicePresident"),
    name: "Nathalie Rey",
    email: "caissier(at)bcfribourg.ch",
    phone: "079 296 12 44",
  };
  const ls = {
    imgRef: "/assets/committee/ligueSup.webp",
    title: t("sup"),
    name: "Gilbert Fischer",
    email: "technique(at)bcfribourg.ch",
    phone: "078 790 12 72",
  };
  const junior = {
    imgRef: "/assets/committee/junior.webp",
    title: t("junior"),
    name: "Hugo Genoud",
    email: "juniors(at)bcfribourg.ch",
    phone: "079 571 22 75",
  }
  return (
    <Layout>
      <h1 className="mt-8 w-full bg-picton-blue-500 py-2 text-center text-3xl font-bold text-white">
        {t("title")}
      </h1>
      <div className="flex max-w-[1000px] mt-4 flex-col place-items-center items-center self-center md:grid md:grid-cols-2 lg:grid-cols-3">
        <CommitteeCard info={president} />
        <CommitteeCard info={treasurer} />
        <CommitteeCard info={event} />
        <CommitteeCard info={secretary} />
        <CommitteeCard info={ls} />
        <CommitteeCard info={junior} />
      </div>
    </Layout>
  );
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;

  return {
    props: {
      messages: messages.default,
    },
  };
}


export default Committee;
