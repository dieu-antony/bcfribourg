import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type CookiePreferences = {
  analytics: boolean;
};

type CookieContextType = {
  prefs: CookiePreferences;
  setPrefs: (p: CookiePreferences) => void;
  openBanner: () => void;
  bannerOpen: boolean;
  setBannerOpen: (b: boolean) => void;
};

const CookieContext = createContext<CookieContextType | null>(null);

export function useCookieContext() {
  const ctx = useContext(CookieContext);
  if (!ctx) throw new Error("useCookieContext must be used inside CookieProvider");
  return ctx;
}

export function CookieProvider({ children }: { children: ReactNode }) {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({ analytics: true });

  const openBanner = () => setBannerOpen(true);

  useEffect(() => {
    const stored = localStorage.getItem("cookie_preferences");
    if (stored) {
      const parsed = JSON.parse(stored) as CookiePreferences;
      setPrefs(parsed);
    }
  }, []);

  return (
    <CookieContext.Provider
      value={{ prefs, setPrefs, bannerOpen, setBannerOpen, openBanner }}
    >
      {children}
    </CookieContext.Provider>
  );
}