import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/lib/components/ui/accordion";
import { useState } from "react";
import { SquareArrowOutUpRight } from "lucide-react";
import type { PlayerByTeam } from "~/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "~/lib/components/ui/separator";
import { useTranslations } from "next-intl";
import type { GetStaticPropsContext } from "next";
import Layout from "~/lib/components/Layout";
import IcImage from "../../../public/assets/ic_image.webp";

type InterclubsProps = {
  initialData: PlayerByTeam[];
};

const Interclubs = ({ initialData }: InterclubsProps) => {
  const t = useTranslations("Interclubs");
  const [playersByTeam] = useState<PlayerByTeam[]>(initialData);

  return (
    <Layout>
      <Image
        src={IcImage}
        alt="Interclubs Badminton Club Fribourg BC Fribourg"
        className="left-0 top-0 z-0 max-h-96 w-full object-cover"
        priority
        loading="eager"
      />
      <h1 className="absolute z-10 mt-[150px] w-full bg-gradient-to-r from-transparent via-slate-700/50 py-1 text-center text-2xl font-bold text-white md:mt-[220px] md:text-6xl">
        Interclubs
      </h1>
      <div className="flex justify-center">
        <div className="z-10 mx-5 my-8 flex gap-2 w-full max-w-[1000px] flex-col rounded border ">
          <div className="bg-white p-4 rounded border shadow-sm text-lg">
            {t("desc")}
          </div>
          <Accordion type="multiple" className="bg-white px-4 rounded border shadow-sm">
            {/* Set display names for the teams */}
            {playersByTeam.map((team) => {
              let leagueName = "";
              if (team.league.name === "A" || team.league.name === "B") {
                leagueName = " - NL" + team.league.name;
              } else if (team.league.name === "1") {
                leagueName = " - " + t("1st");
              } else if (
                team.league.name === "2" ||
                team.league.name === "3" ||
                team.league.name === "4"
              ) {
                leagueName = " - " + team.league.name + t("ligue");
              }
              return (
                <AccordionItem key={team.id} value={team.id}>
                  <AccordionTrigger className="text-xl font-semibold no-underline hover:text-picton-blue-500">
                    {team.name + leagueName}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-2 grid grid-cols-2 place-items-center items-start">
                      <div className="flex flex-col gap-4">
                        <h2 className="text-lg font-bold">{t("f")}</h2>
                        <div className="flex flex-col gap-1">
                          {team.players
                            .filter((player) => player.gender === "F")
                            .sort((a, b) => a.lastName.localeCompare(b.lastName))
                            .map((player) => {
                              return (
                                <div
                                  key={player.id}
                                  className="flex items-center justify-between text-base"
                                >
                                  {player.captain ? (
                                    <span className="font-semibold">
                                      {player.firstName} {player.lastName}
                                    </span>
                                  ) : (
                                    <span>
                                      {player.firstName} {player.lastName}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <h2 className="text-lg font-semibold">{t("m")}</h2>
                        <div className="flex flex-col gap-1">
                          {team.players
                            .filter((player) => player.gender === "M")
                            .sort((a, b) => a.lastName.localeCompare(b.lastName))
                            .map((player) => {
                              return (
                                <div
                                  key={player.id}
                                  className="flex items-center justify-between text-base"
                                >
                                  {player.captain ? (
                                    <span className="font-semibold">
                                      {player.firstName} {player.lastName}
                                    </span>
                                  ) : (
                                    <span>
                                      {player.firstName} {player.lastName}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <Separator className="col-span-2 mt-4 w-full self-center bg-picton-blue-500" />
                      <div className="col-span-2">
                        <Link
                          target="_blank"
                          href={team.url}
                          className="hover:pointer mt-4 flex items-center gap-1 text-lg hover:fill-picton-blue-500 hover:text-picton-blue-500"
                        >
                          <SquareArrowOutUpRight className="size-4" />
                          Swiss Badminton
                        </Link>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/players`);
  const data = (await res.json()) as {
    players: PlayerByTeam[];
    status: string;
  };

  return {
    props: {
      messages: messages.default,
      initialData: data.players,
    },
    revalidate: 604800,
  };
}

export default Interclubs;
