import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import AccentBar from "~/lib/components/AccentBar";
import CommitteeCard from "~/lib/components/CommitteeCard";
import Layout from "~/lib/components/Layout";
import { Title } from "~/lib/components/Title";

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
      <Title>
        {t("title")}
      </Title>
      <div className="flex max-w-[1000px] mt-4 flex-col place-items-center items-center self-center md:grid md:grid-cols-2 lg:grid-cols-3 mb-4">
        <div className="relative md:col-span-2 lg:col-span-3 bg-white md:mx-20 mx-12 lg:mx-4 my-4 p-4 shadow-sm">
          <p>{t("desc")}</p>
          <AccentBar />
        </div>
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
