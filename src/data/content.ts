/**
 * Shared marketing content: process steps, trust signals, guarantee, value props.
 * Centralized so messaging stays consistent and is easy to tweak.
 */

export type Step = { number: string; title: string; body: string; icon: string };

export const processSteps: Step[] = [
  {
    number: "1",
    title: "Request your free estimate",
    body: "Tell us what you need online or by phone — about 60 seconds, no obligation.",
    icon: "chat",
  },
  {
    number: "2",
    title: "Get a clear, written quote",
    body: "A firm, itemized price for your property — usually the same day.",
    icon: "tag",
  },
  {
    number: "3",
    title: "Relax — we make it shine",
    body: "Our insured crew shows up on time and leaves your property transformed.",
    icon: "sparkle",
  },
];

export type TrustItem = { label: string; sub: string; icon: string };

export const trustSignals: TrustItem[] = [
  { label: "Locally Owned", sub: "Ohio Valley based & operated", icon: "pin" },
  { label: "Fully Insured", sub: "COIs available on request", icon: "shield" },
  { label: "Free Estimates", sub: "Clear pricing, no obligation", icon: "tag" },
  { label: "Same-Day Quotes", sub: "Fast, responsive communication", icon: "bolt" },
];

export const guarantee = {
  title: "The Rally Promise",
  points: [
    {
      title: "Upfront, honest pricing",
      body: "You get a clear written quote before we start. No hidden fees, no surprise add-ons.",
    },
    {
      title: "Respect for your property",
      body: "We protect your landscaping, use the right method for every surface, and leave no mess behind.",
    },
    {
      title: "We're not done until you're thrilled",
      body: "If something isn't right, we make it right. Your satisfaction is the standard.",
    },
  ],
};

/** Big-picture reasons to choose Rally (the 'why us' grid). */
export const whyRally = [
  {
    title: "One company for your whole exterior",
    body: "Lighting, washing, concrete, sealing — no juggling five different contractors.",
    icon: "layers",
  },
  {
    title: "Premium results, not cut corners",
    body: "Commercial-grade products and proven methods that protect your home and last longer.",
    icon: "sparkle",
  },
  {
    title: "Communication you can count on",
    body: "We answer, we show up on time, and we tell you exactly what to expect.",
    icon: "chat",
  },
  {
    title: "Visible, dramatic transformations",
    body: "Before-and-after results you'll want to show off to the whole neighborhood.",
    icon: "image",
  },
];
