import Link from "next/link";
import React, { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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

  const isDesktop = typeof window !== "undefined" && window.innerWidth > 1023;

  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (isDesktop) {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
        closeTimeout.current = null;
      }
      setIsHovered(true);
    }
  };

  const handleLeave = () => {
    if (isDesktop) {
      closeTimeout.current = setTimeout(() => {
        setIsHovered(false);
        closeTimeout.current = null;
      }, 200);
    }
  };

  const handleClick = () => {
    if (!isDesktop) setIsHovered((prev) => !prev);
  };

  return (
    <div
      className="relative flex flex-col justify-start lg:justify-center lg:self-center"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <span className="text-1xl relative mt-2 flex cursor-pointer self-start text-black after:absolute after:bottom-[0] after:left-[0] after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:rounded after:bg-picton-blue-500 after:transition-transform after:duration-200 after:ease-in-out after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-100 lg:m-0 lg:self-center">
        {triggerElement}
        <motion.span
          initial={false}
          animate={{ rotate: isHovered ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight />
        </motion.span>
      </span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative left-0 z-50 flex w-40 flex-col justify-start overflow-hidden bg-white p-2 pl-1 shadow-md lg:absolute lg:top-full"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownNavLink;
