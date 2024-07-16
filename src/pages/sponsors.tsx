import Sponsor from "~/lib/components/Sponsor";
import { Separator } from "~/lib/components/ui/separator";

export default function sponsors() {
  return (
    <>
      <div className="flex w-full flex-col items-center">
        <h1 className="my-12 text-3xl font-bold text-black underline underline-offset-8 mx-5">
          Sponsors du BC Fribourg
        </h1>
        <div className="mx-5 mb-8 max-w-[1000px]  px-8">
          <section className="hidden text-center">
            <h2 className="text-2xl font-bold text-picton-blue-500">
              Sponsor principal
            </h2>
            <div>
              <div className="h-[200px]" />
            </div>
          </section>
          <section className="hidden text-center">
            <h2 className="text-2xl font-bold text-picton-blue-500">
              Sponsors importants
            </h2>
            <div className="grid grid-cols-2 items-center justify-center gap-4 text-center md:grid-cols-3">
              <div className="h-[200px]" />
            </div>
          </section>
          <section className="text-center">
            <h2 className="text-2xl font-bold text-picton-blue-500">
              Sponsors de soutien
            </h2>
            <div className="mt-8 grid grid-cols-2 items-center justify-center gap-4 text-center md:grid-cols-3">
              <Sponsor name="SINEF" file="svg" link="https://www.sinef.ch/" />
              <Sponsor
                name="Frimousse"
                file="png"
                link="https://www.fri-mousse.ch/wp/"
              />
            </div>
          </section>
          <Separator className="my-16 bg-black" />
          <section className="mt-8 flex flex-col gap-8 text-center">
            <h3 className="text-2xl font-bold">
              Vous aimeriez soutenir le Badminton Club Fribourg?
            </h3>
            <p className="text-lg">
              Nous offerons 3 possibilités de sponsoring, le sponsor principal,
              les sponsors importants et les sponsors de soutien. Pour plus d&apos;infos veuillez nous contacter sous <span className="font-semibold">president(at)bcfribourg.ch</span>
            </p>
            <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div>
                <h3 className="my-4 text-xl font-bold text-picton-blue-500">
                  Sponsor principal
                </h3>
                <ul className="flex list-disc flex-col gap-2 text-left text-black font-sans">
                  <li>
                    Publicité sur l&apos;habillement selon directives Swiss
                    Badminton
                  </li>
                  <li>
                    Possibilité d&apos;avoir 2 panneaux d&apos;affichage lors
                    des matchs à domicile (grandeur panneau max 1x3m)
                  </li>
                  <li>
                    Référence et logo du parrain principal sur le site internet
                  </li>
                  <li>
                    Référence et logo du parrain principal dans le courrier
                    adressé aux membres
                  </li>
                  <li>Participation aux matchs à domicile (Fribourg)</li>
                  <li>Engagement et contrat de sponsoring sur 3 ans</li>
                </ul>
              </div>
              <div>
                <h3 className="my-4 text-xl font-bold text-picton-blue-500">
                  Sponsor important
                </h3>
                <ul className="flex list-disc flex-col gap-2 text-left text-black">
                  <li>
                    Possibilité d&apos;avoir un panneau d&apos;affichage lors
                    des matchs à domicile (grandeur panneau max 1x3m)
                  </li>
                  <li>Référence du nom du parrain sur le site internet</li>
                  <li>Participation aux matchs à domicile (Fribourg)</li>
                </ul>
              </div>
              <div>
                <h3 className="my-4 text-xl font-bold text-picton-blue-500">
                  Sponsor de soutien
                </h3>
                <ul className="flex list-disc flex-col gap-2 text-left text-black">
                  <li>Référence du nom du parrain sur le site internet</li>
                  <li>Participation aux matchs à domicile (Fribourg)</li>
                </ul>
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}
