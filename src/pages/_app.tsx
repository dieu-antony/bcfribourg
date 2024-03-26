import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "~/lib/components/Header";
import Footer from "~/lib/components/Footer";

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/assets/favicon.svg" />
        <link rel="apple-touch-icon" href="/assets/favicon.svg" />
      </Head>
      
      <main className={`font-sans ${inter.variable} flex flex-col min-h-screen`}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  );
};

export default MyApp;
