"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLineReveal, useReveal, useClipReveal, useParallax } from "@/lib/hooks";
import { AFTER_SALES_HERO } from "@/lib/afterSalesData";
import { useAppointment } from "./AppointmentProvider";

export default function AfterSalesHero() {
  const { open } = useAppointment();
  const headRef = useLineReveal<HTMLHeadingElement>({ start: "top 92%" });
  const bodyRef = useReveal<HTMLDivElement>({ y: 24, stagger: 0.12, start: "top 92%" });
  const frameRef = useClipReveal<HTMLDivElement>({ from: "inset(0 100% 0 0)", start: "top 92%" });
  const parallaxRef = useParallax<HTMLDivElement>({ amount: 5 });

  return (
    <section className="nm-as-hero" aria-label="After-Sales Support">
      <div className="nm-shell nm-as-hero__grid">
        <div className="nm-as-hero__text">
          <p className="nm-eyebrow nm-eyebrow--static nm-eyebrow--gap">{AFTER_SALES_HERO.eyebrow}</p>
          <h1 ref={headRef} className="nm-as-hero__title nm-mask-lines">
            <span className="nm-line-mask"><span className="nm-line-inner">Support That</span></span>
            <span className="nm-line-mask"><span className="nm-line-inner">Keeps You Moving</span></span>
          </h1>
          <div ref={bodyRef} className="nm-as-hero__body">
            <p className="nm-lead" data-reveal>{AFTER_SALES_HERO.body}</p>
            <div data-reveal>
              <button
                type="button"
                className="nm-btn nm-btn--primary"
                data-cursor="OPEN"
                onClick={() => open()}
              >
                <span className="nm-btn__text">{AFTER_SALES_HERO.cta.label}</span>
                <span className="nm-btn__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.75} /></span>
              </button>
            </div>
          </div>
        </div>

        <div className="nm-as-hero__media">
          <div ref={frameRef} className="nm-as-hero__frame">
            <div ref={parallaxRef} className="nm-parallax-wrap">
              <div data-parallax className="nm-parallax-img">
                <Image
                  src={AFTER_SALES_HERO.image}
                  alt={AFTER_SALES_HERO.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  quality={85}
                  style={{ objectFit: "cover", objectPosition: "50% 50%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
