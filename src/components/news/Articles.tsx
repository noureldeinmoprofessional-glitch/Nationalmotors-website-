"use client";

import Image from "next/image";
import { useReveal, useClipReveal, useLineReveal } from "@/lib/hooks";
import { NewsroomHero, NewsroomContact } from "./NewsroomParts";
import { ARTICLES } from "@/lib/newsroomData";

// Placeholder blocks — clearly marked, NOT presented as published articles.
// Topics are the real coverage areas from the approved description (slide 38).
const BLOCKS = [
  { topic: "Commercial Mobility", image: "/images/about-hero/automotive.jpg" },
  { topic: "Electric Vehicles", image: "/images/hero/farizon-v6e.png" },
  { topic: "Business & Sectors", image: "/images/about-hero/real-estate.jpg" },
];

function FeaturedPlaceholder() {
  const headRef = useLineReveal<HTMLHeadingElement>({ start: "top 86%" });
  const bodyRef = useReveal<HTMLDivElement>({ y: 22, stagger: 0.09, start: "top 84%" });
  return (
    <section className="nm-ar-feat-sec" aria-label="Articles coming soon">
      <div className="nm-shell">
        <div ref={bodyRef} className="nm-ar-feat">
          <span className="nm-ar-soon-tag" data-reveal>Coming Soon</span>
          <h2 ref={headRef} className="nm-ar-feat__title nm-mask-lines">
            <span className="nm-line-mask"><span className="nm-line-inner">The first insights</span></span>
            <span className="nm-line-mask"><span className="nm-line-inner">are in preparation.</span></span>
          </h2>
          <p className="nm-lead nm-ar-feat__body" data-reveal>
            Our editorial team is preparing informative and educational articles across the areas National Motors operates in. They will appear here soon.
          </p>
          <ul className="nm-ar-topics" data-reveal>
            {ARTICLES.placeholderTopics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ArchivePlaceholders() {
  const headRef = useReveal<HTMLDivElement>({ y: 18, start: "top 90%" });
  return (
    <section className="nm-ar-archive" aria-label="Articles archive">
      <div className="nm-shell">
        <div ref={headRef} className="nm-nw-sechead">
          <span className="nm-nw-sechead__label">The Archive</span>
        </div>
        <div className="nm-ar-blocks">
          {BLOCKS.map((b, i) => (
            <ArticleBlock key={b.topic} b={b} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleBlock({ b, flip }: { b: { topic: string; image: string }; flip: boolean }) {
  const frameRef = useClipReveal<HTMLDivElement>({ from: flip ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)", start: "top 82%" });
  const bodyRef = useReveal<HTMLDivElement>({ y: 24, stagger: 0.1, start: "top 82%" });
  return (
    <article className={`nm-ar-block${flip ? " nm-ar-block--flip" : ""}`} aria-label={`${b.topic} — coming soon`}>
      <div className="nm-ar-block__media">
        <div ref={frameRef} className="nm-ar-block__frame">
          <div className="nm-ar-block__img">
            <Image src={b.image} alt="" fill loading="lazy" sizes="(max-width: 900px) 100vw, 52vw" style={{ objectFit: "cover", objectPosition: "50% 55%" }} />
          </div>
          <span className="nm-ar-block__tint" aria-hidden="true" />
        </div>
      </div>
      <div ref={bodyRef} className="nm-ar-block__text">
        <span className="nm-ar-soon-tag" data-reveal>Coming Soon</span>
        <p className="nm-nw-index__tag nm-ar-block__topic" data-reveal>{b.topic}</p>
        <h3 className="nm-ar-block__title" data-reveal>Insights on {b.topic.toLowerCase()} are on the way.</h3>
        <span className="nm-ar-block__cue" data-reveal>Read Article <span aria-hidden="true">&rarr;</span></span>
      </div>
    </article>
  );
}

export default function Articles() {
  return (
    <>
      <NewsroomHero data={ARTICLES.hero} variant="articles" />
      <FeaturedPlaceholder />
      <ArchivePlaceholders />
      <NewsroomContact />
    </>
  );
}
