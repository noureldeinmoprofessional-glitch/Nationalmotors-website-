"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { prefersReducedMotion } from "@/lib/gsap";
import { BRAND_TIMELINE } from "@/lib/aboutContent";

type Entry = (typeof BRAND_TIMELINE.entries)[number];

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BrandStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);

  const entries = BRAND_TIMELINE.entries;
  const total = entries.length;

  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(entries[0]?.id ?? "");
  const [win, setWin] = useState<[number, number]>([1, Math.min(5, total)]);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(total <= 1);
  const draggingRef = useRef(false);

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
      (entriesObs) => {
        if (entriesObs.some((e) => e.isIntersecting)) {
          reveal();
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    const fallback = window.setTimeout(reveal, 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  // Sync progress rail, active node, and the visible-window counter to scroll.
  const sync = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const max = vp.scrollWidth - vp.clientWidth;
    const p = max > 0 ? vp.scrollLeft / max : 0;
    setProgress(p);
    setAtStart(vp.scrollLeft <= 2);
    setAtEnd(vp.scrollLeft >= max - 2);

    const viewLeft = vp.scrollLeft;
    const viewRight = viewLeft + vp.clientWidth;
    const center = viewLeft + vp.clientWidth / 2;

    let nearest = 0;
    let nearestDist = Infinity;
    let first = -1;
    let last = -1;
    nodeRefs.current.forEach((n, i) => {
      if (!n) return;
      const nLeft = n.offsetLeft;
      const nRight = nLeft + n.offsetWidth;
      const nCenter = nLeft + n.offsetWidth / 2;
      const d = Math.abs(nCenter - center);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = i;
      }
      // Count a node as "in window" when the majority of it is visible.
      if (nRight - 12 > viewLeft && nLeft + 12 < viewRight) {
        if (first === -1) first = i;
        last = i;
      }
    });
    if (first === -1) {
      first = nearest;
      last = nearest;
    }
    setActiveId(entries[nearest]?.id ?? "");
    setWin([first + 1, last + 1]);
  }, [entries]);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    sync();
    vp.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      vp.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  // Arrow navigation — advance to the next / previous node, centered.
  const scrollToNode = useCallback((i: number) => {
    const vp = viewportRef.current;
    const node = nodeRefs.current[i];
    if (!vp || !node) return;
    const target = node.offsetLeft + node.offsetWidth / 2 - vp.clientWidth / 2;
    vp.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      const current = entries.findIndex((e) => e.id === activeId);
      const next = Math.min(total - 1, Math.max(0, current + dir));
      scrollToNode(next);
    },
    [activeId, entries, total, scrollToNode]
  );

  // Draggable scrubber handle mapped to scroll position.
  const onHandlePointerDown = useCallback((e: React.PointerEvent) => {
    const rail = railRef.current;
    const vp = viewportRef.current;
    if (!rail || !vp) return;
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    const move = (clientX: number) => {
      const rect = rail.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const max = vp.scrollWidth - vp.clientWidth;
      vp.scrollLeft = ratio * max;
    };
    move(e.clientX);

    const onMove = (ev: PointerEvent) => draggingRef.current && move(ev.clientX);
    const onUp = () => {
      draggingRef.current = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, []);

  // Clicking anywhere on the rail jumps to that position.
  const onRailPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.target !== railRef.current) return;
      onHandlePointerDown(e);
    },
    [onHandlePointerDown]
  );

  return (
    <section ref={sectionRef} id="brands" className="nm-bt" aria-label="Brand Story">
      <div className="nm-shell nm-bt__head">
        <p className="nm-eyebrow nm-eyebrow--static">{BRAND_TIMELINE.eyebrow}</p>
        <p className="nm-lead nm-bt__intro">{BRAND_TIMELINE.intro}</p>
      </div>

      <div
        ref={viewportRef}
        className="nm-bt__viewport"
        tabIndex={0}
        role="group"
        aria-label="Representation milestones, scroll horizontally"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
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
              data-active={activeId === e.id || undefined}
            >
              <div className="nm-bt__logo">
                {e.logo ? (
                  <Image
                    src={e.logo}
                    alt={e.name}
                    width={160}
                    height={56}
                    style={{ objectFit: "contain", width: "auto", height: "100%" }}
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

      <div className="nm-shell nm-bt__controls">
        <div
          ref={railRef}
          className="nm-bt__rail"
          onPointerDown={onRailPointerDown}
          aria-hidden="true"
        >
          <span className="nm-bt__rail-fill" style={{ transform: `scaleX(${progress})` }} />
          <button
            type="button"
            className="nm-bt__handle"
            style={{ left: `${progress * 100}%` }}
            onPointerDown={onHandlePointerDown}
            aria-label="Scrub the timeline"
            tabIndex={-1}
          />
        </div>

        <div className="nm-bt__bar">
          <p className="nm-bt__counter" aria-live="polite">
            {win[0] === win[1] ? win[0] : `${win[0]} – ${win[1]}`}
            <span className="nm-bt__counter-sep"> / </span>
            {total}
          </p>
          <div className="nm-bt__arrows">
            <button
              type="button"
              className="nm-bt__arrow"
              onClick={() => step(-1)}
              disabled={atStart}
              aria-label="Previous milestone"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              className="nm-bt__arrow"
              onClick={() => step(1)}
              disabled={atEnd}
              aria-label="Next milestone"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
