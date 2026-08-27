"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect, useLineReveal, useReveal, useClipReveal, useParallax } from "@/lib/hooks";
import CTAButton from "@/components/ui/CTAButton";
import BrandLocations from "./BrandLocations";
import type { BrandPageData } from "@/lib/brandsData";

export default function BrandPage({ brand }: { brand: BrandPageData }) {
  const heroRef = useRef<HTMLElement>(null);

  // Cinematic hero entrance (image settle → name → tagline). Content is visible
  // by default; JS only enhances, and reduced motion skips the choreography.
  useIsoLayoutEffect(() => {
    const root = heroRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const media = root.querySelector(".nm-bp-hero__media");
      const fades = root.querySelectorAll("[data-bp-fade]");
      gsap.set(fades, { opacity: 0, y: 26 });
      if (media) gsap.set(media, { scale: 1.08 });
      const tl = gsap.timeline({ delay: 0.1 });
      if (media) tl.to(media, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
      tl.to(fades, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out" }, 0.25);
    }, root);
    return () => ctx.revert();
  }, []);

  // Intro reveals
  const introTitleRef = useLineReveal<HTMLHeadingElement>();
  const introBodyRef = useReveal<HTMLDivElement>({ y: 26, stagger: 0.1, start: "top 82%" });
  const introFrameRef = useClipReveal<HTMLDivElement>({ from: "inset(0 0 100% 0)" });
  const introParallaxRef = useParallax<HTMLDivElement>({ amount: 6 });

  return (
    <>
      {/* 01 — HERO */}
      <section ref={heroRef} className="nm-bp-hero" aria-label={`${brand.name} by National Motors`}>
        <div className="nm-bp-hero__media">
          <Image
            src={brand.hero.image}
            alt={brand.hero.imageAlt}
            fill
            priority
            sizes="100vw"
            quality={85}
            style={{ objectFit: "cover", objectPosition: brand.hero.imagePosition }}
          />
        </div>
        <div className="nm-bp-hero__scrim" aria-hidden="true" />
        <div className="nm-bp-hero__content nm-shell">
          <p className="nm-eyebrow nm-eyebrow--static" data-bp-fade>National Motors</p>
          <h1 className="nm-bp-hero__name" data-bp-fade>{brand.name}</h1>
          <p className="nm-bp-hero__tagline" data-bp-fade>
            {brand.hero.tagline ?? brand.hero.descriptor}
          </p>
        </div>
        <div className="nm-bp-hero__cue" aria-hidden="true">
          <span>Scroll</span>
          <span className="nm-bp-hero__cue-line" />
        </div>
      </section>

      {/* 02 — BRAND INTRODUCTION */}
      <section className="nm-bp-intro" aria-label={`About ${brand.name}`}>
        <div className="nm-shell nm-bp-intro__grid">
          <div className="nm-bp-intro__text">
            <p className="nm-eyebrow nm-eyebrow--gap">{brand.hero.descriptor}</p>
            <h2 ref={introTitleRef} className="nm-bp-intro__title nm-mask-lines">
              <span className="nm-line-mask"><span className="nm-line-inner">{brand.intro.headline}</span></span>
            </h2>
            <div ref={introBodyRef} className="nm-bp-intro__body">
              <p className="nm-lead" data-reveal>{brand.intro.body}</p>
              <div data-reveal>
                <CTAButton href={brand.externalWebsite.url} variant="secondary" cursor="EXPLORE">
                  {brand.externalWebsite.label}
                </CTAButton>
              </div>
            </div>
          </div>

          <div className="nm-bp-intro__media">
            <div ref={introFrameRef} className="nm-bp-intro__frame">
              <div ref={introParallaxRef} className="nm-parallax-wrap">
                <div data-parallax className="nm-parallax-img">
                  <Image
                    src={brand.hero.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    style={{ objectFit: "cover", objectPosition: brand.hero.imagePosition }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — LOCATIONS (terminology differs per brand) */}
      <BrandLocations
        sectionTitle={brand.locations.sectionTitle}
        sectionDescription={brand.locations.sectionDescription}
        entries={brand.locations.entries}
      />
    </>
  );
}
