import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="relative top-0 z-[20] mx-auto flex w-full flex-col flex-wrap items-stretch justify-start bg-gray-100 p-8 shadow-md lg:flex-row lg:items-center lg:justify-between">
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
