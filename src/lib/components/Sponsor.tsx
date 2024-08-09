import Image from "next/image";

type SponsorProps = {
    name: string;
    file?: string;
    link?: string;
    };

export default function Sponsor({ name, file, link }: SponsorProps) {
  return (
    <a className="hover:opacity-80" href={link}>
    <Image
      src={"/assets/sponsors/" + name + "." + file}
      width={300}
      height={300}
      alt={name}
      className="w-full"
    /></a>
  );
}
