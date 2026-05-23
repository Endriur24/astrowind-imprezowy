import { business, siteUrl } from "~/data/business";

export { siteUrl };

export type JsonLd = Record<string, unknown>;

export function createWebSiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: business.name,
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: business.inLanguage,
  };
}

export function createWebPageSchema(config: {
  name: string;
  url: string;
  description?: string;
  breadcrumbId?: string;
  primaryImageOfPage?: string | JsonLd;
  about?: JsonLd | JsonLd[];
  mainEntity?: JsonLd | JsonLd[];
  datePublished?: string;
  dateModified?: string;
  author?: JsonLd;
  publisher?: JsonLd;
  inLanguage?: string;
}): JsonLd {
  return {
    "@type": "WebPage",
    "@id": `${config.url}#webpage`,
    url: config.url,
    name: config.name,
    ...(config.description ? { description: config.description } : {}),
    isPartOf: { "@id": `${siteUrl}/#website` },
    ...(config.breadcrumbId ? { breadcrumb: { "@id": config.breadcrumbId } } : {}),
    ...(config.about !== undefined ? { about: config.about } : {}),
    ...(config.mainEntity !== undefined ? { mainEntity: config.mainEntity } : {}),
    ...(config.primaryImageOfPage
      ? {
          primaryImageOfPage:
            typeof config.primaryImageOfPage === "string"
              ? { "@type": "ImageObject", url: config.primaryImageOfPage }
              : config.primaryImageOfPage,
        }
      : {}),
    author: config.author || { "@id": `${siteUrl}/#organization` },
    publisher: config.publisher || { "@id": `${siteUrl}/#organization` },
    datePublished: config.datePublished || business.datePublished,
    dateModified: config.dateModified || business.dateModified,
    inLanguage: config.inLanguage || business.inLanguage,
  };
}

export function createLocalBusinessSchema(overrides: JsonLd = {}): JsonLd {
  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${siteUrl}/#organization`,
    name: business.legalName,
    description:
      overrides.description ||
      "Profesjonalny fotograf imprezowy w Krakowie. Fotografia eventowa, studniówkowa, klubowa, konferencyjna i wideo.",
    image: { "@id": `${siteUrl}/#primaryimage` },
    logo: { "@id": `${siteUrl}/#logo` },
    url: overrides.url || siteUrl,
    telephone: business.telephone,
    email: business.email,
    address: { "@id": `${siteUrl}/#address` },
    geo: { "@id": `${siteUrl}/#geo` },
    areaServed: [...business.areaServed],
    priceRange: business.priceRange,
    openingHoursSpecification: { "@id": `${siteUrl}/#oh` },
    sameAs: [...business.sameAs],
    ...overrides,
  };
}

export function createServiceSchema(config: {
  name: string;
  description: string;
  url?: string;
  price?: string;
  priceCurrency?: string;
  unitText?: string;
  areaServed?: JsonLd[];
  offers?: JsonLd;
}): JsonLd {
  const serviceUrl = config.url || siteUrl;

  return {
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name: config.name,
    description: config.description,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: config.areaServed || [...business.areaServed],
    offers: config.offers || {
      "@type": "Offer",
      priceCurrency: config.priceCurrency || "PLN",
      ...(config.price ? { price: config.price } : {}),
      ...(config.unitText ? { unitText: config.unitText } : {}),
    },
  };
}

export function createFAQSchema(
  url: string,
  questions: Array<{ name: string; acceptedAnswer: { text: string } }>
): JsonLd {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.name,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.acceptedAnswer.text,
      },
    })),
  };
}

export function createBreadcrumbSchema(
  url: string,
  items: Array<{ position: number; name: string; item?: string }>
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      ...(item.item ? { item: item.item } : {}),
    })),
  };
}

