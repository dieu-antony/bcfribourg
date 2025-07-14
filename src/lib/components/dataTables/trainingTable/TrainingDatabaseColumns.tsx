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
import type { APIMessageResponse } from "~/lib/types";

export type TrainingDatabaseColumnsProps = {
  id: string;
  day: string;
  time: string;
  target: string;
  trainer: string;
  type: string;
};

export const TrainingDatabaseColumns: ColumnDef<TrainingDatabaseColumnsProps>[] =
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "day",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Day
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "time",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "target",
      header: "Target",
    },
    {
      accessorKey: "trainer",
      header: "Trainer",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const original = row.original;
        async function deleteTraining() {
          const response = await fetch("/api/trainings", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: original.id }),
          });

          if (response.status === 204) {
            toast.success("Training deleted successfully.");
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
                    deleteTraining as unknown as React.MouseEventHandler<HTMLDivElement>
                  }
                >
                  Delete Training
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit Training (Soon)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Toaster richColors />
          </>
        );
      },
    },
  ];
