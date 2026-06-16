"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/data/services";
import { getAttribution, trackLeadSubmit } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const FORMSPREE = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

/**
 * The primary conversion instrument.
 * Friction-light (5 fields, only 3 required) but still qualifies the lead with
 * service interest + ZIP so the team can prioritize and route.
 *
 * Posts to /api/lead by default, or directly to Formspree if
 * NEXT_PUBLIC_FORMSPREE_ENDPOINT is set. Fires lead conversion tracking on success.
 */
export function LeadForm({
  defaultService,
  source = "lead_form",
  compact = false,
  className,
}: {
  defaultService?: string;
  source?: string;
  compact?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill hidden fields; humans don't.
    if (data.get("company")) {
      setStatus("success"); // silently accept; don't tip off the bot
      return;
    }

    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      email: String(data.get("email") || "").trim(),
      service: String(data.get("service") || "").trim(),
      zip: String(data.get("zip") || "").trim(),
      details: String(data.get("details") || "").trim(),
      source,
      submittedAt: new Date().toISOString(),
      attribution: getAttribution(),
    };

    if (!payload.name || !payload.phone) {
      setError("Please add your name and phone number.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const endpoint = FORMSPREE || "/api/lead";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      trackLeadSubmit({ service: payload.service || "unspecified", source });
      setStatus("success");
      form.reset();

      // Send to the thank-you page for clean destination-based conversions.
      router.push(
        `/thank-you?service=${encodeURIComponent(payload.service || "")}`
      );
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong. Please call us — we'd love to help right away."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-3 rounded-2xl bg-white p-8 text-center text-ink-900 shadow-card",
          className
        )}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Icon name="check" className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <h3 className="text-xl font-bold">Request received!</h3>
        <p className="text-ink-500">
          Thanks — we&apos;ll be in touch shortly with your free estimate.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
      noValidate
    >
      {/* Honeypot (visually hidden, not display:none so bots fill it) */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field
          label="Full name"
          name="name"
          autoComplete="name"
          placeholder="Jane Smith"
          required
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(740) 555-0123"
          required
        />
      </div>

      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          optional
        />
        <SelectField
          label="ZIP code"
          name="zip"
          autoComplete="postal-code"
          placeholder="26003"
          asInput
          optional
        />
      </div>

      <SelectField label="What can we help with?" name="service" defaultValue={defaultService}>
        <option value="">Select a service (or “not sure yet”)</option>
        {services.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.name}
          </option>
        ))}
        <option value="multiple">Multiple services</option>
        <option value="not-sure">Not sure yet — help me decide</option>
      </SelectField>

      {!compact && (
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink-700">
            Project details{" "}
            <span className="font-normal text-ink-400">(optional)</span>
          </label>
          <textarea
            name="details"
            rows={3}
            placeholder="Tell us a little about your home or project…"
            className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
          />
        </div>
      )}

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        fullWidth
        className={status === "submitting" ? "pointer-events-none" : ""}
      >
        {status === "submitting" ? "Sending…" : "Get My Free Estimate"}
        {status !== "submitting" && <Icon name="arrowRight" className="h-5 w-5" />}
      </Button>

      <p className="text-center text-xs text-ink-400">
        No spam. No obligation. We typically reply same-day.
      </p>
    </form>
  );
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
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-semibold text-ink-700"
      >
        {label}{" "}
        {optional && <span className="font-normal text-ink-400">(optional)</span>}
        {required && <span className="text-gold-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  children,
  defaultValue,
  autoComplete,
  placeholder,
  asInput,
  optional,
}: {
  label: string;
  name: string;
  children?: React.ReactNode;
  defaultValue?: string;
  autoComplete?: string;
  placeholder?: string;
  asInput?: boolean;
  optional?: boolean;
}) {
  const labelEl = (
    <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink-700">
      {label}{" "}
      {optional && <span className="font-normal text-ink-400">(optional)</span>}
    </label>
  );

  if (asInput) {
    return (
      <div>
        {labelEl}
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
        />
      </div>
    );
  }

  return (
    <div>
      {labelEl}
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="w-full appearance-none rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
      >
        {children}
      </select>
    </div>
  );
}
