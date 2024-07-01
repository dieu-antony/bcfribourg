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

export type PlayerDatabaseColumnsProps = {
  id: string;
  firstName: string;
  lastName: string;
  team: string;
  captain: string; 
  gender: string;
};

export const PlayerDatabaseColumns: ColumnDef<PlayerDatabaseColumnsProps>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "team",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Team
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "captain",
    header: "Captain",
  },
  {
    accessorKey: "gender",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gender
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const original = row.original;
      async function deletePlayer() {
        const players = [original];

        const response = await fetch("/api/players/delete", {
          method: "POST",
          body: JSON.stringify(players),
        });
        const data: {
          status: "success" | "error" | "loading";
          message: string;
        } = await response.json();
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
                  deletePlayer as unknown as React.MouseEventHandler<HTMLDivElement>
                }
              >
                Delete Player
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Toaster richColors />
        </>
      );
    },
  },
];
