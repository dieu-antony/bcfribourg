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

const Interclubs = () => {
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
  console.log(playersByTeam);
  return (
    <>
      <Image
        src="/assets/ic_image.jpg"
        alt="Interclubs"
        width={3840}
        height={2160}
        className="w-full z-0 left-0 top-0"
      />
      <h1 className="absolute z-10 md:mt-[220px] mt-[150px] text-center w-full text-white font-bold md:text-6xl text-2xl bg-gradient-to-r from-transparent py-1 via-slate-700/50">Interclub</h1>
      <div className="flex justify-center">
        <div className="m-5 flex w-full max-w-[1000px] z-10 flex-col rounded border bg-white px-4">
          <Accordion type="single" collapsible>
            {/* Set display names for the teams */}
            {playersByTeam.map((team) => {
              let leagueName = "";
              if (team.league.name === "A" || team.league.name === "B") {
                leagueName = " - NL" + team.league.name;
              } else if (team.league.name === "1") {
                leagueName = " - 1ère ligue";
              } else if (
                team.league.name === "2" ||
                team.league.name === "3" ||
                team.league.name === "4"
              ) {
                leagueName = " - " + team.league.name + "ème ligue";
              }
              return (
                <AccordionItem key={team.id} value={team.id}>
                  <AccordionTrigger className="font-semibold text-xl hover:text-picton-blue-500 no-underline">{team.name + leagueName}</AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-2 grid grid-cols-2 place-items-center items-start">
                      <div className="flex flex-col gap-4">
                        <h1 className="text-lg font-bold">Femmes</h1>
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
                        <h1 className="text-lg font-semibold">Hommes</h1>
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
                      <Separator className="self-center w-full bg-picton-blue-500 mt-4 col-span-2"/>
                      <div className="col-span-2">
                        <Link
                          target="_blank"
                          href={team.url}
                          className="hover:pointer mt-4 text-lg flex items-center gap-1 hover:fill-picton-blue-500 hover:text-picton-blue-500"
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

export default Interclubs;
