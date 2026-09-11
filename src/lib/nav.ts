import { services, cleaningServices } from "@/data/services";

export type NavLink = {
  label: string;
  href: string;
  /** Rendered smaller/quieter — used for the legacy "Other Services" menu. */
  muted?: boolean;
  children?: { label: string; href: string }[];
};

/**
 * PRIMARY NAVIGATION — lighting first (2026 repositioning).
 * ----------------------------------------------------------------------------
 * Rally's front door is exterior lighting. The legacy cleaning services keep
 * every page and URL, but live under an understated "Other Services" menu so
 * they stay reachable (customers + crawlers) without competing with lighting.
 */
export const mainNav: NavLink[] = [
  { label: "Permanent Lighting", href: "/services/permanent-lighting" },
  { label: "Christmas Lighting", href: "/services/holiday-lighting" },
  { label: "Landscape Lighting", href: "/services/landscape-lighting" },
  { label: "Gallery", href: "/gallery" },
  { label: "Why Rally", href: "/about" },
  {
    label: "Other Services",
    href: "/services",
    muted: true,
    children: [
      ...cleaningServices.map((s) => ({
        label: s.name,
        href: `/services/${s.slug}`,
      })),
      { label: "All services", href: "/services" },
    ],
  },
];

const lightingSlugs = ["permanent-lighting", "holiday-lighting", "landscape-lighting"];

export const footerNav = {
  lighting: [
    ...lightingSlugs
      .map((slug) => services.find((s) => s.slug === slug))
      .filter((s): s is NonNullable<typeof s> => Boolean(s))
      .map((s) => ({ label: s.shortName, href: `/services/${s.slug}` })),
    { label: "Lighting Gallery", href: "/gallery" },
    { label: "Design My Home", href: "/design-consultation" },
    { label: "Get My Christmas Quote", href: "/christmas-quote" },
  ],
  // Legacy exterior services — preserved, just not featured on the homepage.
  otherServices: cleaningServices.map((s) => ({
    label: s.name,
    href: `/services/${s.slug}`,
  })),
  company: [
    { label: "Why Rally", href: "/about" },
    { label: "Customer Reviews", href: "/reviews" },
    { label: "Guides & Pricing", href: "/guides" },
    { label: "Service Area", href: "/locations" },
    { label: "All Services", href: "/services" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};
