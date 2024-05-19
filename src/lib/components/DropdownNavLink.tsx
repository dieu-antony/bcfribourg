"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react"

type DropdownNavLinkList = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

type DropdownNavLinkProps = {
  children: DropdownNavLinkList[];
  triggerElement: string;
  onClick?: () => void;
};

const DropdownNavLink = ({
  triggerElement,
  children,
  onClick,
}: DropdownNavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col justify-start lg:justify-center lg:self-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="text-1xl flex relative mt-2 cursor-pointer self-start text-black after:absolute after:bottom-[0] after:left-[0] after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:rounded after:bg-picton-blue-500 after:transition-transform after:duration-200 after:ease-in-out after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-100 lg:m-0 lg:self-center">
        {triggerElement}{isHovered? <ChevronDown />:<ChevronRight />}
      </p>
      {isHovered && (
        <div className="relative left-0 flex w-40 flex-col justify-start bg-white p-2 pl-1 shadow-md lg:absolute lg:top-full ">
          {children.map((item) => (
            
              <Link
                key={item.name}
                className="p-1 text-black hover:text-picton-blue-500 flex flex-row gap-2 items-center"
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
