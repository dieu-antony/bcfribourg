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

export type DatabaseColumnsProps = {
  id: string;
  eventType: string;
  summary: string;
  location: number;
  url: string;
  email: string;
  start: Date;
};

export const DatabaseColumns: ColumnDef<DatabaseColumnsProps>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "eventType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "summary",
    header: "Summary/Title",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "start",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time/Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const original = row.original;
      async function deleteEvent() {
        const events = [original];

        const response = await fetch("/api/events/delete", {
          method: "POST",
          body: JSON.stringify(events),
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
                  deleteEvent as unknown as React.MouseEventHandler<HTMLDivElement>
                }
              >
                Delete Event
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Event (Soon)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Toaster richColors />
        </>
      );
    },
  },
];
