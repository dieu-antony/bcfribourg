import { Award } from "lucide-react";
import { useTranslations } from "next-intl";

type HonoraryMembersProps = {
  title: string;
  description?: string;
};

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");

const HonoraryMembers = ({ title, description }: HonoraryMembersProps) => {
  const t = useTranslations("History.honorary");

  const HONORARY_MEMBERS: { name: string; detail?: string }[] = [
    { name: "Jean-Claude Doutaz", detail: t("foundingPresident") },
    {
      name: "Pierre Guerra",
      detail:
        t("foundingVicePresident") + " & " + t("president") + " 1970-1977",
    },
    { name: "Juliette Guerra", detail: t("foundingTreasurer") },
    { name: "Pierre Lorson", detail: t("foundingSecretary") },
    { name: "Rico Casutt", detail: t("foundingTechnical") },
    { name: "Marcel Petignat", detail: t("president") + " 1977-1988" },
    { name: "Daniel Dupraz", detail: t("president") + " 1988-2010" },
    { name: "Claude Page", detail: t("committeeMember") + " 1984-2013" },
    {
      name: "Jean-Charles Bossens",
      detail: t("president") + " 2010-2015",
    },
    { name: "Lara Gross", detail: t("president") + " 2016-2017" },
  ];
  if (HONORARY_MEMBERS.length === 0) return null;

  return (
    <section className="overflow-hidden rounded bg-white shadow-md">
      {/* Header strip */}
      <div className="flex items-center gap-3 bg-picton-blue-500 px-5 py-4 sm:px-6">
        <Award className="h-6 w-6 text-white" aria-hidden />
        <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
      </div>

      <div className="p-5 sm:p-6">
        {description && (
          <p className=" leading-relaxed text-slate-700">
            {description}
          </p>
        )}

        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HONORARY_MEMBERS.map((member) => (
            <li
              key={member.name}
              className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-picton-blue-500 hover:shadow-md"
            >
              <span
                aria-hidden
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-picton-blue-500 text-base font-bold text-white"
              >
                {initials(member.name)}
              </span>
              <div className="min-w-0">
                <p className="font-semibold leading-tight text-slate-900">
                  {member.name}
                </p>
                {member.detail && (
                  <p className="mt-0.5 text-sm text-slate-600">
                    {member.detail}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HonoraryMembers;
