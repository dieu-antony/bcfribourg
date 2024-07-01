import Head from "next/head";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/lib/components/ui/accordion";
import { useEffect, useState } from "react";
import { SquareArrowOutUpRight } from 'lucide-react';
import type { PlayerByTeam } from "~/lib/types";

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

  return (
    <>
      <Head>
        <title>Interclubs</title>
      </Head>
      <div className="flex justify-center">
        <div className="m-5 flex w-full max-w-[1000px] flex-col rounded border bg-slate-50 p-2 absolute px-4">
          <Accordion type="single" collapsible>
            {/* Set display names for the teams */ }
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
                  <AccordionTrigger>{team.name + leagueName}</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2">
                      <div className="grid grid-cols-2">
                      <div className="flex flex-col gap-1 items-center">
                        <span className="font-bold">Joueurs:</span>
                      </div>
                      <div className="col-span-1 flex flex-col gap-1 items-start">
                        {team.players.map((player) => {
                          return (
                            <div
                              key={player.id}
                              className="flex items-center justify-between"
                            >
                              <span>
                                {player.firstName} {player.lastName}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      </div>
                      <div className="">
                        <div className="flex flex-col gap-1">
                          <a
                            target="_blank"
                            href={team.url}
                            className="hover:pointer flex gap-1 hover:text-picton-blue-500 hover:fill-picton-blue-500"
                          >
                            <SquareArrowOutUpRight className="size-4"/>Swiss Badminton
                            
                          </a>

                          <div>
                            <span className="font-bold">Capitaine: </span>
                            <span>
                              {
                                team.players.find((player) => player.captain)
                                  ?.firstName
                              }{" "}
                              {
                                team.players.find((player) => player.captain)
                                  ?.lastName
                              }
                            </span>
                          </div>
                        </div>
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
