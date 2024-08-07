import { ChevronDownIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { type FormEvent, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/lib/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/lib/components/ui/dropdown-menu";
import { inter } from "../_app";
import { getLeagueFromId } from "~/lib/utils/utils";
import { toast } from "sonner";
import { Toaster } from "~/lib/components/ui/sonner";
import { ICDatabaseTable } from "~/lib/components/dataTables/icTable/ICDatabaseTable";
import {
  ICDatabaseColumns,
  type ICDatabaseColumnsProps,
} from "~/lib/components/dataTables/icTable/ICDatabaseColumns";
import { Tabs, TabsContent, TabsList } from "~/lib/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { PlayerDatabaseTable } from "~/lib/components/dataTables/playerTable/PlayerDatabaseTable";
import {
  PlayerDatabaseColumns,
  type PlayerDatabaseColumnsProps,
} from "~/lib/components/dataTables/playerTable/PlayerDatabaseColumns";
import { Button } from "~/lib/components/ui/button";
import type { Player } from "@prisma/client";
import Layout from "~/lib/components/Layout";
import type { GetStaticPropsContext } from "next";
import type { PlayerByTeam } from "~/lib/types";

const Players = () => {
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      void Router.replace("/login");
    }
  }, [status]);

  const [icTeams, setIcTeams] = useState<ICDatabaseColumnsProps[]>([]);
  const [players, setPlayers] = useState<PlayerDatabaseColumnsProps[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading] = useState(false);
  const [leagueId, setLeagueId] = useState("clvzbbfot00001o6wxykabs64");
  const [teamName, setTeamName] = useState("Union Tafers-Fribourg 1");
  const [playersF, setPlayersF] = useState("");
  const [playersM, setPlayersM] = useState("");
  const [url, setUrl] = useState("");
  const [icTeamId, setIcTeamId] = useState("");
  const [captain, setCaptain] = useState("");
  const [singlePlayer, setSinglePlayer] = useState({
    gender: "M",
    captain: false,
    teamId: "",
  } as Player);
  useEffect(() => {
    async function getIcTeams() {
      const response = await fetch("/api/icTeams");
      const data: {
        data: {
          id: string;
          name: string;
          leagueId: string;
          url: string;
        }[];
        status: string;
      } = await response.json();
      if (data.status === "success") {
        setIcTeams(
          data.data.map(
            (team: {
              id: string;
              name: string;
              leagueId: string;
              url: string;
            }) => ({
              id: team.id,
              name: team.name,
              url: team.url,
              league: getLeagueFromId(team.leagueId),
            }),
          ),
        );
      }
    }
    void getIcTeams();
    async function getPlayers() {
      try {
        const response = await fetch("/api/players");
        const data: { status: string; players: PlayerByTeam[] } =
          await response.json();
        if (data.status === "success") {
          setPlayers(
            data.players.flatMap((team: PlayerByTeam) =>
              team.players.map(
                (player: {
                  id: string;
                  firstName: string;
                  lastName: string;
                  teamId: string;
                  captain: boolean;
                  gender: string;
                }) => ({
                  id: player.id,
                  firstName: player.firstName,
                  lastName: player.lastName,
                  team: team.name,
                  captain: player.captain ? "Yes" : "No",
                  gender: player.gender,
                }),
              ),
            ),
          );
        }
      } catch (error) {
        console.error("Error fetching players", error);
      }
    }
    void getPlayers();
  }, []);

  async function deleteAllPlayers() {
    confirmDelete ? setConfirmDelete(false) : setConfirmDelete(true);
    if (!confirmDelete) return;
    const response = await fetch("/api/players/delete", {
      method: "POST",
      body: JSON.stringify(players),
    });
    const data: { status: string; message: string } = await response.json();
    if (data.status === "success") {
      toast.success(data.message);
    }
    if (data.status === "error") {
      toast.error(data.message);
    }
  }

  async function createIcTeams(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const team = [
      {
        name: teamName,
        leagueId: leagueId,
        url: url,
      },
    ];

    const response = await fetch("/api/icTeams/create", {
      method: "POST",
      body: JSON.stringify(team),
    });
    const data: { status: string; message: string } = await response.json();
    if (data.status === "success") {
      toast.success(data.message);
    }
    if (data.status === "error") {
      toast.error(data.message);
    }
  }
  async function createSinglePlayer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const playerToCreate = [singlePlayer];

    const response = await fetch("/api/players/create", {
      method: "POST",
      body: JSON.stringify(playerToCreate),
    });
    const data: { status: string; message: string } = await response.json();
    if (data.status === "success") {
      toast.success(data.message);
    }
    if (data.status === "error") {
      toast.error(data.message);
    }
  }
  async function createPlayers(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const playersFList = playersF.split(", ").map((player) => ({
      firstName: player.split(" ")[0] ?? "",
      lastName: player.slice((player.split(" ")[0]?.length ?? 0) + 1) ?? "",
      gender: "F",
      captain: captain === player ? true : false,
      teamId: icTeamId,
    }));
    const playersMList = playersM.split(", ").map((player) => ({
      firstName: player.split(" ")[0] ?? "",
      lastName: player.slice((player.split(" ")[0]?.length ?? 0) + 1) ?? "",
      gender: "M",
      captain: captain === player ? true : false,
      teamId: icTeamId,
    }));

    const playersList = playersFList.concat(playersMList);

    const response = await fetch("/api/players/create", {
      method: "POST",
      body: JSON.stringify(playersList),
    });
    const data: { status: string; message: string } = await response.json();
    if (data.status === "success") {
      toast.success(data.message);
    }
    if (data.status === "error") {
      toast.error(data.message);
    }
  }

  const teamOption = icTeams.map((team) => {
    return (
      <option key={team.id} value={team.id}>
        {team.name}
      </option>
    );
  });
  if (status === "authenticated") {
    return (
      <Layout>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  Players <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className={`font-sans ${inter.variable}`}
                >
                  <DropdownMenuItem>
                    <BreadcrumbLink href="/admin/icdata">
                      IC Data
                    </BreadcrumbLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BreadcrumbLink href="/admin/players">
                      Players
                    </BreadcrumbLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BreadcrumbLink href="/admin/calendar">
                      Calendar
                    </BreadcrumbLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-6 flex flex-col items-center justify-center gap-2">
          <div>
            <h2 className="text-xl">Players and IC teams</h2>
            <div className="grid grid-cols-2">
              <div>
                <h3>IC Teams</h3>
                <form className="flex flex-col" onSubmit={createIcTeams}>
                  <label htmlFor="teamName">Team Name</label>
                  <select
                    name="teamName"
                    className="form-select"
                    onChange={(e) => setTeamName(e.target.value)}
                  >
                    <option value="Union Tafers-Fribourg 1">
                      Union Tafers-Fribourg 1
                    </option>
                    <option value="Union Fribourg-Tafers 2">
                      Union Fribourg-Tafers 2
                    </option>
                    <option value="Union Fribourg-Tafers 3">
                    Union Fribourg-Tafers 3
                    </option>
                    <option value="Union Fribourg-Tafers 4">
                    Union Fribourg-Tafers 4
                    </option>
                    <option value="Union Fribourg-Tafers 5">
                    Union Fribourg-Tafers 5
                    </option>
                    <option value="Union Fribourg-Tafers 6">
                    Union Fribourg-Tafers 6
                    </option>
                    <option value="Union Fribourg-Tafers 7">
                    Union Fribourg-Tafers 7
                    </option>
                    <option value="Union Fribourg-Tafers 8">
                    Union Fribourg-Tafers 8
                    </option>
                    <option value="Union Fribourg-Tafers 9">
                    Union Fribourg-Tafers 9
                    </option>
                  </select>
                  <label htmlFor="league">League</label>
                  <select
                    name="league"
                    className="form-select"
                    onChange={(e) => setLeagueId(e.target.value)}
                  >
                    <option value="clvzbbfot00001o6wxykabs64">A</option>
                    <option value="clvzbblao0000nrcwt4za7q9h">B</option>
                    <option value="clvzb9fvi0000132rf2m0p5mn">1</option>
                    <option value="clvzbaizc0000ji7z4hvz8bzd">2</option>
                    <option value="clvzbav2u0000xmtyuu85b6fu">3</option>
                    <option value="clvzbazur00009r4ruxq9hltm">4</option>
                    <option value="clvzbb65d00005qy3z10kl2no">5</option>
                  </select>
                  <label htmlFor="url">URL</label>
                  <input
                    name="url"
                    type="url"
                    className="form-input"
                    onChange={(e) => setUrl(`${e.target.value}`)}
                    required
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="m-1 mt-2 rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:cursor-not-allowed"
                    disabled={loading}
                  />
                </form>
              </div>
              <div>
                <h3>Players</h3>
                <form className="flex flex-col" onSubmit={createPlayers}>
                  <select
                    className="form-select"
                    onChange={(e) => setIcTeamId(e.target.value)}
                  >
                    <option>Choose a Team</option>
                    {teamOption}
                  </select>
                  <label htmlFor="women">Women</label>
                  <textarea
                    name="women"
                    className="form-textarea"
                    placeholder="Prénom Nom, Prénom2 Nom 2, ..."
                    onChange={(e) => setPlayersF(e.target.value)}
                    required
                  ></textarea>
                  <label htmlFor="men">Men</label>
                  <textarea
                    name="men"
                    className="form-textarea"
                    placeholder="Prénom Nom, Prénom2 Nom 2, ..."
                    onChange={(e) => setPlayersM(e.target.value)}
                    required
                  ></textarea>
                  <label htmlFor="captain">Capitain</label>
                  <input
                    className="form-input"
                    name="captain"
                    onChange={(e) => setCaptain(e.target.value)}
                    placeholder="Prénom Nom"
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="m-1 mt-2 rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:cursor-not-allowed"
                    disabled={loading}
                  />
                </form>
              </div>
              <div>
                <h3>Add one Players</h3>
                <form className="flex flex-col" onSubmit={createSinglePlayer}>
                  <select
                    className="form-select"
                    onChange={(e) =>
                      setSinglePlayer({
                        ...singlePlayer,
                        teamId: e.target.value,
                      })
                    }
                  >
                    <option>Choose a Team</option>
                    {teamOption}
                  </select>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    name="firstName"
                    className="form-input"
                    placeholder="Prénom"
                    onChange={(e) =>
                      setSinglePlayer({
                        ...singlePlayer,
                        firstName: e.target.value,
                      })
                    }
                  ></input>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    name="lastName"
                    className="form-input"
                    placeholder="Nom"
                    onChange={(e) =>
                      setSinglePlayer({
                        ...singlePlayer,
                        lastName: e.target.value,
                      })
                    }
                  ></input>
                  <label htmlFor="gender">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    onChange={(e) =>
                      setSinglePlayer({
                        ...singlePlayer,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option>M</option>
                    <option>F</option>
                  </select>
                  <label htmlFor="captain">Capitain?</label>
                  <select
                    className="form-select"
                    name="captain"
                    onChange={(e) =>
                      setSinglePlayer({
                        ...singlePlayer,
                        captain: e.target.value === "1" ? true : false,
                      })
                    }
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
                  <input
                    type="submit"
                    value="Submit"
                    className="m-1 mt-2 rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:cursor-not-allowed"
                    disabled={loading}
                  />
                </form>
              </div>
            </div>
          </div>
          <Tabs defaultValue="teams" className="w-[1000px] pt-10">
            <TabsList className="gap-4">
              <TabsTrigger
                value="teams"
                className="text-gray rounded-sm border-2 bg-gray-50 p-2 data-[state=active]:border-picton-blue-700 data-[state=inactive]:border-gray-200 data-[state=active]:bg-picton-blue-500 data-[state=active]:text-white"
              >
                IC Teams
              </TabsTrigger>
              <TabsTrigger
                value="players"
                className="text-gray rounded-sm border-2 bg-gray-50 p-2 data-[state=active]:border-picton-blue-700 data-[state=inactive]:border-gray-200 data-[state=active]:bg-picton-blue-500 data-[state=active]:text-white"
              >
                Players
              </TabsTrigger>
            </TabsList>
            <TabsContent value="teams">
              <div className="container mx-auto pb-10">
                <ICDatabaseTable columns={ICDatabaseColumns} data={icTeams} />
              </div>
            </TabsContent>
            <TabsContent value="players">
              <div className="flex flex-row gap-2">
                <Button
                  onClick={deleteAllPlayers}
                  className="bg-red-500 hover:bg-red-600"
                >
                  {confirmDelete
                    ? "Yes, delete all Players"
                    : "Delete All Players"}
                </Button>
                {confirmDelete && (
                  <Button
                    onClick={() => setConfirmDelete(false)}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Nevermind
                  </Button>
                )}
              </div>
              <div className="container mx-auto pb-10">
                <PlayerDatabaseTable
                  columns={PlayerDatabaseColumns}
                  data={players}
                />
              </div>
            </TabsContent>
          </Tabs>
          <Toaster richColors />
        </div>
      </Layout>
    );
  }
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`) as IntlMessages).default,
    },
  };
}

export default Players;
