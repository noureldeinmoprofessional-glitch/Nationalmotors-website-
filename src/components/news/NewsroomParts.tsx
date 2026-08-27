"use client";

import Image from "next/image";
import { useLineReveal, useReveal, useClipReveal, useParallax } from "@/lib/hooks";

type HeroData = {
  eyebrow: string;
  headlineLines: string[];
  body: string;
  image: string;
  imageAlt: string;
};

/* Shared inner-page hero. One architecture, three characters via `variant`:
   press = editorial split, articles = asymmetric oversized, media = cinematic full-bleed. */
export function NewsroomHero({ data, variant }: { data: HeroData; variant: "press" | "articles" | "media" }) {
  const headRef = useLineReveal<HTMLHeadingElement>({ start: "top 94%" });
  const bodyRef = useReveal<HTMLDivElement>({ y: 24, stagger: 0.1, start: "top 94%" });
  const frameRef = useClipReveal<HTMLDivElement>({
    from: variant === "media" ? "inset(0 0 100% 0)" : "inset(0 0 0 100%)",
    start: "top 95%",
  });
  const parallaxRef = useParallax<HTMLDivElement>({ amount: variant === "media" ? 7 : 5 });

  if (variant === "media") {
    return (
      <section className={`nm-in-hero nm-in-hero--media`} aria-label={data.eyebrow}>
        <div ref={frameRef} className="nm-in-hero__cinema">
          <div ref={parallaxRef} className="nm-parallax-wrap">
            <div data-parallax className="nm-parallax-img">
              <Image src={data.image} alt={data.imageAlt} fill priority sizes="100vw" quality={85} style={{ objectFit: "cover", objectPosition: "50% 55%" }} />
            </div>
          </div>
          <span className="nm-in-hero__cinema-scrim" aria-hidden="true" />
          <div className="nm-shell nm-in-hero__cinema-inner">
            <p className="nm-eyebrow nm-eyebrow--gap">{data.eyebrow}</p>
            <h1 ref={headRef} className="nm-in-hero__title nm-mask-lines">
              {data.headlineLines.map((l, i) => (
                <span key={i} className="nm-line-mask"><span className="nm-line-inner">{l}</span></span>
              ))}
            </h1>
            <div ref={bodyRef} className="nm-in-hero__body"><p className="nm-lead" data-reveal>{data.body}</p></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`nm-in-hero nm-in-hero--${variant}`} aria-label={data.eyebrow}>
      <div className="nm-shell nm-in-hero__grid">
        <div className="nm-in-hero__text">
          <p className="nm-eyebrow nm-eyebrow--gap">{data.eyebrow}</p>
          <h1 ref={headRef} className="nm-in-hero__title nm-mask-lines">
            {data.headlineLines.map((l, i) => (
              <span key={i} className="nm-line-mask"><span className="nm-line-inner">{l}</span></span>
            ))}
          </h1>
          <div ref={bodyRef} className="nm-in-hero__body"><p className="nm-lead" data-reveal>{data.body}</p></div>
        </div>
        <div className="nm-in-hero__media">
          <div ref={frameRef} className="nm-in-hero__frame">
            <div ref={parallaxRef} className="nm-parallax-wrap">
              <div data-parallax className="nm-parallax-img">
                <Image src={data.image} alt={data.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 48vw" quality={85} style={{ objectFit: "cover", objectPosition: "50% 55%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
