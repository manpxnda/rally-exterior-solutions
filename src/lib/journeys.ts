import { getService, cleaningServices, lightingServices } from "@/data/services";

/**
 * CUSTOMER JOURNEYS — single source of truth for "what happens when they click".
 * ----------------------------------------------------------------------------
 * Every CTA, sticky bar, form, and thank-you screen derives its destination,
 * label, and form variant from here, so a visitor who just read about
 * Christmas lighting is never dropped into a form that asks about washing.
 *
 *   permanent-lighting  → /design-consultation   (permanent form)
 *   holiday-lighting    → /christmas-quote        (Christmas form)
 *   landscape-lighting  → /contact?service=landscape-lighting (landscape form)
 *   any cleaning slug   → /contact?service=<slug> (cleaning-only form, preselected)
 *   no context          → /contact               (service chooser page)
 */
export type LeadFormVariant = "default" | "permanent" | "christmas" | "landscape" | "cleaning";

export type Journey = {
  /** service slug this journey is for (undefined = generic chooser) */
  slug?: string;
  href: string;
  /** primary CTA label */
  label: string;
  /** which LeadForm variant to render inline */
  form: LeadFormVariant;
  /** heading above an inline form card */
  heading: string;
  /** eyebrow / category label */
  eyebrow: string;
  category: "lighting" | "cleaning" | "none";
};

export const LIGHTING_SLUGS = lightingServices.map((s) => s.slug);
export const CLEANING_SLUGS = cleaningServices.map((s) => s.slug);

export function getJourney(slug?: string): Journey {
  if (slug === "permanent-lighting") {
    return {
      slug,
      href: "/design-consultation",
      label: "Design My Home",
      form: "permanent",
      heading: "Design my home",
      eyebrow: "Permanent lighting",
      category: "lighting",
    };
  }
  if (slug === "holiday-lighting") {
    return {
      slug,
      href: "/christmas-quote",
      label: "Get My Christmas Quote",
      form: "christmas",
      heading: "Get my Christmas quote",
      eyebrow: "Christmas lighting",
      category: "lighting",
    };
  }
  if (slug === "landscape-lighting") {
    return {
      slug,
      href: "/contact?service=landscape-lighting",
      label: "Design My Landscape Lighting",
      form: "landscape",
      heading: "Light beyond the roofline",
      eyebrow: "Landscape lighting",
      category: "lighting",
    };
  }
  const svc = slug ? getService(slug) : undefined;
  if (svc && svc.category === "cleaning") {
    return {
      slug,
      href: `/contact?service=${svc.slug}`,
      label: "Get a Free Estimate",
      form: "cleaning",
      heading: `Free ${svc.shortName.toLowerCase()} estimate`,
      eyebrow: "Other exterior services",
      category: "cleaning",
    };
  }
  return {
    href: "/contact",
    label: "Start My Project",
    form: "default",
    heading: "Tell us what you need",
    eyebrow: "Start my project",
    category: "none",
  };
}

/** Best-guess journey for a URL path (used by the sticky mobile bar). */
export function getJourneyForPath(pathname: string): Journey {
  if (pathname.startsWith("/design-consultation") || pathname.startsWith("/guides/permanent-lighting")) {
    return getJourney("permanent-lighting");
  }
  if (pathname.startsWith("/christmas-quote") || pathname.startsWith("/guides/christmas-light")) {
    return getJourney("holiday-lighting");
  }
  const m = pathname.match(/^\/(?:services|lp)\/([^/]+)/);
  if (m && getService(m[1])) return getJourney(m[1]);
  // Cleaning pricing guides
  const g = pathname.match(/^\/guides\/([^/]+)/);
  if (g) {
    const map: Record<string, string> = {
      "house-washing-cost": "house-washing",
      "roof-cleaning-cost": "roof-washing",
      "pressure-washing-cost": "pressure-washing",
      "gutter-cleaning-cost": "gutter-cleaning",
      "concrete-cleaning-sealing-cost": "concrete-cleaning",
      "pressure-washing-vs-soft-washing": "pressure-washing",
    };
    if (map[g[1]]) return getJourney(map[g[1]]);
  }
  return getJourney();
}
