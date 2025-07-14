import { useState } from "react";
import Link from "next/link";
import DropdownNavLink from "./DropdownNavLink";
import NavLinks from "./NavLink";
import LocaleSwitcher from "./LocaleSwitcher";
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
} from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);

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
    {
      name: t("committee"),
      href: "/club/committee",
      icon: <Users size="20px" />,
    },
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
    { name: t("links"), href: "/club/links", icon: <Link2 size="20px" /> },
    { name: t("court"), href: "/#salle", icon: <MapPinned size="20px" /> },
  ];

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex w-full flex-1 justify-end px-8 lg:max-w-7xl">
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mt-4 flex basis-full flex-col place-items-start overflow-hidden lg:hidden"
            >
              <Separator className="mt-2 bg-gray-200" />
              <NavLinks
                name={t("home")}
                href="/"
                onClick={() => setIsOpen(false)}
              />
              <Separator className="mt-2 bg-gray-200 lg:hidden" />
              <DropdownNavLink
                triggerElement={t("training")}
                options={subTraining}
                onClick={() => setIsOpen(false)}
              />
              <Separator className="mt-2 bg-gray-200" />
              <DropdownNavLink
                triggerElement={t("competition")}
                options={subCompetition}
                onClick={() => setIsOpen(false)}
              />
              <Separator className="mt-2 bg-gray-200" />
              <DropdownNavLink
                triggerElement="Club"
                options={subClub}
                onClick={() => setIsOpen(false)}
              />
              <Separator className="mt-2 bg-gray-200" />
              <NavLinks
                name={t("calendar")}
                href="/calendar"
                onClick={() => setIsOpen(false)}
              />
              <Separator className="mt-2 bg-gray-200" />
              <NavLinks
                name={t("gallery")}
                href="/gallery"
                onClick={() => setIsOpen(false)}
              />
              <Separator className="mt-2 bg-gray-200" />
              <NavLinks
                name={t("sponsors")}
                href="/sponsors"
                onClick={() => setIsOpen(false)}
              />
              <Link
                className="text-1xl mt-2 rounded bg-gradient-to-r from-picton-blue-600 to-picton-blue-500 p-2 text-center font-bold text-white transition-all delay-75 duration-300 lg:ease-in-out lg:hover:scale-105"
                href="/member"
                onClick={() => setIsOpen(false)}
              >
                {t("member")}
              </Link>
              <LocaleSwitcher />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`hidden lg:flex mt-4 basis-full flex-col place-items-start lg:ml-16 lg:mt-0 lg:w-full lg:flex-row lg:justify-between`}
        >
          <NavLinks
            name={t("home")}
            href="/"
            onClick={() => setIsOpen(false)}
          />
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
            name={t("gallery")}
            href="/gallery"
            onClick={() => setIsOpen(false)}
          />
          <NavLinks
            name={t("sponsors")}
            href="/sponsors"
            onClick={() => setIsOpen(false)}
          />
          <Link
            className="text-1xl text-centertransition-all mt-2 rounded bg-gradient-to-r from-picton-blue-600 to-picton-blue-500 p-2 font-bold text-white delay-75 duration-300 ease-in-out hover:scale-105 lg:m-0 lg:self-center"
            href="/member"
            onClick={() => setIsOpen(false)}
          >
            {t("member")}
          </Link>
          <LocaleSwitcher />
        </div>
        {/* Burger Menu Button for Mobile */}
        <div className="absolute right-8 top-11 lg:hidden">
          <button onClick={toggleNavbar}>
            <span
              className={`mb-1 block h-0.5 w-7 rounded-sm bg-picton-blue-500
                transition-all duration-300 ease-out ${
                  isOpen ? "translate-y-1.5 rotate-45 transform" : ""
                }`}
            ></span>
            <span
              className={`my-0.5 mb-1 block h-0.5 w-7 rounded-sm bg-picton-blue-500
                transition-all duration-300 ease-out ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
            ></span>
            <span
              className={`mt-1 block h-0.5 w-7 rounded-sm bg-picton-blue-500
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
