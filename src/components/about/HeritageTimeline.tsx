"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { HERITAGE } from "@/lib/aboutContent";

export default function HeritageTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    const num = numRef.current;
    if (!section || !num) return;

    const target = parseInt(HERITAGE.founded, 10) || 1978;

    if (prefersReducedMotion()) {
      num.textContent = String(target);
      return;
    }

    const ctx = gsap.context(() => {
      num.textContent = "0";

      // Whole-section entrance
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: section, start: "top 78%" },
      });
      tl.from(".nm-heritage__eyebrow", { y: 18, autoAlpha: 0, duration: 0.6 })
        .from(".nm-heritage__since", { y: 14, autoAlpha: 0, duration: 0.6 }, "-=0.35")
        .from(".nm-heritage__year-num", { yPercent: 14, autoAlpha: 0, duration: 0.95, ease: "power4.out" }, "-=0.35")
        .from(".nm-heritage__copy > *", { y: 28, autoAlpha: 0, duration: 0.8, stagger: 0.14 }, "-=0.6");

      // Count-up on the year
      const counter = { v: 0 };
      gsap.to(counter, {
        v: target,
        duration: 2,
        ease: "power2.out",
        snap: { v: 1 },
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
        onUpdate: () => {
          num.textContent = String(Math.round(counter.v));
        },
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="story" className="nm-heritage" aria-label="Our Story">
      <div className="nm-shell">
        <p className="nm-eyebrow nm-eyebrow--static nm-eyebrow--gap nm-heritage__eyebrow" data-accent="sand">
          {HERITAGE.eyebrow}
        </p>

        <div className="nm-heritage__grid">
          <div className="nm-heritage__year">
            <span className="nm-heritage__since">Established in</span>
            <span ref={numRef} className="nm-heritage__year-num" aria-label={HERITAGE.founded}>
              {HERITAGE.founded}
            </span>
          </div>

          <div className="nm-heritage__copy">
            <p className="nm-lead">{HERITAGE.foundation}</p>
            <p>{HERITAGE.generations}</p>
            <p className="nm-heritage__future">{HERITAGE.today}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
