"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";

type Card = {
  id: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
  pos?: string;
};

const CARDS: Card[] = [
  {
    id: "service-centers",
    title: "National Motors Service Centers",
    desc: "Certified technicians, genuine parts and expert care to keep you on the road with confidence.",
    cta: "Explore Service Centers",
    href: "/locations/service-centers",
    image: "/images/service/body-repair-paint.png",
    imageAlt: "A National Motors service center at dusk",
    pos: "50% 55%",
  },
  {
    id: "showrooms",
    title: "National Motors Showrooms",
    desc: "Discover our full range of vehicles and get expert guidance from our team across Egypt.",
    cta: "Explore Showrooms",
    href: "/locations/showrooms",
    image: "/images/hero/joylong-a4-high-roof.png",
    imageAlt: "A National Motors showroom vehicle at a contemporary entrance",
    pos: "50% 60%",
  },
  {
    id: "joylong",
    title: "Joylong Distributors",
    desc: "Authorized distributors bringing Joylong's reliable and versatile vehicles closer to you.",
    cta: "Find Joylong Distributors",
    href: "/brands/joylong",
    image: "/images/brands/joylong.png",
    imageAlt: "A Joylong minibus by National Motors on a city highway",
    pos: "50% 45%",
  },
  {
    id: "blu",
    title: "Blu Distributors",
    desc: "Authorized distributors for Blu, expanding access to efficient and sustainable mobility solutions.",
    cta: "Find Blu Distributors",
    href: "/brands/blu-light-mobility",
    image: "/images/brands/blu-light-mobility.png",
    imageAlt: "A Blu light-mobility vehicle by National Motors",
    pos: "50% 45%",
  },
];

export default function NetworkHub() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Reduced motion / no JS: everything stays visible by default.
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // ---- Hero entrance ----
      gsap.set(".nm-nhub__eyebrow", { autoAlpha: 0, y: 20 });
      gsap.set(".nm-nhub__intro", { autoAlpha: 0, y: 28, filter: "blur(8px)" });

      const hero = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: heroRef.current, start: "top 82%" },
      });
      hero
        .to(".nm-nhub__eyebrow", { autoAlpha: 1, y: 0, duration: 0.7 })
        .to(".nm-nhub__intro", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1 }, "-=0.4");

      // ---- Grid cards: lift in + clip-reveal the media (image hover zoom is
      // left untouched so it keeps working after the entrance). ----
      gsap.set(".nm-nhub__card", { autoAlpha: 0, y: 46 });
      gsap.set(".nm-nhub__card-media", { clipPath: "inset(0 0 100% 0)" });
      gsap.set(".nm-nhub__card-body > *", { autoAlpha: 0, y: 18 });

      const grid = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: gridRef.current, start: "top 84%" },
      });
      grid
        .to(".nm-nhub__card", { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.13 }, 0)
        .to(".nm-nhub__card-media", { clipPath: "inset(0 0 0% 0)", duration: 1, stagger: 0.13, ease: "power4.inOut" }, 0.12)
        .to(".nm-nhub__card-body > *", { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.045 }, 0.5);

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* Typographic hero — no imagery */}
      <section ref={heroRef} className="nm-nhub__hero" aria-label="Network">
        <div className="nm-shell">
          <div className="nm-nhub__hero-inner">
            <h1 className="nm-eyebrow nm-eyebrow--static nm-eyebrow--gap nm-nhub__eyebrow">Network</h1>
            <div className="nm-nhub__hero-body">
              <p className="nm-lead nm-nhub__intro">
                From showrooms to service centers and authorized distributors, our nationwide
                network brings you closer to the brands you trust — with professional support
                wherever you are in Egypt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Network grid */}
      <section ref={gridRef} className="nm-nhub__grid-sec" aria-label="Our network">
        <div className="nm-shell nm-nhub__grid">
          {CARDS.map((c) => (
            <Link key={c.id} href={c.href} className="nm-nhub__card" data-cursor="VIEW">
              <div className="nm-nhub__card-media">
                <div className="nm-nhub__card-img">
                  <Image
                    src={c.image}
                    alt={c.imageAlt}
                    fill
                    sizes="(max-width: 860px) 100vw, 46vw"
                    style={{ objectFit: "cover", objectPosition: c.pos ?? "50% 50%" }}
                  />
                </div>
                <span className="nm-nhub__card-scrim" aria-hidden="true" />
              </div>

              <div className="nm-nhub__card-body">
                <h2 className="nm-nhub__card-title">{c.title}</h2>
                <span className="nm-nhub__card-rule" aria-hidden="true" />
                <p className="nm-nhub__card-desc">{c.desc}</p>
                <span className="nm-nhub__card-link">
                  {c.cta}
                  <ArrowRight strokeWidth={1.75} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
