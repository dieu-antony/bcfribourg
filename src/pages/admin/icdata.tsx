import { ChevronDownIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { type FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
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
import { Toaster } from "~/lib/components/ui/sonner";
import type { PastTeam } from "~/lib/types";
import { inter } from "../_app";

const IcData = () => {
  const [teams, setTeams] = useState<PastTeam[]>([]);
  const [loading, setLoading] = useState(false);

  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);

  async function onTeamFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setTeams([]);
    const file = e.target.files?.[0];
    console.log(file);
    if (!file) return;

    setLoading(true);
    const toastId = toast.loading("Uploading teams...");

    const reader = new FileReader();

    reader.addEventListener("load", async function () {
      const parsedTeams: PastTeam[] = await file
        .text()
        .then((text: string) => JSON.parse(text));
      setTeams((prev) => [...prev, ...parsedTeams]);
      setLoading(false);
      toast.dismiss(toastId);
      toast.success("Teams uploaded successfully");
    });
    reader.readAsText(file);
  }

  async function onTeamSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (teams.length === 0) return;

    const response = await fetch("/api/pastTeams/create", {
      method: "POST",
      body: JSON.stringify(teams),
    });
    const data: {status: "success" | "error" | "loading", message: string} = await response.json();
    if (data.status === "success") {
      toast.success(data.message);
    }
    if (data.status === "error") {
      toast.error(data.message);
    }
  }

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
                    IC Data
                  <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className={`font-sans ${inter.variable}`}
                >
                  <DropdownMenuItem>
                    <BreadcrumbLink href="/admin/icdata">IC Data</BreadcrumbLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BreadcrumbLink href="/admin/players">Players</BreadcrumbLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BreadcrumbLink href="/admin/calendar">Calendar</BreadcrumbLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-6 flex flex-col items-center justify-center gap-2">
          <div className="container">
            <h2 className="text-xl">Upload Team Interclub Data (JSON file)</h2>
            <form onSubmit={onTeamSubmit}>
              <input
                type="file"
                onChange={onTeamFileUpload}
                accept=".json"
                className="m-1 block w-full rounded-sm border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:max-w-xs sm:text-sm sm:leading-6"
                required
              />
              <input
                type="submit"
                value="Submit"
                className="m-1 rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:cursor-not-allowed"
                disabled={loading}
              />
            </form>
          </div>
          <Toaster richColors />
        </div>
      </>
    );
  }
};

export default IcData;
