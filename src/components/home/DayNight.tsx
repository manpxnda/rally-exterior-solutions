import { Section, SectionHeading } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";

/**
 * DAY vs. NIGHT — answers "will it look ugly during the day?"
 * DAY PHOTO NEEDED: a daytime close-up of Rally track under a soffit, matched
 * to the trim. Until it exists, MediaFrame renders its on-brand placeholder.
 * Set `src` on the first MediaFrame when the photo is added.
 */
export function DayNight() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="By day. By night."
        title="Designed to disappear by day. Built to change the home after dark."
        description="Rally fits the track to your rooflines and chooses the track color and placement with the daytime look in mind. Most people never notice it until the sun goes down."
        align="left"
        className="mb-10"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <figure className="overflow-hidden rounded-2xl bg-white shadow-card">
          <MediaFrame
            /* src="/images/lighting/permanent-day-detail.jpg" ← add when photographed */
            alt="Daytime close-up of the lighting track tucked under the roof edge, matched to the trim color"
            label="Daytime detail"
            icon="lighting"
            aspect="photo"
            rounded="rounded-none"
          />
          <figcaption className="flex items-center gap-3 px-5 py-4 text-sm text-ink-600">
            <span className="rounded bg-cream px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-900">Day</span>
            Track color matched to the trim. Tucked under the roof edge.
          </figcaption>
        </figure>
        <figure className="overflow-hidden rounded-2xl bg-white shadow-card">
          <MediaFrame
            src="/images/lighting/permanent-pure-white.jpg"
            alt="The same style of home at night with clean white permanent lighting outlining the rooflines"
            aspect="photo"
            rounded="rounded-none"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <figcaption className="flex items-center gap-3 px-5 py-4 text-sm text-ink-600">
            <span className="rounded bg-ink-900 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-white">Night</span>
            Clean, even light along every line of the home.
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
