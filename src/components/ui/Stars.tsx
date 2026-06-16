import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export function Stars({
  rating = 5,
  className,
  size = "h-5 w-5",
}: {
  rating?: number;
  className?: string;
  size?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-0.5 text-gold-400", className)}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="star"
          className={cn(size, i < Math.round(rating) ? "opacity-100" : "opacity-25")}
        />
      ))}
    </div>
  );
}
