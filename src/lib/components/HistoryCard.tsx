import Image from "next/image";
import Link from "next/link";

type HistoryCardProps = {
  title: string;
  description: string;
  imgUrl?: string;
};

const HistoryCard = ({ title, description, imgUrl }: HistoryCardProps) => {
  return (
    <article className="relative pb-10 pl-6 last:pb-0 sm:pl-8">
      <span
        aria-hidden
        className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-picton-blue-500 shadow"
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold text-picton-blue-500">{title}</h3>
          <p className="mt-2 max-w-prose leading-relaxed text-slate-700">
            {description}
          </p>
        </div>

        {imgUrl && (
          <Link
            href={imgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 transition hover:shadow-md md:w-56"
          >
            <Image
              src={imgUrl}
              width={300}
              height={300}
              className="h-auto w-full object-contain"
              alt={`Historique du club de badminton de Fribourg ${title}`}
            />
          </Link>
        )}
      </div>
    </article>
  );
};

export default HistoryCard;
