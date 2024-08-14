import { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
};

export const Title = ({ children }: TitleProps) => {
  return (
    <h1 className="mt-8 w-full bg-picton-blue-500 py-2 text-center text-3xl font-bold text-white">
      {children}
    </h1>
  );
};
