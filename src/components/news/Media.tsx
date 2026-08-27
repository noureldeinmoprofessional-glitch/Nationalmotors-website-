"use client";

import { useEffect, useRef, useState } from "react";
import { X, Play, Image as ImageIcon, Clock } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect, useReveal } from "@/lib/hooks";
import { NewsroomHero } from "./NewsroomParts";
import { MEDIA } from "@/lib/newsroomData";

type Tile = { type: string; label: string; size: "lg" | "sm"; youtubeId?: string; image?: string };

// Reusable media viewer — accepts a real YouTube embed or image when available;
// otherwise shows a clearly-marked "coming soon" state. Escape / backdrop close.
function MediaLightbox({ item, onClose }: { item: Tile; onClose: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const finish = () => onClose();
  const close = () => {
    if (closingRef.current) return;
    const p = panelRef.current, b = backdropRef.current;
    if (prefersReducedMotion() || !p || !b) return finish();
    closingRef.current = true;
    gsap.to(p, { opacity: 0, scale: 0.97, y: 10, duration: 0.32, ease: "power2.in" });
    gsap.to(b, { opacity: 0, duration: 0.32, ease: "power2.in" });
    window.setTimeout(finish, 340);
  };

  useIsoLayoutEffect(() => {
    const p = panelRef.current, b = backdropRef.current;
    document.documentElement.style.overflow = "hidden";
    if (!prefersReducedMotion() && p && b) {
      gsap.fromTo(b, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(p, { opacity: 0, scale: 0.97, y: 12 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" });
    }
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => { document.documentElement.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.preventDefault(); close(); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="nm-modal" role="dialog" aria-modal="true" aria-label={`${item.label} media`}>
      <div ref={backdropRef} className="nm-modal__backdrop" onClick={close} aria-hidden="true" />
      <div ref={panelRef} className="nm-md-lightbox">
        <button type="button" className="nm-modal__close" onClick={close} aria-label="Close"><X strokeWidth={1.7} aria-hidden="true" /></button>
        <div className="nm-md-lightbox__stage">
          {item.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?rel=0`}
              title={item.label}
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="nm-md-lightbox__soon">
              <Clock strokeWidth={1.4} aria-hidden="true" />
              <p>This {item.type.toLowerCase()} is coming soon.</p>
            </div>
          )}
        </div>
        <div className="nm-md-lightbox__meta">
          <span className="nm-nw-index__tag">{item.type}</span>
          <span className="nm-md-lightbox__label">{item.label}</span>
        </div>
      </div>
    </div>
  );
}

function Tile({ t, onOpen }: { t: Tile; onOpen: () => void }) {
  const isVideo = t.type === "Video";
  return (
    <button type="button" className={`nm-md-tile nm-md-tile--${t.size}`} onClick={onOpen} aria-label={`${t.label} — ${t.type}, coming soon`}>
      <span className="nm-md-tile__surface" aria-hidden="true" />
      <span className="nm-md-tile__icon" aria-hidden="true">
        {isVideo ? <Play strokeWidth={1.5} /> : <ImageIcon strokeWidth={1.5} />}
      </span>
      <span className="nm-md-tile__foot">
        <span className="nm-nw-index__tag">{t.type}</span>
        <span className="nm-md-tile__label">{t.label}</span>
        <span className="nm-md-tile__soon">Coming Soon</span>
      </span>
    </button>
  );
}

function Gallery({ onOpen }: { onOpen: (t: Tile) => void }) {
  const headRef = useReveal<HTMLDivElement>({ y: 18, start: "top 90%" });
  const gridRef = useReveal<HTMLDivElement>({ y: 40, stagger: 0.1, start: "top 84%" });
  const [featured, ...rest] = MEDIA.placeholderTiles as Tile[];

  return (
    <section className="nm-md-gallery-sec" aria-label="Media gallery">
      <div className="nm-shell">
        <div ref={headRef} className="nm-nw-sechead">
          <span className="nm-nw-sechead__label">Media Gallery</span>
        </div>
        {/* Featured media */}
        <button type="button" className="nm-md-featured" onClick={() => onOpen(featured)} aria-label={`${featured.label} — featured ${featured.type}, coming soon`}>
          <span className="nm-md-featured__surface" aria-hidden="true" />
          <span className="nm-md-featured__play" aria-hidden="true"><Play strokeWidth={1.4} /></span>
          <span className="nm-md-featured__foot">
            <span className="nm-nw-index__tag">{featured.type}</span>
            <span className="nm-md-featured__label">{featured.label}</span>
            <span className="nm-md-tile__soon">Coming Soon</span>
          </span>
        </button>
        {/* Masonry-inspired grid */}
        <div ref={gridRef} className="nm-md-grid">
          {rest.map((t) => (
            <div key={t.label} data-reveal className={`nm-md-cell nm-md-cell--${t.size}`}>
              <Tile t={t} onOpen={() => onOpen(t)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Media() {
  const [active, setActive] = useState<Tile | null>(null);
  return (
    <>
      <NewsroomHero data={MEDIA.hero} variant="media" />
      <Gallery onOpen={setActive} />
      {active && <MediaLightbox item={active} onClose={() => setActive(null)} />}
    </>
  );
}
