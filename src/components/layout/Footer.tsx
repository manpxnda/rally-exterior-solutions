import Link from "next/link";
import { site, serviceAreaCities, regionLabel } from "@/lib/site";
import { footerNav } from "@/lib/nav";
import { Logo } from "./Logo";
import { Icon } from "@/components/ui/Icon";
import { CallLink } from "@/components/CallButton";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-ink-200">
      {/* Pre-footer CTA */}
      <div className="border-b border-white/10">
        <div className="container flex flex-col items-center justify-between gap-6 py-10 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              Ready to transform your property?
            </h2>
            <p className="mt-1 text-ink-300">
              Free, no-pressure estimate. Most quotes back same-day.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Get My Free Estimate
            </Button>
            <Button href={site.phoneHref} variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white">
              <Icon name="phone" className="h-5 w-5" />
              {site.phoneDisplay}
            </Button>
          </div>
        </div>
      </div>

      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">
            Premium permanent lighting, holiday lighting, and exterior cleaning
            for homes and businesses across the {regionLabel} region.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <CallLink source="footer" className="font-semibold text-white hover:text-gold-300" />
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-ink-300 hover:text-white"
            >
              <Icon name="mail" className="h-4 w-4" />
              {site.email}
            </a>
            <p className="flex items-center gap-2 text-ink-300">
              <Icon name="clock" className="h-4 w-4" />
              {site.hoursShort}
            </p>
          </div>
          <div className="mt-5 flex gap-3">
            {site.social.facebook && (
              <SocialLink href={site.social.facebook} label="Facebook">
                <path d="M14 9h2V6h-2c-1.7 0-3 1.3-3 3v1.5H9V13h2v6h2.5v-6H16l.5-2.5H13.5V9c0-.6.4-1 .9-1Z" />
              </SocialLink>
            )}
            {site.social.instagram && (
              <SocialLink href={site.social.instagram} label="Instagram">
                <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="16.4" cy="7.6" r="1" />
              </SocialLink>
            )}
            {site.social.google && (
              <SocialLink href={site.social.google} label="Google reviews">
                <path d="M21 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.1c-.2 1.2-.9 2.2-1.9 2.9v2.4h3.1c1.8-1.7 2.7-4.1 2.7-7Z" />
                <path d="M12 21c2.6 0 4.7-.9 6.3-2.3l-3.1-2.4c-.9.6-2 .9-3.2.9-2.5 0-4.5-1.7-5.3-3.9H3.5v2.5C5.1 19 8.3 21 12 21Z" />
                <path d="M6.7 13.3c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8V7.2H3.5C2.9 8.5 2.5 9.9 2.5 11.5s.4 3 1 4.3l3.2-2.5Z" />
                <path d="M12 6.5c1.4 0 2.7.5 3.7 1.4l2.7-2.7C16.7 3.7 14.6 2.9 12 2.9 8.3 2.9 5.1 5 3.5 8l3.2 2.5C7.5 8.2 9.5 6.5 12 6.5Z" />
              </SocialLink>
            )}
          </div>
        </div>

        {/* Services */}
        <div className="lg:col-span-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Services
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerNav.services.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink-300 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerNav.company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink-300 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Service area */}
        <div className="lg:col-span-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Proudly Serving
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-300">
            {serviceAreaCities.slice(0, 8).join(" · ")} and the surrounding{" "}
            {regionLabel} region.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-400 sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-400 hover:text-ink-900"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
