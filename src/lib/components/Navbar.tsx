"use client";
import { useState } from "react";
import Link from "next/link";
import DropdownNavLink from "./DropdownNavLink";
import NavLinks from "./NavLink";
import {
  Handshake,
  Award,
  Trophy,
  History,
  FileClock,
  Mail,
  Users,
  Folder,
  UserRoundCog,
  UserRoundPlus,
  Link2,
  MapPinned,
  Globe,
} from "lucide-react";

const Navbar = () => {
  const subTraining = [
    {
      name: "Adultes",
      href: "/training/adultes",
      icon: <UserRoundPlus size="20px" />,
    },
    {
      name: "Juniors",
      href: "/training/juniors",
      icon: <UserRoundCog size="20px" />,
    },
  ];
  const subCompetition = [
    {
      name: "Interclubs",
      href: "/competition/interclubs",
      icon: <Handshake size="20px" />,
    },
    {
      name: "Juniors",
      href: "/competition/juniors",
      icon: <Award size="20px" />,
    },
    {
      name: "Tournois SB",
      href: "/competition/tournament",
      icon: <Trophy size="20px" />,
    },
    {
      name: "Saisons précédentes",
      href: "/competition/previous_seasons",
      icon: <FileClock size="20px" />,
    },
  ];
  const subClub = [
    { name: "Contact", href: "/club/contact", icon: <Mail size="20px" /> },
    { name: "Comité", href: "/club/committee", icon: <Users size="20px" /> },
    {
      name: "Historique",
      href: "/club/history",
      icon: <History size="20px" />,
    },
    {
      name: "Documents",
      href: "/club/documents",
      icon: <Folder size="20px" />,
    },
    {
      name: "Liens",
      href: "/club/links",
      icon: <Link2 size="20px" />,
    },
    {
      name: "Salle",
      href: "/#salle",
      icon: <MapPinned size="20px" />,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex lg:max-w-7xl w-full flex-1 justify-end">
        <div
          className={`${isOpen ? "" : "hidden lg:flex"} mt-4 flex basis-full flex-col place-items-start lg:ml-16 lg:mt-0 lg:w-full lg:flex-row lg:justify-between`}
        >
          <NavLinks name="Accueil" href="/" onClick={() => setIsOpen(false)} />
          <DropdownNavLink
            triggerElement="Entraînement"
            options={subTraining}
            onClick={() => setIsOpen(false)}
          />
          <DropdownNavLink
            triggerElement="Compétition"
            options={subCompetition}
            onClick={() => setIsOpen(false)}
          />
          <DropdownNavLink
            triggerElement="Club"
            options={subClub}
            onClick={() => setIsOpen(false)}
          />
          <NavLinks
            name="Calendrier"
            href="/calendar"
            onClick={() => setIsOpen(false)}
          />
          <NavLinks
            name="Galerie"
            href="/gallery"
            onClick={() => setIsOpen(false)}
          />
          <NavLinks
            name="Sponsors"
            href="/sponsors"
            onClick={() => setIsOpen(false)}
          />
          <Link
            className="text-1xl mt-2 rounded bg-gray-200 p-2 text-center text-black transition-all delay-75 duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-picton-blue-600 hover:to-picton-blue-500 hover:font-bold hover:text-white  lg:m-0 lg:self-center"
            href="/member"
            onClick={() => setIsOpen(false)}
          >
            Devenir membre
          </Link>
          <button className="lg:self-center flex mt-4 ml-2 lg:m-0 hover:text-picton-blue-500">
            <Globe size="20px" />
          </button>
        </div>
        <div className="absolute right-8 top-11 lg:hidden">
          <button onClick={toggleNavbar}>
            <span
              className={`mb-1 block h-0.5 w-7 rounded-sm bg-black
                      transition-all duration-300 ease-out ${
                        isOpen ? "translate-y-1.5 rotate-45 transform" : ""
                      }`}
            ></span>
            <span
              className={`my-0.5 mb-1 block h-0.5 w-7 rounded-sm bg-black
                      transition-all duration-300 ease-out ${
                        isOpen ? "opacity-0" : "opacity-100"
                      }`}
            ></span>
            <span
              className={`mt-1 block h-0.5 w-7 rounded-sm bg-black
                      transition-all duration-300 ease-out ${
                        isOpen ? "-translate-y-1.5 -rotate-45 transform" : ""
                      }`}
            ></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
