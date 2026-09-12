"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lightingServices, cleaningServices } from "@/data/services";
import { getAttribution, trackLeadSubmit } from "@/lib/analytics";
import type { LeadFormVariant } from "@/lib/journeys";
import { Button } from "@/components/ui/Button";
import { ConsentCheckboxes } from "@/components/ConsentCheckboxes";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * One form component, five journeys — the visitor only ever sees fields that
 * match what they just clicked:
 *  - "permanent" → design-consultation request (address + what the home should feel like)
 *  - "christmas" → remote-quote request (address + look + optional front-of-home photo)
 *  - "landscape" → landscape design request (address + areas to light)
 *  - "cleaning"  → estimate request scoped to the cleaning services only (never lighting)
 *  - "default"   → generic form; service dropdown is GROUPED (Exterior Lighting /
 *                  Other Exterior Services) so the hierarchy is never flattened.
 * All variants post the same payload shape to /api/lead (service slug, source,
 * attribution, consent) — no CRM/webhook schema change.
 */
export type { LeadFormVariant };

const FORMSPREE = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

const FIXED_SERVICE: Partial<Record<LeadFormVariant, string>> = {
  permanent: "permanent-lighting",
  christmas: "holiday-lighting",
  landscape: "landscape-lighting",
};

const SUBMIT: Record<LeadFormVariant, string> = {
  default: "Send to Rally",
  permanent: "Request My Design Consultation",
  christmas: "Get My Christmas Quote",
  landscape: "Request My Landscape Design",
  cleaning: "Get My Free Estimate",
};

const NOTE: Record<LeadFormVariant, string> = {
  default: "No spam. No obligation. We typically reply same-day.",
  permanent: "No pressure, no obligation. We'll reach out to schedule a time that works for you.",
  christmas: "No spam. No obligation. We can often design and quote your home remotely.",
  landscape: "No pressure, no obligation. We'll reach out to schedule a design visit.",
  cleaning: "No spam. No obligation. We typically reply same-day with a clear, written quote.",
};

// Photo uploads are downscaled in the browser before they're sent.
const PHOTO_MAX_EDGE = 1600;
const PHOTO_MAX_INPUT_BYTES = 15 * 1024 * 1024;

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40";

