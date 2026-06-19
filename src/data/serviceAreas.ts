/**
 * SERVICE × CITY combos — dedicated pages for high-intent "[service] [city]"
 * head terms (e.g. "christmas lights wheeling wv"), generated at
 * /services/[slug]/[city].
 * ----------------------------------------------------------------------------
 * CURATED, not a full matrix — only real-demand combos in the biggest towns, so
 * each page is a genuine local page (unique city context from locations.ts), not
 * a thin "doorway" page. Lighting is weighted heaviest because that's where the
 * measured local search volume is (Keyword Planner: "christmas lights wheeling
 * wv" ≈ 500/mo).
 *
 * To add a combo: add the city slug (must exist in locations.ts) to a service.
 */
export const serviceCityCombos: Record<string, string[]> = {
  "holiday-lighting": [
    "wheeling-wv",
    "steubenville-oh",
    "st-clairsville-oh",
    "moundsville-wv",
    "martins-ferry-oh",
    "bellaire-oh",
    "bridgeport-oh",
    "weirton-wv",
  ],
  "permanent-lighting": [
    "wheeling-wv",
    "steubenville-oh",
    "st-clairsville-oh",
    "moundsville-wv",
    "martins-ferry-oh",
    "bellaire-oh",
  ],
  "pressure-washing": [
    "wheeling-wv",
    "steubenville-oh",
    "st-clairsville-oh",
    "moundsville-wv",
    "martins-ferry-oh",
  ],
  "house-washing": ["wheeling-wv", "steubenville-oh", "st-clairsville-oh", "moundsville-wv"],
  "roof-washing": ["wheeling-wv", "steubenville-oh", "st-clairsville-oh"],
};

/** City slugs that have a dedicated page for this service. */
export function getComboCities(serviceSlug: string): string[] {
  return serviceCityCombos[serviceSlug] ?? [];
}

/** Every valid {service, city} combo (for static generation + sitemap). */
export function getAllCombos(): { service: string; city: string }[] {
  return Object.entries(serviceCityCombos).flatMap(([service, cities]) =>
    cities.map((city) => ({ service, city }))
  );
}

/** Is this a curated combo (used to 404 anything off-list)? */
export function isValidCombo(serviceSlug: string, citySlug: string): boolean {
  return (serviceCityCombos[serviceSlug] ?? []).includes(citySlug);
}
