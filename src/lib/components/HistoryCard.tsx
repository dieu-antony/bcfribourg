import Image from "next/image";
import Link from "next/link";

type HistoryCardProps = {
  title: string;
  description: string;
  imgUrl?: string;
};

const HistoryCard = ({ title, description, imgUrl }: HistoryCardProps) => {
  return (
    <div className="my-8 flex w-full flex-col justify-center p-10 px-10 pb-0 sm:flex-row sm:px-12 md:px-24 lg:px-32 xl:px-40">
      <div className="flex w-full flex-col items-center text-justify sm:items-start">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-kg mt-4 max-w-sm text-slate-700">{description}</p>
      </div>

      {imgUrl && (
        <div className="items-center justify-center px-10 pt-10 sm:pt-0">
          <Link
            href={imgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full w-full items-center justify-center text-white"
          >
            <Image
              src={imgUrl}
              width={300}
              height={300}
              className="h-full w-full object-contain"
              alt={`Historique du club de badminton de Fribourg ${title}`}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default HistoryCard;
