"use client";

import { useMemo, useState } from "react";
import { Search, Phone, ArrowUpRight, Mail, Navigation } from "lucide-react";
import type { LocationEntry } from "@/lib/brandsData";

const mapsSearch = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ", Egypt")}`;
const mapsEmbed = (address: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(address + ", Egypt")}&z=14&output=embed`;
const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export default function BrandLocations({
  sectionTitle,
  sectionDescription,
  entries,
  searchable = true,
}: {
  sectionTitle: string;
  sectionDescription: string;
  entries: LocationEntry[];
  searchable?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [selected, setSelected] = useState(0);

  const regions = useMemo(() => {
    const set = Array.from(new Set(entries.map((e) => e.region)));
    set.sort();
    return ["All", ...set];
  }, [entries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries
      .map((e, i) => ({ e, i }))
      .filter(({ e }) => {
        const inRegion = region === "All" || e.region === region;
        const inQuery =
          !q ||
          e.name.toLowerCase().includes(q) ||
          e.address.toLowerCase().includes(q) ||
          e.region.toLowerCase().includes(q);
        return inRegion && inQuery;
      });
  }, [entries, query, region]);

  // Keep the map showing a valid, currently-visible entry.
  const activeIndex = filtered.some(({ i }) => i === selected)
    ? selected
    : filtered[0]?.i ?? 0;
  const active = entries[activeIndex];

  return (
    <section id="locations" className="nm-loc" aria-label={sectionTitle}>
      <div className="nm-shell">
        <header className="nm-loc__head">
          <p className="nm-eyebrow nm-eyebrow--gap">{sectionTitle}</p>
          <p className="nm-lead nm-loc__desc">{sectionDescription}</p>
        </header>

        <div className="nm-loc__grid">
          {/* LEFT — search, filters, list */}
          <div className="nm-loc__panel">
            {searchable && (
              <>
                <div className="nm-loc__search">
                  <Search strokeWidth={1.6} aria-hidden="true" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, city or area"
                    aria-label="Search locations"
                  />
                </div>

                {regions.length > 3 && (
                  <div className="nm-loc__filters" role="group" aria-label="Filter by area">
                    {regions.map((r) => (
                      <button
                        key={r}
                        type="button"
                        className={`nm-loc__chip${region === r ? " is-active" : ""}`}
                        aria-pressed={region === r}
                        onClick={() => setRegion(r)}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}

                <p className="nm-loc__count" aria-live="polite">
                  {filtered.length} {filtered.length === 1 ? "location" : "locations"}
                </p>
              </>
            )}

            <ul className="nm-loc__list">
              {filtered.map(({ e, i }) => {
                const isOpen = i === activeIndex;
                return (
                  <li key={`${e.name}-${i}`} className={`nm-loc__item${isOpen ? " is-active" : ""}`}>
                    <button
                      type="button"
                      className="nm-loc__item-btn"
                      aria-expanded={isOpen}
                      aria-current={isOpen || undefined}
                      onClick={() => setSelected(i)}
                    >
                      <span className="nm-loc__n">{String(i + 1).padStart(2, "0")}</span>
                      <span className="nm-loc__item-main">
                        <span className="nm-loc__name">{e.name}</span>
                        <span className="nm-loc__addr">{e.address}</span>
                        {(e.type || e.region) && (
                          <span className="nm-loc__tag">{e.type ?? e.region}</span>
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="nm-loc__detail">
                        <div className="nm-loc__actions">
                          {e.phones?.map((p) => (
                            <a key={p} href={telHref(p)} className="nm-loc__action">
                              <Phone strokeWidth={1.6} aria-hidden="true" />
                              <span>{p}</span>
                            </a>
                          ))}
                          <a
                            href={mapsSearch(e.address)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nm-loc__action"
                          >
                            <Navigation strokeWidth={1.6} aria-hidden="true" />
                            <span>Get Directions</span>
                          </a>
                          {e.email && (
                            <a href={`mailto:${e.email}`} className="nm-loc__action">
                              <Mail strokeWidth={1.6} aria-hidden="true" />
                              <span>{e.email}</span>
                            </a>
                          )}
                          {e.website && (
                            <a
                              href={e.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="nm-loc__action"
                            >
                              <ArrowUpRight strokeWidth={1.6} aria-hidden="true" />
                              <span>Visit Website</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <li className="nm-loc__empty">No locations match your search.</li>
              )}
            </ul>
          </div>

          {/* RIGHT — map for the active entry */}
          <div className="nm-loc__map" aria-hidden="true">
            <div className="nm-loc__map-frame">
              {active && (
                <iframe
                  key={active.address}
                  title={`Map showing ${active.name}`}
                  src={mapsEmbed(active.address)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
              <div className="nm-loc__map-tint" />
            </div>
            {active && (
              <div className="nm-loc__map-caption">
                <span className="nm-loc__map-name">{active.name}</span>
                <span className="nm-loc__map-addr">{active.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
