"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { HERO_SLIDES } from "@/lib/site";
import CTAButton from "@/components/ui/CTAButton";

const DURATION = 6.6; // autoplay seconds per slide
const COUNT = HERO_SLIDES.length;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  const firstRun = useRef(true);
  const prevIndex = useRef(0);
  const animating = useRef(false);
  const progressTween = useRef<gsap.core.Tween | null>(null);
  const pausedRef = useRef(false);

  const startProgress = useCallback(() => {
    if (prefersReducedMotion() || !progressRef.current) return;
    progressTween.current?.kill();
    gsap.set(progressRef.current, { scaleX: 0 });
    progressTween.current = gsap.to(progressRef.current, {
      scaleX: 1,
      duration: DURATION,
      ease: "none",
      onComplete: () => {
        if (!pausedRef.current) setIndex((i) => (i + 1) % COUNT);
      },
    });
    if (pausedRef.current) progressTween.current.pause();
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (animating.current) return;
      const target = ((next % COUNT) + COUNT) % COUNT;
      if (target === index) return;
      setIndex(target);
    },
    [index]
  );
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Transition choreography on index change (layout effect avoids first-paint flash)
  useIsoLayoutEffect(() => {
    const reduce = prefersReducedMotion();
    const layers = layersRef.current;
    const active = layers[index];
    const activeImg = active?.querySelector<HTMLElement>("[data-hero-img]");
    const body = bodyRef.current;

    animating.current = true;
    layers.forEach((l, i) => l && gsap.set(l, { zIndex: i === index ? 2 : 1 }));

    // ---- IMAGE ----
    if (firstRun.current || reduce) {
      if (active) gsap.set(active, { clipPath: "inset(0 0 0% 0)", autoAlpha: 1 });
      if (activeImg) gsap.set(activeImg, { scale: 1.04 });
      layers.forEach((l, i) => l && i !== index && gsap.set(l, { autoAlpha: 0 }));
    } else if (active) {
      gsap.set(active, { autoAlpha: 1, clipPath: "inset(0 0 100% 0)" });
      if (activeImg) gsap.set(activeImg, { scale: 1.22 });
      gsap.to(active, { clipPath: "inset(0 0 0% 0)", duration: 1.25, ease: "power4.inOut" });
      if (activeImg)
        gsap.to(activeImg, { scale: 1.04, duration: 1.7, ease: "power3.out", overwrite: "auto" });
    }
    // slow idle drift for life (after the entrance settles)
    if (!reduce && activeImg) {
      gsap.to(activeImg, {
        scale: 1.13,
        duration: DURATION + 1.4,
        ease: "none",
        delay: firstRun.current ? 0.3 : 1.75,
        overwrite: "auto",
      });
    }

    // ---- CONTENT ----
    if (body) {
      const lines = body.querySelectorAll<HTMLElement>(".nm-line-inner");
      const fades = body.querySelectorAll<HTMLElement>("[data-hero-fade]");
      if (reduce) {
        gsap.set(lines, { yPercent: 0 });
        gsap.set(fades, { opacity: 1, y: 0 });
      } else {
        gsap.set(lines, { yPercent: 110 });
        gsap.set(fades, { opacity: 0, y: 22 });
        const tl = gsap.timeline({ delay: firstRun.current ? 0.15 : 0.28 });
        tl.to(lines, { yPercent: 0, duration: 1.05, stagger: 0.1, ease: "power4.out" }).to(
          fades,
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" },
          "-=0.7"
        );
      }
    }

    // release lock + (re)start autoplay
    const unlock = gsap.delayedCall(reduce ? 0.05 : 1.0, () => {
      animating.current = false;
      layers.forEach((l, i) => l && i !== index && gsap.set(l, { autoAlpha: 0 }));
      prevIndex.current = index;
      firstRun.current = false;
      startProgress();
    });

    return () => {
      unlock.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Cleanup long-lived tweens on unmount
  useEffect(() => {
    return () => {
      progressTween.current?.kill();
      gsap.killTweensOf("[data-hero-img]");
    };
  }, []);

  // Pause on hover / focus / tab hidden
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const pause = () => {
      pausedRef.current = true;
      progressTween.current?.pause();
    };
    const resume = () => {
      pausedRef.current = false;
      progressTween.current?.play();
    };
    const onVis = () => (document.hidden ? pause() : resume());
    root.addEventListener("mouseenter", pause);
    root.addEventListener("mouseleave", resume);
    root.addEventListener("focusin", pause);
    root.addEventListener("focusout", resume);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      root.removeEventListener("mouseenter", pause);
      root.removeEventListener("mouseleave", resume);
      root.removeEventListener("focusin", pause);
      root.removeEventListener("focusout", resume);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Swipe
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let x0: number | null = null;
    const down = (e: PointerEvent) => (x0 = e.clientX);
    const up = (e: PointerEvent) => {
      if (x0 === null) return;
      const dx = e.clientX - x0;
      if (Math.abs(dx) > 60) (dx < 0 ? goNext : goPrev)();
      x0 = null;
    };
    root.addEventListener("pointerdown", down);
    root.addEventListener("pointerup", up);
    return () => {
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("pointerup", up);
    };
  }, [goNext, goPrev]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
  };

  const slide = HERO_SLIDES[index];

  return (
    <section
      ref={rootRef}
      className="nm-hero"
      aria-roledescription="carousel"
      aria-label="Featured stories from National Motors"
      onKeyDown={onKeyDown}
      tabIndex={-1}
    >
      <div className="nm-hero__stage" aria-hidden="true">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => { layersRef.current[i] = el; }}
            className="nm-hero__layer"
          >
            <div className="nm-hero__imgwrap">
              <Image
                data-hero-img=""
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                quality={90}
                style={{ objectFit: "cover", objectPosition: s.imagePosition }}
              />
            </div>
          </div>
        ))}
        <div className="nm-hero__scrim" />
      </div>

      <div className="nm-hero__content nm-shell">
        <div ref={bodyRef} className="nm-hero__body" aria-live="polite">
          <p className="nm-eyebrow nm-eyebrow--sm" data-accent={slide.accent} data-hero-fade>
            {slide.category}
          </p>
          <h1 className="nm-hero__title">
            {slide.titleLines.map((line, li) => (
              <span key={li} className="nm-line-mask">
                <span className="nm-line-inner">{line}</span>
              </span>
            ))}
          </h1>
          <p className="nm-hero__official" data-hero-fade>{slide.officialTitle}</p>
          <p className="nm-hero__desc" data-hero-fade>{slide.description}</p>
          <div className="nm-hero__cta" data-hero-fade>
            <CTAButton
              href={slide.cta.href}
              variant="primary"
              cursor={slide.category === "Test Drive" ? "BOOK" : "OPEN"}
              download={slide.category === "Press Release"}
            >
              {slide.cta.label}
            </CTAButton>
          </div>
        </div>
      </div>

      <div className="nm-hero__selector" role="tablist" aria-label="Choose featured story">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === index}
            aria-label={`${s.model} — slide ${i + 1} of ${COUNT}`}
            className={`nm-hero__tab${i === index ? " is-active" : ""}`}
            onClick={() => goTo(i)}
            data-cursor="VIEW"
          >
            <span className="nm-hero__tab-num">0{i + 1}</span>
            <span className="nm-hero__tab-line">
              {i === index && <span ref={progressRef} className="nm-hero__tab-fill" />}
            </span>
            <span className="nm-hero__tab-label">{s.model}</span>
          </button>
        ))}
      </div>

      <div className="nm-hero__controls nm-shell">
        <div className="nm-hero__counter" aria-hidden="true">
          <span className="nm-hero__counter-now">0{index + 1}</span>
          <span className="nm-hero__counter-sep">/</span>
          <span className="nm-hero__counter-total">0{COUNT}</span>
        </div>
        <div className="nm-hero__nav">
          <button className="nm-hero__navbtn" onClick={goPrev} aria-label="Previous slide" data-cursor="PREV">
            <ArrowLeft strokeWidth={1.5} />
          </button>
          <button className="nm-hero__navbtn" onClick={goNext} aria-label="Next slide" data-cursor="NEXT">
            <ArrowRight strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="nm-hero__scrollcue" aria-hidden="true">
        <span>Scroll</span>
        <span className="nm-hero__scrollcue-line" />
      </div>
    </section>
  );
}
