import { Mail } from "lucide-react";
import Image from "next/image";
import type { CommitteeCardProps } from "../types";

const CommitteeCard = ({ info }: CommitteeCardProps) => {
  const roles = [info.role, info.role2].filter(Boolean);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded bg-white shadow-md transition hover:shadow-lg">

      <div className="relative aspect-[4/5] w-full bg-slate-100">
        <Image
          src={info.imgRef}
          alt={info.name}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="text-xl font-bold text-slate-900">{info.name}</h2>

        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <span
              key={role}
              className="rounded-full border border-picton-blue-500 px-3 py-0.5 text-sm font-medium text-picton-blue-500"
            >
              {role}
            </span>
          ))}
        </div>

        <p className="mt-auto flex items-center gap-2 break-all border-t border-slate-100 pt-3 text-sm text-slate-600">
          <Mail className="h-4 w-4 shrink-0 text-picton-blue-500" aria-hidden />
          {info.email}
        </p>
      </div>
    </article>
  );
};

export default CommitteeCard;
