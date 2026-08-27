"use client";

import Image from "next/image";
import { useReveal, useParallax, useClipReveal } from "@/lib/hooks";
import { SECTORS } from "@/lib/site";
import CTAButton from "@/components/ui/CTAButton";

export default function LegacySection() {
  const bodyRef = useReveal<HTMLDivElement>({ y: 30, stagger: 0.12 });
  const imgFrameRef = useClipReveal<HTMLDivElement>();
  const parallaxRef = useParallax<HTMLDivElement>({ amount: 7 });
  const sectorsRef = useReveal<HTMLUListElement>({ y: 40, stagger: 0.1, start: "top 85%" });

  return (
    <section id="legacy" className="nm-legacy" aria-label="Our Legacy">
      <div className="nm-shell">
        <div className="nm-legacy__grid">
          <div className="nm-legacy__intro">
            <p className="nm-eyebrow nm-eyebrow--gap" data-accent="sand">Our Legacy — Est. 1978</p>

            <div ref={bodyRef} className="nm-legacy__copy">
              <p className="nm-lead" data-reveal>
                Established in Egypt in 1978, National Motors has built a legacy of
                experience, trust, and excellence in the automotive industry.
              </p>
              <p className="nm-legacy__sub" data-reveal>
                For decades, we have evolved with the market, representing leading
                automotive brands and delivering reliable mobility solutions. Our
                journey continues with a vision focused on innovation, quality, and
                lasting customer relationships.
              </p>
              <div data-reveal className="nm-legacy__cta">
                <CTAButton href="/about" variant="secondary" cursor="VIEW">
                  Discover Our Story
                </CTAButton>
              </div>
            </div>
          </div>

          <div className="nm-legacy__media">
            <div ref={imgFrameRef} className="nm-legacy__frame">
              <div ref={parallaxRef} className="nm-parallax-wrap nm-legacy__frame-inner">
                <div data-clip-inner data-parallax className="nm-parallax-img nm-legacy__img">
                  <Image
                    src="/images/hero/joylong-a4-standard.png"
                    alt="National Motors commercial vehicle on the road in Egypt"
                    fill
                    sizes="(max-width: 900px) 100vw, 44vw"
                    style={{ objectFit: "cover", objectPosition: "50% 55%" }}
                  />
                </div>
              </div>
              <div className="nm-legacy__year" aria-hidden="true">
                <span className="nm-line-mask"><span className="nm-line-inner">1978</span></span>
              </div>
            </div>
          </div>
        </div>

        <ul ref={sectorsRef} id="sectors" className="nm-legacy__sectors">
          {SECTORS.map((s) => (
            <li key={s.n} className="nm-legacy__sector" data-reveal>
              <span className="nm-legacy__sector-n">{s.n}</span>
              <h3 className="nm-legacy__sector-name">{s.name}</h3>
              <p className="nm-legacy__sector-note">{s.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
