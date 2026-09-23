/* ============================================================
   NATIONAL MOTORS — Sectors page content
   SOURCE OF TRUTH: "New request/sectors-content.md" (approved).

   All copy below is reproduced VERBATIM from the approved document.
   Do not rewrite, paraphrase, shorten, expand, or invent content.
   Wording, punctuation and capitalization are preserved exactly.

   Content is only *grouped* into ordered semantic blocks so the
   interface can reveal it progressively, per the document's
   "Content Presentation Guidance". The blocks follow the recommended
   presentation sequence for each sector.

   NOTE: the reference layout's framing lines ("One Purpose",
   "Four Industries", "Driven by a brighter tomorrow") and the keyword
   triads are NOT part of the approved content and are intentionally
   omitted. "Our Sectors" / "All Sectors" / "Explore" are interface
   labels (consistent with the existing site), not body copy.
   ============================================================ */

export type SectorId = "automotive" | "agriculture" | "real-estate" | "csr";

/** One ordered, semantically-tagged content block within a sector.
 *  `role` drives reveal sequencing and visual treatment; the `text`
 *  (or milestone `items`) is the approved wording, unchanged. */
export type SectorBlock =
  | { role: "introduction"; text: string }
  | { role: "story"; text: string }
  | { role: "capabilities"; text: string }
  | { role: "philosophy"; text: string }
  | { role: "portfolio"; text: string }
  | { role: "approach"; text: string }
  | { role: "narrative"; text: string }
  | { role: "milestones"; items: { brand: string; text: string }[] }
  | { role: "emphasis"; text: string }
  | { role: "closing"; text: string };

export type Sector = {
  /** Two-digit index, e.g. "01". */
  n: string;
  id: SectorId;
  name: string;
  /** Approved headline; also used as the overview tagline. */
  headline: string;
  /** Page-scoped semantic accent token (defined on the Sectors root in
   *  globals.css — NOT part of the global brand token system). */
  accentVar: string;
  /** Sector photo (public path) used behind the overview quadrant and as the
   *  expanded detail backdrop. */
  image: string;
  imageAlt: string;
  /** Ordered content blocks for the expanded editorial state. */
  blocks: SectorBlock[];
};

export const SECTORS: Sector[] = [
  {
    n: "01",
    id: "automotive",
    name: "Automotive",
    headline: "Driving Change. Shaping the Market.",
    accentVar: "--sector-automotive",
    image: "/images/sectors-photo/automotive.jpeg",
    imageAlt:
      "National Motors commercial vans, including the Farizon electric van, driving through a city",
    blocks: [
      {
        role: "introduction",
        text: "National Motors has built a strong automotive legacy by representing leading global brands and challenging the norms of Egypt’s automotive market.",
      },
      {
        role: "milestones",
        items: [
          {
            brand: "General Motors",
            text: "From entering the market with General Motors at a challenging time.",
          },
          {
            brand: "DFSK",
            text: "Growing DFSK and changing perceptions of Chinese vehicles.",
          },
          {
            brand: "Blu",
            text: "Created Blu from the ground up, introducing customer-focused solutions including mobile maintenance services.",
          },
          {
            brand: "Joylong",
            text: "With Joylong, we combined market insight with innovation and strategic investment in one of China’s leading automotive factories.",
          },
          {
            brand: "Farizon",
            text: "Farizon marks our next step in new energy mobility as the official agent and distributor of Geely’s new energy commercial vehicle brand in Egypt.",
          },
        ],
      },
      {
        role: "capabilities",
        text: "Across every brand, our expertise extends beyond sales to include after-sales, maintenance, spare parts, and customer care.",
      },
      {
        role: "closing",
        text: "We don’t just follow the market. We help shape what comes next.",
      },
    ],
  },
  {
    n: "02",
    id: "agriculture",
    name: "Agriculture",
    headline: "Rooted in Hard Work. Growing for Tomorrow.",
    accentVar: "--sector-agriculture",
    image: "/images/sectors-photo/agriculture.jpeg",
    imageAlt: "A tractor working rows of green crops on farmland at sunset",
    blocks: [
      {
        role: "introduction",
        text: "Agriculture is where our story meets the land.",
      },
      {
        role: "story",
        text: "With substantial agricultural investments and farms in Egypt and abroad, National Motors has built a presence rooted in something deeply familiar to us: hard work, patience, and the determination to make every season better than the one before.",
      },
      {
        role: "story",
        text: "From cultivating the land to developing agricultural opportunities beyond Egypt, we continue to invest in the resources, people, and capabilities that make sustainable growth possible.",
      },
      {
        role: "story",
        text: "Our agricultural operations also extend beyond local production, with yards being exported to international markets, taking the fruits of Egyptian soil beyond our borders.",
      },
      {
        role: "philosophy",
        text: "For us, agriculture has never been about simply owning land. It is about working it, improving it, creating value from it, and constantly asking:",
      },
      {
        role: "emphasis",
        text: "How can we do better?",
      },
      {
        role: "narrative",
        text: "Because progress, like farming, doesn’t happen overnight.",
      },
      {
        role: "closing",
        text: "You plant. You work. You learn. You grow.",
      },
    ],
  },
  {
    n: "03",
    id: "real-estate",
    name: "Real Estate",
    headline: "Exceptional Is the Standard.",
    accentVar: "--sector-real-estate",
    image: "/images/sectors-photo/real-estate.jpeg",
    imageAlt:
      "A modern National Motors residential development with landscaped gardens at golden hour",
    blocks: [
      {
        role: "introduction",
        text: "Our real estate portfolio reflects a different side of National Motors — one defined by vision, permanence, and an uncompromising approach to value.",
      },
      {
        role: "portfolio",
        text: "We own, develop, sell, and lease properties across Egypt and Europe, carefully building a portfolio that combines strategic locations with enduring quality.",
      },
      {
        role: "portfolio",
        text: "From investment opportunities to distinguished properties, every asset is approached with the same philosophy: exceptional should never be exceptional for us. It should be the standard.",
      },
      {
        role: "approach",
        text: "We look beyond the property itself — considering its location, potential, character, and long-term value.",
      },
      {
        role: "approach",
        text: "Because true real estate excellence is not simply about owning remarkable spaces.",
      },
      {
        role: "closing",
        text: "It is about knowing what makes them remarkable in the first place.",
      },
    ],
  },
  {
    n: "04",
    id: "csr",
    name: "CSR",
    headline: "Building Better Lives. Creating Lasting Impact.",
    accentVar: "--sector-csr",
    image: "/images/sectors-photo/csr.png",
    imageAlt:
      "A delivery driver high-fiving a child beside a van at sunset over a city skyline",
    blocks: [
      {
        role: "introduction",
        text: "At National Motors, we believe social responsibility is about more than meeting immediate needs. It is about creating opportunities that help people move forward and build better lives.",
      },
      {
        role: "approach",
        text: "Through social entrepreneurship, we focus on the essentials while creating pathways to greater stability, dignity, and independence.",
      },
      {
        role: "approach",
        text: "From helping families live better to supporting people as they build more secure futures, our goal is simple: not just to help people survive, but to help them thrive.",
      },
      {
        role: "closing",
        text: "Because true impact is not measured by what we give today, but by the difference it makes tomorrow.",
      },
    ],
  },
];
