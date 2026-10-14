"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/lib/hooks";

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
  const heroBodyRef = useReveal<HTMLDivElement>({ y: 22, stagger: 0.1, start: "top 92%" });
  const gridRef = useReveal<HTMLDivElement>({ y: 32, stagger: 0.1, start: "top 86%" });

  return (
    <>
      {/* Typographic hero — no imagery */}
      <section className="nm-nhub__hero" aria-label="Network">
        <div className="nm-shell nm-nhub__hero-inner">
          <h1 className="nm-eyebrow nm-eyebrow--static nm-eyebrow--gap nm-nhub__eyebrow">Network</h1>
          <div ref={heroBodyRef} className="nm-nhub__hero-body">
            <p className="nm-lead nm-nhub__intro" data-reveal>
              From showrooms to service centers and authorized distributors, our nationwide
              network brings you closer to the brands you trust — with professional support
              wherever you are in Egypt.
            </p>
          </div>
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
    </>
  );
}
