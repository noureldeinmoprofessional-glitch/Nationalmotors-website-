"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { Testimonial } from "@/lib/site";

type Props = {
  data: Testimonial;
  feature?: boolean;
  vertical?: boolean;
};

/**
 * Reusable video card. Accepts a YouTube id/url via `data.youtube`. When
 * present, clicking swaps the poster for a privacy-friendly embed. Without a
 * URL it remains an accessible, non-interactive premium placeholder.
 */
export default function VideoCard({ data, feature = false, vertical = false }: Props) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(data.youtube);

  const embedSrc = hasVideo
    ? `https://www.youtube-nocookie.com/embed/${data.youtube}?autoplay=1&rel=0`
    : "";

  return (
    <article
      className={`nm-vcard${feature ? " nm-vcard--feature" : ""}${vertical ? " nm-vcard--vertical" : ""}`}
    >
      <div className="nm-vcard__media">
        {playing && hasVideo ? (
          <iframe
            className="nm-vcard__iframe"
            src={embedSrc}
            title={data.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src={data.poster}
              alt=""
              fill
              sizes={vertical ? "(max-width: 640px) 62vw, 300px" : feature ? "(max-width: 900px) 100vw, 60vw" : "(max-width: 900px) 100vw, 30vw"}
              style={{ objectFit: "cover", objectPosition: "50% 30%" }}
            />
            <span className="nm-vcard__scrim" aria-hidden="true" />
            <button
              type="button"
              className="nm-vcard__play"
              onClick={() => hasVideo && setPlaying(true)}
              aria-label={hasVideo ? `Play: ${data.title}` : `${data.title} — video coming soon`}
              data-cursor="PLAY"
              {...(!hasVideo ? { "aria-disabled": true } : {})}
            >
              <Play strokeWidth={1.5} />
            </button>
            <div className="nm-vcard__info">
              <span className="nm-vcard__sector">{data.sector}</span>
              <h3 className="nm-vcard__title">{data.title}</h3>
              <span className="nm-vcard__client">{data.client}</span>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
