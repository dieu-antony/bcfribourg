import { useTranslations } from "next-intl";
import { FadeUpOnScroll } from "~/lib/components/ui/fade-up-on-scroll";
import { Separator } from "~/lib/components/ui/separator";
import DownloadCard from "./DownloadCard";
import { CURRENT } from "~/lib/editions";

export default function DownloadsSection() {
  const t = useTranslations("BolzesTournament");

  const docs = [
    { key: "flyer", href: CURRENT.docs.flyer },
    { key: "payment", href: CURRENT.docs.payment },
    { key: "announcement", href: CURRENT.docs.announcement },
  ] as const;

  return (
    <div id="documents" className="mx-4 my-16 w-full scroll-mt-24 sm:my-28">
      <FadeUpOnScroll>
        <h2 className="mb-4 text-center text-4xl font-bold text-[#0b3547] sm:text-5xl">
          {t("downloads.title")}
        </h2>
        <Separator className="mx-auto mb-12 h-1 w-12 rounded-full bg-[#d6245f]" />
        <div className="grid gap-6 sm:grid-cols-3">
          {docs.map((d) => (
            <DownloadCard
              key={d.key}
              href={d.href}
              title={t(`downloads.${d.key}.title`)}
              description={t(`downloads.${d.key}.description`)}
              cta={t("downloads.cta")}
            />
          ))}
        </div>
      </FadeUpOnScroll>
    </div>
  );
}
