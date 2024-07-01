import { Mail, Smartphone, File } from "lucide-react";
import TrainingCard from "~/lib/components/TrainingCard";

const adultes = () => {
  return (
    <>
      <div className="flex flex-col place-items-center justify-center md:grid md:grid-cols-2">
        <div className="m-8 mb-0 flex h-[200px] w-[300px] flex-col gap-4 bg-white p-8 shadow-sm md:place-self-end lg:h-[300] lg:w-[400px]">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">Vacances</h1>
            <a
              href="https://www.fr.ch/sites/default/files/2020-06/calendrier-majoritaire-202425.pdf"
              className="flex flex-row gap-1 hover:text-picton-blue-500"
              target="_blank"
            >
              <File /> Vacances scolaires
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">Durée de la saison</h1>
            <span>28.06.2023 jusqu'au 28.08.2024</span>
          </div>
        </div>
        <div className="m-8 mb-0 flex h-[200px] w-[300px] flex-col gap-6 bg-white p-8 shadow-sm md:place-self-start lg:h-[300] lg:w-[400px]">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">Contact</h1>
            <span>Antony Dieu</span>
          </div>
          <div className="grid grid-cols-2 place-items-center justify-center">
            <a className="mb-2 hover:text-picton-blue-500" href="/club/contact">
              <Mail />
            </a>
            <Smartphone className="mb-2" />
            <a className="hover:text-picton-blue-500" href="/club/contact">
              Email
            </a>
            <span>078 692 53 87</span>
          </div>
        </div>
        <TrainingCard
          className="md:place-self-end"
          time={{ start: "18h00 - 20h00", day: "Lundi" }}
          trainer="Manuel Helfer"
          target="4ème ligue et non licenciés"
        />
        <TrainingCard
          className="md:place-self-start"
          time={{ start: "20h00 - 22h00", day: "Lundi" }}
          trainer="Manuel Helfer"
          target="LNB, 1ère, 2ème et 4ème ligues"
        />
        <TrainingCard
          className="md:place-self-end"
          time={{ start: "20h00 - 22h00", day: "Mercredi" }}
          trainer="Nicole Perroud"
          target="LNB, 1ère et 2ème ligues"
        />
        <TrainingCard
          className="md:place-self-start"
          time={{ start: "19h00 - 21h00", day: "Jeudi" }}
          trainer="Anna Larchenko-Fischer"
          target="Licenciés et non licenciés"
        />
      </div>
    </>
  );
};

export default adultes;
