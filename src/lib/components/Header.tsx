import React from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="top-0 z-[20] mx-auto flex w-full flex-wrap items-center justify-between border-b border-gray-500 bg-gray-100 p-8">
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
