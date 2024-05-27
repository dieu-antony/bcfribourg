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
import type { ICTeam } from "@prisma/client";
import { getLeagueFromId } from "~/lib/utils/utils";
import { toast } from "sonner";
import { Toaster } from "~/lib/components/ui/sonner";

const Players = () => {
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);

  const [icTeams, setIcTeams] = useState<ICTeam[]>([]);
  const [loading] = useState(false);
  const [leagueId, setLeagueId] = useState("clvzbbfot00001o6wxykabs64");
  const [teamName, setTeamName] = useState("Union Tafers-Fribourg 1");
  const [playersF, setPlayersF] = useState("");
  const [playersM, setPlayersM] = useState("");
  const [url, setUrl] = useState("");
  const [icTeamId, setIcTeamId] = useState("Union Tafers-Fribourg 1");
  const [captain, setCaptain] = useState("");

  useEffect(() => {
    async function getIcTeams() {
      const response = await fetch("/api/icTeams");
      const data = await response.json();
      if (data.status === "success") {
        setIcTeams(
          data.data.map((team: any) => ({
            id: team.id,
            name: team.name,
            url: team.url,
            league: getLeagueFromId(team.leagueId),
          })),
        );
      }
    }
    getIcTeams();
  }, []);

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
    const data = await response.json();
    if (data.status === "success") {
      toast.success(data.message);
    }
    if (data.status === "error") {
      toast.error(data.message);
    }
  }

  async function createPlayers(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const playersFList = playersF.split(",").map((player) => ({
      firstName: player.split(" ")[0] ?? "",
      lastName: player.split(" ")[1] ?? "",
      gender: "F",
      captain: captain === player ? true : false,
      teamId: icTeamId,
    }));
    const playersMList = playersM.split(",").map((player) => ({
      firstName: player.split(" ")[0] ?? "",
      lastName: player.split(" ")[1] ?? "",
      gender: "M",
      captain: captain === player ? true : false,
      teamId: icTeamId,
    }));

    const playersList = playersFList.concat(playersMList);

    const response = await fetch("/api/players/create", {
      method: "POST",
      body: JSON.stringify(playersList),
    });
    const data = await response.json();
    if (data.status === "success") {
      toast.success(data.message);
    }
    if (data.status === "error") {
      toast.error(data.message);
    }
  }

  const teamOption = icTeams.map((team) => {
    return <option key={team.id} value={team.id}>{team.name}</option>;
  });
  if (status === "authenticated") {
    return (
      <>
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
                    <option value="Union Tafers-Fribourg 2">
                      Union Tafers-Fribourg 2
                    </option>
                    <option value="Union Tafers-Fribourg 3">
                      Union Tafers-Fribourg 3
                    </option>
                    <option value="Union Tafers-Fribourg 4">
                      Union Tafers-Fribourg 4
                    </option>
                    <option value="Union Tafers-Fribourg 5">
                      Union Tafers-Fribourg 5
                    </option>
                    <option value="Union Tafers-Fribourg 6">
                      Union Tafers-Fribourg 6
                    </option>
                    <option value="Union Tafers-Fribourg 7">
                      Union Tafers-Fribourg 7
                    </option>
                    <option value="Union Tafers-Fribourg 8">
                      Union Tafers-Fribourg 8
                    </option>
                    <option value="Union Tafers-Fribourg 9">
                      Union Tafers-Fribourg 9
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
            </div>
          </div>
          <Toaster richColors />
        </div>
      </>
    );
  }
};
export default Players;
