import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

/**
 * LANDSCAPE LIGHTING — secondary by design (smaller section, one CTA).
 * PHOTO: real Rally home; framed on the landscape uplighting in the beds.
 * Replace with a dedicated landscape-lighting photo when one exists.
 */
export function LandscapeTeaser() {
  return (
    <Section tone="white" id="landscape">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-900 shadow-card">
          <Image
            src="/images/lighting/christmas-gingerbread.jpg"
            alt="Warm landscape uplighting on trees and shrubs in front of a brick home at dusk"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[50%_78%]"
          />
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sky-500">
            Landscape Lighting
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            Beyond the roofline.
          </h2>
          <p className="mt-4 max-w-md text-lg text-ink-500">
            The same design eye, brought down to ground level. Rally extends the
            lighting to the parts of the property you actually use after dark.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Landscape lighting areas">
            {["Trees", "Landscape", "Walkways", "Patios", "Entertaining spaces"].map((x) => (
              <li key={x} className="rounded-full border border-ink-100 bg-ink-50 px-3 py-1.5 text-sm font-semibold text-ink-700">
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <Button href="/services/landscape-lighting" variant="outline">
              Explore Landscape Lighting
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
