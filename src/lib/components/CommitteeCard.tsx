import { Mail, Phone } from "lucide-react";
import Image from "next/image";

type CommitteeCardProps = {
  info: {
    imgRef: string;
    title: string;
    name: string;
    email: string;
    phone: string;
  };
};
const CommitteeCard = ({ info }: CommitteeCardProps) => {
  return (
    <div className="mx-8 my-4 max-w-[400px]">
      <Image
        src={info.imgRef}
        alt={info.title}
        height={300}
        width={250}
        className="max-h-[325px] max-w-[250px] object-cover"
      />

      <h1 className="my-2 text-lg text-picton-blue-500">{info.name}</h1>
      <h2 className="my-2 text-slate-700">{info.title}</h2>
      <div className="my-2 text-slate-700">
        <span className="flex my-2 gap-2">
          <Phone />
          {info.phone}
        </span>
        <span className="flex my-2 gap-2">
          <Mail />
          {info.email}
        </span>
      </div>
    </div>
  );
};

export default CommitteeCard;
