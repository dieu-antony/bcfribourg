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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/lib/components/ui/dropdown-menu";
import type { DateTime } from "schema-dts";
import type { APIMessageResponse } from "~/lib/types";

export type JuniorCompDatabaseColumnsProps = {
  id: string;
  type: string;
  location: string;
  date: DateTime;
};

export const JuniorCompDatabaseColumns: ColumnDef<JuniorCompDatabaseColumnsProps>[] =
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const original = row.original;
        async function deleteCompetition() {
          const response = await fetch("/api/juniorComp", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: original.id }),
          });

          if (response.status === 204) {
            toast.success("Competition deleted successfully.");
            return;
          }

          try {
            const data = await response.json() as APIMessageResponse;
            toast.error(data.message ?? "An error occurred.");
          } catch (err) {
            toast.error("Failed to parse server response.");
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
                    deleteCompetition as unknown as React.MouseEventHandler<HTMLDivElement>
                  }
                >
                  Delete Competition
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit Competition (Soon)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Toaster richColors />
          </>
        );
      },
    },
  ];
