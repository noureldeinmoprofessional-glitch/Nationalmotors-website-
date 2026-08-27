"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { useReveal, useClipReveal } from "@/lib/hooks";
import { NewsroomHero } from "./NewsroomParts";
import { PRESS } from "@/lib/newsroomData";

function FeaturedRelease() {
  const frameRef = useClipReveal<HTMLDivElement>({ from: "inset(0 0 100% 0)", start: "top 84%" });
  const bodyRef = useReveal<HTMLDivElement>({ y: 24, stagger: 0.1, start: "top 82%" });
  const r = PRESS.items[0];

  return (
    <section className="nm-pr-feat-sec" aria-label="Latest press release">
      <div className="nm-shell">
        <div className="nm-nw-sechead">
          <span className="nm-nw-sechead__label">Latest Release</span>
        </div>
        <Link href={r.href} className="nm-pr-feat" aria-label={r.title}>
          <div ref={frameRef} className="nm-pr-feat__media">
            <div className="nm-pr-feat__img">
              <Image src={r.image} alt={r.imageAlt} fill sizes="(max-width: 900px) 100vw, 55vw" style={{ objectFit: "cover", objectPosition: "50% 55%" }} />
            </div>
            <span className="nm-pr-feat__scrim" aria-hidden="true" />
          </div>
          <div ref={bodyRef} className="nm-pr-feat__body">
            <span className="nm-nw-index__tag" data-reveal>{r.category}</span>
            <h2 className="nm-pr-feat__title" data-reveal>{r.title}</h2>
            <p className="nm-pr-feat__excerpt" data-reveal>{r.excerpt}</p>
            <span className="nm-nw-cue" data-reveal>Read Press Release <ArrowRight strokeWidth={1.7} aria-hidden="true" /></span>
          </div>
        </Link>
      </div>
    </section>
  );
}

function PressGrid() {
  const gridRef = useReveal<HTMLDivElement>({ y: 40, stagger: 0.12, start: "top 84%" });
  const rest = PRESS.items.slice(1);

  return (
    <section className="nm-pr-grid-sec" aria-label="Press releases">
      <div className="nm-shell">
        <div className="nm-nw-sechead">
          <span className="nm-nw-sechead__label">All Press Releases</span>
        </div>
        <div ref={gridRef} className="nm-pr-grid">
          {rest.map((r) => (
            <Link key={r.title} href={r.href} className="nm-pr-card" data-reveal aria-label={r.title}>
              <span className="nm-pr-card__media">
                <span className="nm-pr-card__img">
                  <Image src={r.image} alt={r.imageAlt} fill loading="lazy" sizes="(max-width: 720px) 100vw, 45vw" style={{ objectFit: "cover", objectPosition: "50% 55%" }} />
                </span>
                <span className="nm-pr-card__scrim" aria-hidden="true" />
              </span>
              <span className="nm-pr-card__body">
                <span className="nm-nw-index__tag">{r.category}</span>
                <span className="nm-pr-card__title">{r.title}</span>
                <span className="nm-nw-cue nm-pr-card__cue">Read Press Release <ArrowRight strokeWidth={1.7} aria-hidden="true" /></span>
              </span>
            </Link>
          ))}

          {/* Clearly-marked placeholder — the archive is ready for more releases. */}
          <div className="nm-pr-card nm-pr-card--soon" aria-hidden="true">
            <span className="nm-pr-soon">
              <Clock strokeWidth={1.5} />
              <span className="nm-pr-soon__label">More releases coming soon</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PressReleases() {
  return (
    <>
      <NewsroomHero data={PRESS.hero} variant="press" />
      <FeaturedRelease />
      <PressGrid />
    </>
  );
}
