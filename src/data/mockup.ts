/**
 * LIGHTING MOCKUP TOOL — config.
 * ----------------------------------------------------------------------------
 * Drives the interactive "see your home lit up" tool at /mockup.
 * Edit these option lists freely — the tool + the emailed request adapt.
 * `colors` are hex values used to render the live preview glow.
 */

export type LightingTypeId = "christmas-c9" | "permanent";
export type FacingId = "downward" | "outward" | "inward";
export type SpacingId = "6" | "12";

export type Option<T extends string> = {
  id: T;
  name: string;
  blurb: string;
};

export const lightingTypes: Option<LightingTypeId>[] = [
  {
    id: "christmas-c9",
    name: "Christmas C9 Roofline",
    blurb: "Classic faceted C9 bulbs along the roofline — the timeless holiday look.",
  },
  {
    id: "permanent",
    name: "Permanent Lighting",
    blurb: "Year-round app-controlled LEDs tucked under the eave. Any color, any holiday.",
  },
];

/** Facing only applies to permanent lighting. */
export const facings: Option<FacingId>[] = [
  {
    id: "downward",
    name: "Downward-facing",
    blurb: "Washes light down the face of your home — soft and elegant.",
  },
  {
    id: "outward",
    name: "Outward-facing",
    blurb: "Points toward the street — the boldest, most visible pop of color.",
  },
  {
    id: "inward",
    name: "Inward-facing",
    blurb: "Uplights the soffit and eave — a subtle architectural accent.",
  },
];

export const spacings: Option<SpacingId>[] = [
  {
    id: "6",
    name: '6" spacing',
    blurb: "Denser and brighter — a near-continuous line of light.",
  },
  {
    id: "12",
    name: '12" spacing',
    blurb: "Cleaner, more spaced-out points — classic and economical.",
  },
];

export type ColorScheme = {
  id: string;
  name: string;
  /** one or more hex colors; multiple = repeating pattern along the roofline */
  colors: string[];
  forTypes: LightingTypeId[];
};

export const colorSchemes: ColorScheme[] = [
  { id: "warm-white", name: "Warm White", colors: ["#FFE2B0"], forTypes: ["permanent", "christmas-c9"] },
  { id: "pure-white", name: "Pure White", colors: ["#FFF7E6"], forTypes: ["permanent", "christmas-c9"] },
  { id: "multicolor", name: "Classic Multicolor", colors: ["#E23B3B", "#3BAE5A", "#2B6CE2", "#F0C419", "#F07A1E"], forTypes: ["christmas-c9", "permanent"] },
  { id: "red-white-blue", name: "Red, White & Blue", colors: ["#E23B3B", "#FFFFFF", "#2B6CE2"], forTypes: ["permanent"] },
  { id: "christmas", name: "Christmas Red & Green", colors: ["#E23B3B", "#3BAE5A"], forTypes: ["permanent", "christmas-c9"] },
  { id: "halloween", name: "Halloween Orange & Purple", colors: ["#F07A1E", "#7A3FB0"], forTypes: ["permanent"] },
  { id: "game-day", name: "Game Day Gold & Blue", colors: ["#F4C20D", "#1E3A8A"], forTypes: ["permanent"] },
];

export function schemesFor(typeId: LightingTypeId): ColorScheme[] {
  return colorSchemes.filter((s) => s.forTypes.includes(typeId));
}

/**
 * Known-size reference objects for manual scale calibration. The customer drags
 * a line across one of these in their photo and we compute pixels-per-inch, so
 * 6"/12" spacing (and bulb size) render to true scale.
 */
export type ReferenceObject = { id: string; name: string; inches: number };

export const referenceObjects: ReferenceObject[] = [
  { id: "double-garage", name: "Double garage door — width (16 ft)", inches: 192 },
  { id: "single-garage", name: "Single garage door — width (8 ft)", inches: 96 },
  { id: "entry-door", name: "Entry door — height (6 ft 8 in)", inches: 80 },
  { id: "window", name: "Standard window — width (3 ft)", inches: 36 },
  { id: "custom", name: "Custom length…", inches: 0 },
];
