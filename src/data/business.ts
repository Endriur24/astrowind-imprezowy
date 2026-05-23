export const business = {
  name: "Imprezowy Fotograf",
  legalName: "Imprezowy Fotograf",
  url: "https://imprezowyfotograf.pl",
  telephone: "+48885195599",
  email: "kontakt@imprezowyfotograf.pl",

  address: {
    streetAddress: "",
    addressLocality: "Kraków",
    postalCode: "",
    addressRegion: "małopolskie",
    addressCountry: "PL",
  },
  geo: {
    latitude: 50.0614,
    longitude: 19.9383,
  },
  priceRange: "$$",

  sameAs: [],

  logo: "/favicon.svg",
  image: "/og-default.jpg",

  dateModified: "2026-05-23T00:00:00+02:00",
  datePublished: "2020-01-01T00:00:00+01:00",

  inLanguage: "pl-PL",

  areaServed: [
    { "@type": "City", name: "Kraków" },
    { "@type": "City", name: "Warszawa" },
    { "@type": "City", name: "Katowice" },
    { "@type": "City", name: "Rzeszów" },
    { "@type": "City", name: "Tarnów" },
    { "@type": "City", name: "Kielce" },
    { "@type": "Country", name: "Polska" },
  ],
} as const;

export const siteUrl = "https://imprezowyfotograf.pl";
