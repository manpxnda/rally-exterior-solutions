import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/services";
import { Icon } from "@/components/ui/Icon";

export function ServiceCard({
  service,
  variant = "card",
}: {
  service: Service;
  variant?: "card" | "tile";
}) {
  if (variant === "tile") return <ServiceTile service={service} />;

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

/**
 * Photo-forward tile: a real project photo with the service name overlaid.
 * Used on the homepage grid so mobile visitors *see* each service instead of
 * reading a paragraph. The descriptive copy still lives on the service page.
 */
function ServiceTile({ service }: { service: Service }) {
  const photo = service.tileImage ?? service.image;
  return (
    <Link
      href={`/services/${service.slug}`}
      aria-label={service.name}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-ink-900 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-cardHover"
    >
      {photo ? (
        <Image
          src={photo}
          alt={`${service.name} — Rally Exterior Solutions`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ink-700 to-ink-900" />
      )}

      {/* legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/25 to-ink-900/5" />

      {/* category icon cue (no text) */}
      <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-sm">
        <Icon name={service.icon} className="h-4 w-4" />
      </span>

      <div className="relative p-4">
        <h3 className="font-display text-base font-bold leading-tight text-white sm:text-lg">
          {service.shortName}
        </h3>
        <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-gold-300">
          View
          <Icon
            name="arrowRight"
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
