import { testimonials as allTestimonials, type Testimonial } from "@/data/testimonials";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stars } from "@/components/ui/Stars";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export function Testimonials({
  items = allTestimonials,
  limit = 6,
  heading = true,
}: {
  items?: Testimonial[];
  limit?: number;
  heading?: boolean;
}) {
  const list = items.slice(0, limit);

  return (
    <Section tone="muted">
      {heading && (
        <SectionHeading
          eyebrow="Customer Reviews"
          title={`Rated ${site.stats.reviewRating}★ by ${site.stats.reviewCount}+ neighbors`}
          description="We earn trust the old-fashioned way: showing up, doing great work, and standing behind it."
          className="mb-12"
        />
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((t, i) => (
          <figure
            key={i}
            className="flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
          >
            <Icon name="quote" className="h-8 w-8 text-gold-300" />
            <blockquote className="mt-3 flex-1 text-ink-700">
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 border-t border-ink-100 pt-4">
              <Stars rating={t.rating ?? 5} size="h-4 w-4" />
              <p className="mt-2 font-bold text-ink-900">{t.name}</p>
              <p className="text-sm text-ink-500">{t.location}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
