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

export type CommitteeDatabaseColumnsProps = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  role2: string | null;
  photoUrl: string;
};

export const CommitteeDatabaseColumns: ColumnDef<CommitteeDatabaseColumnsProps>[] =
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
      accessorKey: "phone",
      header: "Phone number",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    { accessorKey: "role", header: "Role" },
    {
      accessorKey: "role2",
      header: "Role 2",
    },
    {
      accessorKey: "photoUrl",
      header: "Photo",
      cell: ({ row }) => {
        const original = row.original;
        return (
          <Image
            src={original.photoUrl}
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
        async function deleteMember() {
          const response = await fetch(`/api/committeeMember/${original.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: original.id }),
          });

          if (response.status === 204) {
            toast.success("Committee member deleted successfully.");
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
                    deleteMember as unknown as React.MouseEventHandler<HTMLDivElement>
                  }
                >
                  Delete Member
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit Member (Soon)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Toaster richColors />
          </>
        );
      },
    },
  ];
