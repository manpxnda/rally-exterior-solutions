import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SceneSelector } from "./SceneSelector";

const POINTS = [
  "Warm white for everyday architecture",
  "Full color whenever you want it",
  "Scenes and schedules from your phone",
  "Custom-fit track that follows your rooflines",
  "Installed, set up, and supported by Rally",
];

/** PERMANENT LIGHTING FEATURE STORY — transformation first, features second. */
export function PermanentStory() {
  return (
    <Section tone="ink" id="permanent">
      <SectionHeading
        eyebrow="Permanent Lighting"
        title="One system. Every season."
        description="Warm white on a Tuesday. Red and green on December 1. Your team's colors on game day. Same lights, one tap."
        align="left"
        tone="light"
        className="mb-10"
      />

      <SceneSelector />

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {POINTS.map((p) => (
          <li
            key={p}
            className="border-t border-white/15 pt-3 text-sm font-medium text-ink-50 before:mb-3 before:block before:h-0.5 before:w-8 before:-translate-y-[13px] before:bg-sky-400"
          >
            {p}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-start gap-4">
        <Button href="/design-consultation" size="lg">
          Design My Home
          <Icon name="arrowRight" className="h-5 w-5" />
        </Button>
        <p className="max-w-lg text-sm text-ink-200">
          A design consultation is the first step. We&apos;ll walk the home with
          you and show you exactly what it could look like.{" "}
          <Link
            href="/services/permanent-lighting"
            className="font-semibold text-white underline-offset-4 hover:underline"
          >
            More about permanent lighting →
          </Link>
        </p>
      </div>
    </Section>
  );
}
