"use client";

import { useLineReveal, useReveal } from "@/lib/hooks";
import { HERITAGE } from "@/lib/aboutContent";

export default function HeritageTimeline() {
  const headRef = useLineReveal<HTMLHeadingElement>();
  const yearRef = useReveal<HTMLDivElement>({ y: 60, duration: 1.2, start: "top 85%" });
  const copyRef = useReveal<HTMLDivElement>({ y: 30, stagger: 0.14, start: "top 82%" });
  const lineRef = useReveal<HTMLOListElement>({ y: 26, stagger: 0.12, start: "top 85%" });

  return (
    <section id="story" className="nm-heritage" aria-labelledby="heritage-title">
      <div className="nm-shell">
        <header className="nm-heritage__head">
          <p className="nm-eyebrow" data-accent="sand">{HERITAGE.eyebrow}</p>
          <h2 ref={headRef} id="heritage-title" className="nm-heritage__title nm-h2 nm-mask-lines">
            <span className="nm-line-mask"><span className="nm-line-inner">{HERITAGE.title}</span></span>
          </h2>
        </header>

        <div className="nm-heritage__grid">
          <div ref={yearRef} className="nm-heritage__year" aria-hidden="true">
            <span data-reveal className="nm-heritage__year-num">{HERITAGE.founded}</span>
          </div>
          <div ref={copyRef} className="nm-heritage__copy">
            <p className="nm-lead" data-reveal>{HERITAGE.foundation}</p>
            <p data-reveal>{HERITAGE.generations}</p>
            <p data-reveal className="nm-heritage__future">{HERITAGE.today}</p>
          </div>
        </div>

        <ol ref={lineRef} className="nm-heritage__timeline" aria-label="Company timeline">
          {HERITAGE.milestones.map((m, i) => (
            <li key={m.k} className="nm-heritage__milestone" data-reveal data-last={i === HERITAGE.milestones.length - 1 || undefined}>
              <span className="nm-heritage__milestone-k">{m.k}</span>
              <span className="nm-heritage__milestone-v">{m.v}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
