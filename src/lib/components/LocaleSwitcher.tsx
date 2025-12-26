"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { Globe } from "lucide-react";
import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const languageNames: Record<string, string> = {
  "fr-CH": "Français",
  "de-CH": "Deutsch",
  "en-US": "English",
};

const LocaleSwitcher = () => {
  const { locale, locales, asPath } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggle = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      timeoutRef.current = setTimeout(() => setIsOpen(false), 750);
    }
  };

  const language: Record<string, string> = {
    "fr-CH": "FR",
    "de-CH": "DE",
    "en-US": "EN",
  };

  return (
    <div
      className="relative flex flex-col justify-start lg:justify-center lg:self-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggle}
    >
      <button
        className={`mt-2 flex cursor-pointer items-center text-black hover:text-picton-blue-500 focus:text-picton-blue-500 ${
          isOpen ? "text-picton-blue-500" : ""
        }`}
        aria-label="Change language"
      >
        <>
          <Globe size={20} className="mr-2" />
          <span className="text-lg">{language[locale!]}</span>
        </>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="locale-dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed z-50 mt-12 flex min-w-[4rem] max-w-[12rem] -translate-y-[10%] translate-x-[0] flex-col
        overflow-hidden bg-white px-2 py-1 text-sm shadow-md lg:fixed lg:mt-2
        lg:-translate-x-1/4 lg:translate-y-[75%]
      `}
          >
            {locales?.map((loc) => (
              <Link
                key={loc}
                href={asPath}
                locale={loc}
                className={`p-1 text-black hover:text-picton-blue-500 ${
                  loc === locale ? "font-bold" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {languageNames[loc] ?? loc.toUpperCase()}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocaleSwitcher;
