"use client";

import { useRef } from "react";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";

const LEGACY_IMG = "/images/about-hero/automotive.jpg";

// Years of operation are derived from the 1978 founding year so the figure
// stays accurate over time instead of drifting from a hard-coded number.
const FOUNDED = 1978;
const YEARS_OF_OPERATION = new Date().getFullYear() - FOUNDED;

// Only verifiable facts: years of operation (derived), the four business
// sectors, the brands represented across the company's history (see the
// Brand Story timeline), and the 2026 transition to National Motors Group.
// `plain` renders a figure (e.g. a year) without thousands grouping.
const STATS: { to: number; label: string; plain?: boolean }[] = [
  { to: YEARS_OF_OPERATION, label: "Years" },
  { to: 4, label: "Sectors" },
  { to: 13, label: "Brands Represented" },
  { to: 2026, label: "National Motors Group", plain: true },
];

const fmt = (n: number, plain = false) =>
  plain ? String(Math.round(n)) : Math.round(n).toLocaleString("en-US");

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

      gsap.set(q("[data-fade]"), { autoAlpha: 0, y: 24 });
      gsap.set(q(".nm-lg__scrim"), { autoAlpha: 0 });
      gsap.set(q(".nm-lg__stat"), { autoAlpha: 0, y: 28 });
      valRefs.current.forEach((el) => { if (el) el.textContent = "0"; });

      // radius (px) that covers the viewport from its centre
      const endR = () => Math.hypot(window.innerWidth, window.innerHeight) * 0.6;

      // Content reveal + count-up — plays once, forward only, so the copy
      // and figures are never stranded half-faded if the user pauses or
      // scrolls back mid-pin.
      const reveal = gsap.timeline({ paused: true });
      reveal
        .to(q("[data-fade]"), { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.09, ease: "power3.out" })
        .to(q(".nm-lg__stat"), { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.25");
      STATS.forEach((s, i) => {
        const el = valRefs.current[i];
        if (!el) return;
        const proxy = { v: 0 };
        reveal.to(proxy, { v: s.to, duration: 0.9, ease: "power1.out", onUpdate: () => { el.textContent = fmt(proxy.v, s.plain); } }, 0.35 + i * 0.08);
      });

      // Portal opening stays scroll-scrubbed (the signature moment); the
      // content reveal is fired once as the portal nears full open.
      let played = false;
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!played && self.progress > 0.45) { played = true; reveal.play(); }
            },
          },
        })
        .fromTo(q(".nm-lg__portal"), { "--r": 70 }, { "--r": endR, duration: 0.46, ease: "power2.inOut" }, 0)
        .fromTo(q(".nm-lg__portal-img"), { scale: 1.15 }, { scale: 1, duration: 0.52, ease: "power2.out" }, 0)
        .to(q(".nm-lg__scrim"), { autoAlpha: 1, duration: 0.2 }, 0.4);
    }, section);

    return () => {
      ctx.revert();
      section.classList.remove("nm-lg--pinned");
    };
  }, []);

  return (
    <section id="legacy" ref={sectionRef} className="nm-lg" aria-label="Our Legacy">
      <div className="nm-lg__stage">
        <div className="nm-lg__portal" aria-hidden="true">
          <div className="nm-lg__portal-img">
            <Image src={LEGACY_IMG} alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "50% 45%" }} />
          </div>
        </div>
        <div className="nm-lg__scrim" aria-hidden="true" />

        <div className="nm-shell nm-lg__content">
          <p className="nm-eyebrow nm-eyebrow--sm nm-lg__eyebrow" data-fade>Our Legacy</p>
          <h2 className="nm-lg__statement" data-fade>
            Since <span className="nm-lg__accent">1978</span>
          </h2>
          <p className="nm-lg__manifesto" data-fade>
            For more than four decades, National Motors has represented the world&rsquo;s leading
            automotive brands across Egypt — a legacy built on experience, trust, and lasting
            relationships.
          </p>
          <div className="nm-lg__cta" data-fade>
            <CTAButton href="/about" variant="secondary" cursor="VIEW">Learn More</CTAButton>
          </div>

          <ul className="nm-lg__stats">
            {STATS.map((s, i) => (
              <li key={s.label} className="nm-lg__stat">
                <span ref={(el) => { valRefs.current[i] = el; }} className="nm-lg__stat-value">{fmt(s.to, s.plain)}</span>
                <span className="nm-lg__stat-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