export function createGraph(...schemas: JsonLd[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}

export function createAddressSchema(): JsonLd {
  return {
    "@type": "PostalAddress",
    "@id": `${siteUrl}/#address`,
    streetAddress: business.address.streetAddress,
    addressLocality: business.address.addressLocality,
    postalCode: business.address.postalCode,
    addressRegion: business.address.addressRegion,
    addressCountry: business.address.addressCountry,
  };
}

export function createGeoSchema(): JsonLd {
  return {
    "@type": "GeoCoordinates",
    "@id": `${siteUrl}/#geo`,
    latitude: business.geo.latitude,
    longitude: business.geo.longitude,
  };
}

export function createOpeningHoursSchema(): JsonLd {
  return {
    "@type": "OpeningHoursSpecification",
    "@id": `${siteUrl}/#oh`,
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  };
}

export function createImageSchemas(): JsonLd[] {
  return [
    {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#logo`,
      url: `${siteUrl}${business.logo}`,
      contentUrl: `${siteUrl}${business.logo}`,
      caption: `Logo ${business.name}`,
    },
    {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#primaryimage`,
      url: `${siteUrl}${business.image}`,
      contentUrl: `${siteUrl}${business.image}`,
      caption: `${business.name} – fotograf imprezowy Kraków`,
    },
  ];
}

export function createOfferCatalogSchema(): JsonLd {
  const services = [
    {
      name: "Fotograf na studniówkę",
      description: "Zdjęcia ze studniówek i komersów w Krakowie. Pakiety od 1 do 3+ fotografów, retusz w cenie.",
      url: `${siteUrl}/oferta/fotograf-na-studniowke`,
      slug: "fotograf-na-studniowke",
    },
    {
      name: "Fotograf na imprezę studencką",
      description: "Bale wydziałowe, dyskoteki, rajdy studenckie, puchar dziekana.",
      url: `${siteUrl}/oferta/fotograf-na-wydarzenia-studenckie`,
      slug: "fotograf-na-wydarzenia-studenckie",
    },
    {
      name: "Fotograf klubowy i koncertowy",
      description: "Dynamiczne zdjęcia z koncertów i imprez klubowych w Krakowie.",
      url: `${siteUrl}/oferta/fotograf-klubowy-koncertowy-krakow`,
      slug: "fotograf-klubowy-koncertowy",
    },
    {
      name: "Fotograf na konferencję",
      description: "Profesjonalna dokumentacja konferencji i eventów branżowych.",
      url: `${siteUrl}/oferta/fotograf-na-konferencje-krakow`,
      slug: "fotograf-na-konferencje",
    },
    {
      name: "Fotograf eventowy",
      description: "Zdjęcia z eventów firmowych w Krakowie i całej Polsce.",
      url: `${siteUrl}/oferta/fotograf-eventowy-krakow`,
      slug: "fotograf-eventowy",
    },
    {
      name: "Fotograf na urodziny",
      description: "Zdjęcia z urodzin, osiemnastek i imprez prywatnych w Krakowie.",
      url: `${siteUrl}/oferta/fotograf-na-urodziny-krakow`,
      slug: "fotograf-na-urodziny",
    },
    {
      name: "Zdjęcia live",
      description: "Dostarczanie zdjęć w czasie rzeczywistym podczas trwania wydarzenia.",
      url: `${siteUrl}/oferta/zdjecia-live`,
      slug: "zdjecia-live",
    },
    {
      name: "Reportaże i projekty specjalne",
      description: "Reportaże z wyjazdów na zawody, eventy sportowe i zjazdy samochodowe.",
      url: `${siteUrl}/oferta/reportaze-i-projekty-specjalne`,
      slug: "reportaze-specjalne",
    },
    {
      name: "Dodatkowe usługi foto/wideo",
      description: "Fotobudka, ścianka fotograficzna, zdjęcia z drona i inne atrakcje.",
      url: `${siteUrl}/oferta/dodatkowe-uslugi-fotograficzne`,
      slug: "dodatkowe-uslugi",
    },
    {
      name: "Wideo eventowe",
      description: "Teledyski, spoty promocyjne i relacje wideo z wydarzeń.",
      url: `${siteUrl}/oferta/video-eventowe`,
      slug: "wideo-eventowe",
    },
    {
      name: "Streaming wideo",
      description: "Profesjonalne transmisje live z konferencji i eventów.",
      url: `${siteUrl}/oferta/streaming-video`,
      slug: "streaming-video",
    },
    {
      name: "Szkolenia foto i wideo",
      description: "Warsztaty grupowe i konsultacje 1:1 z fotografii i obróbki.",
      url: `${siteUrl}/oferta/szkolenia-foto-wideo`,
      slug: "szkolenia-foto-wideo",
    },
  ];

  return {
    "@type": "OfferCatalog",
    "@id": `${siteUrl}/#offercatalog`,
    name: `Oferta ${business.name}`,
    description: "Profesjonalne usługi fotograficzne i wideo na eventy, imprezy i konferencje",
    provider: { "@id": `${siteUrl}/#organization` },
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        "@id": `${siteUrl}/#offer-${service.slug}`,
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          url: service.url,
          provider: { "@id": `${siteUrl}/#organization` },
          areaServed: { "@type": "Country", name: "Polska" },
        },
      },
    })),
  };
}

