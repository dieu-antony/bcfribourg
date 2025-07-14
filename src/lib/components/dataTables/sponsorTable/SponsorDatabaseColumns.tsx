import type { ColumnDef } from "@tanstack/react-table";
import { inter } from "~/pages/_app";
import { MoreHorizontal } from "lucide-react";
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
import Image from "next/image";

export type SponsorDatabaseColumnsProps = {
  id: string;
  name: string;
  logoUrl: string;
  link: string;
  tier: number;
};

export const SponsorDatabaseColumns: ColumnDef<SponsorDatabaseColumnsProps>[] =
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "link",
      header: "Link",
    },
    {
      accessorKey: "tier",
      header: "Tier",
      cell: ({ getValue }) => {
        const tier = getValue<number>();
        switch (tier) {
          case 1:
            return "🥇 Or";
          case 2:
            return "🥈 Argent";
          case 3:
            return "🥉 Bronze";
          default:
            return `Tier ${tier}`;
        }
      },
    },

    {
      accessorKey: "logoUrl",
      header: "Logo",
      cell: ({ row }) => {
        const original = row.original;
        return (
          <Image
            src={original.logoUrl}
            alt={original.name}
            className="h-10 w-10 rounded-full"
            width={40}
            height={40}
          />
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const original = row.original;
        async function deleteSponsor() {
          const response = await fetch(`/api/sponsors`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: original.id }),
          });

          if (response.status === 204) {
            toast.success("Sponsor deleted successfully.");
            return;
          }

          try {
            const data = (await response.json()) as APIMessageResponse;
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
                    deleteSponsor as unknown as React.MouseEventHandler<HTMLDivElement>
                  }
                >
                  Delete Sponsor
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit Sponsor (Soon)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Toaster richColors />
          </>
        );
      },
    },
  ];
