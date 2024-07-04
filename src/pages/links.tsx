import Image from "next/image";
import { HoverEffect } from "~/lib/components/ui/card-hover-effect";

const Links = () => {
  const links = [
    {
      title: "Swiss Badminton",
      description: (
        <Image
          src="/assets/logos/swissbadminton.png"
          width={200}
          height={200}
          alt="Swiss Badminton"
        />
      ),
      link: "https://www.swiss-badminton.ch/",
    },
    {
      title: "Association Fribourgeoise de Badminton",
      description: (
        <div className="rounded-lg bg-black p-2">
          <Image
            src="/assets/logos/afb.png"
            width={100}
            height={100}
            alt="AFB"
          />
        </div>
      ),
      link: "https://badminton-fribourg.ch/",
    },
    {
      title: "BC Tafers",
      description: (
        <Image
          src="/assets/logos/tafers.jpg"
          width={200}
          height={200}
          alt="BC Tafers"
        />
      ),
      link: "https://bctafers.ch/",
    },
    {
      title: "Association Fribourgeoise du Sport",
      description:
      <Image
      src="/assets/logos/afs.webp"
      width={200}
      height={200}
      alt="AFS"
    />,
      link: "https://www.afs-fvs.ch/fr/",
    },
  ];
  return (
    <>
      <div className="mx-auto max-w-5xl -z-0 px-8">
        <HoverEffect items={links} />
      </div>
    </>
  );
};

export default Links;
