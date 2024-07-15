import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="h-auto w-40 xl:w-72">
      <Link href="/">
        <Image
        className="xl:block hidden"
          src="/assets/letter-logo.svg"
          alt="BC Fribourg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}          
        />
        <Image
        className="xl:hidden"
          src="/assets/bcf-short-right.svg"
          alt="BC Fribourg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </Link>
    </div>
  );
};

export default Logo;
