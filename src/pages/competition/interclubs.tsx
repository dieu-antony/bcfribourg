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
import AccentBar from "~/lib/components/AccentBar";
import { db } from "~/server/db";

type InterclubsProps = {
  teams: PlayerByTeam[];
};

function leagueRank(leagueName: string) {
  const order: Record<string, number> = {
    A: 1,
    B: 2,
    "1": 3,
    "2": 4,
    "3": 5,
    "4": 6,
    "5": 7,
  };
  return order[leagueName] ?? 999;
}

function teamNameComparator(a: string, b: string) {
  const regex = /(.*?)(\s\d+)?$/;
  const [, baseA, numA] = a.match(regex) ?? ["", a, ""];
  const [, baseB, numB] = b.match(regex) ?? ["", b, ""];
  const baseCompare = baseA!.localeCompare(baseB!);
  if (baseCompare !== 0) return baseCompare;
  const nA = numA ? parseInt(numA.trim()) : 0;
  const nB = numB ? parseInt(numB.trim()) : 0;
  return nA - nB;
}

const Interclubs = ({ teams }: InterclubsProps) => {
  const t = useTranslations("Interclubs");
  const [playersByTeam] = useState<PlayerByTeam[]>(teams);

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
        <div className="z-10 mx-5 my-8 flex w-full max-w-[1000px] flex-col gap-2 rounded border">
          <div className="relative rounded border bg-white p-4 pb-5 text-lg shadow-sm">
            {t("desc")}
            <AccentBar />
          </div>

          <Accordion
            type="multiple"
            className="rounded border bg-white px-4 shadow-sm"
            defaultValue={[
              [...playersByTeam].sort(
                (a, b) => leagueRank(a.league.name) - leagueRank(b.league.name),
              )[0]!.id,
            ]}
          >
            {[...playersByTeam]
              .sort((a, b) => {
                const leagueComparison =
                  leagueRank(a.league.name) - leagueRank(b.league.name);
                if (leagueComparison !== 0) return leagueComparison;
                return teamNameComparator(a.name, b.name);
              })
              .map((team) => {
                const leagueMap = {
                  A: "NLA",
                  B: "NLB",
                  1: t("1st"),
                  2: t("2nd"),
                  3: t("3rd"),
                  4: "4" + t("nth"),
                  5: "5" + t("nth"),
                };

                const leagueName =
                  team.league.name in leagueMap
                    ? ` - ${leagueMap[team.league.name as keyof typeof leagueMap]}`
                    : "";

                return (
                  <AccordionItem key={team.id} value={team.id}>
                    <AccordionTrigger className="relative text-xl font-semibold no-underline hover:text-picton-blue-500">
                      {team.name + leagueName}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-2 grid grid-cols-2 place-items-center items-start">
                        <Separator className="col-span-2 mb-4 mt-0 w-full self-center bg-picton-blue-500" />
                        {team.photoUrl && (
                          <a
                            href={team.photoUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="col-span-2"
                          >
                            <Image
                              src={team.photoUrl}
                              alt={team.name}
                              width={400}
                              height={300}
                              className="rounded"
                            />
                          </a>
                        )}
                        <Separator className="col-span-2 my-4 w-full self-center bg-picton-blue-500" />
                        <div className="flex flex-col gap-4">
                          <h2 className="text-lg font-bold">{t("f")}</h2>
                          <div className="flex flex-col gap-1">
                            {team.players
                              .filter((p) => p.gender === "F")
                              .sort((a, b) =>
                                a.lastName.localeCompare(b.lastName),
                              )
                              .map((player) => (
                                <div
                                  key={player.id}
                                  className="flex items-center justify-between text-base"
                                >
                                  <span
                                    className={
                                      player.captain ? "font-semibold" : ""
                                    }
                                  >
                                    {player.firstName} {player.lastName}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <h2 className="text-lg font-semibold">{t("m")}</h2>
                          <div className="flex flex-col gap-1">
                            {team.players
                              .filter((p) => p.gender === "M")
                              .sort((a, b) =>
                                a.lastName.localeCompare(b.lastName),
                              )
                              .map((player) => (
                                <div
                                  key={player.id}
                                  className="flex items-center justify-between text-base"
                                >
                                  <span
                                    className={
                                      player.captain ? "font-semibold" : ""
                                    }
                                  >
                                    {player.firstName} {player.lastName}
                                  </span>
                                </div>
                              ))}
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

  const teams = await db.iCTeam.findMany({
    include: {
      league: true,
      players: true,
    },
  });

  return {
    props: {
      messages: messages.default,
      teams,
    },
    revalidate: 86400,
  };
}

export default Interclubs;
