import Image from "next/image";

type HistoryCardProps = {
  title: string;
  description: string;
  imgFile?: string;
};

const HistoryCard = ({
  title,
  description,
  imgFile,
}: HistoryCardProps) => {
  console.log(imgFile);
  return (
    <div className="my-8 flex w-full flex-col justify-center p-10 px-10 pb-0 sm:flex-row sm:px-12 md:px-24 lg:px-32 xl:px-40">
      <div className="flex w-full flex-col items-center text-justify sm:items-start">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-kg mt-10 min-h-40 max-w-sm text-slate-700">
          {description}
        </p>
      </div>
      <div className="items-center justify-center px-10 pt-10 sm:pt-0">
        <a
          className="flex h-full w-full items-center justify-center text-white"
          href={"/assets/history/" + imgFile}
          target="_blank"
        >
          <Image
            src={"/assets/history/" + imgFile}
            width={300}
            height={300}
            className={`h-full w-full object-contain ${imgFile ? "block" : "hidden"}`}
            alt="1984"
          />
        </a>
      </div>
    </div>
  );
};

export default HistoryCard;
