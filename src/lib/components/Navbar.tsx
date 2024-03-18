import { useState } from "react";
import Link from "next/link";
import DropdownNavLink from "./DropdownNavLink";

const NavLinks = () => {
  const trainingsubmenu = ["Pizza", "Burger"];
  return (
    <>
      <Link
        className="text-1xl relative mt-2 text-center text-black after:absolute after:bottom-[0] after:left-[0] after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:rounded after:bg-picton-blue-500 after:transition-transform after:duration-200 after:ease-in-out after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-100 lg:m-0 lg:self-center"
        href="/"
      >
        Accueil
      </Link>

      <DropdownNavLink
        triggerElement={
          <Link
            className="text-1xl relative mt-2 text-center text-black after:absolute after:bottom-[0] after:left-[0] after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:rounded after:bg-picton-blue-500 after:transition-transform after:duration-200 after:ease-in-out after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-100 lg:m-0 lg:self-center"
            href="/training"
          >
            Entraînment
          </Link>
        }
        children={trainingsubmenu}
      />
      <Link
        className="text-1xl relative mt-2 text-center text-black after:absolute after:bottom-[0] after:left-[0] after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:rounded after:bg-picton-blue-500 after:transition-transform after:duration-200 after:ease-in-out after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-100 lg:m-0 lg:self-center"
        href="/competition"
      >
        Compétition
      </Link>
      <Link
        className="text-1xl relative mt-2 text-center text-black after:absolute after:bottom-[0] after:left-[0] after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:rounded after:bg-picton-blue-500 after:transition-transform after:duration-200 after:ease-in-out after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-100 lg:m-0 lg:self-center"
        href="/club"
      >
        Club
      </Link>
      <Link
        className="text-1xl relative mt-2 text-center  text-black after:absolute after:bottom-[0] after:left-[0] after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:rounded after:bg-picton-blue-500 after:transition-transform after:duration-200 after:ease-in-out after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-100 lg:m-0 lg:self-center"
        href="/contact"
      >
        Calendrier
      </Link>
      <Link
        className="text-1xl relative mt-2 text-center text-black after:absolute after:bottom-[0] after:left-[0] after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:rounded after:bg-picton-blue-500 after:transition-transform after:duration-200 after:ease-in-out after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-100 lg:m-0 lg:self-center"
        href="/links"
      >
        Liens
      </Link>
      <Link
        className="text-1xl mt-2 rounded bg-gray-300 p-2 text-center text-black transition-all delay-75 duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-picton-blue-600 hover:to-picton-blue-500  lg:m-0 lg:self-center"
        href="/links"
      >
        Devenir membre
      </Link>
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex w-1/2 max-w-6xl flex-1 justify-end">
        <div className="ml-16 hidden w-full justify-between pr-12 transition-all duration-500 ease-out lg:flex">
          <NavLinks />
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
          <NavLinks />
        </div>
      )}
    </>
  );
};

export default Navbar;
