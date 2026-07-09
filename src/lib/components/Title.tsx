import type { ReactNode } from "react";
import Image from "next/image";

type TitleProps = {
  children: ReactNode;
  className?: string;
  bannerImage?: string;
  bannerAlt?: string;
  height?: number;
};

export const Title = ({
  children,
  className,
  bannerImage,
  bannerAlt,
}: TitleProps) => {

  if (bannerImage) {
    return (
      <div className="relative w-full overflow-hidden h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] mb-4">
        <Image
          src={bannerImage}
          alt={bannerAlt ?? "Banner"}
          fill
          className="object-cover"
        />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content on top */}
          <div className="relative z-10 text-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {children}
            </h1>
            <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-picton-blue-500" />
          </div>
        </div>
      </div>
    );
  }

  // Default title without banner
  return (
    <div className={`mb-4 mt-12 text-center ${className}`}>
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        {children}
      </h1>
      <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-picton-blue-500" />
    </div>
  );
};
