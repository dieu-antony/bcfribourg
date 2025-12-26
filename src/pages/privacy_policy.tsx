import { useTranslations } from "next-intl";
import type { GetStaticPropsContext } from "next/types";
import Layout from "~/lib/components/Layout";
import { Title } from "~/lib/components/Title";

const PrivacyPolicy = () => {
  const t = useTranslations("PrivacyPolicy");

  return (
    <Layout>
      <Title>{t("title")}</Title>
      <div className="mx-8 my-8 flex max-w-4xl flex-col self-center rounded-md bg-white p-8 shadow-md">
        <p className="mb-4">{t("lastUpdated")} 25.12.2025</p>
        <div className="text-black">
          {t.rich("1introduction", {
            h2: (children: React.ReactNode) => (
              <h2 className="mb-2 mt-6 text-2xl font-semibold">{children}</h2>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
          })}

          <p className="font-semibold">{t("question")}</p>
          <p>{t("email")}: webmaster(at)bcfribourg.ch</p>
          <p>{t("address")}: BC Fribourg, 1700 Fribourg</p>
        </div>
        <div className="flex flex-col">
          <h2 className="mb-2 mt-6 text-2xl font-semibold">
            {t("2dataCollection")}
          </h2>
          {t.rich("21webSite", {
            h3: (children: React.ReactNode) => (
              <h3 className="mb-2 mt-4 text-xl font-semibold">{children}</h3>
            ),
            li: (children: React.ReactNode) => (
              <li className="ml-6 list-disc">{children}</li>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
            ul: (children: React.ReactNode) => (
              <ul className="my-4 ml-4 list-disc">{children}</ul>
            ),
          })}
          {t.rich("22contactForm", {
            h3: (children: React.ReactNode) => (
              <h3 className="mb-2 mt-4 text-xl font-semibold">{children}</h3>
            ),
            li: (children: React.ReactNode) => (
              <li className="ml-6 list-disc">{children}</li>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
            ul: (children: React.ReactNode) => (
              <ul className="my-4 ml-4 list-disc">{children}</ul>
            ),
          })}
          {t.rich("23memberForm", {
            h3: (children: React.ReactNode) => (
              <h3 className="mb-2 mt-4 text-xl font-semibold">{children}</h3>
            ),
            h4: (children: React.ReactNode) => (
              <h4 className="mb-2 mt-4 text-lg font-semibold">{children}</h4>
            ),
            li: (children: React.ReactNode) => (
              <li className="ml-6 list-disc">{children}</li>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
            ul: (children: React.ReactNode) => (
              <ul className="my-4 ml-4 list-disc">{children}</ul>
            ),
          })}
          {t.rich("24recaptcha", {
            h3: (children: React.ReactNode) => (
              <h3 className="mb-2 mt-4 text-xl font-semibold">{children}</h3>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
            a: (children: React.ReactNode) => (
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-picton-blue-600"
              >
                {children}
              </a>
            ),
          })}
          {t.rich("25googleAnalytics", {
            h3: (children: React.ReactNode) => (
              <h3 className="mb-2 mt-4 text-xl font-semibold">{children}</h3>
            ),
            p: (children: React.ReactNode) => (
              <p className="mb-4">{children}</p>
            ),
            a: (children: React.ReactNode) => (
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-picton-blue-600"
              >
                {children}
              </a>
            ),
          })}
          {t.rich("26admin", {
            h3: (children: React.ReactNode) => (
              <h3 className="mb-2 mt-4 text-xl font-semibold">{children}</h3>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
          })}
          {t.rich("3Cookies", {
            h2: (children: React.ReactNode) => (
              <h2 className="mb-2 mt-6 text-2xl font-semibold">{children}</h2>
            ),
          })}
          {t.rich("31essential", {
            h3: (children: React.ReactNode) => (
              <h3 className="mb-2 mt-4 text-xl font-semibold">{children}</h3>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
            li: (children: React.ReactNode) => (
              <li className="ml-6 list-disc">{children}</li>
            ),
            ul: (children: React.ReactNode) => (
              <ul className="my-4 ml-4 list-disc">{children}</ul>
            ),
          })}
          {t.rich("32analytics", {
            h3: (children: React.ReactNode) => (
              <h3 className="mb-2 mt-4 text-xl font-semibold">{children}</h3>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
          })}
          {t.rich("4processing", {
            h2: (children: React.ReactNode) => (
              <h2 className="mb-2 mt-6 text-2xl font-semibold">{children}</h2>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
            li: (children: React.ReactNode) => (
              <li className="ml-6 list-disc">{children}</li>
            ),
            ul: (children: React.ReactNode) => (
              <ul className="my-4 ml-4 list-disc">{children}</ul>
            ),
          })}
          {t.rich("5legalBasis", {
            h2: (children: React.ReactNode) => (
              <h2 className="mb-2 mt-6 text-2xl font-semibold">{children}</h2>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
            li: (children: React.ReactNode) => (
              <li className="ml-6 list-disc">{children}</li>
            ),
            ul: (children: React.ReactNode) => (
              <ul className="my-4 ml-4 list-disc">{children}</ul>
            ),
          })}
          {t.rich("6dataSharing", {
            h2: (children: React.ReactNode) => (
              <h2 className="mb-2 mt-6 text-2xl font-semibold">{children}</h2>
            ),
          })}
          {t.rich("61JS", {
            h3: (children: React.ReactNode) => (
              <h3 className="mb-2 mt-4 text-xl font-semibold">{children}</h3>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
          })}
          {t.rich("62thirdParties", {
            h3: (children: React.ReactNode) => (
              <h3 className="mb-2 mt-4 text-xl font-semibold">{children}</h3>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
            li: (children: React.ReactNode) => (
              <li className="ml-6 list-disc">{children}</li>
            ),
            ul: (children: React.ReactNode) => (
              <ul className="my-4 ml-4 list-disc">{children}</ul>
            ),
          })}
          {t.rich("7dataRetention", {
            h2: (children: React.ReactNode) => (
              <h2 className="mb-2 mt-6 text-2xl font-semibold">{children}</h2>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
            li: (children: React.ReactNode) => (
              <li className="ml-6 list-disc">{children}</li>
            ),
            ul: (children: React.ReactNode) => (
              <ul className="my-4 ml-4 list-disc">{children}</ul>
            ),
          })}
          {t.rich("8security", {
            h2: (children: React.ReactNode) => (
              <h2 className="mb-2 mt-6 text-2xl font-semibold">{children}</h2>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
            li: (children: React.ReactNode) => (
              <li className="ml-6 list-disc">{children}</li>
            ),
            ul: (children: React.ReactNode) => (
              <ul className="my-4 ml-4 list-disc">{children}</ul>
            ),
          })}
          {t.rich("9rights", {
            h2: (children: React.ReactNode) => (
              <h2 className="mb-2 mt-6 text-2xl font-semibold">{children}</h2>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
            li: (children: React.ReactNode) => (
              <li className="ml-6 list-disc">{children}</li>
            ),
            ul: (children: React.ReactNode) => (
              <ul className="my-4 ml-4 list-disc">{children}</ul>
            ),
          })}
          <p className="-mt-4">webmaster(at)bcfribourg.ch</p>
          {t.rich("10international", {
            h2: (children: React.ReactNode) => (
              <h2 className="mb-2 mt-6 text-2xl font-semibold">{children}</h2>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
            li: (children: React.ReactNode) => (
              <li className="ml-6 list-disc">{children}</li>
            ),
            ul: (children: React.ReactNode) => (
              <ul className="my-4 ml-4 list-disc">{children}</ul>
            ),
          })}
          {t.rich("11changes", {
            h2: (children: React.ReactNode) => (
              <h2 className="mb-2 mt-6 text-2xl font-semibold">{children}</h2>
            ),
            p: (children: React.ReactNode) => (
              <p className="my-4">{children}</p>
            ),
          })}
        </div>
      </div>
    </Layout>
  );
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../messages/${locale}.json`
  )) as IntlMessages;

  return {
    props: {
      messages: messages.default,
    },
    revalidate: 604800,
  };
}
export default PrivacyPolicy;
