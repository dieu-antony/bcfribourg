import { Mail, Smartphone, File } from "lucide-react";
import Link from "next/link";
import TrainingCard from "~/lib/components/TrainingCard";

const juniors = () => {
  return (
    <>
      <div className="flex flex-col place-items-center justify-center md:grid md:grid-cols-2">
        <TrainingCard
          className="mt-8 transition duration-200 hover:translate-x-1 md:place-self-end"
          time={{ start: "18h00 - 20h00", day: "Mardi" }}
          trainer="Sheen Khurdi et Julie Huser"
          target="Juniors A"
        />
        <TrainingCard
          className="transition duration-200 hover:translate-x-1 md:mt-8 md:place-self-start"
          time={{ start: "18h00 - 20h00", day: "Mardi" }}
          trainer="Hugo Genoud"
          target="Juniors B"
        />
        <TrainingCard
          className="transition duration-200 hover:translate-x-1 md:place-self-end"
          time={{ start: "18h00 - 20h00", day: "Jeudi" }}
          trainer="Colette Jungo et Julie Huser"
          target="Juniors A et B"
        />
        <div className="m-8 mt-0 flex h-[200px] w-[300px] flex-col gap-4 bg-white p-8 shadow-sm transition duration-200 hover:translate-x-1 md:place-self-start lg:h-[300] lg:w-[400px]">
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
            <span>26.08.2024 jusqu&apos;au 26.06.2025</span>
          </div>
        </div>
        <div className="m-8 mt-0 flex h-[200px] w-[300px] flex-col gap-6 bg-white p-8 shadow-sm transition duration-200 hover:translate-x-1 md:place-self-end lg:h-[300] lg:w-[400px]">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">Contact</h1>
            <span>Antony Dieu</span>
          </div>
          <div className="grid grid-cols-2 place-items-center justify-center">
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
    </>
  );
};
export default juniors;
