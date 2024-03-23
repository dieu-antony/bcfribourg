import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="h-24 w-full bg-gray-800">
      <div className="flex flex-row ml-4 mr-4 h-full items-center justify-between">
        <div className="rounded-lg bg-gray-400 p-2">
          <Logo />
        </div>
        <div className="p-2 text-gray-500">&copy; 2024 BC Fribourg</div>
      </div>
    </footer>
  );
};

export default Footer;
