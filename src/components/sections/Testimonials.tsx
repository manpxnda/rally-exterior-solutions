import { testimonials as allTestimonials, type Testimonial } from "@/data/testimonials";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stars } from "@/components/ui/Stars";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8a12 12 0 1 1 0-24c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 1 0 24 44c11 0 20-9 20-20 0-1.3-.1-2.4-.4-3.5Z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5A20 20 0 0 0 24 44Z"
      />
      <path
        fill="#FBBC05"
        d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C42.9 35.9 44 30.4 44 24c0-1.3-.1-2.4-.4-3.5Z"
      />
    </svg>
  );
}

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
              <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-ink-400">
                <GoogleG className="h-3.5 w-3.5" />
                Verified Google review
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
