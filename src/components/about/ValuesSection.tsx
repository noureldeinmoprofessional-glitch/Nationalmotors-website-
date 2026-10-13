"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { VALUES } from "@/lib/aboutContent";

export default function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return; // leave everything in its visible default

    const ctx = gsap.context(() => {
      // 01 — Section entrance: headline + draw timeline + stagger rows
      gsap.from(".nm-val__headline", {
        y: 32,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 78%" },
      });
      gsap.from(".nm-val__track", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".nm-val__list", start: "top 82%" },
      });
      gsap.from(".nm-val__row", {
        y: 46,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".nm-val__list", start: "top 80%" },
      });

      // 03 — Scroll-linked progress line + subtle active-row emphasis
      const rows = gsap.utils.toArray<HTMLElement>(".nm-val__row");
      gsap.fromTo(
        ".nm-val__fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: ".nm-val__list",
            start: "top 60%",
            end: "bottom 75%",
            scrub: 0.6,
            onUpdate: (self) => {
              const idx = Math.round(self.progress * (rows.length - 1));
              rows.forEach((r, i) =>
                r.toggleAttribute("data-active", self.progress > 0.02 && i <= idx)
              );
            },
          },
        }
      );

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="values" className="nm-val" aria-label="Our Values">
      <div className="nm-shell nm-val__wrap">
        <div className="nm-val__aside">
          <p className="nm-eyebrow nm-eyebrow--static">{VALUES.eyebrow}</p>
          <h2 className="nm-val__headline">
            What drives <span className="nm-val__accent">us.</span>
          </h2>
        </div>

        <div className="nm-val__list">
          <span className="nm-val__track" aria-hidden="true" />
          <span className="nm-val__fill" aria-hidden="true" />

          {VALUES.items.map((v) => (
            <article key={v.n} className="nm-val__row" tabIndex={0} aria-label={v.title}>
              <span className="nm-val__num">{v.n}</span>
              <span className="nm-val__sep" aria-hidden="true" />
              <div className="nm-val__body">
                <h3 className="nm-val__title">{v.title}</h3>
                <p className="nm-val__desc">{v.body}</p>
              </div>
              <span className="nm-val__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="nm-val__thumb">
                <Image
                  src={v.image}
                  alt={v.imageAlt}
                  fill
                  sizes="(max-width: 900px) 42vw, 230px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
