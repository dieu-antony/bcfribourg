import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import type { CommitteeCardProps } from "../types";

const CommitteeCard = ({ info }: CommitteeCardProps) => {
  return (
    <div className="mx-8 my-4 h-[500px] w-[300px] bg-white p-4 shadow-md">
      <div className="flex h-[325px] items-center justify-center">
        <Image
          src={info.imgRef}
          alt={info.role}
          height={300}
          width={250}
          className="max-h-[325px] max-w-[250px] object-cover"
        />
      </div>

      <h2 className="my-2 text-lg text-picton-blue-500">{info.name}</h2>
      <h3 className="my-2 text-slate-700">
        {info.role + (info.role2 === "" ? "" : " / " + info.role2)}
      </h3>
      <div className="my-2 text-slate-700">
        <span className="my-2 flex gap-2">
          <Phone />
          {info.phone}
        </span>
        <span className="my-2 flex gap-2">
          <Mail />
          {info.email}
        </span>
      </div>
    </div>
  );
};

export default CommitteeCard;
