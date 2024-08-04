import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="w-16 xl:h-auto xl:w-40 2xl:w-72">
      <Link href="/">
        <Image
          className="xl:hidden"
          src="/assets/bcf-base.svg"
          alt="BC Fribourg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          loading="eager"
        />
        <Image
          className="hidden 2xl:block"
          src="/assets/letter-logo.svg"
          alt="BC Fribourg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          loading="eager"
        />
        <Image
          className="hidden xl:block 2xl:hidden"
          src="/assets/bcf-short-right.svg"
          alt="BC Fribourg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          loading="eager"
        />
      </Link>
    </div>
  );
};

export default Logo;
