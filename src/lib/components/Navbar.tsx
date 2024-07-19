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
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const subTraining = [
    {
      name: t("adults"),
      href: "/training/adults",
      icon: <UserRoundPlus size="20px" />,
    },
    {
      name: t("juniors"),
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
      name: t("juniors"),
      href: "/competition/juniors",
      icon: <Award size="20px" />,
    },
    {
      name: t("tournament"),
      href: "/competition/tournament",
      icon: <Trophy size="20px" />,
    },
    {
      name: t("prevSeasons"),
      href: "/competition/previous_seasons",
      icon: <FileClock size="20px" />,
    },
  ];
  const subClub = [
    { name: t("contact"), href: "/club/contact", icon: <Mail size="20px" /> },
    { name: t("committee"), href: "/club/committee", icon: <Users size="20px" /> },
    {
      name: t("history"),
      href: "/club/history",
      icon: <History size="20px" />,
    },
    {
      name: t("documents"),
      href: "/club/documents",
      icon: <Folder size="20px" />,
    },
    {
      name: t("links"),
      href: "/club/links",
      icon: <Link2 size="20px" />,
    },
    {
      name: t("court"),
      href: "/#salle",
      icon: <MapPinned size="20px" />,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const { locale, locales, asPath } = useRouter();
  const otherLocale = locales?.find((cur) => cur !== locale);

  return (
    <>
      <nav className="flex w-full flex-1 justify-end lg:max-w-7xl">
        <div
          className={`${isOpen ? "" : "hidden lg:flex"} mt-4 flex basis-full flex-col place-items-start lg:ml-16 lg:mt-0 lg:w-full lg:flex-row lg:justify-between`}
        >
          <NavLinks name={t("home")} href="/" onClick={() => setIsOpen(false)} />
          <DropdownNavLink
            triggerElement={t("training")}
            options={subTraining}
            onClick={() => setIsOpen(false)}
          />
          <DropdownNavLink
            triggerElement={t("competition")}
            options={subCompetition}
            onClick={() => setIsOpen(false)}
          />
          <DropdownNavLink
            triggerElement="Club"
            options={subClub}
            onClick={() => setIsOpen(false)}
          />
          <NavLinks
            name={t("calendar")}
            href="/calendar"
            onClick={() => setIsOpen(false)}
          />
          <NavLinks
            name="Galerie"
            href="/gallery"
            onClick={() => setIsOpen(false)}
          />
          <NavLinks
            name={t("sponsors")}
            href="/sponsors"
            onClick={() => setIsOpen(false)}
          />
          <Link
            className="text-1xl mt-2 rounded bg-gray-200 p-2 text-center text-black transition-all delay-75 duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-picton-blue-600 hover:to-picton-blue-500 hover:font-bold hover:text-white  lg:m-0 lg:self-center"
            href="/member"
            onClick={() => setIsOpen(false)}
          >
            {t("member")}
          </Link>
          <Link
            className="ml-2 mt-4 flex hover:text-picton-blue-500 lg:m-0 lg:self-center"
            href={asPath}
            locale={otherLocale}
            onClick={() => setIsOpen(false)}
          >
            <Globe size="20px" />
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
