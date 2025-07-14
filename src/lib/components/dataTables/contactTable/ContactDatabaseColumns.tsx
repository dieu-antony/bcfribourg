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

export type ContactDatabaseColumnsProps = {
  id: string;
  name: string;
  phone: string;
  position: string;
};

export const ContactDatabaseColumns: ColumnDef<ContactDatabaseColumnsProps>[] =
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
      accessorKey: "position",
      header: "Role",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const original = row.original;
        async function deleteContact() {
          const response = await fetch("/api/contact", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: original.id }),
          });

          if (response.status === 204) {
            toast.success("Contact deleted successfully.");
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
                    deleteContact as unknown as React.MouseEventHandler<HTMLDivElement>
                  }
                >
                  Delete Contact
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit Contact (Soon)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Toaster richColors />
          </>
        );
      },
    },
  ];
