import type { Metadata } from "next";
import Link from "next/link";
import { site, regionLabel } from "@/lib/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms of service and SMS program terms for ${site.legalName}, doing business as Rally Exterior Solutions.`,
  alternates: { canonical: "/terms" },
};

// NOTE: The SMS Terms clauses below are carrier-required A2P 10DLC language
// (GoHighLevel approval guide) with Rally's details substituted in. Carrier
// reviewers check them word-for-word — do not edit or paraphrase them.
export default function TermsPage() {
  const updated = "September 2026";

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        description={`Last updated: ${updated}`}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Terms & Conditions", href: "/terms" },
        ]}
      />

      <Section tone="white">
        <div className="mx-auto max-w-3xl space-y-8 text-ink-700">
          <Block title="Who we are">
            <p>
              {site.legalName}, doing business as Rally Exterior Solutions
              (&ldquo;Rally,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;), is a
              local exterior lighting and cleaning company serving the{" "}
              {regionLabel} region. Contact us at {site.phoneDisplay}, by email
              at{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-ink-900 underline">
                {site.email}
              </a>
              , or by mail at {site.address.street}, {site.address.city},{" "}
              {site.address.region} {site.address.postalCode}.
            </p>
          </Block>

          <Block title="Estimates &amp; services">
            <p>
              Estimates are free and non-binding until a written quote is
              accepted. Questions about an estimate, quote, or scheduled
              service? Call {site.phoneDisplay} or email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-ink-900 underline">
                {site.email}
              </a>
              .
            </p>
          </Block>

          <Block title="SMS Terms">
            <p>
              Rally Lawn Care Services LLC (DBA Rally Exterior Solutions)
              operates an SMS/text messaging program. If you opt in, you can
              expect informational messages about your quote and service —
              quote confirmations, appointment confirmations and reminders,
              quote delivery, and service updates — and, if you separately opt
              in to marketing messages, texts about special offers, discounts,
              and service updates.
            </p>
            <p>
              The Rally Lawn Care Services LLC (DBA Rally Exterior Solutions)
              SMS program is intended for individuals 18 years of age or older.
              By opting in to receive text messages, you confirm that you are
              at least 18 years old.
            </p>
            <p>
              You can cancel the SMS service at any time. Just text
              &ldquo;STOP&rdquo; to (740) 208-8632. After you send the SMS
              message &ldquo;STOP&rdquo; to us, we will send you an SMS message
              to confirm that you have been unsubscribed. After this, you will
              no longer receive SMS messages from us. If you want to join
              again, just sign up as you did the first time and we will start
              sending SMS messages to you again. If you are experiencing issues
              with the messaging program you can reply with the keyword HELP
              for more assistance, or you can get help directly at
              info@rallyexteriorsolutions.com.
            </p>
            <p>Carriers are not liable for delayed or undelivered messages.</p>
            <p>
              As always, message and data rates may apply for any messages sent
              to you from us and to us from you. You will receive a varying
              number of messages depending on your quote, appointments, and the
              offers you opted into; message frequency varies. If you have any
              questions about your text plan or data plan, it is best to
              contact your wireless provider.
            </p>
            <p>
              If you have any questions regarding privacy, please read our
              privacy policy:{" "}
              <Link href="/privacy" className="font-semibold text-ink-900 underline">
                https://rallyexteriorsolutions.com/privacy
              </Link>
            </p>
          </Block>

          <Block title="Questions">
            <p>
              Questions about these terms? Reach us at{" "}
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
