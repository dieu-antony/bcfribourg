import type { ColumnDef } from "@tanstack/react-table";
import { inter } from "~/pages/_app";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Toaster } from "~/lib/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "~/lib/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/lib/components/ui/dropdown-menu";
import type { APIMessageResponse } from "~/lib/types";

export type ICDatabaseColumnsProps = {
  id: string;
  league: string;
  name: string;
  url: string;
};

export const ICDatabaseColumns: ColumnDef<ICDatabaseColumnsProps>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "league",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          League
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const original = row.original;
      async function deleteTeam() {
        const teams = [original];

        const response = await fetch("/api/icTeams/delete", {
          method: "POST",
          body: JSON.stringify(teams),
        });
        const data = await response.json() as APIMessageResponse;
        if (data.status === "success") {
          toast.success(data.message);
        }
        if (data.status === "error") {
          toast.error(data.message);
        }
      }
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className={`font-sans ${inter.variable}`}
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={
                  deleteTeam as unknown as React.MouseEventHandler<HTMLDivElement>
                }
              >
                Delete Team
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Toaster richColors />
        </>
      );
    },
  },
];
