"use client";

import Image from "next/image";
import Link from "next/link";
import { Wrench, Store, ArrowRight } from "lucide-react";
import { useLineReveal, useReveal } from "@/lib/hooks";

type Card = {
  id: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
  pos?: string;
  /** Either a lucide icon badge or a brand logo badge. */
  icon?: "wrench" | "store";
  logo?: string;
  logoAlt?: string;
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
    icon: "wrench",
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
    icon: "store",
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
    logo: "/images/brands/timeline/joylong.png",
    logoAlt: "Joylong",
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
    logo: "/images/brands/timeline/blu.png",
    logoAlt: "Blu",
  },
];

const LEGEND = ["Showrooms", "Service Centers", "Authorized Distributors"];

export default function NetworkHub() {
  const titleRef = useLineReveal<HTMLHeadingElement>({ start: "top 92%" });
  const heroBodyRef = useReveal<HTMLDivElement>({ y: 22, stagger: 0.1, start: "top 92%" });
  const legendRef = useReveal<HTMLUListElement>({ y: 18, stagger: 0.08, start: "top 92%" });
  const gridRef = useReveal<HTMLDivElement>({ y: 32, stagger: 0.1, start: "top 86%" });
  const closeRef = useReveal<HTMLDivElement>({ y: 22, stagger: 0.08, start: "top 90%" });

  return (
    <>
      {/* Typographic hero — no imagery */}
      <section className="nm-nhub__hero" aria-label="Network">
        <div className="nm-shell nm-nhub__hero-grid">
          <div className="nm-nhub__hero-main">
            <p className="nm-eyebrow nm-eyebrow--static nm-eyebrow--gap">Network</p>
            <h1 ref={titleRef} className="nm-nhub__title nm-mask-lines">
              <span className="nm-line-mask"><span className="nm-line-inner">A network</span></span>
              <span className="nm-line-mask"><span className="nm-line-inner">that keeps</span></span>
              <span className="nm-line-mask">
                <span className="nm-line-inner">you <span className="nm-nhub__accent">moving.</span></span>
              </span>
            </h1>
            <div ref={heroBodyRef} className="nm-nhub__hero-body">
              <p className="nm-lead nm-nhub__intro" data-reveal>
                From showrooms to service centers and authorized distributors, our nationwide
                network brings you closer to the brands you trust — with professional support
                wherever you are in Egypt.
              </p>
            </div>
          </div>

          <ul ref={legendRef} className="nm-nhub__legend" aria-hidden="true">
            {LEGEND.map((l) => (
              <li key={l} data-reveal className="nm-nhub__legend-item">
                <span className="nm-nhub__legend-dot" />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Network grid */}
      <section className="nm-nhub__grid-sec" aria-label="Our network">
        <div ref={gridRef} className="nm-shell nm-nhub__grid">
          {CARDS.map((c) => (
            <Link key={c.id} href={c.href} className="nm-nhub__card" data-reveal data-cursor="VIEW">
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
                <span className="nm-nhub__card-badge" aria-hidden="true">
                  {c.logo ? (
                    <Image src={c.logo} alt="" width={72} height={28} style={{ objectFit: "contain", width: "auto", height: "1.5rem" }} />
                  ) : c.icon === "wrench" ? (
                    <Wrench strokeWidth={1.6} />
                  ) : (
                    <Store strokeWidth={1.6} />
                  )}
                </span>
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

      {/* Closing statement band */}
      <section className="nm-nhub__close" aria-hidden="true">
        <div className="nm-nhub__close-img">
          <Image
            src="/images/about-hero/automotive.jpg"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "50% 60%" }}
          />
        </div>
        <span className="nm-nhub__close-scrim" />
        <div ref={closeRef} className="nm-shell nm-nhub__close-inner">
          <p data-reveal className="nm-nhub__close-text">
            Supporting a stronger,<br />more connected Egypt.
          </p>
        </div>
      </section>
    </>
  );
}
