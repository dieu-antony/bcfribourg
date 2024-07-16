import { type AppProps, type AppType } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "~/lib/components/Header";
import Footer from "~/lib/components/Footer";
import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <link rel="icon" href="/assets/favicon.svg" />
        <link rel="apple-touch-icon" href="/assets/favicon.svg" />
        <title>BC Fribourg</title>
      </Head>

      <main
        className={`font-sans ${inter.variable} flex min-h-screen flex-col bg-gradient-to-b from-gray-50/80 to-gray-50`}
      >
          <Header />
          <Component {...pageProps} />
          <Footer />
      </main>
    </SessionProvider>
  );
};

export default MyApp;
