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

      gsap.set(q(".nm-lg__copy [data-fade]"), { autoAlpha: 0, y: 28 });
      gsap.set(q(".nm-lg__stat"), { autoAlpha: 0, y: 30 });
      valRefs.current.forEach((el) => {
        if (el) el.textContent = "0";
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=190%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. image fades in
      tl.fromTo(
        q(".nm-lg__img"),
        { autoAlpha: 0, scale: 1.14 },
        { autoAlpha: 1, scale: 1, duration: 1, ease: "power2.out" }
      );
      // 2. "1978" mask resolves on the image
      tl.fromTo(
        q(".nm-lg__year"),
        { autoAlpha: 0, scale: 1.16, yPercent: 5 },
        { autoAlpha: 1, scale: 1, yPercent: 0, duration: 1, ease: "power3.out" },
        0.45
      );
      // 3. image recedes so the numerals take over
      tl.to(q(".nm-lg__img"), { autoAlpha: 0.16, duration: 0.8, ease: "power1.inOut" }, 1.15);
      // 4. copy reveals
      tl.to(
        q(".nm-lg__copy [data-fade]"),
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.14, ease: "power3.out" },
        1.35
      );
      // 5. stats appear and count up
      tl.to(
        q(".nm-lg__stat"),
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" },
        2.0
      );
      STATS.forEach((s, i) => {
        const el = valRefs.current[i];
        if (!el) return;
        const proxy = { v: 0 };
        tl.to(
          proxy,
          {
            v: s.to,
            duration: 1,
            ease: "power1.out",
            onUpdate: () => {
              el.textContent = fmt(proxy.v);
            },
          },
          2.0 + i * 0.12
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
        <div className="nm-shell nm-lg__inner">
          <div className="nm-lg__top">
            <div className="nm-lg__copy">
              <p className="nm-eyebrow" data-accent="sand" data-fade>
                Our Legacy — Est. 1978
              </p>
              <p className="nm-lead nm-lg__lead" data-fade>
                Established in Egypt in 1978, National Motors has built a legacy of experience,
                trust, and excellence in the automotive industry.
              </p>
              <p className="nm-lg__sub" data-fade>
                For decades, we have evolved with the market, representing leading automotive brands
                and delivering reliable mobility solutions. Our journey continues with a vision
                focused on innovation, quality, and lasting customer relationships.
              </p>
              <div className="nm-lg__cta" data-fade>
                <CTAButton href="/about" variant="secondary" cursor="VIEW">
                  Learn More
                </CTAButton>
              </div>
            </div>

            <div className="nm-lg__yearbox" aria-hidden="true">
              <div className="nm-lg__img">
                <Image
                  src={LEGACY_IMG}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 90vw, 46vw"
                  style={{ objectFit: "cover", objectPosition: "50% 45%" }}
                />
              </div>
              <span className="nm-lg__year" style={{ backgroundImage: `url(${LEGACY_IMG})` }}>
                1978
              </span>
            </div>
          </div>

          <ul className="nm-lg__stats">
            {STATS.map((s, i) => (
              <li key={s.label} className="nm-lg__stat">
                <span
                  ref={(el) => {
                    valRefs.current[i] = el;
                  }}
                  className="nm-lg__stat-value"
                >
                  {fmt(s.to)}
                </span>
                <span className="nm-lg__stat-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
