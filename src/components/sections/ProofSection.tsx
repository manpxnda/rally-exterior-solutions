import { homepageProof } from "@/data/gallery";
import { getService } from "@/data/services";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Button } from "@/components/ui/Button";

export function ProofSection({ limit = 3 }: { limit?: number }) {
  const items = homepageProof.slice(0, limit);

  return (
    <Section tone="gradient" id="proof">
      <SectionHeading
        eyebrow="See The Difference"
        title="Transformations that speak for themselves"
        description="Drag any slider. This is the curb appeal your neighbors will notice."
        tone="light"
        className="mb-12"
      />

      <div className="grid gap-8 md:grid-cols-3">
        {items.map((item) => {
          const service = getService(item.service);
          return (
            <figure key={item.id} className="flex flex-col">
              <BeforeAfter
                before={item.before}
                after={item.after}
                beforeAlt={`${item.title} before`}
                afterAlt={`${item.title} after`}
              />
              <figcaption className="mt-4">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-sm text-ink-300">
                  {service?.shortName} · {item.location}
                </p>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Button href="/gallery" variant="white" size="lg">
          See the Full Gallery
        </Button>
      </div>
    </Section>
  );
}
