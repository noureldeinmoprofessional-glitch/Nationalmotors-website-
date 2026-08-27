"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";

/* Our Brands — a quiet, editorial gateway. Three equal brand portals.
   No brand hierarchy, no detailed content: image + space + type + interaction.
   Reuses the site's tokens, reveal pattern (.is-in), CTAButton, nav + footer. */

type Portal = {
  id: string;
  name: string;
  descriptor: string; // factual positioning only (PPTX)
  href: string;
  image: string;
  alt: string;
  pos: string;
  accent: "blue" | "electric";
};

const BRANDS: Portal[] = [
  {
    id: "joylong",
    name: "Joylong",
    descriptor: "Commercial vehicles",
    href: "/brands/joylong",
    image: "/images/brands/joylong.png",
    alt: "A Joylong commercial minibus by National Motors on an Egyptian road",
    pos: "50% 45%",
    accent: "blue",
  },
  {
    id: "farizon",
    name: "Farizon",
    descriptor: "Electric commercial vehicles",
    href: "/brands/farizon",
    image: "/images/brands/farizon-v6e.jpg",
    alt: "The Farizon V6E born-electric commercial van in a modern city",
    pos: "50% 55%",
    accent: "electric",
  },
  {
    id: "blu",
    name: "Blu Light Mobility",
    descriptor: "Electric light mobility",
    href: "/brands/blu-light-mobility",
    image: "/images/brands/blu-light-mobility.png",
    alt: "A Blu Light Mobility electric cart at a resort at golden hour",
    pos: "50% 42%",
    accent: "blue",
  },
];

function BrandPortal({ b, index }: { b: Portal; index: number }) {
  const rootRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reduceRef = useRef(false);
  const hoverRef = useRef(false);

  useIsoLayoutEffect(() => {
    const img = imgRef.current;
    const reveal = revealRef.current;
    if (!img || !reveal) return;

    hoverRef.current = window.matchMedia("(hover: hover)").matches;
    reduceRef.current = prefersReducedMotion();

    // Non-hover (touch) or reduced motion: supporting text stays visible; the
    // whole panel is a link, so a tap simply navigates.
    if (!hoverRef.current || reduceRef.current) {
      gsap.set(reveal, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const blur = { v: 0 };
      const setBlur = () => { img.style.filter = `blur(${blur.v.toFixed(2)}px)`; };
      gsap.set(reveal, { opacity: 0, y: 12 });

      const tl = gsap.timeline({ paused: true });
      tl.to(img, { scale: 1.03, duration: 0.6, ease: "power2.out" }, 0)
        .to(blur, { v: 4, duration: 0.6, ease: "power2.out", onUpdate: setBlur }, 0)
        .to(reveal, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.08);
      tlRef.current = tl;
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const play = () => hoverRef.current && !reduceRef.current && tlRef.current?.play();
  const reverse = () => hoverRef.current && !reduceRef.current && tlRef.current?.reverse();

  return (
    <Link
      ref={rootRef}
      href={b.href}
      className="nm-obr__card"
      style={{ ["--i" as string]: index }}
      data-accent={b.accent}
      aria-label={`${b.name} — ${b.descriptor}. Explore brand.`}
      onPointerEnter={play}
      onPointerLeave={reverse}
      onFocus={play}
      onBlur={reverse}
    >
      <div ref={imgRef} className="nm-obr__img">
        <Image
          src={b.image}
          alt={b.alt}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: "cover", objectPosition: b.pos }}
        />
      </div>
      <span className="nm-obr__scrim" aria-hidden="true" />

      <div className="nm-obr__content">
        <h2 className="nm-obr__name">{b.name}</h2>
        <div ref={revealRef} className="nm-obr__reveal">
          <p className="nm-obr__desc">{b.descriptor}</p>
          <span className="nm-obr__explore">
            Explore Brand
            <ArrowRight strokeWidth={1.75} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BrandsIndex() {
  const heroRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);

  // Robust reveal: visible by default, revealed via IntersectionObserver with a
  // timeout fallback, so a section can never be stranded hidden.
  useEffect(() => {
    const targets = [heroRef.current, portfolioRef.current].filter(Boolean) as HTMLElement[];
    if (!targets.length) return;
    if (prefersReducedMotion()) {
      targets.forEach((t) => t.classList.add("is-in"));
      return;
    }
    const timers: number[] = [];
    const ios: IntersectionObserver[] = [];
    targets.forEach((el) => {
      const reveal = () => el.classList.add("is-in");
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            reveal();
            io.disconnect();
          }
        },
        { threshold: 0.12 }
      );
      io.observe(el);
      ios.push(io);
      timers.push(window.setTimeout(reveal, 2500));
    });
    return () => {
      ios.forEach((io) => io.disconnect());
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <>
      {/* 01 — Hero / intro */}
      <section ref={heroRef} className="nm-obr-hero" aria-labelledby="obr-title">
        <div className="nm-shell">
          <p className="nm-eyebrow nm-eyebrow--static">Our Brands</p>
          <h1 id="obr-title" className="nm-obr-hero__title">
            <span>Three Brands,</span>
            <span>One Portfolio.</span>
          </h1>
          <p className="nm-obr-hero__lead nm-lead">
            Choose a National Motors brand to explore.
          </p>
        </div>
      </section>

      {/* 02 — Brand portfolio */}
      <section ref={portfolioRef} id="portfolio" className="nm-obr" aria-label="Brand portfolio">
        <div className="nm-shell">
          <div className="nm-obr__grid">
            {BRANDS.map((b, i) => (
              <BrandPortal key={b.id} b={b} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
