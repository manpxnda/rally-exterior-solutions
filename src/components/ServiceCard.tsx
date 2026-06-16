import Link from "next/link";
import type { Service } from "@/data/services";
import { Icon } from "@/components/ui/Icon";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-gold-200 hover:shadow-cardHover"
    >
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ink-900 text-gold-300 transition-colors group-hover:bg-gold-400 group-hover:text-ink-900">
        <Icon name={service.icon} className="h-6 w-6" />
      </span>

      <h3 className="text-lg font-bold text-ink-900">{service.name}</h3>
      <p className="mt-1 text-sm font-semibold text-gold-600">
        {service.tagline}
      </p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
        {service.summary}
      </p>

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900">
        Learn more
        <Icon
          name="arrowRight"
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
