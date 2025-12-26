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
import { CookieProvider } from "~/lib/components/cookies/CookieContext";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const CookiesBanner = dynamic(
  () => import("~/lib/components/cookies/CookiesBanner"),
  {
    ssr: false,
  },
);

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
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="robots" content="index, follow" />
            <link
              rel="apple-touch-icon"
              sizes="57x57"
              href="/assets/favicon/apple-icon-57x57.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="60x60"
              href="/assets/favicon/apple-icon-60x60.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="72x72"
              href="/assets/favicon/apple-icon-72x72.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="76x76"
              href="/assets/favicon/apple-icon-76x76.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="114x114"
              href="/assets/favicon/apple-icon-114x114.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="120x120"
              href="/assets/favicon/apple-icon-120x120.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="144x144"
              href="/assets/favicon/apple-icon-144x144.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="152x152"
              href="/assets/favicon/apple-icon-152x152.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/assets/favicon/apple-icon-180x180.png"
            />

            <link
              rel="icon"
              type="image/png"
              sizes="192x192"
              href="/assets/favicon/android-icon-192x192.png"
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
              sizes="96x96"
              href="/assets/favicon/favicon-96x96.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/assets/favicon/favicon-16x16.png"
            />

            <link rel="manifest" href="/assets/favicon/manifest.json" />

            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta
              name="msapplication-TileImage"
              content="/assets/favicon/ms-icon-144x144.png"
            />

            <meta name="theme-color" content="#ffffff" />
          </Head>

          {/* Always load reCAPTCHA (essential for security) */}
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
          />
          <CookieProvider>
            {/* Conditionally load Google Analytics based on consent */}
            {cookiePrefs.analytics && <GoogleAnalytics />}

            {/* Main app content */}
            <Component {...pageProps} />

            {/* Cookie banner */}
            <CookiesBanner onConsentChange={setCookiePrefs} />

            {/* JSON-LD structured data */}
            <JSONLD />
          </CookieProvider>
        </NextIntlClientProvider>
      </SessionProvider>
    </div>
  );
};

export default App;
