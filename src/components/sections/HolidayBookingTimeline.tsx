import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/CallButton";

/**
 * Seasonal booking-urgency timeline for the Christmas lighting pages.
 * The urgency is honest: the install calendar really is first-come,
 * first-served, and early bookings really do get the pre-Thanksgiving dates.
 */
const STAGES = [
  {
    window: "September",
    status: "Best availability",
    detail:
      "First pick of install dates — including early November slots that have your lights on before Thanksgiving.",
    tone: "open" as const,
  },
  {
    window: "October",
    status: "Calendar filling",
    detail:
      "Prime dates start going. Booking now still beats the rush, but the earliest installs thin out fast.",
    tone: "open" as const,
  },
  {
    window: "Early November",
    status: "Peak install season",
    detail:
      "Crews are hanging lights daily. We fit new bookings into the remaining gaps — date choice gets limited.",
    tone: "tight" as const,
  },
  {
    window: "Late November on",
    status: "Waitlist territory",
    detail:
      "We'll always try — cancellations happen — but most seasons are fully booked by Thanksgiving week.",
    tone: "tight" as const,
  },
];

export function HolidayBookingTimeline() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="The Install Calendar"
        title="When should you book?"
        description="Install dates are first-come, first-served every season. Here's how the calendar really plays out."
        className="mb-10"
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STAGES.map((s) => (
          <div
            key={s.window}
            className="flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-ink-400">
              {s.window}
            </p>
            <p
              className={
                s.tone === "open"
                  ? "mt-2 inline-flex items-center gap-1.5 font-display text-lg font-bold text-green-700"
                  : "mt-2 inline-flex items-center gap-1.5 font-display text-lg font-bold text-gold-600"
              }
            >
              <Icon
                name={s.tone === "open" ? "check" : "sparkle"}
                className="h-4 w-4 shrink-0"
              />
              {s.status}
            </p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
              {s.detail}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href="/contact?service=holiday-lighting" size="lg">
          Reserve Your Install Date
          <Icon name="arrowRight" className="h-5 w-5" />
        </Button>
        <CallButton source="holiday_timeline" variant="outline" size="lg" />
      </div>
    </Section>
  );
}
