import Link from "next/link";

type Links = {
  name: string;
  href: string;
};

const NavLinks = ({name, href}:Links) => {
  return (
    <>
        <Link
        className="text-1xl relative mt-2 text-center text-black after:absolute after:bottom-[0] after:left-[0] after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:rounded after:bg-picton-blue-500 after:transition-transform after:duration-200 after:ease-in-out after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-100 lg:m-0 lg:self-center"
        href={href}
      >
        {name}
      </Link>
    </>
  );
};

export default NavLinks;
