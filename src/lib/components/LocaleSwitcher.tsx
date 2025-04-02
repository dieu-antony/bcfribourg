"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { Globe } from "lucide-react";
import React, { useState, useRef } from "react";

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
          <span className="hidden text-lg sm:inline">
            {language[locale!]}
          </span>
        </>
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 flex min-w-[4rem] max-w-[12rem] translate-x-[0]
            translate-y-[25%] flex-col bg-white px-2 py-1 text-sm shadow-md
            lg:-translate-x-1/4 lg:translate-y-[75%]
          `}
        >
          {locales?.map((loc) => (
            <Link
              key={loc}
              href={asPath}
              locale={loc}
              className={`p-1 hover:text-picton-blue-500 ${
                loc === locale ? "font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {languageNames[loc] ?? loc.toUpperCase()}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocaleSwitcher;