export function LeadForm({
  defaultService,
  source = "lead_form",
  compact = false,
  variant = "default",
  className,
}: {
  defaultService?: string;
  source?: string;
  compact?: boolean;
  variant?: LeadFormVariant;
  className?: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [photoName, setPhotoName] = useState<string>("");

  const isLighting = variant === "permanent" || variant === "christmas" || variant === "landscape";
  const fixedService = FIXED_SERVICE[variant];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill hidden fields; humans don't.
    if (data.get("company")) {
      setStatus("success");
      return;
    }

    const rawDetails = String(data.get("details") || "").trim();
    const preference = String(data.get("preference") || "").trim();
    const address = String(data.get("address") || "").trim();

    // Fold the journey-specific answer into `details` (no downstream schema change).
    const details = [
      variant === "permanent" && preference ? `Wants the home to feel: ${preference}` : "",
      variant === "christmas" && preference ? `Preferred look: ${preference}` : "",
      variant === "landscape" && preference ? `Areas to light: ${preference}` : "",
      rawDetails,
    ]
      .filter(Boolean)
      .join("\n");

    const payload: Record<string, unknown> = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      email: String(data.get("email") || "").trim(),
      service: fixedService ?? String(data.get("service") || "").trim(),
      zip: String(data.get("zip") || "").trim(),
      address,
      details,
      source,
      submittedAt: new Date().toISOString(),
      attribution: getAttribution(),
      sms_marketing_consent: data.get("sms_marketing_consent") ? "yes" : "no",
      sms_informational_consent: data.get("sms_informational_consent") ? "yes" : "no",
      consent_timestamp: new Date().toISOString(),
      consent_page: typeof window !== "undefined" ? window.location.pathname : "",
    };

    if (!payload.name || !payload.phone) {
      setError("Please add your name and phone number.");
      setStatus("error");
      return;
    }
    if (isLighting && !address) {
      setError("Please add the address of the home so we can take a look.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const file = data.get("photo");
      if (file instanceof File && file.size > 0) {
        if (file.size > PHOTO_MAX_INPUT_BYTES) throw new Error("photo-too-large");
        payload.photo = await downscalePhoto(file);
      }

      const endpoint = FORMSPREE || "/api/lead";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      trackLeadSubmit({ service: payload.service || "unspecified", source });
      setStatus("success");
      form.reset();
      router.push(`/thank-you?service=${encodeURIComponent(String(payload.service || ""))}`);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error && err.message === "photo-too-large"
          ? "That photo is very large — please choose one under 15 MB, or skip the photo and we'll follow up."
          : "Something went wrong. Please call us — we'd love to help right away."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("flex flex-col items-center gap-3 rounded-2xl bg-white p-8 text-center text-ink-900 shadow-card", className)}>
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Icon name="check" className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <h3 className="text-xl font-bold">Request received!</h3>
        <p className="text-ink-500">Thanks — a member of the Rally team will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)} noValidate>
      {/* Honeypot (visually hidden, not display:none so bots fill it) */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field label="Full name" name="name" autoComplete="name" placeholder="Jane Smith" required />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="(740) 555-0123" required />
      </div>

      {isLighting ? (
        <>
          <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
            <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@email.com" optional />
            <Field label="Home address" name="address" autoComplete="street-address" placeholder="123 Main St, Wheeling, WV" required />
          </div>

          {variant === "permanent" && (
            <SelectField label="What do you want the home to feel like after dark?" name="preference">
              <option value="">Choose one (or skip)</option>
              <option value="Warm white every night">Warm white every night — clean and architectural</option>
              <option value="Full color for holidays and game day">Full color for holidays, game day, and parties</option>
              <option value="Both">Both — warm white most nights, color when I want it</option>
              <option value="Not sure yet">Not sure yet — show me what&apos;s possible</option>
            </SelectField>
          )}

          {variant === "christmas" && (
            <>
              <SelectField label="Which look are you leaning toward?" name="preference">
                <option value="">Choose one (or let Rally suggest)</option>
                <option value="Warm white">Warm white</option>
                <option value="Cool white">Cool white</option>
                <option value="Multicolor">Multicolor</option>
                <option value="Not sure">Not sure — suggest something for my home</option>
              </SelectField>
              <div>
                <label htmlFor="photo" className="mb-1.5 block text-sm font-semibold text-ink-700">
                  Photo of the front of your home{" "}
                  <span className="font-normal text-ink-400">(optional, helps us quote remotely)</span>
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhotoName(e.target.files?.[0]?.name ?? "")}
                  className="block w-full rounded-xl border border-dashed border-ink-200 bg-white px-4 py-3 text-sm text-ink-600 file:mr-3 file:rounded-full file:border-0 file:bg-ink-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-ink-700"
                />
                {photoName && <p className="mt-1.5 text-xs text-ink-500">Attached: {photoName}</p>}
              </div>
            </>
          )}

          {variant === "landscape" && (
            <SelectField label="What would you like to light?" name="preference">
              <option value="">Choose one (or skip)</option>
              <option value="Trees and landscape beds">Trees and landscape beds</option>
              <option value="Walkways and steps">Walkways and steps</option>
              <option value="Patio or entertaining space">Patio or entertaining space</option>
              <option value="The whole property">The whole property</option>
              <option value="Not sure yet">Not sure yet — show me what&apos;s possible</option>
            </SelectField>
          )}
        </>
      ) : (
        <>
          <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
            <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@email.com" optional />
            <Field label="ZIP code" name="zip" autoComplete="postal-code" placeholder="26003" optional />
          </div>

          {variant === "cleaning" ? (
            <SelectField label="Which service?" name="service" defaultValue={defaultService}>
              <option value="">Select a service</option>
              {cleaningServices.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
              <option value="multiple">Multiple cleaning services</option>
              <option value="not-sure">Not sure yet — help me decide</option>
            </SelectField>
          ) : (
            <SelectField label="What can we help with?" name="service" defaultValue={defaultService}>
              <option value="">Select a service (or “not sure yet”)</option>
              <optgroup label="Exterior Lighting">
                {lightingServices.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Other Exterior Services">
                {cleaningServices.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </optgroup>
              <option value="multiple">Multiple services</option>
              <option value="not-sure">Not sure yet — help me decide</option>
            </SelectField>
          )}
        </>
      )}

      {(!compact || isLighting) && (
        <div>
          <label htmlFor="details" className="mb-1.5 block text-sm font-semibold text-ink-700">
            {isLighting ? "Anything we should know?" : "Project details"}{" "}
            <span className="font-normal text-ink-400">(optional)</span>
          </label>
          <textarea
            id="details"
            name="details"
            rows={3}
            placeholder={
              variant === "permanent"
                ? "Rooflines you want lit, timeline, HOA notes…"
                : variant === "christmas"
                  ? "Rooflines, trees, bushes, wreaths — or just “make it look great”"
                  : variant === "landscape"
                    ? "Trees, beds, steps, the patio — what should feel different after dark?"
                    : "Tell us a little about your home or project…"
            }
            className={inputClass}
          />
        </div>
      )}

      <ConsentCheckboxes />

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
      )}

      <Button type="submit" size="lg" fullWidth className={status === "submitting" ? "pointer-events-none" : ""}>
        {status === "submitting" ? "Sending…" : SUBMIT[variant]}
        {status !== "submitting" && <Icon name="arrowRight" className="h-5 w-5" />}
      </Button>

      <p className="text-center text-xs text-ink-400">{NOTE[variant]}</p>
    </form>
  );
}

/** Downscale an image file in the browser and return a JPEG data URL. */
async function downscalePhoto(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new window.Image();
    i.onload = () => resolve(i);
    i.onerror = () => reject(new Error("bad-image"));
    i.src = dataUrl;
  });
  const scale = Math.min(1, PHOTO_MAX_EDGE / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;
  ctx.drawImage(img, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", 0.82);
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required,
  optional,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink-700">
        {label} {optional && <span className="font-normal text-ink-400">(optional)</span>}
        {required && <span className="text-gold-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={inputClass}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  children,
  defaultValue,
}: {
  label: string;
  name: string;
  children?: React.ReactNode;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink-700">
        {label}
      </label>
      <select id={name} name={name} defaultValue={defaultValue} className={cn(inputClass, "appearance-none")}>
        {children}
      </select>
    </div>
  );
}
