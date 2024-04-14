const Footer = () => {
  return (
    <footer className="mt-auto h-24 w-full bg-gray-800">
      <div className="ml-4 mr-4 flex h-full flex-row items-center justify-between">
        <div className="rounded-lg p-2">
          <div className="h-auto w-16 transition-all duration-300 ease-linear lg:w-20">
            <img src="/assets/baseinverted.svg" alt="BC Fribourg" />
          </div>
        </div>
        <div className="p-2 text-gray-500">&copy; 2024 BC Fribourg</div>
      </div>
    </footer>
  );
};

export default Footer;
