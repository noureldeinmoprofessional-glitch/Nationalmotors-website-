"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/lib/hooks";
import { NewsroomHero } from "./NewsroomParts";
import { ARTICLES } from "@/lib/newsroomData";
import { ARTICLES_LIST, ARTICLE_TOPICS, type Article } from "@/lib/articlesData";

// One archive card: cover image is the dominant element, title beneath.
// The whole card is a link; per the PPTX, articles open in their own window.
function ArticleCard({ a }: { a: Article }) {
  return (
    <Link
      href={`/articles/${a.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="nm-arc-card"
      data-reveal
      data-cursor="VIEW"
      aria-label={`${a.title} — opens in a new window`}
    >
      <span className="nm-arc-card__media">
        <Image
          src={a.coverImage}
          alt={a.coverAlt ?? ""}
          fill
          loading="lazy"
          sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw"
          className="nm-arc-card__img"
          style={{ objectFit: "cover", objectPosition: "50% 50%" }}
        />
        <span className="nm-arc-card__scrim" aria-hidden="true" />
      </span>
      <span className="nm-arc-card__body">
        <h3 className="nm-arc-card__title">{a.title}</h3>
        <span className="nm-arc-card__cue" aria-hidden="true">
          Read Article
          <ArrowRight strokeWidth={1.7} />
        </span>
      </span>
    </Link>
  );
}

// Honest empty state — shown while the PPTX supplies no articles. It is NOT a
// fabricated article: it states the archive is in preparation and lists the
// approved coverage areas. Replace by adding entries to ARTICLES_LIST.
function EmptyState() {
  const ref = useReveal<HTMLDivElement>({ y: 22, stagger: 0.08, start: "top 86%" });
  return (
    <div ref={ref} className="nm-arc__empty">
      <span className="nm-arc__empty-tag" data-reveal>In Preparation</span>
      <p className="nm-lead nm-arc__empty-lead" data-reveal>
        Our editorial team is preparing informative and educational articles
        across the areas National Motors operates in. They will appear here soon.
      </p>
      <ul className="nm-arc__topics" data-reveal>
        {ARTICLE_TOPICS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function ArticlesGrid() {
  const gridRef = useReveal<HTMLDivElement>({ y: 28, stagger: 0.09, start: "top 84%" });
  const headRef = useReveal<HTMLDivElement>({ y: 18, start: "top 90%" });
  const hasArticles = ARTICLES_LIST.length > 0;

  return (
    <section className="nm-arc" aria-label="Articles archive">
      <div className="nm-shell">
        <div ref={headRef} className="nm-nw-sechead">
          <span className="nm-nw-sechead__label" data-reveal>The Archive</span>
        </div>

        {hasArticles ? (
          <div ref={gridRef} className="nm-arc__grid">
            {ARTICLES_LIST.map((a) => (
              <ArticleCard key={a.id} a={a} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

export default function Articles() {
  return (
    <>
      <NewsroomHero data={ARTICLES.hero} variant="articles" />
      <ArticlesGrid />
    </>
  );
}
