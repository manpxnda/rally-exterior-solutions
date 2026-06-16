import { serviceAreaCities, regionLabel, site } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export function ServiceArea() {
  return (
    <Section tone="muted" id="service-area">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Service Area"
            title={`Proudly serving the ${regionLabel} region`}
            align="left"
          />
          <p className="mt-4 text-ink-500">
            Rally is locally owned and operates within roughly a{" "}
            {site.geo.serviceRadiusMiles}-mile radius of Wheeling, WV — covering
            communities on both sides of the Ohio River. Don&apos;t see your
            town? Reach out; we likely cover you.
          </p>
          <div className="mt-6">
            <Button href="/contact">Check My Availability</Button>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {serviceAreaCities.map((city) => (
            <li
              key={city}
              className="flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-3 py-2.5 text-sm font-medium text-ink-700"
            >
              <Icon name="pin" className="h-4 w-4 shrink-0 text-gold-500" />
              {city}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
