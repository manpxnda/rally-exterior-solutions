import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { site, regionLabel, serviceAreaCities } from "@/lib/site";
import { getService, cleaningServices } from "@/data/services";
import { getJourney } from "@/lib/journeys";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/LeadForm";
import { Icon } from "@/components/ui/Icon";
import { CallLink, TextLink } from "@/components/CallButton";
import { Stars } from "@/components/ui/Stars";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

/**
 * /contact — the service CHOOSER, not a generic dump-everything form.
 * ----------------------------------------------------------------------------
 *   /contact                              → "What would you like Rally to help with?"
 *                                           Exterior Lighting (3 doors) first,
 *                                           then "Other exterior services", then
 *                                           a general note form (grouped dropdown).
 *   /contact?service=permanent-lighting   → redirects to /design-consultation
 *   /contact?service=holiday-lighting     → redirects to /christmas-quote
 *   /contact?service=landscape-lighting   → landscape design form (inline)
 *   /contact?service=<cleaning slug>      → cleaning-only form, preselected
 * Old links with ?service= keep working and land in the right journey.
 */
export const metadata: Metadata = {
  title: "Start My Project — Contact Rally Exterior Solutions",
  description: `Start your permanent lighting design, get a Christmas lighting quote, plan landscape lighting, or request a free estimate for one of Rally's exterior cleaning services in the ${regionLabel} region. Call ${site.phoneDisplay} or send a message.`,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  // Lighting journeys have dedicated pages — keep the experience continuous.
  if (service === "permanent-lighting") redirect("/design-consultation");
  if (service === "holiday-lighting") redirect("/christmas-quote");

  const svc = service ? getService(service) : undefined;
  const journey = getJourney(svc?.slug);
  const scoped = Boolean(svc); // landscape or a cleaning service

  const headerTitle = !svc
    ? "What would you like Rally to help with?"
    : svc.slug === "landscape-lighting"
      ? "Let's light beyond the roofline."
      : `Free ${svc.shortName.toLowerCase()} estimate`;

  const headerDescription = !svc
    ? "Rally is an exterior lighting company first. Pick the path that fits, and the next screen will be about exactly that."
    : svc.slug === "landscape-lighting"
      ? "Tell us a little about the property and what you'd like to use after dark. We'll reach out to schedule a design visit."
      : `Tell us about the job and we'll send a clear, written quote — usually the same day. Prefer to talk? Call ${site.phoneDisplay}.`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ])}
      />

      <PageHeader
        eyebrow={svc ? journey.eyebrow : "Start My Project"}
        title={headerTitle}
        description={headerDescription}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      {/* ---------- No service chosen: the chooser ---------- */}
      {!scoped && (
        <Section tone="muted" className="!py-10 sm:!py-14">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-sky-600">Exterior Lighting</p>
          <div className="grid gap-4 md:grid-cols-3">
            <ChooserCard
              href="/design-consultation"
              eyebrow="Permanent lighting"
              title="Design my home"
              body="Designed around your architecture and available year-round. Projects generally start at $3,500."
              icon="lighting"
              iconClass="bg-ink-900 text-sky-300"
            />
            <ChooserCard
              href="/christmas-quote"
              eyebrow="Christmas lighting"
              title="Get my Christmas quote"
              body="Professional displays installed, maintained, removed, and stored by Rally. Packages generally start at $1,500."
              icon="snowflake"
              iconClass="bg-gold-400 text-ink-900"
            />
            <ChooserCard
              href="/contact?service=landscape-lighting"
              eyebrow="Landscape lighting"
              title="Light beyond the roofline"
              body="Trees, walkways, patios, and entertaining spaces — designed by the same Rally team."
              icon="sparkle"
              iconClass="bg-sky-50 text-sky-600"
            />
          </div>

          {/* Other exterior services — introduced explicitly, visually secondary */}
          <div id="other" className="mt-10 scroll-mt-24 rounded-2xl border border-ink-100 bg-white p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-ink-400">Looking for another Rally service?</p>
            <h2 className="mt-1 font-display text-xl font-bold text-ink-900">Exterior cleaning &amp; washing</h2>
            <p className="mt-1 text-sm text-ink-500">
              Rally also offers professional exterior cleaning. Pick the service and the next screen is about that job only.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {cleaningServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/contact?service=${s.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
                  >
                    {s.name}
                    <Icon name="arrowRight" className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* ---------- Contact details + form ---------- */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-2xl font-bold text-ink-900">Talk to a real local team</h2>
            <p className="mt-3 text-ink-600">
              No call centers, no runaround. When you reach out to Rally, you get straight answers and a clear next step.
            </p>

            <div className="mt-8 space-y-5">
              <ContactRow icon="phone" label="Call or text">
                <CallLink source="contact_page" className="text-lg font-bold text-ink-900 hover:text-gold-600">
                  {site.phoneDisplay}
                </CallLink>
                <div className="mt-1">
                  <TextLink source="contact_page" className="text-sm font-semibold text-gold-600 hover:text-gold-700">
                    Text us instead →
                  </TextLink>
                </div>
              </ContactRow>
              <ContactRow icon="mail" label="Email">
                <a href={`mailto:${site.email}`} className="font-semibold text-ink-900 hover:text-gold-600">
                  {site.email}
                </a>
              </ContactRow>
              <ContactRow icon="clock" label="Hours">
                <p className="text-ink-700">{site.hoursShort}</p>
              </ContactRow>
              <ContactRow icon="pin" label="Service area">
                <p className="text-ink-700">
                  {serviceAreaCities.slice(0, 6).join(", ")} &amp; the surrounding {regionLabel} region
                </p>
              </ContactRow>
            </div>

            <div className="mt-8 rounded-2xl border border-ink-100 bg-ink-50 p-5">
              <div className="flex items-center gap-2">
                <Stars rating={site.stats.reviewRating} size="h-4 w-4" />
                <span className="text-sm font-bold text-ink-900">{site.stats.reviewRating}/5</span>
                <span className="text-sm text-ink-500">· {site.stats.reviewCount}+ Google reviews</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-700">
                {(svc?.category === "cleaning"
                  ? ["Fully insured & locally owned", "The right method for every surface", "We're not done until you're thrilled"]
                  : ["Designed around your home, not a catalog", "Professional installation, clean finish", "Rally Care support after the install"]
                ).map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-green-600" strokeWidth={2.5} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {svc?.category === "cleaning" && (
              <p className="mt-6 text-sm text-ink-500">
                Rally also specializes in exterior lighting —{" "}
                <Link href="/" className="font-semibold text-ink-900 underline-offset-2 hover:underline">
                  permanent, Christmas, and landscape →
                </Link>
              </p>
            )}
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-cardHover sm:p-8">
              <span
                className={
                  svc?.category === "cleaning"
                    ? "rounded-full bg-ink-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-ink-700"
                    : "rounded-full bg-sky-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-sky-600"
                }
              >
                {scoped ? journey.eyebrow : "Not sure yet?"}
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink-900">
                {scoped ? journey.heading.charAt(0).toUpperCase() + journey.heading.slice(1) : "Send us a note"}
              </h2>
              <p className="mt-1 text-sm text-ink-500">
                {svc
                  ? svc.priceNote
                  : "Tell us what you're thinking about and we'll point you to the right next step."}
              </p>
              <div className="mt-5">
                <LeadForm
                  source={scoped ? `contact_${svc!.slug}` : "contact_page"}
                  defaultService={svc?.slug}
                  variant={journey.form}
                />
              </div>
            </div>
            {scoped && (
              <p className="mt-4 text-center text-sm text-ink-500">
                Wrong service?{" "}
                <Link href="/contact" className="font-semibold text-ink-900 underline-offset-2 hover:underline">
                  Choose a different path →
                </Link>
              </p>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

function ChooserCard({
  href,
  eyebrow,
  title,
  body,
  icon,
  iconClass,
}: {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: "lighting" | "snowflake" | "sparkle";
  iconClass: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-cardHover"
    >
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconClass}`}>
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <span className="mt-4 block text-xs font-bold uppercase tracking-wider text-ink-400">{eyebrow}</span>
      <span className="mt-1 block font-display text-xl font-bold text-ink-900">{title}</span>
      <span className="mt-2 block flex-1 text-sm text-ink-500">{body}</span>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink-900">
        Start <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: "phone" | "mail" | "clock" | "pin";
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-gold-300">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-ink-400">{label}</p>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  );
}
