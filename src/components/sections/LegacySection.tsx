"use client";

import { useRef } from "react";
import CTAButton from "@/components/ui/CTAButton";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect, useLineReveal, useReveal } from "@/lib/hooks";

const STATS = [
  { to: 50, label: "Years" },
  { to: 4, label: "Sectors" },
  { to: 13, label: "Brands" },
  { to: 23458, label: "Vehicles Sold" },
];

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

export default function LegacySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const valRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const stmtRef = useLineReveal<HTMLHeadingElement>({ start: "top 82%", stagger: 0.14 });
  const introRef = useReveal<HTMLDivElement>({ y: 24, stagger: 0.12, start: "top 84%" });

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      // counters count up once the stat row enters
      valRefs.current.forEach((el) => {
        if (el) el.textContent = "0";
      });
      ScrollTrigger.create({
        trigger: ".nm-lg__stats",
        start: "top 85%",
        once: true,
        onEnter: () => {
          STATS.forEach((s, i) => {
            const el = valRefs.current[i];
            if (!el) return;
            const proxy = { v: 0 };
            gsap.to(proxy, {
              v: s.to,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => { el.textContent = fmt(proxy.v); },
            });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="legacy" ref={sectionRef} className="nm-lg" aria-label="Our Legacy">
      <div ref={introRef} className="nm-shell nm-lg__wrap">
        <p className="nm-eyebrow" data-accent="sand" data-reveal>Our Legacy</p>

        <h2 ref={stmtRef} className="nm-lg__statement">
          <span className="nm-line-mask"><span className="nm-line-inner">Since</span></span>
          <span className="nm-line-mask"><span className="nm-line-inner"><span className="nm-lg__accent">1978</span></span></span>
        </h2>

        <p className="nm-lg__manifesto" data-reveal>
          For more than four decades, National Motors has represented the world&rsquo;s leading
          automotive brands across Egypt — a legacy built on experience, trust, and lasting
          relationships.
        </p>
        <div className="nm-lg__cta" data-reveal>
          <CTAButton href="/about" variant="secondary" cursor="VIEW">Learn More</CTAButton>
        </div>

        <ul className="nm-lg__stats">
          {STATS.map((s, i) => (
            <li key={s.label} className="nm-lg__stat">
              <span ref={(el) => { valRefs.current[i] = el; }} className="nm-lg__stat-value">{fmt(s.to)}</span>
              <span className="nm-lg__stat-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
