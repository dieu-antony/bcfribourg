import { Inter } from "next/font/google";
import Header from "./Header";
import Footer from "./Footer";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main
        className={`font-sans ${inter.variable} flex min-h-screen flex-col bg-gradient-to-b from-gray-50/80 to-gray-50`}
      >
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
