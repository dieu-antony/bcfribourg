"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type DropdownNavLinkList = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

type DropdownNavLinkProps = {
  options: DropdownNavLinkList[];
  triggerElement: string;
  onClick?: () => void;
};

const DropdownNavLink = ({
  triggerElement,
  options,
  onClick,
}: DropdownNavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col justify-start lg:justify-center lg:self-center"
      onMouseEnter={() => {
        if (window.innerWidth > 1023) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (window.innerWidth > 1023) {
          setTimeout(() => setIsHovered(false), 750);
        }
      }}
      onClick={() => {
        if (window.innerWidth < 1024) {
          setIsHovered(!isHovered);
        }
      }}
    >
      <span className="text-1xl relative mt-2 flex cursor-pointer self-start text-black after:absolute after:bottom-[0] after:left-[0] after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:rounded after:bg-picton-blue-500 after:transition-transform after:duration-200 after:ease-in-out after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-100 lg:m-0 lg:self-center">
        {triggerElement}
        {isHovered ? <ChevronDown /> : <ChevronRight/>}
      </span>
      {isHovered && (
        <div className="relative left-0 z-50 flex w-40 flex-col justify-start bg-white p-2 pl-1 shadow-md lg:absolute lg:top-full ">
          {options.map((item) => (
            <Link
              key={item.name}
              className="flex flex-row items-center gap-2 p-1 text-black hover:text-picton-blue-500"
              href={item.href}
              onClick={onClick}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownNavLink;
