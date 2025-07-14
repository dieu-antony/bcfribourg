import Image from "next/image";

type SponsorProps = {
  name: string;
  imgUrl: string;
  link?: string;
  cn?: string;
};

export default function Sponsor({ name, imgUrl, link, cn }: SponsorProps) {
  return (
    <div className={`${cn}`}>
      <a className="hover:opacity-80" href={link}>
        <Image
          src={imgUrl}
          width={300}
          height={300}
          alt={name}
          className="max-w-96"
        />
      </a>
    </div>
  );
}
