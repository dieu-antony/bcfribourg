import { AppProps, type AppType } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <link rel="icon" href="/assets/favicon.svg" />
        <link rel="apple-touch-icon" href="/assets/favicon.svg" />
      </Head>

      <main
        className={`font-sans ${inter.variable} flex min-h-screen flex-col`}
      >
        <SessionProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </SessionProvider>
      </main>
    </SessionProvider>
  );
};

export default MyApp;
