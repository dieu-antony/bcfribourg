import { useSession } from "next-auth/react";
import Router from "next/router";
import {
  type FormEvent,
  useEffect,
  useState,
  useCallback,
  type ChangeEvent,
} from "react";
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
import type { APIMessageResponse, PlayerByTeam } from "~/lib/types";
import AdminBreadcrumb from "~/lib/components/AdminBreadcrumb";
import type { GetStaticPropsContext } from "next/types";

const leagues = [
  { id: "clvzbbfot00001o6wxykabs64", label: "A" },
  { id: "clvzbblao0000nrcwt4za7q9h", label: "B" },
  { id: "clvzb9fvi0000132rf2m0p5mn", label: "1" },
  { id: "clvzbaizc0000ji7z4hvz8bzd", label: "2" },
  { id: "clvzbav2u0000xmtyuu85b6fu", label: "3" },
  { id: "clvzbazur00009r4ruxq9hltm", label: "4" },
  { id: "clvzbb65d00005qy3z10kl2no", label: "5" },
];

const Players = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      void Router.replace("/login");
    }
  }, [status]);

  const [icTeams, setIcTeams] = useState<ICDatabaseColumnsProps[]>([]);
  const [players, setPlayers] = useState<PlayerDatabaseColumnsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // New team form state
  const [newTeam, setNewTeam] = useState({
    name: "",
    leagueId: leagues[0]!.id,
    url: "",
    photoUrl: "",
  });

  // Bulk players input state
  const [bulkPlayers, setBulkPlayers] = useState({
    teamId: "",
    female: "",
    male: "",
    captain: "",
  });

  // Single player form state
  const [singlePlayer, setSinglePlayer] = useState<Player>({
    id: "",
    firstName: "",
    lastName: "",
    teamId: "",
    gender: "M",
    captain: false,
  });

  // Load IC teams
  const fetchIcTeams = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/icTeams");
      const data = (await res.json()) as {
        data: {
          id: string;
          name: string;
          leagueId: string;
          url: string;
          photoUrl?: string;
        }[];
        status: string;
      };
      if (data.status === "success") {
        setIcTeams(
          data.data.map((team) => ({
            id: team.id,
            name: team.name,
            url: team.url,
            league: getLeagueFromId(team.leagueId),
            photoUrl: team.photoUrl ?? "",
          })),
        );
      } else {
        toast.error("Failed to load IC teams");
      }
    } catch (e) {
      toast.error("Error loading IC teams");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load players grouped by team
  const fetchPlayers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/players");
      const data = (await res.json()) as {
        status: string;
        players: PlayerByTeam[];
      };
      if (data.status === "success") {
        setPlayers(
          data.players.flatMap((team) =>
            team.players.map((player) => ({
              id: player.id,
              firstName: player.firstName,
              lastName: player.lastName,
              team: team.name,
              captain: player.captain ? "Yes" : "No",
              gender: player.gender,
            })),
          ),
        );
      } else {
        toast.error("Failed to load players");
      }
    } catch (e) {
      toast.error("Error loading players");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      void fetchIcTeams();
      void fetchPlayers();
    }
  }, [status, fetchIcTeams, fetchPlayers]);

  // Delete all players with confirmation
  const deleteAllPlayers = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/players/delete", {
        method: "POST",
        body: JSON.stringify(players),
      });
      const data = (await response.json()) as APIMessageResponse;
      if (data.status === "success") {
        toast.success(data.message);
        await fetchPlayers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting players");
    } finally {
      setConfirmDelete(false);
      setLoading(false);
    }
  };

  // Create a new IC team
  const handleCreateTeam = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !newTeam.name.trim() ||
      !newTeam.url.trim() ||
      !newTeam.photoUrl.trim()
    ) {
      toast.error("Please fill all required team fields");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/icTeams/create", {
        method: "POST",
        body: JSON.stringify([newTeam]),
      });
      const data = (await response.json()) as APIMessageResponse;
      if (data.status === "success") {
        toast.success(data.message);
        setNewTeam({
          name: "",
          leagueId: leagues[0]!.id,
          url: "",
          photoUrl: "",
        });
        await fetchIcTeams();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error creating team");
    } finally {
      setLoading(false);
    }
  };

  // Create players in bulk (female + male)
  const handleCreatePlayersBulk = async (e: FormEvent) => {
    e.preventDefault();

    if (!bulkPlayers.teamId) {
      toast.error("Please select a team");
      return;
    }

    const parsePlayers = (input: string, gender: "M" | "F") => {
      return input
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean)
        .map((fullName) => {
          const parts = fullName.split(" ");
          const firstName = parts.shift() ?? "";
          const lastName = parts.join(" ") ?? "";
          return {
            firstName,
            lastName,
            gender,
            captain: bulkPlayers.captain.trim() === fullName,
            teamId: bulkPlayers.teamId,
          };
        });
    };

    const femalePlayers = parsePlayers(bulkPlayers.female, "F");
    const malePlayers = parsePlayers(bulkPlayers.male, "M");

    const allPlayers = [...femalePlayers, ...malePlayers];

    if (allPlayers.length === 0) {
      toast.error("Please enter at least one player");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/players/create", {
        method: "POST",
        body: JSON.stringify(allPlayers),
      });
      const data = (await response.json()) as APIMessageResponse;
      if (data.status === "success") {
        toast.success(data.message);
        setBulkPlayers({ teamId: "", female: "", male: "", captain: "" });
        await fetchPlayers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error creating players");
    } finally {
      setLoading(false);
    }
  };

  // Create a single player
  const handleCreateSinglePlayer = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !singlePlayer.firstName.trim() ||
      !singlePlayer.lastName.trim() ||
      !singlePlayer.teamId.trim()
    ) {
      toast.error("Please fill all required player fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/players/create", {
        method: "POST",
        body: JSON.stringify([singlePlayer]),
      });
      const data = (await response.json()) as APIMessageResponse;
      if (data.status === "success") {
        toast.success(data.message);
        setSinglePlayer({
          id: "",
          firstName: "",
          lastName: "",
          teamId: "",
          gender: "M",
          captain: false,
        });
        await fetchPlayers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error creating player");
    } finally {
      setLoading(false);
    }
  };

  const handleNewTeamChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setNewTeam((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBulkPlayersChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setBulkPlayers((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSinglePlayerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "captain") {
      setSinglePlayer((prev) => ({
        ...prev,
        captain: value === "true",
      }));
    } else {
      setSinglePlayer((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const teamOptions = icTeams.map((team) => (
    <option key={team.id} value={team.id}>
      {team.name}
    </option>
  ));

  if (status !== "authenticated") {
    return null;
  }

  return (
    <Layout>
      <AdminBreadcrumb currentPage="Players" />
      <div className="mx-auto max-w-7xl p-6">
        <h1 className="mb-6 text-2xl font-bold">Manage Players and IC Teams</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Create Team */}
          <section className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Create IC Team</h2>
            <form
              onSubmit={handleCreateTeam}
              className="flex flex-col space-y-3"
            >
              <input
                type="text"
                name="name"
                placeholder="Team Name"
                value={newTeam.name}
                onChange={handleNewTeamChange}
                className="form-input"
                required
                disabled={loading}
              />
              <select
                name="leagueId"
                value={newTeam.leagueId}
                onChange={handleNewTeamChange}
                className="form-select"
                disabled={loading}
              >
                {leagues.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
              <input
                type="url"
                name="url"
                placeholder="Team Website URL"
                value={newTeam.url}
                onChange={handleNewTeamChange}
                className="form-input"
                required
                disabled={loading}
              />
              <input
                type="url"
                name="photoUrl"
                placeholder="Team Photo URL"
                value={newTeam.photoUrl}
                onChange={handleNewTeamChange}
                className="form-input"
                required
                disabled={loading}
              />
              <Button type="submit" disabled={loading}>
                Create Team
              </Button>
            </form>
          </section>

          {/* Bulk Players */}
          <section className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Add Multiple Players</h2>
            <form
              onSubmit={handleCreatePlayersBulk}
              className="flex flex-col space-y-3"
            >
              <select
                name="teamId"
                value={bulkPlayers.teamId}
                onChange={handleBulkPlayersChange}
                className="form-select"
                required
                disabled={loading}
              >
                <option value="">Select Team</option>
                {teamOptions}
              </select>
              <textarea
                name="female"
                placeholder="Female Players (FirstName LastName, separated by commas)"
                value={bulkPlayers.female}
                onChange={handleBulkPlayersChange}
                className="form-textarea"
                disabled={loading}
              />
              <textarea
                name="male"
                placeholder="Male Players (FirstName LastName, separated by commas)"
                value={bulkPlayers.male}
                onChange={handleBulkPlayersChange}
                className="form-textarea"
                disabled={loading}
              />
              <input
                type="text"
                name="captain"
                placeholder="Captain full name (exactly as in the list)"
                value={bulkPlayers.captain}
                onChange={handleBulkPlayersChange}
                className="form-input"
                disabled={loading}
              />
              <Button type="submit" disabled={loading}>
                Add Players
              </Button>
            </form>
          </section>

          {/* Single Player */}
          <section className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Add Single Player</h2>
            <form
              onSubmit={handleCreateSinglePlayer}
              className="flex flex-col space-y-3"
            >
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={singlePlayer.firstName}
                onChange={handleSinglePlayerChange}
                className="form-input"
                required
                disabled={loading}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={singlePlayer.lastName}
                onChange={handleSinglePlayerChange}
                className="form-input"
                required
                disabled={loading}
              />
              <select
                name="teamId"
                value={singlePlayer.teamId}
                onChange={handleSinglePlayerChange}
                className="form-select"
                required
                disabled={loading}
              >
                <option value="">Select Team</option>
                {teamOptions}
              </select>
              <select
                name="gender"
                value={singlePlayer.gender}
                onChange={handleSinglePlayerChange}
                className="form-select"
                disabled={loading}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              <select
                name="captain"
                value={singlePlayer.captain ? "true" : "false"}
                onChange={handleSinglePlayerChange}
                className="form-select"
                disabled={loading}
              >
                <option value="false">Not Captain</option>
                <option value="true">Captain</option>
              </select>
              <Button type="submit" disabled={loading}>
                Add Player
              </Button>
            </form>
          </section>
        </div>

        {/* Delete All Players Button */}
        <div className="mt-8">
          <Button
            variant={confirmDelete ? "destructive" : "default"}
            onClick={deleteAllPlayers}
            disabled={loading}
          >
            {confirmDelete
              ? "Confirm Delete All Players"
              : "Delete All Players"}
          </Button>
        </div>

        {/* Data Tables */}
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

          <TabsContent value="teams" className="pt-4">
            <ICDatabaseTable columns={ICDatabaseColumns} data={icTeams} />
          </TabsContent>
          <TabsContent value="players" className="pt-4">
            <PlayerDatabaseTable
              columns={PlayerDatabaseColumns}
              data={players}
            />
          </TabsContent>
        </Tabs>

        <Toaster />
      </div>
    </Layout>
  );
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;

  return {
    props: {
      messages: messages.default,
    },
  };
}
export default Players;
