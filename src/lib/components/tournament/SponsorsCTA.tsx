import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { CURRENT } from "~/lib/editions";

export default function SponsorCta() {
  const t = useTranslations("BolzesTournament");

  return (
    <div className="relative mb-16 overflow-hidden rounded-2xl bg-[#166081] p-8 text-white shadow-xl sm:p-12">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#00afef]/30 blur-3xl" />
      <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h3 className="text-2xl font-bold sm:text-3xl">
            {t("sponsorCta.title")}
          </h3>
          <p className="mt-2 text-white/85">{t("sponsorCta.text")}</p>
        </div>
        <a
          href={CURRENT.docs.sponsorDossier}
          download
          className="group inline-flex shrink-0 items-center gap-3 rounded-xl bg-[#d6245f] px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#b81d50] active:scale-95"
        >
          {t("sponsorCta.button")}
          <span aria-hidden className="transition duration-200 hover:-translate-y-0.5 active:scale-95"><Download/></span>
        </a>
      </div>
    </div>
  );
}