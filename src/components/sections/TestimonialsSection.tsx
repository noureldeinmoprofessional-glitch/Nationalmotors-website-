"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useReveal } from "@/lib/hooks";
import { TESTIMONIALS } from "@/lib/site";
import { prefersReducedMotion } from "@/lib/gsap";
import CTAButton from "@/components/ui/CTAButton";
import VideoCard from "@/components/ui/VideoCard";

/* A continuous, smooth-scrolling rail of vertical (9:16) video placeholders.
   The base set is duplicated so the loop is seamless; playback auto-advances
   via rAF and can be paused/nudged with the control buttons. Pauses on hover,
   focus, and when the tab is hidden, and stays still under reduced motion. */
export default function TestimonialsSection() {
  const introRef = useReveal<HTMLDivElement>({ y: 26, stagger: 0.1 });

  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [playing, setPlaying] = useState(true);

  // Enough cards to overflow the widest viewport, then doubled for a seamless
  // loop. The rail resets by one "half" (one full base cycle) so the seam never
  // shows.
  const base = [...TESTIMONIALS, ...TESTIMONIALS];
  const loop = [...base, ...base];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (prefersReducedMotion()) {
      setPlaying(false);
      pausedRef.current = true;
      return;
    }

    let raf = 0;
    const SPEED = 0.4; // px per frame — calm, premium drift
    const step = () => {
      if (!pausedRef.current) {
        track.scrollLeft += SPEED;
        const half = track.scrollWidth / 2;
        if (track.scrollLeft >= half) track.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onVis = () => {
      if (document.hidden) pausedRef.current = true;
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const togglePlay = () => {
    const next = !playing;
    setPlaying(next);
    pausedRef.current = !next;
  };

  const nudge = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".nm-vcard");
    const amount = (card?.offsetWidth ?? 300) + 20;
    // Keep within the seamless range before a manual smooth scroll.
    const half = track.scrollWidth / 2;
    if (dir === -1 && track.scrollLeft < amount) track.scrollLeft += half;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const hold = (v: boolean) => () => {
    if (playing) pausedRef.current = v;
  };

  return (
    <section id="testimonials" className="nm-testi" aria-label="Client Testimonials">
      <div className="nm-shell">
        <div className="nm-testi__head">
          <div>
            <p className="nm-eyebrow nm-eyebrow--gap">Client Testimonials</p>
          </div>
          <div ref={introRef} className="nm-testi__intro">
            <p className="nm-lead" data-reveal>
              Discover what clients and partners across National Motors&rsquo; brands and
              sectors say about their experience with us.
            </p>
            <div data-reveal>
              <CTAButton href="/testimonials" variant="ghost" cursor="VIEW">
                View now
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      <div className="nm-testi__marquee">
        <div
          ref={trackRef}
          className="nm-testi__track"
          onMouseEnter={hold(true)}
          onMouseLeave={hold(false)}
          onFocusCapture={hold(true)}
          onBlurCapture={hold(false)}
          aria-label="Client testimonial videos"
        >
          {loop.map((t, i) => (
            <div key={`${t.id}-${i}`} className="nm-testi__slide" aria-hidden={i >= base.length}>
              <VideoCard data={t} vertical />
            </div>
          ))}
        </div>

        <div className="nm-testi__controls" role="group" aria-label="Testimonial playback controls">
          <button type="button" className="nm-testi__ctrl" onClick={() => nudge(-1)} aria-label="Previous">
            <ChevronLeft strokeWidth={1.7} />
          </button>
          <button
            type="button"
            className="nm-testi__ctrl nm-testi__ctrl--play"
            onClick={togglePlay}
            aria-pressed={!playing}
            aria-label={playing ? "Pause auto-scroll" : "Play auto-scroll"}
          >
            {playing ? <Pause strokeWidth={1.7} /> : <Play strokeWidth={1.7} />}
          </button>
          <button type="button" className="nm-testi__ctrl" onClick={() => nudge(1)} aria-label="Next">
            <ChevronRight strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </section>
  );
}
