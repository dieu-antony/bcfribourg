import Head from "next/head";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/lib/components/ui/accordion";
import { useEffect, useState } from "react";
import { Player } from "@prisma/client";

const interclubs = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setPlayers(data.players);
        }
      });
  }, []);

  players.map((player) => {
    console.log(player);
  });
  return (
    <>
      <Head>
        <title>Interclubs</title>
      </Head>
      <div className="m-5 flex w-full max-w-[1000px] flex-col rounded border bg-slate-50 p-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="1">
            <AccordionTrigger>Union Tafers-Fribourg 1 - LNA</AccordionTrigger>
            <AccordionContent>Players</AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTrigger>Union Tafers-Fribourg 2 - LNB</AccordionTrigger>
            <AccordionContent>Players</AccordionContent>
          </AccordionItem>
          <AccordionItem value="3">
            <AccordionTrigger>
              Union Tafers-Fribourg 3 - 1ère Ligue
            </AccordionTrigger>
            <AccordionContent>Players</AccordionContent>
          </AccordionItem>
          <AccordionItem value="4">
            <AccordionTrigger>
              Union Tafers-Fribourg 4 - 2ème Ligue
            </AccordionTrigger>
            <AccordionContent>Players</AccordionContent>
          </AccordionItem>
          <AccordionItem value="5">
            <AccordionTrigger>
              Union Tafers-Fribourg 5 - 4ème Ligue
            </AccordionTrigger>
            <AccordionContent>Players</AccordionContent>
          </AccordionItem>
          <AccordionItem value="6">
            <AccordionTrigger>
              Union Tafers-Fribourg 6 - 4ème Ligue
            </AccordionTrigger>
            <AccordionContent>Players</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default interclubs;
