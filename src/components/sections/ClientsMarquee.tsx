"use client";

import Image from "next/image";
import { useReveal } from "@/lib/hooks";

/* Placeholder client logos. Brand marks are used as stand-ins until real
   client logos are supplied — the BMW / Volkswagen combined mark is
   intentionally excluded. Swap these paths when the client logos arrive. */
const LOGOS = [
  { src: "/images/brands/timeline/farizon.png", alt: "Farizon", w: 424, h: 134 },
  { src: "/images/brands/timeline/joylong.png", alt: "Joylong", w: 1536, h: 405 },
  { src: "/images/brands/timeline/blu.png", alt: "Blu", w: 844, h: 415 },
  { src: "/images/brands/timeline/dfsk.png", alt: "DFSK", w: 1602, h: 519 },
  { src: "/images/brands/timeline/saipa.png", alt: "SAIPA", w: 1190, h: 599 },
  { src: "/images/brands/timeline/kia.png", alt: "Kia", w: 1430, h: 572 },
  { src: "/images/brands/timeline/gm.png", alt: "GM", w: 751, h: 450 },
  { src: "/images/brands/timeline/suzuki.png", alt: "Suzuki", w: 1590, h: 490 },
];

export default function ClientsMarquee({ label = "Our Clients" }: { label?: string }) {
  const headRef = useReveal<HTMLDivElement>({ y: 18, start: "top 92%" });

  // Duplicated once so the track can loop seamlessly (translateX -50%).
  const row = [...LOGOS, ...LOGOS];

  return (
    <section className="nm-clients" aria-label={label}>
      <div ref={headRef} className="nm-shell nm-clients__head">
        <p className="nm-eyebrow nm-eyebrow--static" data-reveal>{label}</p>
      </div>

      <div className="nm-clients__viewport">
        <div className="nm-clients__track">
          {row.map((l, i) => (
            <span key={i} className="nm-clients__logo" aria-hidden={i >= LOGOS.length || undefined}>
              <Image
                src={l.src}
                alt={i < LOGOS.length ? l.alt : ""}
                width={l.w}
                height={l.h}
                style={{ width: "auto", height: "100%", objectFit: "contain" }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
