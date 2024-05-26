import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-auto h-24 w-full bg-gray-800">
      <div className="ml-4 mr-4 flex h-full flex-row items-center justify-between">
        <div className="rounded-lg p-2">
          <div className="h-auto w-16 transition-all duration-300 ease-linear lg:w-20">
            <Image
              src="/assets/baseinverted.svg"
              alt="BC Fribourg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
        <div className="p-2 text-gray-500">&copy; 2024 BC Fribourg</div>
      </div>
    </footer>
  );
};

export default Footer;
