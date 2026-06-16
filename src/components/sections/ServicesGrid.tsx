import { services } from "@/data/services";
import { ServiceCard } from "@/components/ServiceCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function ServicesGrid({
  showHeading = true,
  showCta = true,
}: {
  showHeading?: boolean;
  showCta?: boolean;
}) {
  return (
    <Section tone="muted" id="services">
      {showHeading && (
        <SectionHeading
          eyebrow="What We Do"
          title="One trusted team for your entire exterior"
          description="From dazzling lighting to deep-clean washing, Rally handles it all — so your property looks its best year-round without juggling contractors."
          className="mb-12"
        />
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      {showCta && (
        <div className="mt-10 text-center">
          <Button href="/contact" size="lg">
            Get a Free Estimate
          </Button>
          <p className="mt-3 text-sm text-ink-500">
            Not sure what you need? We&apos;ll help you decide — no pressure.
          </p>
        </div>
      )}
    </Section>
  );
}
