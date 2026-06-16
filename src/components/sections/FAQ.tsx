"use client";

import { useState } from "react";
import { faqs as defaultFaqs, type Faq } from "@/data/faqs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { CallButton } from "@/components/CallButton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function FAQ({
  items = defaultFaqs,
  heading = true,
}: {
  items?: Faq[];
  heading?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section tone="white" id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          {heading && (
            <SectionHeading
              eyebrow="Questions? Answered."
              title="Everything you want to know before you book"
              align="left"
            />
          )}
          <p className="mt-4 text-ink-500">
            Still have a question? We&apos;re happy to help — no pressure, no
            obligation.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button href="/contact">Get a Free Estimate</Button>
            <CallButton source="faq" variant="outline" />
          </div>
        </div>

        <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100">
          {items.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-ink-900">{faq.q}</span>
                  <Icon
                    name="chevronDown"
                    className={cn(
                      "h-5 w-5 shrink-0 text-ink-400 transition-transform",
                      isOpen && "rotate-180 text-gold-600"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-200",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 leading-relaxed text-ink-600">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
