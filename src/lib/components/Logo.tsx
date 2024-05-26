import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="h-auto w-64 transition-all duration-300 ease-linear lg:w-72">
      <Link href="/">
        <Image
          src="/assets/letter-logo.svg"
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
