"use client";

import { useRef } from "react";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";

const LEGACY_IMG = "/images/about-hero/automotive.jpg";

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

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion() || window.innerWidth <= 768) return;

    section.classList.add("nm-lg--pinned");
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const year = section.querySelector<HTMLElement>(".nm-lg__year")!;
      const slot = section.querySelector<HTMLElement>(".nm-lg__slot")!;

      // initial hidden states
      gsap.set(q(".nm-lg__copy [data-fade]"), { autoAlpha: 0, y: 28 });
      gsap.set(q(".nm-lg__stat"), { autoAlpha: 0, y: 30 });
      gsap.set(year, { autoAlpha: 0, transformOrigin: "center center" });
      valRefs.current.forEach((el) => {
        if (el) el.textContent = "0";
      });

      // Travel target: year starts full-bleed & centred (identity) and is
      // scaled/moved to sit over the invisible slot in the final layout.
      // offsetWidth is transform-independent; the slot never carries a
      // transform — so these recompute cleanly on refresh/resize.
      const tScale = () => slot.getBoundingClientRect().width / year.offsetWidth;
      const tDx = () => {
        const sr = slot.getBoundingClientRect();
        return sr.left + sr.width / 2 - window.innerWidth / 2;
      };
      const tDy = () => {
        const sr = slot.getBoundingClientRect();
        return sr.top + sr.height / 2 - window.innerHeight / 2;
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // A (hold): full-bleed image on its own.
      // B (crossfade): image dims away while the 1978 mask appears.
      tl.to(q(".nm-lg__full"), { autoAlpha: 0, duration: 0.22, ease: "power1.inOut" }, 0.26);
      tl.to(year, { autoAlpha: 1, duration: 0.2 }, 0.3);
      // C (travel): the 1978 — still image-masked — moves to its final spot.
      tl.fromTo(
        year,
        { x: 0, y: 0, scale: 1 },
        { x: tDx, y: tDy, scale: tScale, duration: 0.32, ease: "power2.inOut" },
        0.52
      );
      // copy reveals alongside the travel
      tl.to(q(".nm-lg__copy [data-fade]"), { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.07, ease: "power3.out" }, 0.62);
      // D: stats reveal + count up
      tl.to(q(".nm-lg__stat"), { autoAlpha: 1, y: 0, duration: 0.16, stagger: 0.07, ease: "power3.out" }, 0.84);
      STATS.forEach((s, i) => {
        const el = valRefs.current[i];
        if (!el) return;
        const proxy = { v: 0 };
        tl.to(
          proxy,
          { v: s.to, duration: 0.7, ease: "power1.out", onUpdate: () => { el.textContent = fmt(proxy.v); } },
          0.84 + i * 0.09
        );
      });
    }, section);

    return () => {
      ctx.revert();
      section.classList.remove("nm-lg--pinned");
    };
  }, []);

  return (
    <section id="legacy" ref={sectionRef} className="nm-lg" aria-label="Our Legacy">
      <div className="nm-lg__stage">
        <div className="nm-lg__full" aria-hidden="true">
          <Image src={LEGACY_IMG} alt="" fill sizes="100vw" priority={false} style={{ objectFit: "cover", objectPosition: "50% 45%" }} />
        </div>

        <div className="nm-lg__maskstage" aria-hidden="true">
          <span className="nm-lg__year" style={{ backgroundImage: `url(${LEGACY_IMG})` }}>1978</span>
        </div>

        <div className="nm-shell nm-lg__layout">
          <div className="nm-lg__copy">
            <p className="nm-eyebrow" data-accent="sand" data-fade>Our Legacy — Est. 1978</p>
            <p className="nm-lead nm-lg__lead" data-fade>
              Established in Egypt in 1978, National Motors has built a legacy of experience, trust,
              and excellence in the automotive industry.
            </p>
            <p className="nm-lg__sub" data-fade>
              For decades, we have evolved with the market, representing leading automotive brands and
              delivering reliable mobility solutions. Our journey continues with a vision focused on
              innovation, quality, and lasting customer relationships.
            </p>
            <div className="nm-lg__cta" data-fade>
              <CTAButton href="/about" variant="secondary" cursor="VIEW">Learn More</CTAButton>
            </div>
          </div>

          <div className="nm-lg__slot" aria-hidden="true" />

          <ul className="nm-lg__stats">
            {STATS.map((s, i) => (
              <li key={s.label} className="nm-lg__stat">
                <span ref={(el) => { valRefs.current[i] = el; }} className="nm-lg__stat-value">{fmt(s.to)}</span>
                <span className="nm-lg__stat-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
