import Script from "next/script";
import { SportsTeam, WithContext } from "schema-dts";

const jsonLd: WithContext<SportsTeam> = {
  "@context": "https://schema.org",
  "@type": "SportsTeam",
  name: "BC Fribourg",
  sport: "Badminton",
  memberOf: [
    {
      "@type": "SportsOrganization",
      name: "AFB",
    },
    {
      "@type": "SportsOrganization",
      name: "Swiss Badminton",
    },
  ],
  url: "https://bcfribourg.ch",
  logo: "https://bcfribourg.ch/letter-logo.png",
  sameAs: [
    "https://www.facebook.com/bcfribourg",
    "https://www.instagram.com/bcfribourg",
  ],
  location: {
    "@type": "Place",
    name: "Fribourg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fribourg",
      postalCode: "1700",
      addressCountry: "CH",
    },
  },
  foundingDate: "1969",
  description: "BC Fribourg is a badminton club in Fribourg, Switzerland.",
  alternateName: "Badminton Club Fribourg",
  keywords:
    "badminton, fribourg, club, juniors, junior, adultes, junioren, freiburg, interclub, halle, salle, training, entraînements",
};

const JSONLD = () => {
  return <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>;
};

export default JSONLD;
