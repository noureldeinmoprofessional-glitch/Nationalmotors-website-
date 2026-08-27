"use client";

import Image from "next/image";
import { useReveal, useParallax, useClipReveal } from "@/lib/hooks";
import CTAButton from "@/components/ui/CTAButton";

const PILLARS = [
  "Body Repair & Paint",
  "Free Joylong Parts Delivery",
  "DFSK Spare Parts",
  "Maintenance & Inspection",
];

export default function AfterSalesSection() {
  const bodyRef = useReveal<HTMLDivElement>({ y: 28, stagger: 0.1 });
  const frameRef = useClipReveal<HTMLDivElement>({ from: "inset(0 0 0 100%)" });
  const parallaxRef = useParallax<HTMLDivElement>({ amount: 6 });

  return (
    <section id="after-sales" className="nm-aftersales" aria-label="After-Sales Support">
      <div className="nm-shell">
        <div className="nm-aftersales__grid">
          <div className="nm-aftersales__text">
            <p className="nm-eyebrow nm-eyebrow--gap">After-Sales Support</p>
            <div ref={bodyRef} className="nm-aftersales__body">
              <p className="nm-lead" data-reveal>
                From scheduled maintenance to spare parts and technical support,
                National Motors is committed to keeping your vehicle performing at its
                best.
              </p>
              <ul className="nm-aftersales__pillars" data-reveal>
                {PILLARS.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div data-reveal className="nm-aftersales__cta">
                <CTAButton href="/after-sales#book" variant="primary" cursor="OPEN">
                  Book a Service
                </CTAButton>
              </div>
            </div>
          </div>

          <div ref={frameRef} className="nm-aftersales__frame">
            <div ref={parallaxRef} className="nm-parallax-wrap nm-aftersales__frame-inner">
              <div data-parallax className="nm-parallax-img nm-aftersales__img">
                <Image
                  src="/images/service/body-repair-paint.png"
                  alt="National Motors body repair and vehicle painting service in Egypt"
                  fill
                  sizes="(max-width: 900px) 100vw, 55vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
