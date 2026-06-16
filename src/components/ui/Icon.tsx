import { cn } from "@/lib/cn";

export type IconName =
  // services
  | "lighting"
  | "snowflake"
  | "house"
  | "roof"
  | "droplet"
  | "concrete"
  | "shield"
  | "building"
  // trust / why
  | "pin"
  | "tag"
  | "bolt"
  | "layers"
  | "sparkle"
  | "chat"
  | "image"
  // ui
  | "phone"
  | "check"
  | "arrowRight"
  | "star"
  | "menu"
  | "close"
  | "chevronDown"
  | "quote"
  | "calendar"
  | "clock"
  | "mail";

const paths: Record<IconName, React.ReactNode> = {
  lighting: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.7.8 1 1.5 1 2.5h6c0-1 .3-1.7 1-2.5A6 6 0 0 0 12 3Z" />
    </>
  ),
  snowflake: (
    <>
      <path d="M12 2v20M4.2 7l15.6 10M19.8 7 4.2 17" />
      <path d="M12 2l2 2-2 2-2-2 2-2ZM4.2 7l2.8.2-.8 2.7M19.8 7l-2.8.2.8 2.7M4.2 17l.8-2.7 2.8.2M19.8 17l-.8-2.7-2.8.2" />
    </>
  ),
  house: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </>
  ),
  roof: (
    <>
      <path d="M2 12 12 4l10 8" />
      <path d="M4 12v8h16v-8" />
      <path d="M8 16h.01M12 16h.01M16 16h.01" />
    </>
  ),
  droplet: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />,
  concrete: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 10h18M3 14.5h18M9 5v5M15 10v4.5M9 14.5V19" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8 3.5-3.6" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M16 15h.01" />
      <path d="M10 21v-3h4v3" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9Z" />
      <circle cx="8" cy="8" r="1.3" />
    </>
  ),
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5M3 17l9 5 9-5" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 7c1 2.5 2.5 4 5 5-2.5 1-4 2.5-5 5-1-2.5-2.5-4-5-5 2.5-1 4-2.5 5-5Z" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12Z" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m4 18 5-5 4 4 3-3 4 4" />
    </>
  ),
  phone: (
    <path d="M5 3h3l2 5-2 1.5a12 12 0 0 0 5.5 5.5L16 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3Z" />
  ),
  check: <path d="m4 12 5 5 11-11" />,
  arrowRight: (
    <>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </>
  ),
  star: (
    <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3Z" />
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  quote: (
    <path d="M7 7h4v4c0 2.2-1.3 3.8-3.5 4.5L7 14c1.2-.4 1.8-1 1.8-2H7V7Zm8 0h4v4c0 2.2-1.3 3.8-3.5 4.5L15 14c1.2-.4 1.8-1 1.8-2H15V7Z" />
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
};

const filled: Partial<Record<IconName, boolean>> = {
  star: true,
  bolt: true,
  quote: true,
  droplet: true,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const isFilled = filled[name];
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6", className)}
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
