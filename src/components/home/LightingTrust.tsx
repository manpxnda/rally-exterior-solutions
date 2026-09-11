import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Stars } from "@/components/ui/Stars";

/**
 * Trust strip — proof that doesn't require invented numbers.
 * The Google rating comes from site.stats (confirm against the live Google
 * Business Profile before relying on it in ads). Review COUNT is intentionally
 * not shown here.
 */
export function LightingTrust() {
  const items = [
    {
      label: `${site.stats.reviewRating} on Google`,
      sub: "From local homeowners",
      stars: true,
    },
    {
      label: "Local team",
      sub: `Based in ${site.address.city}, ${site.address.region} — not a franchise`,
    },
    {
      label: "Professional installation",
      sub: "Rally crews. Clean work. Respect for the property.",
    },
    {
      label: "Rally Care",
      sub: "If something isn't right, we own the next step",
    },
  ];

  return (
    <div className="border-b border-ink-100 bg-cream-50">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 py-7 md:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="border-l-2 border-sky-400 pl-4">
              {item.stars && <Stars rating={site.stats.reviewRating} size="h-4 w-4" className="mb-1" />}
              <dt className="text-sm font-bold text-ink-900 sm:text-base">{item.label}</dt>
              <dd className="mt-0.5 text-xs text-ink-500 sm:text-sm">{item.sub}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}
