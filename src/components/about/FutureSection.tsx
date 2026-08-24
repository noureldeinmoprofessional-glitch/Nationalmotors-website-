"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLineReveal, useReveal, useClipReveal, useParallax } from "@/lib/hooks";
import CTAButton from "@/components/ui/CTAButton";
import { FUTURE } from "@/lib/aboutContent";

export default function FutureSection() {
  const frameRef = useClipReveal<HTMLDivElement>({ from: "inset(0 0 100% 0)", duration: 1.4 });
  const parallaxRef = useParallax<HTMLDivElement>({ amount: 8 });
  const markRef = useLineReveal<HTMLHeadingElement>({ stagger: 0.14 });
  const bodyRef = useReveal<HTMLDivElement>({ y: 28, stagger: 0.12, start: "top 85%" });

  return (
    <section id="future" className="nm-future" aria-labelledby="future-title">
      <div ref={frameRef} className="nm-future__media" aria-hidden="true">
        <div ref={parallaxRef} className="nm-parallax-wrap">
          <div data-parallax className="nm-parallax-img">
            <Image
              src={FUTURE.image}
              alt=""
              fill
              sizes="100vw"
              quality={90}
              style={{ objectFit: "cover", objectPosition: "50% 55%" }}
            />
          </div>
        </div>
        <div className="nm-future__scrim" />
      </div>

      <div className="nm-future__content nm-shell">
        <p className="nm-eyebrow" data-accent="electric">{FUTURE.eyebrow}</p>
        <h2 ref={markRef} id="future-title" className="nm-future__mark nm-mask-lines">
          {FUTURE.markLines.map((l, i) => (
            <span key={i} className="nm-line-mask"><span className="nm-line-inner">{l}</span></span>
          ))}
        </h2>
        <div ref={bodyRef} className="nm-future__body">
          <p className="nm-future__meta" data-reveal>
            {FUTURE.meta} <ArrowRight strokeWidth={1.6} aria-hidden="true" />
          </p>
          <p className="nm-future__statement" data-reveal>{FUTURE.statement}</p>
          <div data-reveal className="nm-future__cta">
            <CTAButton href={FUTURE.cta.href} variant="primary" cursor="EXPLORE">
              {FUTURE.cta.label}
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
