import type { Metadata } from "next";
import { site, regionLabel } from "@/lib/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
  alternates: { canonical: "/privacy" },
};

// NOTE: This is a practical starter policy. Have it reviewed by an attorney
// before relying on it, especially if you run paid ads or collect lots of data.
export default function PrivacyPage() {
  const updated = "September 2026";

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${updated}`}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy" },
        ]}
      />

      <Section tone="white">
        <div className="mx-auto max-w-3xl space-y-8 text-ink-700">
          <Block title="Overview">
            <p>
              {site.legalName}, doing business as Rally Exterior Solutions
              (&ldquo;Rally,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;),
              operates {site.url} and provides exterior lighting and cleaning
              services in the {regionLabel} region. This policy explains what
              information we collect and how we use it.
            </p>
            <p>
              <strong>Contact:</strong> {site.phoneDisplay} ·{" "}
              {site.email} · {site.address.street}, {site.address.city},{" "}
              {site.address.region} {site.address.postalCode}
            </p>
          </Block>

          <Block title="Information we collect">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Information you provide:</strong> your name, phone
                number, email, address/ZIP, and project details when you submit
                an estimate request or contact us.
              </li>
              <li>
                <strong>Automatically collected:</strong> standard analytics
                data such as pages visited, device/browser type, and referral
                source, including marketing identifiers (e.g. UTM parameters,
                Google click ID, Meta click ID) used to measure ad performance.
              </li>
            </ul>
          </Block>

          <Block title="How we use your information">
            <ul className="list-disc space-y-2 pl-5">
              <li>To respond to your request and provide an estimate.</li>
              <li>To schedule and perform services you request.</li>
              <li>To communicate with you about your project.</li>
              <li>
                To measure and improve our website and advertising performance.
              </li>
            </ul>
          </Block>

          <Block title="Analytics &amp; advertising">
            <p>
              We may use Google Analytics, Google Ads, and the Meta Pixel to
              understand site traffic and measure conversions. These services
              may set cookies and collect usage data subject to their own
              privacy policies. You can opt out of personalized advertising
              through your Google and Meta account settings or your browser.
            </p>
          </Block>

          <Block title="How we share information">
            <p>
              We do not sell your personal information. We share it only with
              service providers that help us operate (for example, our hosting,
              email, scheduling/CRM, and analytics tools) and as required by
              law.
            </p>
          </Block>

          <Block title="SMS / Text Messaging">
            <p>
              No mobile information will be shared with third
              parties/affiliates for marketing/promotional purposes.
              Information sharing to subcontractors in support services, such
              as customer service, is permitted. All other use case categories
              exclude text messaging originator opt-in data and consent; this
              information will not be shared with any third parties.
            </p>
            <p>
              If you opt in, Rally Lawn Care Services LLC (DBA Rally Exterior
              Solutions) sends two categories of text messages:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Informational messages</strong> — quote confirmations,
                appointment confirmations and reminders, quote delivery, and
                service updates.
              </li>
              <li>
                <strong>Marketing messages</strong> — special offers,
                discounts, and service updates.
              </li>
            </ul>
            <p>
              We collect SMS consent through the checkboxes on our website
              forms, through our Facebook/Instagram lead form, and in person
              during on-site quotes. Consent is not a condition of purchase.
            </p>
            <p>
              You can opt out at any time by replying <strong>STOP</strong> to
              any message. For help, reply <strong>HELP</strong> or contact us
              at{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-ink-900 underline">
                {site.email}
              </a>{" "}
              or {site.phoneDisplay}.
            </p>
          </Block>

          <Block title="Data retention &amp; security">
            <p>
              We keep lead and customer information only as long as needed to
              provide services and meet legal obligations, and we take
              reasonable measures to protect it. No method of transmission over
              the internet is 100% secure.
            </p>
          </Block>

          <Block title="Your choices">
            <p>
              You may request access to, correction of, or deletion of your
              personal information by contacting us at{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-ink-900 underline">
                {site.email}
              </a>
              . You can also opt out of marketing messages at any time.
            </p>
          </Block>

          <Block title="Contact us">
            <p>
              Questions about this policy? Reach us at{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-ink-900 underline">
                {site.email}
              </a>{" "}
              or{" "}
              <a href={site.phoneHref} className="font-semibold text-ink-900 underline">
                {site.phoneDisplay}
              </a>
              .
            </p>
          </Block>
        </div>
      </Section>
    </>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold text-ink-900">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}
