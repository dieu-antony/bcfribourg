import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { inter } from "./Layout";

type AdminBreadcrumbProps = {
  currentPage: string;
};

function AdminBreadcrumb({ currentPage }: AdminBreadcrumbProps) {
  const MENU = [
    { label: "IC Data", href: "/admin/icdata" },
    { label: "Players", href: "/admin/players" },
    { label: "Calendar", href: "/admin/calendar" },
    { label: "Trainings", href: "/admin/trainings" },
    { label: "Contacts", href: "/admin/contacts" },
    { label: "Junior Competitions", href: "/admin/junior-competitions" },
    { label: "Sponsors", href: "/admin/sponsors" },
    { label: "Committee", href: "/admin/committee" },
    { label: "History", href: "/admin/history" },
  ];
  return (
    <Breadcrumb className="m-2 p-2 pl-3 mt-[120px] fixed bg-slate-500 rounded">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin" className="text-white hover:text-gray-300">Admin</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-white"/>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-white hover:text-gray-300">
              {currentPage}
              <ChevronDownIcon className="text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className={`font-sans ${inter.variable}`}
            >
              {MENU.filter((item) => item.label !== currentPage).map((item) => (
                <DropdownMenuItem key={item.label}>
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default AdminBreadcrumb;
