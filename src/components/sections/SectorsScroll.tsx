"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { SECTORS } from "@/lib/sectorsContent";

/** Homepage order (client-specified). */
const ORDER = ["automotive", "real-estate", "agriculture", "csr"] as const;

const CARDS = ORDER.map((id, i) => {
  const s = SECTORS.find((x) => x.id === id)!;
  const intro = s.blocks.find((b) => b.role === "introduction");
  return {
    n: String(i + 1).padStart(2, "0"),
    id,
    name: s.name,
    headline: s.headline,
    image: s.image,
    imageAlt: s.imageAlt,
    desc: intro && "text" in intro ? intro.text : "",
  };
});

export default function SectorsScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const idxRef = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (prefersReducedMotion() || window.innerWidth <= 768) return;

    section.classList.add("nm-sct--pinned");
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fillRef.current) gsap.set(fillRef.current, { scaleX: self.progress });
            if (idxRef.current) {
              // Map scroll progress to the card nearest the viewport centre:
              // progress 0 → first card, progress 1 → last card.
              const i = Math.round(self.progress * (CARDS.length - 1));
              idxRef.current.textContent = CARDS[i].n;
            }
          },
        },
      });

      // subtle parallax of each card image + a reveal of each card body as
      // it crosses the viewport (first card is visible from the start).
      gsap.utils.toArray<HTMLElement>(".nm-sct__card").forEach((card, i) => {
        const img = card.querySelector(".nm-sct__card-img");
        const body = card.querySelector(".nm-sct__card-body");
        if (img) {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
        if (body && i > 0) {
          gsap.fromTo(
            body,
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
      section.classList.remove("nm-sct--pinned");
    };
  }, []);

  return (
    <section ref={sectionRef} className="nm-sct" aria-label="Our sectors">
      <div className="nm-sct__inner">
        <div className="nm-shell nm-sct__topbar">
          <p className="nm-eyebrow nm-eyebrow--sm">Our Sectors</p>
          <p className="nm-sct__counter" aria-hidden="true">
            <span ref={idxRef} className="nm-sct__counter-now">01</span>
            <span className="nm-sct__counter-sep">/</span>
            <span>0{CARDS.length}</span>
          </p>
        </div>

        <div ref={trackRef} className="nm-sct__track">
          {CARDS.map((c) => (
            <article key={c.id} className="nm-sct__card">
              <div className="nm-sct__card-media">
                <div className="nm-sct__card-img">
                  <Image
                    src={c.image}
                    alt={c.imageAlt}
                    fill
                    sizes="(max-width: 768px) 86vw, 46vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span className="nm-sct__card-scrim" aria-hidden="true" />
                <span className="nm-sct__card-n" aria-hidden="true">{c.n}</span>
              </div>

              <div className="nm-sct__card-body">
                <h3 className="nm-sct__card-name">{c.name}</h3>
                <p className="nm-sct__card-headline">{c.headline}</p>
                <p className="nm-sct__card-desc">{c.desc}</p>
                <Link href={`/sectors/${c.id}`} className="nm-btn nm-btn--ghost" data-cursor="VIEW">
                  <span className="nm-btn__text">Explore sector</span>
                  <span className="nm-btn__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.75} /></span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="nm-shell nm-sct__railwrap" aria-hidden="true">
          <span className="nm-sct__rail">
            <span ref={fillRef} className="nm-sct__rail-fill" />
          </span>
        </div>
      </div>
    </section>
  );
}
