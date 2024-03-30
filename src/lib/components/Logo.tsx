import Link from "next/link";

const Logo = () => {
  return (
    <div className="h-auto w-64 transition-all duration-300 ease-linear lg:w-72">
      <Link href="/">
        <img src="/assets/letter-logo.svg" alt="BC Fribourg" />
      </Link>
    </div>
  );
};

export default Logo;
