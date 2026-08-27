/* ============================================================
   NATIONAL MOTORS — News & Media inner pages content
   SOURCE OF TRUTH: "National Motors Website Content.pptx"
   Press Releases: section copy slide 38; the two real releases from
   slide 7 (with approved descriptions). Articles & Media: section copy
   slides 38–39 — the PPTX supplies NO actual article or media items, so
   those archives are built as architecture with clearly-marked
   placeholders. Nothing is fabricated as real National Motors content.
   ============================================================ */

// ---------- PRESS RELEASES ----------
export const PRESS = {
  hero: {
    eyebrow: "Press Releases",
    headlineLines: ["Official Announcements.", "Clear Facts."],
    body: "Access official press releases from National Motors and its brands, covering corporate announcements, vehicle launches, strategic partnerships, business developments, and important milestones.",
    image: "/images/hero/joylong-a4-standard.png",
    imageAlt: "A National Motors Joylong commercial vehicle",
  },
  // Real approved releases (slide 7). No dates are supplied by the source.
  items: [
    {
      category: "Press Release",
      title: "National Motors Introduces the Joylong A4 High Roof High Line in Egypt",
      excerpt:
        "The new high-roof configuration expands the Joylong lineup with greater interior space and practical comfort for passenger transportation.",
      image: "/images/hero/joylong-a4-high-roof.png",
      imageAlt: "The Joylong A4 High Roof High Line by National Motors",
      href: "/brands/joylong",
    },
    {
      category: "Press Release",
      title: "National Motors Introduces the Joylong A4 Standard in Egypt",
      excerpt:
        "A practical new addition combining the essential features businesses and operators need for demanding day-to-day transportation.",
      image: "/images/hero/joylong-a4-standard.png",
      imageAlt: "The Joylong A4 Standard by National Motors",
      href: "/brands/joylong",
    },
  ],
};

// ---------- ARTICLES & INSIGHTS ----------
export const ARTICLES = {
  hero: {
    eyebrow: "Articles & Insights",
    headlineLines: ["Knowledge Built", "from Experience"],
    body: "Explore informative and educational articles covering the automotive market, commercial mobility, electric vehicles, fleet operations, after-sales services, sustainability, business transformation, and the sectors in which National Motors operates.",
    image: "/images/about-hero/real-estate.jpg",
    imageAlt: "An editorial view representing National Motors' business sectors",
  },
  // No approved articles supplied — placeholder architecture only.
  placeholderTopics: [
    "Commercial Mobility",
    "Electric Vehicles",
    "Fleet Operations",
    "After-Sales",
    "Sustainability",
    "Business Transformation",
  ],
};

// ---------- MEDIA ----------
export const MEDIA = {
  hero: {
    eyebrow: "Media",
    headlineLines: ["Our Projects", "in Motion"],
    body: "Explore project-based collections of photographs, videos, documents, and other media that bring National Motors' work to life. From vehicle launches and strategic partnerships to exhibitions, activations, product development, corporate initiatives, and community projects, the Media Gallery offers a closer look at what we do and how our work progresses.",
    image: "/images/about-hero/automotive.jpg",
    imageAlt: "National Motors commercial vehicles moving through a city",
  },
  // No approved media supplied — placeholder gallery architecture, ready to
  // receive real photography and YouTube video embeds.
  placeholderTiles: [
    { type: "Video", label: "Vehicle Launches", size: "lg" as const },
    { type: "Photography", label: "Strategic Partnerships", size: "sm" as const },
    { type: "Video", label: "Exhibitions & Events", size: "sm" as const },
    { type: "Photography", label: "Product Development", size: "sm" as const },
    { type: "Photography", label: "Corporate Initiatives", size: "sm" as const },
    { type: "Video", label: "Community Projects", size: "lg" as const },
  ],
};
