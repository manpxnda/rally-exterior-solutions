import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MockupPayload = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  lightingType?: string;
  facing?: string;
  spacing?: string;
  colorScheme?: string;
  source?: string;
  submittedAt?: string;
  attribution?: Record<string, string>;
  preview?: string; // data URL (rendered with lights)
  photo?: string; // data URL (clean home photo)
  company?: string; // honeypot
};

/**
 * Lighting-mockup request intake. Same delivery model as /api/lead, but also
 * attaches the customer's rendered preview + original photo so the team can
 * produce a hand-finished mockup. Falls back to console logging if Resend
 * isn't configured, so the form never appears broken.
 */
export async function POST(req: Request) {
  let body: MockupPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (body.company) return NextResponse.json({ ok: true }); // honeypot

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Name and phone are required." },
      { status: 422 }
    );
  }

  const sent = await sendEmail({
    name,
    phone,
    email: (body.email || "").trim(),
    address: (body.address || "").trim(),
    notes: (body.notes || "").trim(),
    lightingType: (body.lightingType || "").trim() || "—",
    facing: (body.facing || "").trim(),
    spacing: (body.spacing || "").trim() || "—",
    colorScheme: (body.colorScheme || "").trim() || "—",
    source: (body.source || "lighting_mockup").trim(),
    attribution: body.attribution || {},
    preview: body.preview || "",
    photo: body.photo || "",
  });

  if (sent !== "sent") {
    console.info("[mockup] (no delivery destination configured)", {
      name,
      phone,
      lightingType: body.lightingType,
    });
  }

  return NextResponse.json({ ok: true });
}

function dataUrlToAttachment(dataUrl: string, filename: string) {
  const m = dataUrl.match(/^data:(image\/[a-z]+);base64,(.+)$/i);
  if (!m) return null;
  return { filename, content: m[2] };
}

async function sendEmail(d: {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  lightingType: string;
  facing: string;
  spacing: string;
  colorScheme: string;
  source: string;
  attribution: Record<string, string>;
  preview: string;
  photo: string;
}): Promise<"sent" | "skipped"> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM || "leads@rallyexteriorsolutions.com";
  if (!apiKey || !to) return "skipped";

  const attribution = Object.entries(d.attribution)
    .map(([k, v]) => `${k}: ${v}`)
    .join("<br/>");

  const html = `
    <h2>New lighting mockup request — ${site.name}</h2>
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
      <tr><td><strong>Name</strong></td><td>${esc(d.name)}</td></tr>
      <tr><td><strong>Phone</strong></td><td><a href="tel:${esc(d.phone)}">${esc(d.phone)}</a></td></tr>
      <tr><td><strong>Email</strong></td><td>${esc(d.email) || "—"}</td></tr>
      <tr><td><strong>Address</strong></td><td>${esc(d.address) || "—"}</td></tr>
      <tr><td><strong>Lighting type</strong></td><td>${esc(d.lightingType)}</td></tr>
      ${d.facing ? `<tr><td><strong>Facing</strong></td><td>${esc(d.facing)}</td></tr>` : ""}
      <tr><td><strong>Spacing</strong></td><td>${esc(d.spacing)}</td></tr>
      <tr><td><strong>Color scheme</strong></td><td>${esc(d.colorScheme)}</td></tr>
      <tr><td><strong>Notes</strong></td><td>${esc(d.notes) || "—"}</td></tr>
      <tr><td><strong>Source</strong></td><td>${esc(d.source)}</td></tr>
    </table>
    <p style="font-family:sans-serif;font-size:13px;color:#555">
      Attached: the customer's live preview (with their lighting choices) and their original home photo. Use the photo to create a hand-finished mockup.
    </p>
    ${attribution ? `<p style="font-family:sans-serif;font-size:12px;color:#555">${attribution}</p>` : ""}
  `;

  const attachments = [
    dataUrlToAttachment(d.preview, "mockup-preview.jpg"),
    dataUrlToAttachment(d.photo, "home-photo.jpg"),
  ].filter(Boolean);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${site.name} <${from}>`,
      to: [to],
      reply_to: d.email || undefined,
      subject: `Lighting Mockup Request: ${d.name} — ${d.lightingType}`,
      html,
      attachments,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  return "sent";
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
