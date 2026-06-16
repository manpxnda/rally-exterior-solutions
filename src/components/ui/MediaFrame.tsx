import Image from "next/image";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Aspect = "video" | "square" | "portrait" | "wide" | "photo";

const aspectClass: Record<Aspect, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/7]",
  photo: "aspect-[4/3]",
};

/**
 * Image with a graceful, on-brand placeholder.
 * Pass a real `src` once photos are added; until then a labeled gradient
 * renders so the design always looks intentional, never broken.
 */
export function MediaFrame({
  src,
  alt,
  label,
  icon = "image",
  aspect = "photo",
  className,
  priority,
  rounded = "rounded-2xl",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src?: string;
  alt: string;
  label?: string;
  icon?: IconName;
  aspect?: Aspect;
  className?: string;
  priority?: boolean;
  rounded?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-ink-800",
        aspectClass[aspect],
        rounded,
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <Placeholder icon={icon} label={label ?? alt} />
      )}
    </div>
  );
}

function Placeholder({ icon, label }: { icon: IconName; label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900 text-center">
      {/* subtle dot grid for texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 px-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/15 text-gold-300 ring-1 ring-gold-400/30">
          <Icon name={icon} className="h-7 w-7" />
        </span>
        <span className="text-sm font-semibold text-ink-100">{label}</span>
        <span className="text-xs uppercase tracking-wider text-ink-300">
          Photo coming soon
        </span>
      </div>
    </div>
  );
}
