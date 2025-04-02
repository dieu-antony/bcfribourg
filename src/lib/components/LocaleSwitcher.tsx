import Link from "next/link";
import { useRouter } from "next/router";
import { Globe } from "lucide-react";
import React, { useState } from "react";

const languageNames: Record<string, string> = {
  "fr-CH": "Français",
  "de-CH": "Deutsch",
  "en-US": "English",
};

const LocaleSwitcher = () => {
  const { locale, locales, asPath } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className="relative flex flex-col justify-start lg:justify-center lg:self-center"
      onMouseEnter={() => {
        if (window.innerWidth >= 1024) setIsOpen(true);
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 1024) setTimeout(() => setIsOpen(false), 750);
      }}
      onClick={toggle}
    >
      <button
        className="mt-2 flex cursor-pointer items-center text-black lg:self-center"
        aria-label="Change language"
      >
        <Globe size={20} />
      </button>

      {isOpen && (
        <div className="relative left-0 z-50 flex min-w-[8rem] max-w-[75vw] flex-col rounded-md bg-white py-1 px-2 text-sm shadow-md lg:absolute lg:top-full">
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