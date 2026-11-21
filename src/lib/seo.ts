import type { Metadata } from "next";
import { absoluteUrl, business } from "@/content/business";
import { communes, mainTowns, RADIUS_KM } from "@/content/area";
import { services, type Faq, type Service } from "@/content/services";

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: business.name,
      locale: "fr_FR",
      type: "website",
    },
  };
}

const businessId = `${business.url}/#entreprise`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": businessId,
    name: business.name,
    description:
      "Entretien de jardin, taille de haies, tonte, désherbage, bois de chauffage, terrasses, pergolas et carports en bois, élagage léger et conseil habitat gratuit autour de Moréac (Morbihan).",
    url: business.url,
    telephone: business.phoneIntl,
    email: business.email,
    image: absoluteUrl("/opengraph-image"),
    founder: { "@type": "Person", name: business.owner },
    address: {
      "@type": "PostalAddress",
      addressLocality: business.locality,
      postalCode: business.postalCode,
      addressRegion: business.region,
      addressCountry: business.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    areaServed: [
      ...communes.map((name) => ({ "@type": "City", name })),
      {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
        geoRadius: RADIUS_KM * 1000,
      },
    ],
    paymentAccepted: "CESU",
    knowsLanguage: "fr",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services
        .filter((s) => s.available)
        .map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, url: absoluteUrl(s.path), description: s.summary },
        })),
    },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.seo.description,
    url: absoluteUrl(service.path),
    provider: { "@id": businessId },
    areaServed: [business.locality, ...mainTowns.map((t) => t.name)].map((name) => ({
      "@type": "City",
      name,
    })),
  };
}

export function faqSchema(faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Accueil", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
