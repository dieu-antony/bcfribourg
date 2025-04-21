import { type AppProps, type AppType } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import type { Session } from "node_modules/next-auth/core/types";
import GoogleAnalytics from "~/lib/components/GoogleAnalytics";
import JSONLD from "~/lib/components/JSONLD";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useEffect, useState } from "react";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const CookieConsent = dynamic(() => import("~/lib/components/CookieConsent"), {
  ssr: false,
});

const App: AppType = ({
  Component,
  pageProps: { session, messages, ...pageProps },
}: AppProps) => {
  const router = useRouter();
  const [cookiePrefs, setCookiePrefs] = useState({
    analytics: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem("cookie_preferences");
    if (stored) {
      setCookiePrefs(JSON.parse(stored) as { analytics: boolean });
    }
  }, []);

  return (
    <div className={inter.variable}>
      <SessionProvider session={session as Session}>
        <NextIntlClientProvider
          locale={router.locale}
          messages={messages as AbstractIntlMessages}
          timeZone="Europe/Zurich"
        >
          <Head>
            <title>BC Fribourg</title>
            <meta
              name="description"
              content="Le Badminton Club Fribourg accueille des joueurs et joueuses de tous âges et de tous niveaux..."
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="robots" content="index, follow" />
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
            <meta name="theme-color" content="#ffffff" />

          </Head>

          {/* Always load reCAPTCHA (essential for security) */}
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
          />

          {/* Conditionally load Google Analytics based on consent */}
          {cookiePrefs.analytics && <GoogleAnalytics />}

          {/* Main app content */}
          <Component {...pageProps} />

          {/* JSON-LD structured data */}
          <JSONLD />

          {/* Cookie banner */}
          <CookieConsent onConsentChange={setCookiePrefs} />
        </NextIntlClientProvider>
      </SessionProvider>
    </div>
  );
};

export default App;
