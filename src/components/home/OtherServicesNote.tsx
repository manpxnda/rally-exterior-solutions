import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

/**
 * One quiet line at the very bottom of the homepage so returning washing
 * customers know Rally still offers exterior cleaning — without giving it a
 * section. Intentionally understated.
 */
export function OtherServicesNote() {
  return (
    <div className="border-t border-ink-100 bg-ink-50">
      <Container className="flex flex-col items-center justify-between gap-2 py-5 text-center text-sm text-ink-600 sm:flex-row sm:text-left">
        <p>
          Looking for pressure washing or exterior cleaning?{" "}
          <span className="text-ink-500">Rally still offers those too.</span>
        </p>
        <Link
          href="/services#other"
          className="inline-flex items-center gap-1.5 font-semibold text-ink-900 underline-offset-4 hover:underline"
        >
          View other exterior services
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
      </Container>
    </div>
  );
}
