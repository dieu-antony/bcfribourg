import { type AppProps, type AppType } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "~/lib/components/Header";
import Footer from "~/lib/components/Footer";
import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import { loadTranslationMessages } from "~/lib/utils/utils";

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
        timeZone="Europe/Zurich"
        messages={pageProps.messages}
      >
        <Head>
          <link rel="icon" href="/assets/favicon.svg" />
          <link rel="apple-touch-icon" href="/assets/favicon.svg" />
          <title>BC Fribourg</title>
        </Head>

        <main
          className={`font-sans ${inter.variable} flex min-h-screen flex-col bg-gradient-to-b from-gray-50/80 to-gray-50`}
        >
          <Header messages={pageProps.messages}/>
          <Component {...pageProps} />
          <Footer _messages={pageProps.messages}/>
        </main>
      </NextIntlClientProvider>
    </SessionProvider>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  const messages = await loadTranslationMessages(locale);
  return {
    props: {
      messages,
    },
  };
}

export default MyApp;
