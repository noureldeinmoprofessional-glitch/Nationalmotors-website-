/* ============================================================
   NATIONAL MOTORS — News & Media landing content
   SOURCE OF TRUTH: "National Motors Website Content.pptx"
   Hero + section copy: slides 38–39. The featured item and the two
   press releases are the real approved items from the home "Featured"
   slide (slide 7). No dates or extra content are fabricated.
   ============================================================ */

export const NEWS_HERO = {
  masthead: "The National Motors Newsroom",
  eyebrow: "News & Media",
  headlineLines: ["Stories, Insights,", "and Milestones", "from National Motors"],
  body: "Explore official National Motors press releases, informative articles, independent media coverage, and multimedia stories documenting our brands, projects, partnerships, and continued development.",
  image: "/images/hero/joylong-a4-high-roof.png",
  imageAlt: "A National Motors commercial vehicle at a contemporary hotel entrance",
};

// One commanding featured story (real — slide 7 home Featured).
export const FEATURED = {
  kicker: "Featured",
  category: "Test Drive",
  title: "Experience the Farizon V6E",
  excerpt:
    "Discover the Farizon V6E firsthand and see how a born-electric commercial van can support your everyday business operations.",
  cta: "Read",
  href: "/brands/farizon",
  image: "/images/hero/farizon-v6e.png",
  imageAlt: "The Farizon V6E born-electric commercial van driving through a modern city",
};

// Real approved press releases (slide 7). Shown once, as a slim editorial index.
export const PRESS_INDEX = {
  label: "Latest Press Releases",
  href: "/news/press-releases",
  items: [
    {
      category: "Press Release",
      title: "National Motors Introduces the Joylong A4 High Roof High Line in Egypt",
      href: "/news/press-releases",
    },
    {
      category: "Press Release",
      title: "National Motors Introduces the Joylong A4 Standard in Egypt",
      href: "/news/press-releases",
    },
  ],
};

// The three destinations — one architecture, three distinct characters.
export const CHAPTERS = [
  {
    n: "01",
    name: "Press Releases",
    tagline: "Official Announcements. Clear Facts.",
    href: "/news/press-releases",
    image: "/images/hero/joylong-a4-standard.png",
    variant: "press" as const,
  },
  {
    n: "02",
    name: "Articles & Insights",
    tagline: "Knowledge Built from Experience",
    href: "/news/articles",
    image: "/images/about-hero/real-estate.jpg",
    variant: "articles" as const,
  },
  {
    n: "03",
    name: "Media",
    tagline: "Our Projects in Motion",
    href: "/news/media",
    image: "/images/about-hero/automotive.jpg",
    variant: "media" as const,
  },
];
