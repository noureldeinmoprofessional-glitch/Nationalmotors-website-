"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/lib/hooks";
import CTAButton from "@/components/ui/CTAButton";
import { SECTORS } from "@/lib/aboutContent";

// Deep-link each business sector to its page on the Sectors hub where one
// exists; After Market has no dedicated page, so it opens the hub.
const SECTOR_HREF: Record<string, string> = {
  Automotive: "/sectors/automotive",
  "After Market": "/sectors",
  Agriculture: "/sectors/agriculture",
  "Real Estate": "/sectors/real-estate",
};

export default function SectorsSection() {
  const headRef = useReveal<HTMLDivElement>({ y: 24, start: "top 86%" });
  const gridRef = useReveal<HTMLDivElement>({ y: 42, stagger: 0.1, start: "top 82%" });

  return (
    <section id="sectors" className="nm-sg" aria-label="Our Sectors">
      <div className="nm-shell">
        <div ref={headRef} className="nm-sg__head">
          <p className="nm-eyebrow nm-eyebrow--gap" data-reveal>Our Sectors</p>
          <div className="nm-sg__head-row" data-reveal>
            <h2 className="nm-sg__title">Four industries, one group.</h2>
            <p className="nm-sg__lead">
              Beyond automotive, National Motors operates across after-market, agriculture,
              and real estate. Explore each sector in depth.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="nm-sg__grid">
          {SECTORS.map((s) => (
            <Link
              key={s.name}
              href={SECTOR_HREF[s.name] ?? "/sectors"}
              className="nm-sg__card"
              data-reveal
              data-cursor="VIEW"
            >
              <div className="nm-sg__card-media" aria-hidden="true">
                {s.image && (
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 46vw"
                    style={{ objectFit: "cover", objectPosition: "55% 55%" }}
                  />
                )}
                <span className="nm-sg__card-scrim" />
              </div>
              <div className="nm-sg__card-body">
                <span className="nm-sg__card-n">{s.n}</span>
                <div className="nm-sg__card-text">
                  <h3 className="nm-sg__card-name">{s.name}</h3>
                  {s.note && <p className="nm-sg__card-note">{s.note}</p>}
                </div>
                <span className="nm-sg__card-arrow" aria-hidden="true">
                  <ArrowUpRight strokeWidth={1.6} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="nm-sg__cta">
          <CTAButton href="/sectors" variant="primary" cursor="VIEW">
            Explore All Sectors
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
