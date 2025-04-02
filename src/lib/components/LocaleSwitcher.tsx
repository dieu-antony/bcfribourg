import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Globe } from "lucide-react";

const languageNames: Record<string, string> = {
  "fr-CH": "Français",
  "de-CH": "Deutsch",
  "en-US": "English",
};

const LocaleSwitcher = () => {
  const { locale, locales, asPath } = useRouter();
  const [open, setOpen] = useState(false);

  if (!locales || locales.length <= 1) return null;

  return (
    <div className="relative ml-4 mt-4 lg:m-0 lg:self-center">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center hover:text-picton-blue-500"
        aria-label="Switch language"
      >
        <Globe size={22} />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 flex min-w-[100px] flex-col rounded-md border bg-white p-2 text-sm shadow-md">
          {locales.map((loc) => (
            <Link
              key={loc}
              href={asPath}
              locale={loc}
              className={`hover:text-picton-blue-600 px-2 py-1 rounded ${
                loc === locale ? "font-bold" : ""
              }`}
              onClick={() => setOpen(false)}
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