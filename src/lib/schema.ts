/**
 * JSON-LD structured data builders for local SEO rich results.
 * Rendered via the <JsonLd> component (see components/seo/JsonLd.tsx).
 */
import { site, serviceAreaCities } from "@/lib/site";
import { services, type Service } from "@/data/services";
import { faqs, type Faq } from "@/data/faqs";
import { type Location } from "@/data/locations";
import { type Guide } from "@/data/guides";

const BUSINESS_ID = `${site.url}/#business`;

/** Core LocalBusiness / HomeAndConstructionBusiness entity. */
export function localBusinessSchema() {
  const openingHours = site.hours
    .filter((h) => h.open !== "Closed")
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    }));

  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/icon.svg`,
    priceRange: "$$",
    foundingDate: String(site.stats.yearFounded),
    address: {
      "@type": "PostalAddress",
      ...(site.address.street ? { streetAddress: site.address.street } : {}),
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      },
      geoRadius: site.geo.serviceRadiusMiles * 1609, // miles → meters
    },
    serviceArea: serviceAreaCities.map((c) => ({ "@type": "City", name: c })),
    openingHoursSpecification: openingHours,
    sameAs: Object.values(site.social).filter(Boolean),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.stats.reviewRating,
      reviewCount: site.stats.reviewCount,
    },
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name },
    })),
  };
}

/** Per-service Service schema, linked back to the business. */
export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: `${site.url}/services/${service.slug}`,
    provider: { "@id": BUSINESS_ID, "@type": "LocalBusiness", name: site.name },
    areaServed: serviceAreaCities.map((c) => ({ "@type": "City", name: c })),
    category: service.category === "lighting" ? "Lighting Installation" : "Exterior Cleaning",
  };
}

/** Service localized to a single city (for /services/[slug]/[city] combo pages). */
export function serviceInCitySchema(service: Service, loc: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${loc.city}, ${loc.state}`,
    serviceType: service.name,
    description: `${service.name} in ${loc.city}, ${loc.stateName}. ${service.metaDescription}`,
    url: `${site.url}/services/${service.slug}/${loc.slug}`,
    provider: { "@id": BUSINESS_ID, "@type": "LocalBusiness", name: site.name },
    areaServed: { "@type": "City", name: `${loc.city}, ${loc.state}` },
    category: service.category === "lighting" ? "Lighting Installation" : "Exterior Cleaning",
  };
}

/** Per-location LocalBusiness with areaServed = that city (local SEO). */
export function locationSchema(loc: Location) {
  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": `${site.url}/locations/${loc.slug}#business`,
    name: `${site.name} — ${loc.city}, ${loc.state}`,
    description: loc.intro,
    url: `${site.url}/locations/${loc.slug}`,
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    image: `${site.url}/opengraph-image`,
    priceRange: "$$",
    parentOrganization: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: `${loc.city}, ${loc.state}` },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.stats.reviewRating,
      reviewCount: site.stats.reviewCount,
    },
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${s.name} in ${loc.city}, ${loc.state}`,
      },
    })),
  };
}

export function faqSchema(items: Faq[] = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.url}`,
    })),
  };
}

/** Article schema for a guide/resource page (authored by the business). */
export function articleSchema(guide: Guide) {
  const url = `${site.url}/guides/${guide.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    url,
    mainEntityOfPage: url,
    image: `${site.url}/opengraph-image`,
    datePublished: guide.updated,
    dateModified: guide.updated,
    author: { "@id": BUSINESS_ID, "@type": "Organization", name: site.name },
    publisher: { "@id": BUSINESS_ID, "@type": "Organization", name: site.name },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    publisher: { "@id": BUSINESS_ID },
  };
}
