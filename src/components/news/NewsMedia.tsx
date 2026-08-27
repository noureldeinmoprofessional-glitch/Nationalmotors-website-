"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { useLineReveal, useReveal, useClipReveal, useParallax } from "@/lib/hooks";
import CTAButton from "@/components/ui/CTAButton";
import { NEWS_HERO, FEATURED, PRESS_INDEX, CHAPTERS } from "@/lib/newsData";

/* NEWS & MEDIA — an editorial gateway. All copy verbatim from the approved
   PPTX; the featured item + press releases are real approved items (no
   fabricated news or dates). Reuses the site tokens, reveal hooks, nav + footer. */

// ---- Masthead hero: oversized headline + right-bleeding editorial image ----
function Hero() {
  const headRef = useLineReveal<HTMLHeadingElement>({ start: "top 92%" });
  const bodyRef = useReveal<HTMLDivElement>({ y: 24, stagger: 0.1, start: "top 92%" });
  const frameRef = useClipReveal<HTMLDivElement>({ from: "inset(0 0 0 100%)", start: "top 95%" });
  const parallaxRef = useParallax<HTMLDivElement>({ amount: 6 });

  return (
    <section className="nm-nw-hero" aria-label="News & Media">
      <div className="nm-nw-hero__media" aria-hidden="true">
        <div ref={frameRef} className="nm-nw-hero__frame">
          <div ref={parallaxRef} className="nm-parallax-wrap">
            <div data-parallax className="nm-parallax-img">
              <Image
                src={NEWS_HERO.image}
                alt=""
                fill
                priority
                sizes="(max-width: 900px) 100vw, 52vw"
                quality={85}
                style={{ objectFit: "cover", objectPosition: "50% 55%" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="nm-shell nm-nw-hero__inner">
        <div className="nm-nw-masthead">
          <span>{NEWS_HERO.masthead}</span>
          <span aria-hidden="true" className="nm-nw-masthead__rule" />
          <span>Est. 1978</span>
        </div>
        <p className="nm-eyebrow nm-eyebrow--gap">{NEWS_HERO.eyebrow}</p>
        <h1 ref={headRef} className="nm-nw-hero__title nm-mask-lines">
          {NEWS_HERO.headlineLines.map((line, i) => (
            <span key={i} className="nm-line-mask"><span className="nm-line-inner">{line}</span></span>
          ))}
        </h1>
        <div ref={bodyRef} className="nm-nw-hero__body">
          <p className="nm-lead" data-reveal>{NEWS_HERO.body}</p>
        </div>
        <div className="nm-nw-hero__cue" aria-hidden="true">
          <span>Scroll</span>
          <span className="nm-nw-hero__cue-line" />
        </div>
      </div>
    </section>
  );
}

// ---- Featured story: full-bleed cinematic band ----
function Featured() {
  const frameRef = useClipReveal<HTMLDivElement>({ from: "inset(0 0 100% 0)", start: "top 85%" });
  const bodyRef = useReveal<HTMLDivElement>({ y: 26, stagger: 0.1, start: "top 78%" });

  return (
    <Link href={FEATURED.href} className="nm-nw-feat" aria-label={FEATURED.title}>
      <div ref={frameRef} className="nm-nw-feat__frame">
        <div className="nm-nw-feat__img">
          <Image
            src={FEATURED.image}
            alt={FEATURED.imageAlt}
            fill
            sizes="100vw"
            quality={85}
            style={{ objectFit: "cover", objectPosition: "50% 58%" }}
          />
        </div>
        <span className="nm-nw-feat__scrim" aria-hidden="true" />
        <div ref={bodyRef} className="nm-shell nm-nw-feat__body">
          <div className="nm-nw-feat__meta" data-reveal>
            <span className="nm-nw-feat__kicker">{FEATURED.kicker}</span>
            <span className="nm-nw-feat__tag">{FEATURED.category}</span>
          </div>
          <h2 className="nm-nw-feat__title" data-reveal>{FEATURED.title}</h2>
          <p className="nm-nw-feat__excerpt" data-reveal>{FEATURED.excerpt}</p>
          <span className="nm-nw-cue" data-reveal>
            {FEATURED.cta}
            <ArrowRight strokeWidth={1.7} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ---- Latest press releases: slim editorial index (real, shown once) ----
function LatestPress() {
  const headRef = useReveal<HTMLDivElement>({ y: 18, start: "top 90%" });
  const listRef = useReveal<HTMLUListElement>({ y: 24, stagger: 0.12, start: "top 84%" });

  return (
    <section className="nm-nw-latest" aria-label={PRESS_INDEX.label}>
      <div className="nm-shell">
        <div ref={headRef} className="nm-nw-sechead">
          <span className="nm-nw-sechead__label" data-reveal>{PRESS_INDEX.label}</span>
          <Link href={PRESS_INDEX.href} className="nm-nw-sechead__all" data-reveal>
            View all <ArrowRight strokeWidth={1.7} aria-hidden="true" />
          </Link>
        </div>
        <ul ref={listRef} className="nm-nw-index">
          {PRESS_INDEX.items.map((it) => (
            <li key={it.title} data-reveal>
              <Link href={it.href} className="nm-nw-index__row" aria-label={it.title}>
                <span className="nm-nw-index__tag">{it.category}</span>
                <span className="nm-nw-index__title">{it.title}</span>
                <span className="nm-nw-index__arrow" aria-hidden="true"><ArrowRight strokeWidth={1.7} /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---- Explore the newsroom: three large chapter panels ----
function Chapters() {
  const headRef = useReveal<HTMLDivElement>({ y: 18, start: "top 90%" });
  const listRef = useReveal<HTMLDivElement>({ y: 44, stagger: 0.14, start: "top 82%" });

  return (
    <section className="nm-nw-explore" aria-label="Explore the Newsroom">
      <div className="nm-shell">
        <div ref={headRef} className="nm-nw-sechead">
          <span className="nm-nw-sechead__label" data-reveal>Explore the Newsroom</span>
        </div>
        <div ref={listRef} className="nm-nw-chapters">
          {CHAPTERS.map((c) => (
            <Link
              key={c.n}
              href={c.href}
              className={`nm-nw-chapter nm-nw-chapter--${c.variant}`}
              data-reveal
              aria-label={`${c.name} — ${c.tagline}`}
            >
              <span className="nm-nw-chapter__media" aria-hidden="true">
                <Image src={c.image} alt="" fill loading="lazy" sizes="100vw" style={{ objectFit: "cover", objectPosition: "50% 55%" }} />
                <span className="nm-nw-chapter__tint" />
              </span>
              <span className="nm-nw-chapter__n">{c.n}</span>
              <span className="nm-nw-chapter__main">
                <span className="nm-nw-chapter__name">{c.name}</span>
                <span className="nm-nw-chapter__tagline">{c.tagline}</span>
              </span>
              <span className="nm-nw-chapter__arrow" aria-hidden="true">
                {c.variant === "media" ? <Play strokeWidth={1.5} /> : <ArrowUpRight strokeWidth={1.6} />}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Contact ----
function Contact() {
  const ref = useReveal<HTMLDivElement>({ y: 24, stagger: 0.1, start: "top 86%" });
  return (
    <section className="nm-nw-contact" aria-label="Contact National Motors">
      <div ref={ref} className="nm-shell nm-nw-contact__inner">
        <p className="nm-eyebrow nm-eyebrow--gap" data-reveal>Contact Us</p>
        <p className="nm-lead nm-nw-contact__lead" data-reveal>
          Have a question about our vehicles, services, or mobility solutions? Our team is here to help.
        </p>
        <div data-reveal>
          <CTAButton href="/contact" variant="primary" cursor="VIEW">Contact Us</CTAButton>
        </div>
      </div>
    </section>
  );
}

export default function NewsMedia() {
  return (
    <>
      <Hero />
      <Featured />
      <LatestPress />
      <Chapters />
      <Contact />
    </>
  );
}
