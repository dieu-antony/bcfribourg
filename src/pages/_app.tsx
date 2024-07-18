import { type AppProps, type AppType } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  return (
    <SessionProvider session={pageProps.session}>
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
        timeZone="Europe/Zurich"
      >
        <Head>
          <link rel="icon" href="/assets/favicon.svg" />
          <link rel="apple-touch-icon" href="/assets/favicon.svg" />
          <title>BC Fribourg</title>
        </Head>
        <Component {...pageProps} />
      </NextIntlClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
