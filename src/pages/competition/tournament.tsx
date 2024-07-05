import { Link2, Mail, Smartphone } from "lucide-react";
import Link from "next/link";

const Tournament = () => {
  return (
    <div className="m-8 flex max-w-[1000px] flex-col self-center">
      <div className="flex flex-col gap-2 bg-white p-5 shadow-md">
        <h1 className="text-xl font-semibold text-picton-blue-500">
          Tournois Swiss Badminton
        </h1>
        <div className="flex flex-col gap-4">
          <span>
            Les tournois Swiss Badminton sont des tournois officiels organisés
            par l&apos;association suisse de badminton. Pour vous inscrire, vous
            devez passer par le site de Swiss Badminton.
          </span>
          <div className="flex">
            <Link
              href="https://www.swiss-badminton.ch/"
              className="flex flex-row items-center gap-2 hover:text-picton-blue-500"
              target="_blank"
            >
              <Link2 className="h-4 w-4" /> <span>Swiss Badminton</span>
            </Link>
          </div>
          <span>
            Si vous avez une licence, il suffit de créer un login avec vos
            données personnelles. Si vous n&apos;avez pas de licence, vous pouvez
            vous inscrire en tant que non-licencié, mais vos options seront
            limitées. Pour plus d&apos;infos, veuillez contacter le responsable
            technique:
          </span>
          
          <span className="self-center font-semibold">Antony Dieu</span>
          </div>
          <div className="grid grid-cols-2 place-items-center justify-center max-w-[300px] self-center mt-2">
            <Link className="mb-2 hover:text-picton-blue-500" href="/club/contact">
              <Mail />
            </Link>
            <Smartphone className="mb-2" />
            <Link className="hover:text-picton-blue-500" href="/club/contact">
              Email
            </Link>
            <span>078 692 53 87</span>
        </div>
      </div>
    </div>
  );
};

export default Tournament;
