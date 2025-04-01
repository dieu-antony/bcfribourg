import type { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
};

export const Title = ({ children }: TitleProps) => {
  return (
    <div className="mt-12 mb-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{children}</h1>
      <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-picton-blue-500" />
    </div>
  );
};
