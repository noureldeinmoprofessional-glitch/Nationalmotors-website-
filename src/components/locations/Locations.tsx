"use client";

import { useState } from "react";
import Image from "next/image";
import { Navigation, CalendarClock, ArrowRight } from "lucide-react";
import { useLineReveal, useReveal, useClipReveal, useParallax } from "@/lib/hooks";
import EgyptMap from "./EgyptMap";
import type { NMLocation } from "@/lib/locationsData";

const mapsSearch = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ", Egypt")}`;

type HeroData = { eyebrow: string; headlineLines: string[]; body: string; image: string; imageAlt: string };

export function LocationHero({ data, action }: { data: HeroData; action?: React.ReactNode }) {
  const headRef = useLineReveal<HTMLHeadingElement>({ start: "top 94%" });
  const bodyRef = useReveal<HTMLDivElement>({ y: 24, stagger: 0.1, start: "top 94%" });
  const frameRef = useClipReveal<HTMLDivElement>({ from: "inset(0 0 0 100%)", start: "top 95%" });
  const parallaxRef = useParallax<HTMLDivElement>({ amount: 5 });

  return (
    <section className="nm-in-hero nm-in-hero--press" aria-label={data.eyebrow}>
      <div className="nm-shell nm-in-hero__grid">
        <div className="nm-in-hero__text">
          <p className="nm-eyebrow nm-eyebrow--gap">{data.eyebrow}</p>
          <h1 ref={headRef} className="nm-in-hero__title nm-mask-lines">
            {data.headlineLines.map((l, i) => (
              <span key={i} className="nm-line-mask"><span className="nm-line-inner">{l}</span></span>
            ))}
          </h1>
          <div ref={bodyRef} className="nm-in-hero__body">
            <p className="nm-lead" data-reveal>{data.body}</p>
            {action && <div className="nm-loc-hero__action" data-reveal>{action}</div>}
          </div>
        </div>
        <div className="nm-in-hero__media">
          <div ref={frameRef} className="nm-in-hero__frame">
            <div ref={parallaxRef} className="nm-parallax-wrap">
              <div data-parallax className="nm-parallax-img">
                <Image src={data.image} alt={data.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 48vw" quality={85} style={{ objectFit: "cover", objectPosition: "50% 55%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LocationExplorer({
  locations,
  sectionTitle,
  sectionDescription,
  idBase,
  onBook,
}: {
  locations: NMLocation[];
  sectionTitle: string;
  sectionDescription: string;
  idBase: string;
  onBook?: () => void;
}) {
  const headRef = useReveal<HTMLDivElement>({ y: 18, start: "top 90%" });
  const listRef = useReveal<HTMLUListElement>({ y: 26, stagger: 0.1, start: "top 84%" });
  // First non-coming-soon index as default active.
  const firstReal = Math.max(0, locations.findIndex((l) => !l.comingSoon));
  const [active, setActive] = useState(firstReal);

  return (
    <section id="locations" className="nm-loc-explorer" aria-label={sectionTitle}>
      <div className="nm-shell">
        <div ref={headRef} className="nm-nw-sechead">
          <span className="nm-nw-sechead__label" data-reveal>{sectionTitle}</span>
        </div>
        <p className="nm-lead nm-loc-explorer__desc">{sectionDescription}</p>

        <div className="nm-loc-explorer__grid">
          <ul ref={listRef} className="nm-loc-list">
            {locations.map((l, i) => {
              const soon = !!l.comingSoon;
              return (
                <li
                  key={l.name}
                  data-reveal
                  className={`nm-loc-item${i === active ? " is-active" : ""}${soon ? " nm-loc-item--soon" : ""}`}
                  onMouseEnter={() => !soon && setActive(i)}
                  onFocusCapture={() => !soon && setActive(i)}
                  onClick={() => !soon && setActive(i)}
                >
                  <span className="nm-loc-item__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <div className="nm-loc-item__main">
                    <h3 className="nm-loc-item__name">{l.name}</h3>
                    {l.address && <p className="nm-loc-item__addr">{l.address}</p>}
                    {soon ? (
                      <span className="nm-loc-item__soon">Coming Soon</span>
                    ) : (
                      <div className="nm-loc-item__actions">
                        {l.address && (
                          <a href={mapsSearch(l.address)} target="_blank" rel="noopener noreferrer" className="nm-loc-item__dir">
                            <Navigation strokeWidth={1.6} aria-hidden="true" />
                            <span>Get Directions</span>
                          </a>
                        )}
                        {onBook && (
                          <button type="button" className="nm-loc-item__book" onClick={onBook}>
                            <CalendarClock strokeWidth={1.6} aria-hidden="true" />
                            <span>Book a Service</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="nm-loc-explorer__map">
            <EgyptMap
              locations={locations}
              activeIndex={active}
              onHover={(i) => i !== null && setActive(i)}
              onSelect={setActive}
              idBase={idBase}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Small hero "Book a Service" button (reuses the After-Sales appointment modal).
export function BookServiceButton({ onBook }: { onBook: () => void }) {
  return (
    <button type="button" className="nm-btn nm-btn--primary" data-cursor="OPEN" onClick={onBook}>
      <span className="nm-btn__text">Book a Service</span>
      <span className="nm-btn__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.75} /></span>
    </button>
  );
}
