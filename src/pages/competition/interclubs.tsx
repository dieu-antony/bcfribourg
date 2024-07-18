import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/lib/components/ui/accordion";
import { useEffect, useState } from "react";
import { SquareArrowOutUpRight } from "lucide-react";
import type { PlayerByTeam } from "~/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "~/lib/components/ui/separator";
import { loadTranslationMessages } from "~/lib/utils/utils";
import { useTranslations } from "next-intl";

const Interclubs = () => {
  const t = useTranslations("interclubs");
  const [playersByTeam, setPlayersByTeam] = useState<PlayerByTeam[]>([]);

  // Fetch players by team
  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setPlayersByTeam(data.players);
        }
      });
  }, []);
  return (
    <>
      <Image
        src="/assets/ic_image.jpg"
        alt="Interclubs"
        width={3840}
        height={2160}
        className="left-0 top-0 z-0 w-full"
      />
      <h1 className="absolute z-10 mt-[150px] w-full bg-gradient-to-r from-transparent via-slate-700/50 py-1 text-center text-2xl font-bold text-white md:mt-[220px] md:text-6xl">
        Interclub
      </h1>
      <div className="flex justify-center">
        <div className="z-10 m-5 flex w-full max-w-[1000px] flex-col rounded border bg-white px-4">
          <Accordion type="single" collapsible>
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
                        <h1 className="text-lg font-bold">{t("f")}</h1>
                        <div className="flex flex-col gap-1">
                          {team.players
                            .filter((player) => player.gender === "F")
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
                        <h1 className="text-lg font-semibold">{t("m")}</h1>
                        <div className="flex flex-col gap-1">
                          {team.players
                            .filter((player) => player.gender === "M")
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

export default Interclubs;
