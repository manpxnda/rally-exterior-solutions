/**
 * Lightweight analytics helpers.
 * ----------------------------------------------------------------------------
 * Safe to call anywhere — every function no-ops when the matching tag/env var
 * isn't configured, so nothing breaks in development or before tags are set up.
 *
 * Tags themselves are injected by components/analytics/Analytics.tsx, which only
 * loads scripts when the corresponding NEXT_PUBLIC_* env var is present.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export const analyticsConfig = {
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
  googleAdsLeadLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL,
  // Optional: a separate Google Ads conversion action for phone-call/text leads.
  googleAdsCallLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID,
};

/** Fire a Google Ads conversion for a given label, if Ads is configured. */
function trackAdsConversion(label?: string, detail: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (!analyticsConfig.googleAdsId || !label) return;
  window.gtag?.("event", "conversion", {
    send_to: `${analyticsConfig.googleAdsId}/${label}`,
    ...detail,
  });
}

/** Generic GA4 event. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}

/** Fire a Meta Pixel standard or custom event. */
export function trackMeta(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", event, params);
}

/** A phone-number click (call intent). Counts as an Ads conversion if a call label is set. */
export function trackCallClick(source = "site") {
  trackEvent("call_click", { source });
  trackMeta("Contact", { source });
  trackAdsConversion(analyticsConfig.googleAdsCallLabel, { source, method: "call" });
}

/** A text/SMS click (text intent — a softer but real lead signal). */
export function trackTextClick(source = "site") {
  trackEvent("text_click", { source });
  trackMeta("Contact", { source, method: "sms" });
  trackAdsConversion(analyticsConfig.googleAdsCallLabel, { source, method: "sms" });
}

/**
 * The primary conversion: a submitted estimate request.
 * Fires GA4, Meta Pixel Lead, and a Google Ads conversion (if configured).
 */
export function trackLeadSubmit(detail: Record<string, unknown> = {}) {
  trackEvent("generate_lead", { ...detail, currency: "USD" });
  trackMeta("Lead", detail);
  trackAdsConversion(analyticsConfig.googleAdsLeadLabel, detail);
}

/** Read UTM + referral params so they ride along with the lead. */
export function getAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"].forEach(
    (key) => {
      const v = params.get(key);
      if (v) utm[key] = v;
    }
  );
  if (document.referrer) utm.referrer = document.referrer;
  utm.landing_path = window.location.pathname;
  return utm;
}
