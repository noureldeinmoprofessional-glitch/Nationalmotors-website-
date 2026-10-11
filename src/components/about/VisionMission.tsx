"use client";

import { useReveal } from "@/lib/hooks";
import { VISION, MISSION } from "@/lib/aboutContent";

export default function VisionMission() {
  const headRef = useReveal<HTMLDivElement>({ y: 24, start: "top 88%" });
  const gridRef = useReveal<HTMLDivElement>({ y: 44, stagger: 0.16, start: "top 80%" });

  return (
    <section id="philosophy" className="nm-pv" aria-label="Vision and Mission">
      <span className="nm-pv__glow nm-pv__glow--a" aria-hidden="true" />
      <span className="nm-pv__glow nm-pv__glow--b" aria-hidden="true" />

      <div className="nm-shell">
        <div ref={headRef} className="nm-pv__head">
          <p className="nm-eyebrow nm-eyebrow--gap" data-reveal>Vision &amp; Mission</p>
        </div>

        <div ref={gridRef} className="nm-pv__grid">
          <article className="nm-pv__card nm-pv__card--vision" data-reveal>
            <span className="nm-pv__ghost" aria-hidden="true">01</span>
            <div className="nm-pv__card-inner">
              <p className="nm-pv__label">{VISION.eyebrow}</p>
              <h2 className="nm-pv__headline">{VISION.headline}</h2>
              <p className="nm-pv__body">{VISION.body}</p>
            </div>
          </article>

          <article className="nm-pv__card nm-pv__card--mission" data-reveal>
            <span className="nm-pv__ghost" aria-hidden="true">02</span>
            <div className="nm-pv__card-inner">
              <p className="nm-pv__label">{MISSION.eyebrow}</p>
              <h2 className="nm-pv__headline">{MISSION.headline}</h2>
              <p className="nm-pv__body">{MISSION.body}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
