"use client";

import { useMemo, useState } from "react";
import { Navigation } from "lucide-react";
import EgyptMap from "@/components/locations/EgyptMap";
import {
  NETWORK_LOCATIONS,
  NETWORK_BRANDS,
  type NetworkBrand,
} from "@/lib/networkData";

const mapsSearch = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ", Egypt")}`;

type Filter = "All" | NetworkBrand;

export default function AutomotiveNetwork() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState(0);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? NETWORK_LOCATIONS
        : NETWORK_LOCATIONS.filter((l) => l.brands.includes(filter)),
    [filter]
  );

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { All: NETWORK_LOCATIONS.length, Joylong: 0, Farizon: 0, Blu: 0 };
    for (const l of NETWORK_LOCATIONS) for (const b of l.brands) c[b] += 1;
    return c;
  }, []);

  const select = (i: number) => setActive(Math.max(0, Math.min(i, filtered.length - 1)));

  return (
    <div className="nm-net">
      <div className="nm-net__filters" role="group" aria-label="Filter by brand">
        {(["All", ...NETWORK_BRANDS] as Filter[]).map((b) => (
          <button
            key={b}
            type="button"
            className={`nm-net__chip${filter === b ? " is-active" : ""}`}
            aria-pressed={filter === b}
            onClick={() => {
              setFilter(b);
              setActive(0);
            }}
          >
            {b}
            <span className="nm-net__chip-count">{counts[b]}</span>
          </button>
        ))}
      </div>

      <div className="nm-net__grid">
        <ul className="nm-net__list" aria-label="Distributor locations">
          {filtered.map((l, i) => (
            <li
              key={`${l.name}-${l.address}`}
              className={`nm-net__item${i === active ? " is-active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocusCapture={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <div className="nm-net__item-head">
                <h3 className="nm-net__item-name">{l.name}</h3>
                <span className="nm-net__badges">
                  {l.brands.map((b) => (
                    <span key={b} className="nm-net__badge" data-brand={b}>
                      {b}
                    </span>
                  ))}
                </span>
              </div>
              <p className="nm-net__item-addr">{l.address}</p>
              <a
                href={mapsSearch(l.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="nm-net__dir"
                onClick={(e) => e.stopPropagation()}
              >
                <Navigation strokeWidth={1.6} aria-hidden="true" />
                <span>Get Directions</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="nm-net__map">
          <EgyptMap
            locations={filtered}
            activeIndex={active}
            onHover={(i) => i !== null && select(i)}
            onSelect={select}
            idBase="network"
          />
          <p className="nm-net__maphint">
            {filtered.length} location{filtered.length === 1 ? "" : "s"} across Egypt
          </p>
        </div>
      </div>
    </div>
  );
}
