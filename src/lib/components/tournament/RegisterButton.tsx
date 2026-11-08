import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type RegisterButtonProps = {
  className?: string;
  link: string;
  variant?: "solid" | "outline";
};

export function RegisterButton({
  className = "",
  link = "",
  variant = "solid",
}: RegisterButtonProps) {
  const t = useTranslations("BolzesTournament");

  const styles =
    variant === "solid"
      ? "bg-[#d6245f] text-white shadow-lg shadow-[#d6245f]/40 hover:bg-[#b81d50] hover:shadow-xl hover:shadow-[#d6245f]/50"
      : "border-2 border-white text-white hover:bg-white hover:text-[#166081]";

  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-xl px-10 py-3.5 text-lg font-semibold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${styles} ${className}`}
    >
      {/* light sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/30 transition-transform duration-700 group-hover:translate-x-[500%]"
      />
      <span className="relative">{t("registerButton")}</span>
      <span
        aria-hidden
        className="relative transition-transform duration-200 group-hover:translate-x-1"
      >
        <ExternalLink />
      </span>
    </Link>
  );
}
