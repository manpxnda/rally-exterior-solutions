import { services } from "@/data/services";

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const mainNav: NavLink[] = [
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    })),
  },
  { label: "Free Mockup", href: "/mockup" },
  { label: "Gallery", href: "/gallery" },
  { label: "Service Area", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  services: services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  company: [
    { label: "About Rally", href: "/about" },
    { label: "Project Gallery", href: "/gallery" },
    { label: "Free Lighting Mockup", href: "/mockup" },
    { label: "Guides & Pricing", href: "/guides" },
    { label: "Free Estimate", href: "/contact" },
    { label: "Service Area", href: "/locations" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};
