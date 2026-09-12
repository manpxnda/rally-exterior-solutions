"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CallLink } from "@/components/CallButton";
import { ProjectChooser } from "./ProjectChooser";

/**
 * Sticky site header — lighting-first navigation.
 * Legacy cleaning services live in the quieter "Other Services" dropdown
 * (mainNav item with `muted: true`) so they stay reachable without competing
 * with Permanent / Christmas / Landscape.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop nav shows from xl (1280px); below that the menu button is used.
  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const primary = mainNav.filter((l) => !l.muted);
  const secondary = mainNav.filter((l) => l.muted);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-shadow",
        scrolled
          ? "border-ink-100 bg-white/95 shadow-sm backdrop-blur"
          : "border-transparent bg-white"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo priority />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {mainNav.map((link) =>
            link.children ? (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm transition-colors",
                    link.muted
                      ? "font-medium text-ink-400 hover:text-ink-700"
                      : "font-semibold text-ink-700 hover:text-ink-900"
                  )}
                >
                  {link.label}
                  <Icon
                    name="chevronDown"
                    className="h-4 w-4 transition-transform group-hover:rotate-180"
                  />
                </Link>
                {/* Dropdown */}
                <div className="invisible absolute right-0 top-full w-72 translate-y-1 pt-2 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-xl border border-ink-100 bg-white p-2 shadow-cardHover">
                    {link.muted && (
                      <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-ink-400">
                        Exterior cleaning &amp; more
                      </p>
                    )}
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-ink-900"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          {/* Phone: icon-only on laptop widths, full number from 2xl up */}
          <CallLink
            source="header"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-ink-50 text-ink-900 hover:bg-ink-100 xl:inline-flex 2xl:hidden"
          >
            <Icon name="phone" className="h-5 w-5" />
            <span className="sr-only">Call {site.phoneDisplay}</span>
          </CallLink>
          <CallLink
            source="header"
            className="hidden whitespace-nowrap text-sm font-semibold text-ink-700 hover:text-ink-900 2xl:inline-flex"
          />
          <ProjectChooser size="sm" className="hidden sm:inline-flex" />

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 hover:bg-ink-50 xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto xl:hidden">
          <div className="container border-t border-ink-100 py-4">
            {/* Lighting — the front door */}
            <div className="space-y-0.5">
              {primary.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-3 text-base font-semibold text-ink-900 hover:bg-ink-50"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Legacy services — quieter, still one tap away */}
            {secondary.map((link) => (
              <div key={link.href} className="mt-3 border-t border-ink-100 pt-3">
                <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-ink-400">
                  {link.label}
                </p>
                <div className="grid grid-cols-2 gap-x-2">
                  {link.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="grid gap-3 pt-5">
              <Button href="/design-consultation" size="lg" fullWidth>
                Design My Home
              </Button>
              <Button href="/christmas-quote" variant="secondary" size="lg" fullWidth>
                Get My Christmas Quote
              </Button>
              <Button href={site.phoneHref} variant="outline" size="lg" fullWidth>
                <Icon name="phone" className="h-5 w-5" />
                Call {site.phoneDisplay}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
