import Image from "next/image";

type SponsorProps = {
  name: string;
  file?: string;
  link?: string;
  cn?: string;
};

export default function Sponsor({ name, file, link, cn }: SponsorProps) {
  return (
    <div className={`${cn}`}>
      <a className="hover:opacity-80" href={link}>
        <Image
          src={"/assets/sponsors/logo/" + name + "." + file}
          width={300}
          height={300}
          alt={name}
          className="max-w-96"
        />
      </a>
    </div>
  );
}
