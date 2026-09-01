import Link from "next/link";
import {
  SMS_MARKETING_CONSENT_LABEL,
  SMS_INFORMATIONAL_CONSENT_LABEL,
} from "@/lib/consent";

/**
 * A2P 10DLC SMS consent checkboxes.
 * Both are OPTIONAL and unchecked by default — they must never gate submission.
 * Values post as sms_marketing_consent / sms_informational_consent ("yes"
 * when checked; the submit handlers send "no" otherwise).
 */
export function ConsentCheckboxes() {
  return (
    <div className="space-y-3">
      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-500">
        <input
          type="checkbox"
          name="sms_marketing_consent"
          value="yes"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 accent-gold-500"
        />
        <span>{SMS_MARKETING_CONSENT_LABEL}</span>
      </label>
      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-500">
        <input
          type="checkbox"
          name="sms_informational_consent"
          value="yes"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 accent-gold-500"
        />
        <span>{SMS_INFORMATIONAL_CONSENT_LABEL}</span>
      </label>
      <p className="text-xs text-ink-500">
        By submitting you agree to our{" "}
        <Link href="/privacy" className="font-semibold text-ink-700 underline underline-offset-2">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="font-semibold text-ink-700 underline underline-offset-2">
          Terms &amp; Conditions
        </Link>
        .
      </p>
    </div>
  );
}
