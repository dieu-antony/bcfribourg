"use client";
import { useCookieContext } from "../cookies/CookieContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { inter } from "~/pages/_app";
import { useTranslations } from "next-intl";

const COOKIE_KEY = "cookie_preferences";

type CookiePreferences = {
  analytics: boolean;
};

interface Props {
  onConsentChange: (prefs: CookiePreferences) => void;
}

export default function CookiesBanner({ onConsentChange }: Props) {
  const { prefs, setPrefs, bannerOpen, setBannerOpen } = useCookieContext();

  const [sheetOpen, setSheetOpen] = useState(false);
  const t = useTranslations("Cookie");

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      setBannerOpen(true);
    } else {
      const parsed = JSON.parse(stored) as CookiePreferences;
      setPrefs(parsed);
      onConsentChange(parsed);
    }
  }, [onConsentChange, setBannerOpen, setPrefs]);

  const save = (updated: CookiePreferences) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(updated));
    setPrefs(updated);
    setBannerOpen(false);
    setSheetOpen(false);
  };

  const acceptAll = () => save({ analytics: true });
  const rejectAll = () => save({ analytics: false });

  return bannerOpen ? (
    <div className="fixed bottom-4 z-50 flex w-full justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`w-full max-w-xl rounded-xl border bg-white p-4 shadow-xl md:p-6 ${inter.variable} font-sans`}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-800">
            {t.rich("description", {
              privacy: (chunks) => (
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-picton-blue-600"
                >
                  {chunks}
                </a>
              ),
              terms: (chunks) => (
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-picton-blue-600"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>

          <div className="flex flex-wrap justify-end gap-2">
            <Button
              size="sm"
              className="bg-picton-blue-600 text-white hover:bg-picton-blue-700"
              onClick={acceptAll}
            >
              {t("acceptAll")}
            </Button>
            <Button
              size="sm"
              className="bg-gray-800 text-white hover:bg-black"
              onClick={rejectAll}
            >
              {t("rejectAll")}
            </Button>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border border-gray-300 text-black"
                >
                  {t("settings")}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className={`${inter.variable} max-h-[80vh] overflow-y-auto p-6 font-sans`}
              >
                <SheetHeader>
                  <SheetTitle className="text-base">
                    {t("settingsTitle")}
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  <div>
                    <Label className="text-sm font-medium">
                      {t("essential")}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t("essentialDescription")}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="analytics">{t("analytics")}</Label>
                    <Switch
                      id="analytics"
                      checked={prefs.analytics}
                      onCheckedChange={(checked) =>
                        setPrefs({ ...prefs, analytics: checked })
                      }
                      className="data-[state=checked]:bg-picton-blue-600 data-[state=unchecked]:bg-gray-200"
                    />
                  </div>

                  <div className="flex justify-end gap-2 border-t pt-4">
                    <Button variant="ghost" onClick={() => setSheetOpen(false)}>
                      {t("cancel")}
                    </Button>
                    <Button onClick={() => save(prefs)}>{t("save")}</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </div>
  ) : null;
}
