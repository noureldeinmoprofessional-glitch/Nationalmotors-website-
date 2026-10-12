"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { BRAND_TIMELINE } from "@/lib/aboutContent";

type Entry = (typeof BRAND_TIMELINE.entries)[number];

export default function BrandStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const idxRef = useRef<HTMLSpanElement>(null);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);

  const entries = BRAND_TIMELINE.entries;
  const total = entries.length;

  // Entrance reveal — visible by default; only hidden while pending under
  // html.nm-ready. Revealed by adding .is-in (IntersectionObserver with a
  // timeout fallback) so the section can never be stranded invisible.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("is-in");
      return;
    }
    const reveal = () => el.classList.add("is-in");
    const io = new IntersectionObserver(
      (obs) => {
        if (obs.some((e) => e.isIntersecting)) {
          reveal();
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    const fallback = window.setTimeout(reveal, 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  // Mark the milestone nearest the viewport centre as active, and refresh the
  // progress rail + visible-window counter. Positions are derived from the
  // track's actual transform (pinned) or scroll offset (fallback) so the
  // readout stays frame-accurate and never goes stale on a ScrollTrigger
  // refresh. Written straight to the DOM to avoid re-rendering each frame.
  const paint = () => {
    const track = trackRef.current;
    const vp = viewportRef.current;
    const section = sectionRef.current;
    if (!track || !vp || !section) return;

    const pinned = section.classList.contains("nm-bt--pinned");
    const vw = window.innerWidth;
    const center = vw / 2;
    // On-screen x of the track's content origin (its left edge sits at 0).
    const shift = pinned ? (gsap.getProperty(track, "x") as number) : -vp.scrollLeft;
    const span = pinned
      ? Math.max(1, track.scrollWidth - vw)
      : Math.max(1, vp.scrollWidth - vp.clientWidth);
    const progress = Math.min(1, Math.max(0, -shift / span));

    let nearest = 0;
    let nearestDist = Infinity;
    let first = -1;
    let last = -1;
    nodeRefs.current.forEach((n, i) => {
      if (!n) return;
      const left = n.offsetLeft + shift;
      const right = left + n.offsetWidth;
      const c = left + n.offsetWidth / 2;
      const d = Math.abs(c - center);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = i;
      }
      if (right - 12 > 0 && left + 12 < vw) {
        if (first === -1) first = i;
        last = i;
      }
    });
    if (first === -1) {
      first = nearest;
      last = nearest;
    }
    nodeRefs.current.forEach((n, i) => {
      if (n) n.toggleAttribute("data-active", i === nearest);
    });
    if (fillRef.current) fillRef.current.style.transform = `scaleX(${progress})`;
    if (idxRef.current) {
      idxRef.current.textContent =
        first === last ? `${first + 1}` : `${first + 1} – ${last + 1}`;
    }
  };

  // Pinned horizontal scrub (desktop). The track starts with the first
  // milestone at the far right and is drawn leftward as the page scrolls.
  // Falls back to native horizontal scrolling on touch / reduced-motion.
  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!section || !track || !viewport) return;

    if (prefersReducedMotion() || window.innerWidth <= 768) {
      // Native-scroll fallback: keep active/counter synced to the scroll pos.
      const onScroll = () => paint();
      onScroll();
      viewport.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return () => {
        viewport.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }

    section.classList.add("nm-bt--pinned");
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
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
          onRefresh: () => paint(),
          onUpdate: () => paint(),
        },
      });

      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
      section.classList.remove("nm-bt--pinned");
    };
  }, []);

  return (
    <section ref={sectionRef} id="brands" className="nm-bt" aria-label="Brand Story">
      <div className="nm-bt__inner">
        <div className="nm-shell nm-bt__head">
          <p className="nm-eyebrow nm-eyebrow--static">{BRAND_TIMELINE.eyebrow}</p>
          <p className="nm-lead nm-bt__intro">{BRAND_TIMELINE.intro}</p>
        </div>

        <div
          ref={viewportRef}
          className="nm-bt__viewport"
          role="group"
          aria-label="Representation milestones"
        >
          <div ref={trackRef} className="nm-bt__track">
            <span className="nm-bt__axis" aria-hidden="true" />
            {entries.map((e: Entry, i) => (
              <article
                key={e.id}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className="nm-bt__node"
                style={{ ["--i" as string]: i }}
                data-accent={e.accent}
                data-active={i === 0 || undefined}
              >
                <div className="nm-bt__logo">
                  {e.logo ? (
                    <Image
                      src={e.logo}
                      alt={e.name}
                      fill
                      sizes="210px"
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    <span className="nm-bt__mark">{e.mark}</span>
                  )}
                </div>

                <span className="nm-bt__dot" aria-hidden="true" />

                <div className="nm-bt__meta">
                  <h3 className="nm-bt__name">{e.name}</h3>
                  <p className="nm-bt__note">{e.note}</p>
                  <p className="nm-bt__period">{e.period}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="nm-shell nm-bt__controls" aria-hidden="true">
          <div className="nm-bt__rail">
            <span ref={fillRef} className="nm-bt__rail-fill" />
          </div>
          <p className="nm-bt__counter">
            <span ref={idxRef}>1</span>
            <span className="nm-bt__counter-sep"> / </span>
            {total}
          </p>
        </div>
      </div>
    </section>
  );
}
