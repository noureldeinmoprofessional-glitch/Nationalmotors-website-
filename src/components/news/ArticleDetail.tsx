"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useLineReveal, useReveal, useClipReveal } from "@/lib/hooks";
import type { Article } from "@/lib/articlesData";

export default function ArticleDetail({ article }: { article: Article }) {
  const headRef = useLineReveal<HTMLHeadingElement>({ start: "top 92%" });
  const metaRef = useReveal<HTMLDivElement>({ y: 20, stagger: 0.1, start: "top 92%" });
  const frameRef = useClipReveal<HTMLDivElement>({ from: "inset(0 0 100% 0)", start: "top 88%" });
  const bodyRef = useReveal<HTMLDivElement>({ y: 22, stagger: 0.08, start: "top 86%" });

  // Split the plain-text body into paragraphs. Never invent content: an article
  // with an empty body simply renders no paragraphs.
  const paragraphs = article.content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="nm-adt">
      <div className="nm-shell nm-adt__inner">
        <div ref={metaRef} className="nm-adt__top">
          <Link href="/news/articles" className="nm-adt__eyebrow" data-reveal>
            Article / Insights
          </Link>
        </div>

        <h1 ref={headRef} className="nm-adt__title nm-mask-lines">
          <span className="nm-line-mask"><span className="nm-line-inner">{article.title}</span></span>
        </h1>

        <div className="nm-adt__cover">
          <div ref={frameRef} className="nm-adt__frame">
            <Image
              src={article.coverImage}
              alt={article.coverAlt ?? ""}
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 1000px"
              style={{ objectFit: "cover", objectPosition: "50% 50%" }}
            />
          </div>
        </div>

        <div ref={bodyRef} className="nm-adt__content">
          {paragraphs.map((p, i) => (
            <p key={i} data-reveal>{p}</p>
          ))}
        </div>

        <div className="nm-adt__foot">
          <Link href="/news/articles" className="nm-btn nm-btn--secondary nm-adt__back" data-cursor="VIEW">
            <span className="nm-btn__arrow nm-adt__back-arrow" aria-hidden="true"><ArrowLeft strokeWidth={1.75} /></span>
            <span className="nm-btn__text">Back to Articles</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
