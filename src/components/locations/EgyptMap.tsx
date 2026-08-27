"use client";

import type { NMLocation } from "@/lib/locationsData";

/* A stylized dark Egypt map. Markers are placed at APPROXIMATE city positions
   (mx/my) — not exact coordinates — and stay in sync with the location list.
   Purely visual/architectural; directions use the real address. */

// Simplified Egypt silhouette (viewBox 0 0 100 100). Recognizable, not precise.
const EGYPT = "M14,11 L69,10 L73,7 L88,19 L79,27 L90,42 L95,90 L12,92 Z";
// Subtle Nile line for editorial context.
const NILE = "M55,10 C54,26 56,40 59,52 C62,64 66,72 68,82";

export default function EgyptMap({
  locations,
  activeIndex,
  onHover,
  onSelect,
  idBase,
}: {
  locations: NMLocation[];
  activeIndex: number;
  onHover: (i: number | null) => void;
  onSelect: (i: number) => void;
  idBase: string;
}) {
  return (
    <div className="nm-loc-map" role="group" aria-label="Map of National Motors locations in Egypt">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <radialGradient id={`${idBase}-glow`} cx="50%" cy="42%" r="70%">
            <stop offset="0%" stopColor="#1a2740" />
            <stop offset="100%" stopColor="#0a1018" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill={`url(#${idBase}-glow)`} />
        <path d={EGYPT} className="nm-loc-map__land" />
        <path d={NILE} className="nm-loc-map__nile" />
        {locations.map((l, i) =>
          l.comingSoon ? null : (
            <g
              key={l.name}
              className={`nm-loc-map__marker${i === activeIndex ? " is-active" : ""}`}
              transform={`translate(${l.mx} ${l.my})`}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(i)}
              style={{ cursor: "pointer" }}
            >
              <circle className="nm-loc-map__pulse" r="4.5" />
              <circle className="nm-loc-map__ring" r="3.2" />
              <circle className="nm-loc-map__dot" r="1.5" />
            </g>
          )
        )}
      </svg>
      {/* Active label overlaid (kept out of the SVG for crisp text) */}
      {locations[activeIndex] && !locations[activeIndex].comingSoon && (
        <span
          className="nm-loc-map__label"
          style={{ left: `${locations[activeIndex].mx}%`, top: `${locations[activeIndex].my}%` }}
        >
          {locations[activeIndex].name}
        </span>
      )}
    </div>
  );
}
