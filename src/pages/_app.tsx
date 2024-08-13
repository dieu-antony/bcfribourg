import { type AppProps, type AppType } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import type { Session } from "node_modules/next-auth/core/types";
import GoogleAnalytics from "~/lib/components/GoogleAnalytics";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const App: AppType = ({ Component, pageProps: { session, messages, ...pageProps} }: AppProps) => {
  const router = useRouter();
  return (
    <SessionProvider session={session as Session}>
      <NextIntlClientProvider
        locale={router.locale}
        messages={messages as AbstractIntlMessages}
        timeZone="Europe/Zurich"
      >
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/assets/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/assets/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/assets/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/assets/favicon/safari-pinned-tab.svg"
            color="#00afef"
          />
          <link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta
            name="msapplication-config"
            content="/assets/favicon/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Le Badminton Club Fribourg accueille des joueurs et joueuses de tous âges et de tous niveaux. Que vous soyez débutant ou compétiteur confirmé, vous trouverez des opportunités adaptées à votre niveau." key="desc"/>
          <title>BC Fribourg</title>
        </Head>
        <Component {...pageProps} />
        <GoogleAnalytics />
      </NextIntlClientProvider>
    </SessionProvider>
  );
};

export default App;
