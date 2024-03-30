"use client";
import { useState } from "react";
import Link from "next/link";
import DropdownNavLink from "./DropdownNavLink";
import NavLinks from "./NavLink";

const Navbar = () => {
  const subTraining = [
    {
      name: "Adultes",
      href: "/training/adultes",
      icon: "court.svg",
    },
    { name: "Juniors", href: "/training/juniors", icon: "court.svg" },
  ];
  const subCompetition = [
    { name: "Interclubs", href: "/competition/interclubs", icon: "switzerland.svg" },
    {
      name: "Circuit Junior",
      href: "/competition/circuit_junior",
      icon: "shuttleIcon.svg",
    },
    { name: "Coupe l'Avenir", href: "/competition/coupe_avenir", icon: "trophy.svg" },
    { name: "Tournois SB", href: "/competition/tournois", icon: "tournament.svg" },
  ];
  const subClub = [
    { name: "Comité", href: "/club/comite", icon: "comittee.svg" },
    { name: "Documents", href: "/club/documents", icon: "document.svg" },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex w-1/2 max-w-6xl flex-1 justify-end">
        <div
          className={`${isOpen ? "" : "hidden lg:flex"} flex basis-full flex-col place-items-start lg:ml-16 lg:w-full lg:flex-row lg:justify-between lg:pr-12`}
        >
          <NavLinks name="Accueil" href="/" />
          <DropdownNavLink
            triggerElement="Entraînment"
            children={subTraining}
          />
          <DropdownNavLink
            triggerElement="Compétition"
            children={subCompetition}
          />
          <DropdownNavLink triggerElement="Club" children={subClub} />

          <NavLinks name="Calendrier" href="/calendar" />
          <NavLinks name="Liens" href="/links" />
          <Link
            className="text-1xl mt-2 rounded bg-gray-300 p-2 text-center text-black transition-all delay-75 duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-picton-blue-600 hover:to-picton-blue-500  lg:m-0 lg:self-center"
            href="/contact"
          >
            Devenir membre
          </Link>
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
