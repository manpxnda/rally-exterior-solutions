/**
 * Stylized service-area graphic: concentric radius rings + the Ohio River +
 * scattered "towns served" dots around a centered Wheeling pin. Decorative/
 * illustrative (not a literal map) — conveys "~30 miles, both sides of the
 * river" at a glance so the section needs far less prose.
 */
export function ServiceRadiusMap({
  radiusMiles = 30,
  centerLabel = "Wheeling, WV",
}: {
  radiusMiles?: number;
  centerLabel?: string;
}) {
  // town dots scattered inside the outer ring
  const towns = [
    [105, 110],
    [245, 120],
    [110, 215],
    [250, 208],
    [170, 74],
    [80, 165],
    [266, 166],
    [165, 250],
  ];

  return (
    <svg
      viewBox="0 0 340 320"
      role="img"
      aria-label={`Rally serves about a ${radiusMiles}-mile radius around ${centerLabel}, on both sides of the Ohio River`}
      className="h-auto w-full max-w-md"
    >
      <defs>
        <radialGradient id="rmGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FBDDD8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FBDDD8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft glow */}
      <circle cx="170" cy="160" r="150" fill="url(#rmGlow)" />

      {/* concentric radius rings */}
      <circle cx="170" cy="160" r="145" fill="none" stroke="#B6C8D7" strokeWidth="1.5" strokeDasharray="2 6" />
      <circle cx="170" cy="160" r="100" fill="none" stroke="#B6C8D7" strokeWidth="1.5" strokeDasharray="2 6" />
      <circle cx="170" cy="160" r="55" fill="none" stroke="#D9E3EC" strokeWidth="1.5" />

      {/* the Ohio River winding through */}
      <path
        d="M30 95 C100 150 130 120 175 160 C220 200 250 175 312 235"
        fill="none"
        stroke="#9BD6D3"
        strokeWidth="15"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M30 95 C100 150 130 120 175 160 C220 200 250 175 312 235"
        fill="none"
        stroke="#39ABA8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 7"
        opacity="0.8"
      />

      {/* towns served */}
      {towns.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill="#EA6F61" opacity="0.12" />
          <circle cx={x} cy={y} r="3.5" fill="#EA6F61" />
        </g>
      ))}

      {/* center pin — Wheeling */}
      <circle cx="170" cy="160" r="20" fill="none" stroke="#F0978A" strokeWidth="1.5" opacity="0.7" />
      <circle cx="170" cy="160" r="11" fill="#EA6F61" />
      <circle cx="170" cy="160" r="4" fill="#fff" />

      {/* labels */}
      <text x="170" y="196" textAnchor="middle" className="font-display" fill="#173D59" fontSize="14" fontWeight="700">
        {centerLabel}
      </text>
      <text x="170" y="35" textAnchor="middle" className="font-sans" fill="#34546C" fontSize="12.5" fontWeight="600">
        ~{radiusMiles}-mile service radius
      </text>
      <text x="312" y="255" textAnchor="end" className="font-sans" fill="#20706E" fontSize="11.5" fontWeight="600">
        Ohio River
      </text>
    </svg>
  );
}
