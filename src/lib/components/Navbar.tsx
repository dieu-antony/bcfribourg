import { useState } from "react";
import Link from "next/link";
import DropdownNavLink from "./DropdownNavLink";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const subTraining = ["Adultes", "Juniors"];
  const subCompetition = ["Interclubs", "Circuit Junior", "Coupe l'Avenir", "Tournois SB"];
  const subClub = ["Comité", "Documents"];
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex w-1/2 max-w-6xl flex-1 justify-end">
        <div className="ml-16 hidden w-full justify-between pr-12 transition-all duration-500 ease-out lg:flex">
          <NavLinks name="Accueil" href="/" />
          <DropdownNavLink
            triggerElement={<NavLinks name="Entraînment" href="/training" />}
            children={subTraining}
          />
          <NavLinks name="Compétition" href="/competition" />
          <NavLinks name="Club" href="/club" />
          <NavLinks name="Calendrier" href="/calendar" />
          <NavLinks name="Liens" href="/links" />
          <Link
            className="text-1xl mt-2 rounded bg-gray-300 p-2 text-center text-black transition-all delay-75 duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-picton-blue-600 hover:to-picton-blue-500  lg:m-0 lg:self-center"
            href="/links"
          >
            Devenir membre
          </Link>
        </div>
        <div className="lg:hidden">
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
      {isOpen && (
        <div className="flex basis-full flex-col place-items-start lg:hidden">
          <NavLinks name="Accueil" href="/" />
          <DropdownNavLink
            triggerElement={<NavLinks name="Entraînment" href="/training" />}
            children={subTraining}
          />
          <NavLinks name="Compétition" href="/competition" />
          <NavLinks name="Club" href="/club" />
          <NavLinks name="Calendrier" href="/calendar" />
          <NavLinks name="Liens" href="/links" />
          <Link
            className="text-1xl mt-2 rounded bg-gray-300 p-2 text-center text-black transition-all delay-75 duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-picton-blue-600 hover:to-picton-blue-500  lg:m-0 lg:self-center"
            href="/links"
          >
            Devenir membre
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
