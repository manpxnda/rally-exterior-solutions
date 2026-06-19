/**
 * TARGET KEYWORDS — the searches Jason most wants to win.
 * ----------------------------------------------------------------------------
 * The Owner Dashboard tracks each one's average position + 28-day trend
 * (up/down vs the prior period) from Search Console.
 *
 * Built from a service × town matrix (below) plus hand-picked "near me" and
 * region terms. Edit the arrays to add/remove — write them lowercase, the way
 * people actually search. The dashboard shows an exact match when GSC has that
 * query, otherwise the closest matching query you ARE getting impressions for
 * (marked "≈").
 */

// Highest-value service phrases (how people actually search them).
const SERVICE_PHRASES = [
  "pressure washing",
  "house washing",
  "roof cleaning",
  "permanent lighting",
  "christmas light installation",
];

// Top demand centers within ~30 mi of HQ (43963 / Tiltonsville).
const TOWNS = [
  "wheeling wv",
  "steubenville oh",
  "st clairsville oh",
  "martins ferry oh",
  "bellaire oh",
  "moundsville wv",
  "wellsburg wv",
  "bridgeport oh",
  "cadiz oh",
  "barnesville oh",
];

const matrix = SERVICE_PHRASES.flatMap((p) => TOWNS.map((t) => `${p} ${t}`));

// "Near me" + region + secondary-service terms not in the matrix.
const EXTRAS = [
  // near me (high intent)
  "pressure washing near me",
  "house washing near me",
  "roof cleaning near me",
  "permanent lighting near me",
  "christmas light installation near me",
  "gutter cleaning near me",
  // region
  "pressure washing ohio valley",
  "permanent lighting ohio valley",
  "holiday lighting ohio valley",
  "soft washing ohio valley",
  // secondary services (anchored to the home market)
  "soft washing wheeling wv",
  "concrete cleaning wheeling wv",
  "driveway cleaning wheeling wv",
  "paver sealing wheeling wv",
  "gutter cleaning wheeling wv",
  "commercial pressure washing wheeling",
  // From Google Ads Keyword Planner (2026-06) — measured local demand.
  // "christmas lights wheeling wv" = 500/mo, LOW competition (the big one);
  // lighting terms carry the real local volume in this market.
  "christmas lights wheeling wv",
  "christmas lights ohio valley",
  "christmas lights steubenville ohio",
  "christmas lights st clairsville ohio",
  "christmas lights moundsville wv",
  "christmas light installers wheeling wv",
  "holiday lighting wheeling wv",
  "permanent christmas lights wheeling wv",
  "outdoor lighting wheeling wv",
  "landscape lighting wheeling wv",
];

export const targetKeywords: string[] = [...matrix, ...EXTRAS];