export function createHomeBreadcrumbSchema(): JsonLd {
  return {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}/#breadcrumb`,
    itemListElement: [{
      "@type": "ListItem",
      position: 1,
      name: "Strona główna",
      item: siteUrl,
    }],
  };
}

export function createHomePageSchema(): JsonLd {
  return createGraph(
    createWebSiteSchema(),
    createLocalBusinessSchema({
      makesOffer: { "@id": `${siteUrl}/#offercatalog` },
      mainEntityOfPage: { "@id": `${siteUrl}/#webpage` },
    }),
    createAddressSchema(),
    createGeoSchema(),
    createOpeningHoursSchema(),
    ...createImageSchemas(),
    createHomeBreadcrumbSchema(),
    createWebPageSchema({
      name: "Fotograf Imprezowy Kraków — Usługi Fotograficzne i Wideo na Eventy",
      url: `${siteUrl}/oferta`,
      description: "Profesjonalny fotograf imprezowy w Krakowie. Zdjęcia na studniówki, konferencje, imprezy klubowe, eventy firmowe, urodziny i wiele więcej. Retusz w cenie, dostawa 24-72h.",
      primaryImageOfPage: `${siteUrl}${business.image}`,
      about: { "@id": `${siteUrl}/#organization` },
      mainEntity: { "@id": `${siteUrl}/#offercatalog` },
      breadcrumbId: `${siteUrl}/#breadcrumb`,
    }),
    createOfferCatalogSchema(),
  );
}

export function createOfferPageGraph(config: {
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string;
  serviceImage?: string;
  price?: string;
  priceCurrency?: string;
  unitText?: string;
  pageTitle?: string;
  pageDescription?: string;
  faqItems?: Array<{ name: string; acceptedAnswer: { text: string } }>;
  breadcrumbItems?: Array<{ position: number; name: string; item?: string }>;
}): JsonLd {
  const schemas: JsonLd[] = [
    createWebSiteSchema(),
    createLocalBusinessSchema({
      makesOffer: { "@id": `${siteUrl}/#offercatalog` },
    }),
    createAddressSchema(),
    createGeoSchema(),
    createOpeningHoursSchema(),
    ...createImageSchemas(),
  ];

  if (config.breadcrumbItems) {
    schemas.push(createBreadcrumbSchema(config.serviceUrl, config.breadcrumbItems));
  }

  schemas.push(
    createServiceSchema({
      name: config.serviceName,
      description: config.serviceDescription,
      url: config.serviceUrl,
      price: config.price,
      priceCurrency: config.priceCurrency,
      unitText: config.unitText,
    })
  );

  if (config.faqItems && config.faqItems.length > 0) {
    schemas.push(createFAQSchema(config.serviceUrl, config.faqItems));
  }

  schemas.push(
    createWebPageSchema({
      name: config.pageTitle || config.serviceName,
      url: config.serviceUrl,
      description: config.pageDescription || config.serviceDescription,
      breadcrumbId: config.breadcrumbItems ? `${config.serviceUrl}#breadcrumb` : undefined,
      ...(config.serviceImage ? { primaryImageOfPage: config.serviceImage } : {}),
      about: { "@id": `${config.serviceUrl}#service` },
      mainEntity:
        config.faqItems && config.faqItems.length > 0
          ? { "@id": `${config.serviceUrl}#faq` }
          : undefined,
    })
  );

  return createGraph(...schemas);
}
