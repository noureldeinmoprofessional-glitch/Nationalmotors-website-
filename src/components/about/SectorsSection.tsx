"use client";

import { useState } from "react";
import Image from "next/image";
import { useLineReveal, useReveal } from "@/lib/hooks";
import { SECTORS } from "@/lib/aboutContent";

export default function SectorsSection() {
  const headRef = useLineReveal<HTMLHeadingElement>();
  const listRef = useReveal<HTMLUListElement>({ y: 40, stagger: 0.1, start: "top 80%" });
  const [active, setActive] = useState(0);

  return (
    <section id="sectors" className="nm-sectors" aria-labelledby="sectors-title">
      <div className="nm-shell">
        <header className="nm-sectors__head">
          <p className="nm-eyebrow">Our Sectors</p>
          <h2 ref={headRef} id="sectors-title" className="nm-sectors__title nm-h2 nm-mask-lines">
            <span className="nm-line-mask"><span className="nm-line-inner">More than</span></span>
            <span className="nm-line-mask"><span className="nm-line-inner">automotive.</span></span>
          </h2>
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
