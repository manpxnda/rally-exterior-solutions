import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";
// Leads must never be statically cached.
export const dynamic = "force-dynamic";

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  zip?: string;
  details?: string;
  source?: string;
  submittedAt?: string;
  attribution?: Record<string, string>;
  company?: string; // honeypot
};

/**
 * Lead intake endpoint.
 * ----------------------------------------------------------------------------
 * Delivers each submission to whichever destinations are configured via env:
 *   • LEAD_WEBHOOK_URL  → POST JSON (Zapier / Make / Jobber / HubSpot / n8n)
 *   • RESEND_API_KEY    → email notification to LEAD_EMAIL_TO
 * If none are set, the lead is logged to the server console (dev-friendly) and
 * the request still succeeds, so the form never appears broken.
 */
export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — silently accept bot submissions without delivering them.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Name and phone are required." },
      { status: 422 }
    );
  }

  const lead = {
    name,
    phone,
    email: (body.email || "").trim(),
    service: (body.service || "").trim() || "unspecified",
    zip: (body.zip || "").trim(),
    details: (body.details || "").trim(),
    source: (body.source || "website").trim(),
    submittedAt: body.submittedAt || new Date().toISOString(),
    attribution: body.attribution || {},
  };

  const results = await Promise.allSettled([
    forwardToWebhook(lead),
    sendEmail(lead),
  ]);

  const delivered = results.some(
    (r) => r.status === "fulfilled" && r.value === "sent"
  );

  if (!delivered) {
    // No destinations configured (or all failed). Log so nothing is lost.
    console.info("[lead] (no delivery destination configured)", lead);
  }

  return NextResponse.json({ ok: true });
}

async function forwardToWebhook(lead: object): Promise<"sent" | "skipped"> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return "skipped";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.LEAD_WEBHOOK_SECRET
        ? { "X-Rally-Secret": process.env.LEAD_WEBHOOK_SECRET }
        : {}),
    },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return "sent";
}

async function sendEmail(lead: {
  name: string;
  phone: string;
  email: string;
  service: string;
  zip: string;
  details: string;
  source: string;
  attribution: Record<string, string>;
}): Promise<"sent" | "skipped"> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM || "leads@rallyexteriorsolutions.com";
  if (!apiKey || !to) return "skipped";

  const attribution = Object.entries(lead.attribution)
    .map(([k, v]) => `${k}: ${v}`)
    .join("<br/>");

  const html = `
    <h2>New estimate request — ${site.name}</h2>
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(lead.name)}</td></tr>
      <tr><td><strong>Phone</strong></td><td><a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(lead.email) || "—"}</td></tr>
      <tr><td><strong>Service</strong></td><td>${escapeHtml(lead.service)}</td></tr>
      <tr><td><strong>ZIP</strong></td><td>${escapeHtml(lead.zip) || "—"}</td></tr>
      <tr><td><strong>Details</strong></td><td>${escapeHtml(lead.details) || "—"}</td></tr>
      <tr><td><strong>Source</strong></td><td>${escapeHtml(lead.source)}</td></tr>
    </table>
    ${attribution ? `<p style="font-family:sans-serif;font-size:12px;color:#555">${attribution}</p>` : ""}
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${site.name} <${from}>`,
      to: [to],
      reply_to: lead.email || undefined,
      subject: `New Estimate Request: ${lead.name} — ${lead.service}`,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  return "sent";
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
