import { useTranslations } from "next-intl";
import CommitteeCard from "~/lib/components/CommitteeCard";
import { loadTranslationMessages } from "~/lib/utils/utils";

const Committee = () => {
  const t = useTranslations("committee");

  const president = {
    imgRef: "/assets/committee/president.jpg",
    title: t("president"),
    name: "Philippe Etter",
    email: "president(at)bcfribourg.ch",
    phone: "079 488 15 38",
  };
  const secretary = {
    imgRef: "/assets/committee/secretary.jpg",
    title: t("secretary"),
    name: "Antony Dieu",
    email: "secretaire(at)bcfribourg.ch",
    phone: "078 692 53 87",
  };
  const event = {
    imgRef: "/assets/committee/event.jpg",
    title: t("events"),
    name: "Colette Jungo",
    email: "event(at)bcfribourg.ch",
    phone: "079 452 45 15",
  };
  const treasurer = {
    imgRef: "/assets/committee/blank.png",
    title: t("vicePresident"),
    name: "Nathalie Rey",
    email: "caissier(at)bcfribourg.ch",
    phone: "079 296 12 44",
  };
  const ls = {
    imgRef: "/assets/committee/ligueSup.jpg",
    title: t("sup"),
    name: "Gilbert Fischer",
    email: "",
    phone: "",
  };
  return (
    <>
      <div>
        <h1 className="my-8 text-center text-4xl font-semibold lg:my-16">
          {t("title")}
        </h1>
      </div>
      <div className="flex max-w-[1000px] flex-col place-items-center items-center self-center md:grid md:grid-cols-2 lg:grid-cols-3">
        <CommitteeCard info={president} />
        <CommitteeCard info={treasurer} />
        <CommitteeCard info={event} />
        <CommitteeCard info={secretary} />
        <CommitteeCard info={ls} />
      </div>
    </>
  );
};
export async function getStaticProps({ locale }: { locale: string }) {
  const messages = await loadTranslationMessages(locale);
  return {
    props: {
      messages,
    },
  };
}

export default Committee;
