import type { Graph } from "schema-dts";

const jsonLd: Graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SportsOrganization",
      "@id": "https://bcfribourg.ch/#club",
      name: "BC Fribourg",
      alternateName: "Badminton Club Fribourg",
      email: "president@bcfribourg.ch",
      sport: "Badminton",
      url: "https://bcfribourg.ch",
      logo: "https://bcfribourg.ch/assets/letter-logo.svg",
      foundingDate: "1969",
      description:
        "Le BC Fribourg est un club de badminton à Fribourg, en Suisse.",
      memberOf: [
        {
          "@type": "SportsOrganization",
          name: "Association Fribourgeoise de Badminton",
        },
        { "@type": "SportsOrganization", name: "Swiss Badminton" },
      ],
      sameAs: ["https://www.instagram.com/bcfribourg"],
      location: { "@id": "https://bcfribourg.ch/#salle" },
    },
    {
      "@type": "SportsActivityLocation",
      "@id": "https://bcfribourg.ch/#salle",
      name: "Salle de badminton — DOSF Torry",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Avenue Général-Guisan 61a",
        addressLocality: "Fribourg",
        postalCode: "1700",
        addressRegion: "Fribourg",
        addressCountry: "CH",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 46.81173,
        longitude: 7.147393,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Monday",
          opens: "19:00",
          closes: "22:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Tuesday",
          opens: "18:00",
          closes: "20:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Wednesday",
          opens: "17:30",
          closes: "22:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Thursday",
          opens: "19:00",
          closes: "20:30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Friday",
          opens: "18:00",
          closes: "22:00",
        },
      ],
    },
  ],
};

const JSONLD = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
};

export default JSONLD;
