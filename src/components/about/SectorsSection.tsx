"use client";

import { useState } from "react";
import Image from "next/image";
import { useReveal } from "@/lib/hooks";
import { SECTORS } from "@/lib/aboutContent";

export default function SectorsSection() {
  const listRef = useReveal<HTMLUListElement>({ y: 40, stagger: 0.1, start: "top 80%" });
  const [active, setActive] = useState(0);

  return (
    <section id="sectors" className="nm-sectors" aria-label="Our Sectors">
      <div className="nm-shell">
        <header className="nm-sectors__head">
          <p className="nm-eyebrow nm-eyebrow--gap">Our Sectors</p>
        </header>

        <div className="nm-sectors__grid">
          <ul ref={listRef} className="nm-sectors__list">
            {SECTORS.map((s, i) => (
              <li
                key={s.name}
                className={`nm-sectors__row${i === active ? " is-active" : ""}`}
                data-reveal
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="nm-sectors__n">{s.n}</span>
                <div className="nm-sectors__main">
                  <h3 className="nm-sectors__name">{s.name}</h3>
                  {s.note && <p className="nm-sectors__note">{s.note}</p>}
                </div>
              </li>
            ))}
          </ul>

          <div className="nm-sectors__visual" aria-hidden="true">
            {SECTORS.map((s, i) => (
              <div
                key={s.name}
                className={`nm-sectors__visual-layer${i === active ? " is-active" : ""}`}
              >
                {s.image ? (
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 0px, 40vw"
                    style={{ objectFit: "cover", objectPosition: "55% 55%" }}
                  />
                ) : (
                  <div className="nm-sectors__visual-placeholder">
                    <span>{s.n}</span>
                    <span>{s.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
