/* ============================================================
   NATIONAL MOTORS — Articles & Insights data
   SOURCE OF TRUTH: "National Motors Website Content.pptx" (slide 38).

   The PPTX defines the Articles & Insights CONCEPT and archive BEHAVIOUR
   (cover photo as thumbnail, a title per article, each article opening in
   its own window) and supplies the hero copy — but it provides NO actual
   articles: no titles, bodies, cover images, dates, or authors.

   Per the approved source, nothing is fabricated here. `ARTICLES_LIST` is
   intentionally empty and ready for real entries or a future CMS/API. Add
   Article objects and BOTH the archive grid (/news/articles) and the
   detail pages (/articles/[slug]) populate automatically.
   ============================================================ */

export type Article = {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  coverAlt?: string;
  /** Full article body. Empty until supplied by the PPTX/CMS — never invented. */
  content: string;
};

export const ARTICLES_LIST: Article[] = [];

// Coverage areas named in the approved description (slide 38). Used only as
// honest section context / a "coming soon" state — NOT presented as articles.
export const ARTICLE_TOPICS = [
  "Automotive Market",
  "Commercial Mobility",
  "Electric Vehicles",
  "Fleet Operations",
  "After-Sales Services",
  "Sustainability",
  "Business Transformation",
  "Our Sectors",
];

export const getArticleBySlug = (slug: string): Article | undefined =>
  ARTICLES_LIST.find((a) => a.slug === slug);
