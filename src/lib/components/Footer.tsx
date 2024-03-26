import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="h-24 w-full bg-gray-800 mt-auto">
      <div className="ml-4 mr-4 flex h-full flex-row items-center justify-between">
        <div className="rounded-lg bg-gray-400 p-2">
          <div className="h-auto w-64 transition-all duration-300 ease-linear lg:w-72">
            <img src="/assets/letter-logo.svg" alt="BC Fribourg" />
          </div>
        </div>
        <div className="p-2 text-gray-500">&copy; 2024 BC Fribourg</div>
      </div>
    </footer>
  );
};

export default Footer;
