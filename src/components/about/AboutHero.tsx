"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { ABOUT_HERO } from "@/lib/aboutContent";

// Four core sectors — order is fixed: Automotive → Agriculture → Tyres → Real Estate.
const INDUSTRIES = [
  { key: "automotive", label: "Automotive", image: "/images/about-hero/automotive.jpg", pos: "50% 58%", alt: "National Motors commercial vehicles driving through a city" },
  { key: "agriculture", label: "Agriculture", image: "/images/about-hero/agriculture.jpg", pos: "50% 55%", alt: "A tractor working an agricultural field at sunset" },
  { key: "tyres", label: "After Market", image: "/images/about-hero/tyres.jpg", pos: "50% 50%", alt: "A technician inspecting a tyre in a workshop" },
  { key: "realestate", label: "Real Estate", image: "/images/about-hero/real-estate.jpg", pos: "50% 45%", alt: "A modern residential real-estate development at golden hour" },
];

const HOLD = 5.6; // seconds each image rests
const TRANS = 1.7; // circular reveal duration

const STORY_WORDS = ABOUT_HERO.intro.split(" ");

export default function AboutHero() {
  const rootRef = useRef<HTMLElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectorRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const layers = layersRef.current.filter(Boolean) as HTMLDivElement[];
    const inners = layers.map((l) => l.querySelector<HTMLElement>(".nm-ah__layer-inner"));
    const words = gsap.utils.toArray<HTMLElement>(".nm-ah__word", root);
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // Intro reveal for the (stable) headline + supporting copy container.
      const titleLines = root.querySelectorAll<HTMLElement>(".nm-ah__title .nm-line-inner");
      const fades = root.querySelectorAll<HTMLElement>("[data-ah-fade]");
      if (!reduce) {
        gsap.set(titleLines, { yPercent: 110 });
        gsap.set(fades, { opacity: 0, y: 22 });
        const intro = gsap.timeline({ delay: 0.15 });
        intro.to(titleLines, { yPercent: 0, duration: 1.05, stagger: 0.1, ease: "power4.out" })
          .to(fades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }, "-=0.7");
      }

      // Initial layer state
      layers.forEach((l, i) => gsap.set(l, { autoAlpha: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0, clipPath: "none" }));
      inners.forEach((im, i) => im && gsap.set(im, { scale: i === 0 ? 1.03 : 1.05 }));

      // ---------- Scroll-scrubbed blur reveal of the story sentence ----------
      const N = words.length;
      const SPREAD = 0.72; // where the last word begins sharpening
      const WIN = 0.28; // how much progress each word takes to sharpen
      const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
      const applyBlur = (p: number) => {
        for (let i = 0; i < N; i++) {
          const wp = clamp01((p - (i / N) * SPREAD) / WIN);
          const el = words[i];
          el.style.opacity = (0.28 + 0.72 * wp).toFixed(3);
          el.style.filter = `blur(${((1 - wp) * 12).toFixed(2)}px)`;
          el.style.transform = `translateY(${((1 - wp) * 6).toFixed(2)}px)`;
        }
      };

      if (reduce) {
        // Reduced motion: full sentence sharp, no pin, no scrub.
        words.forEach((el) => { el.style.opacity = "1"; el.style.filter = "none"; el.style.transform = "none"; });
      } else if (N) {
        applyBlur(0);
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: () => "+=" + (window.innerWidth < 768 ? 900 : 1500),
          pin: root,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => applyBlur(self.progress),
          onRefresh: (self) => applyBlur(self.progress),
        });
      }

      // ---- Reduced motion: simple crossfade, no circle, no scale ----
      if (reduce) {
        let i = 0;
        const id = window.setInterval(() => {
          const next = (i + 1) % INDUSTRIES.length;
          gsap.to(layers[next], { autoAlpha: 1, duration: 0.7 });
          gsap.to(layers[i], { autoAlpha: 0, duration: 0.7, delay: 0.15 });
          setLabel(next);
          i = next;
        }, 6500);
        return () => window.clearInterval(id);
      }

      // ---- Cinematic circular-reveal cycle (unchanged) ----
      let current = 0;
      let holdCall: gsap.core.Tween | null = null;
      let drift: gsap.core.Tween | null = null;
      let tl: gsap.core.Timeline | null = null;
      let paused = false;

      const startDrift = (idx: number) => {
        drift?.kill();
        if (inners[idx]) drift = gsap.fromTo(inners[idx], { scale: 1.03 }, { scale: 1.06, duration: HOLD + TRANS, ease: "none" });
      };

      const transition = () => {
        const from = current;
        const to = (current + 1) % INDUSTRIES.length;
        gsap.set(layers[to], { autoAlpha: 1, zIndex: 5, clipPath: "circle(0% at 50% 50%)" });
        if (inners[to]) gsap.set(inners[to], { scale: 1.05 });
        setLabel(to);

        tl = gsap.timeline({
          onComplete: () => {
            gsap.set(layers[from], { autoAlpha: 0, zIndex: 0 });
            gsap.set(layers[to], { zIndex: 1, clipPath: "none" });
            current = to;
            startDrift(current);
            holdCall = gsap.delayedCall(HOLD, transition);
            if (paused) holdCall.pause();
          },
        });
        tl.to(layers[to], { clipPath: "circle(75% at 50% 50%)", duration: TRANS, ease: "power2.inOut" }, 0);
        if (inners[to]) tl.fromTo(inners[to], { scale: 1.05 }, { scale: 1.03, duration: TRANS + 0.3, ease: "power2.out" }, 0);
      };

      startDrift(0);
      holdCall = gsap.delayedCall(HOLD, transition);

      // Pause when tab hidden
      const onVis = () => {
        paused = document.hidden;
        [holdCall, drift, tl].forEach((a) => a && (document.hidden ? a.pause() : a.resume()));
      };
      document.addEventListener("visibilitychange", onVis);

      return () => {
        document.removeEventListener("visibilitychange", onVis);
        holdCall?.kill();
        drift?.kill();
        tl?.kill();
      };
    }, root);

    function setLabel(idx: number) {
      const inner = sectorRef.current;
      const counter = counterRef.current;
      if (!inner) return;
      if (reduce) {
        inner.textContent = INDUSTRIES[idx].label;
        if (counter) counter.textContent = "0" + (idx + 1);
        return;
      }
      const t = gsap.timeline();
      t.to(inner, { yPercent: -115, duration: 0.4, ease: "power2.in" })
        .add(() => {
          inner.textContent = INDUSTRIES[idx].label;
          if (counter) counter.textContent = "0" + (idx + 1);
        })
        .set(inner, { yPercent: 115 })
        .to(inner, { yPercent: 0, duration: 0.55, ease: "power3.out" });
    }

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="nm-ah" aria-label="About National Motors">
      <div className="nm-ah__stage" aria-hidden="true">
        {INDUSTRIES.map((ind, i) => (
          <div
            key={ind.key}
            ref={(el) => { layersRef.current[i] = el; }}
            className="nm-ah__layer"
          >
            <div className="nm-ah__layer-inner">
              <Image
                src={ind.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                quality={82}
                style={{ objectFit: "cover", objectPosition: ind.pos }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="nm-ah__overlay" aria-hidden="true" />

      <div className="nm-ah__content nm-shell">
        <h1 className="nm-eyebrow" data-ah-fade>{ABOUT_HERO.eyebrow}</h1>
        <p className="nm-ah__intro" data-ah-fade>
          <span className="nm-sr-only">{ABOUT_HERO.intro}</span>
          <span className="nm-ah__intro-inner" aria-hidden="true">
            {STORY_WORDS.map((w, i) => (
              <Fragment key={i}>
                {i > 0 ? " " : null}
                <span className="nm-ah__word">{w}</span>
              </Fragment>
            ))}
          </span>
        </p>
      </div>

      {/* Industry indicator */}
      <div className="nm-ah__indicator" data-ah-fade aria-hidden="true">
        <span className="nm-ah__counter">
          <span ref={counterRef} className="nm-ah__counter-now">01</span>
          <span className="nm-ah__counter-total"> / 0{INDUSTRIES.length}</span>
        </span>
        <span className="nm-ah__sector nm-line-mask">
          <span ref={sectorRef} className="nm-line-inner">{INDUSTRIES[0].label}</span>
        </span>
      </div>

      {/* Accessible list of the four sectors (not conveyed by animation alone) */}
      <ul className="nm-sr-only">
        {INDUSTRIES.map((ind) => (
          <li key={ind.key}>{ind.label}</li>
        ))}
      </ul>

      <div className="nm-ah__cue" aria-hidden="true">
        <span>Scroll</span>
        <span className="nm-ah__cue-line" />
      </div>
    </section>
  );
}
