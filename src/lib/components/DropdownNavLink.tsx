import Link from "next/link";
import { ReactNode, useState } from "react";

type SubMenu = {
  children: string[];
  triggerElement: ReactNode;
};

const DropdownNavLink = ({ triggerElement, children }: SubMenu) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col justify-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {triggerElement}
      {isHovered && (
        <div className="relative left-0 top-full flex flex-col justify-start lg:absolute ">
          {children.map((item) => (
            <Link className="hover:text-picton-blue-500" href={item}>
              {"->"} {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownNavLink;
