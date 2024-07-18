import Logo from "./Logo";
import Navbar from "./Navbar";

type HeaderProps = {
  messages: Record<string, any>;
};

const Header: React.FC<HeaderProps> = ({messages}) => {
  return (
    <header className="sticky top-0 z-[20] mx-auto flex w-full flex-col flex-wrap items-stretch justify-start bg-white p-8 shadow-md lg:flex-row lg:items-center lg:justify-between">
      <Logo />
      <Navbar _messages={messages}/>
    </header>
  );
};

export default Header;
