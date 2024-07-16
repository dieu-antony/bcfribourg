import CommitteeCard from "~/lib/components/CommitteeCard";

const Committee = () => {
  const president = {
    imgRef: "/assets/committee/president.jpg",
    title: "Président",
    name: "Philippe Etter",
    email: "president(at)bcfribourg.ch",
    phone: "079 488 15 38",
  };
  const secretary = {
    imgRef: "/assets/committee/secretary.jpg",
    title: "Secrétaire / Resp. Interclubs",
    name: "Antony Dieu",
    email: "secretaire(at)bcfribourg.ch",
    phone: "078 692 53 87",
  };
  const event = {
    imgRef: "/assets/committee/event.jpg",
    title: "Evènements",
    name: "Colette Jungo",
    email: "event(at)bcfribourg.ch",
    phone: "079 452 45 15",
  };
  const treasurer = {
    imgRef: "/assets/committee/blank.png",
    title: "Caissière / Vice-Présidente",
    name: "Nathalie Rey",
    email: "caissier(at)bcfribourg.ch",
    phone: "079 296 12 44",
  };
  const ls = {
    imgRef: "/assets/committee/ligueSup.jpg",
    title: "Resp. Ligues Superieures",
    name: "Gilbert Fischer",
    email: "",
    phone: "",
  };
  return (
    <>
      <div>
        <h1 className="my-8 text-center text-4xl font-semibold lg:my-16">
          Comité
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

export default Committee;
