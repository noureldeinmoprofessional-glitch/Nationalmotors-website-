/* ============================================================
   NATIONAL MOTORS — About page content
   SOURCE OF TRUTH: "National Motors Website Content.pptx"
   All copy below is reproduced verbatim from the approved PPTX
   (slides 2, 12–25). Do not paraphrase, shorten, or invent.
   Structure is content-first so Arabic can be layered in later.
   ============================================================ */

export const ABOUT_HERO = {
  eyebrow: "About National Motors",
  // Editorial headline built only from an approved fact (the 1978 founding
  // year). Kept short so the large display type breaks cleanly. No slogan.
  titleLines: ["Built since", "1978."],
  // Verbatim approved facts from the corporate summary (slide 2).
  intro:
    "Founded in Egypt in 1978, National Motors has grown into a trusted automotive group, driven by experience, innovation, strong partnerships, and a commitment to excellence.",
  image: "/images/hero/joylong-a4-high-roof.png",
  imageAlt: "A National Motors commercial vehicle at a contemporary hotel entrance",
};

export const HERITAGE = {
  eyebrow: "Our Story",
  title: "Where it began.",
  founded: "1978",
  foundation:
    "Since 1978, National Motors has been part of Egypt's automotive journey.",
  generations:
    "What began as an Egyptian company has grown into a trusted group, driven by experience, strong partnerships, and a commitment to customer needs.",
  today:
    "Today, we continue to expand our portfolio, embrace innovation, and create mobility solutions that support people and businesses across Egypt.",
  milestones: [
    { k: "1978", v: "Foundation" },
    { k: "Generations", v: "Family Leadership" },
    { k: "Today", v: "A Diversified Group" },
    { k: "2026", v: "National Motors Group" },
  ],
};

/* Sector descriptions: only Agriculture and Real Estate are described in the
   PPTX summary. Automotive references the approved brand portfolio. CSR
   reflects the company's community commitment. */
export const SECTORS = [
  {
    n: "01",
    name: "Automotive",
    note: "Passenger and commercial vehicles through Joylong, Farizon, and Blu.",
    image: "/images/hero/farizon-v6e.png",
    imageAlt: "A National Motors commercial vehicle",
  },
  {
    n: "02",
    name: "CSR",
    note: "Creating lasting value for the communities around us.",
    image: "/images/sectors-photo/csr.png",
    imageAlt: "A family at sunset overlooking the Nile and the Cairo skyline",
  },
  {
    n: "03",
    name: "Agriculture",
    note: "Large yards, trading and exporting plants.",
    image: "/images/sectors/agriculture.png",
    imageAlt: "A golden ear of wheat backlit at sunset",
  },
  {
    n: "04",
    name: "Real Estate",
    note: "Owning and managing properties in and outside Egypt, with diverse investments.",
    image: "/images/sectors/real-estate.jpg",
    imageAlt: "A modern residential apartment building at golden hour",
  },
];

export const BRAND_STORIES = {
  eyebrow: "Our Brand Stories",
  title: "Every Brand Began with a Market Need",
  intro:
    "National Motors' automotive portfolio was not built by simply adding brands. Every decision began with a clear opportunity in the Egyptian market; an unmet customer need, a category ready to evolve, or a technology capable of changing how people and businesses move.",
  chapters: [
    {
      id: "joylong",
      name: "Joylong",
      title: "A Partnership Beyond Representation",
      paragraphs: [
        "National Motors did not simply introduce Joylong vehicles to Egypt. It invested in the brand's factory and its research, development, and manufacturing capabilities, helping reintroduce Joylong to the Egyptian market with greater strength and a more advanced product offering.",
        "Following each market response, National Motors worked to adapt vehicle configurations and expand the lineup to address wider passenger and cargo transportation needs. Joylong represents a continuing commitment to listening, adapting, and developing commercial vehicles around how the Egyptian market actually operates.",
      ],
      cta: { label: "Explore Joylong", href: "https://www.joylongeg.com" },
      image: "/images/brands/joylong.png",
      imageAlt: "A Joylong minibus by National Motors driving through a city",
      imagePosition: "50% 45%",
      accent: "blue" as const,
    },
    {
      id: "farizon",
      name: "Farizon",
      title: "From Entering a Market to Creating a Category",
      paragraphs: [
        "Geely's selection of National Motors as its partner for introducing Farizon in Egypt marked an important step in the company's transformation. Farizon is Geely's new-energy commercial-vehicle brand, bringing purpose-built electric mobility solutions to businesses and fleet operators.",
        "National Motors approached the partnership as more than a conventional market launch. It began educating businesses, building confidence in electric commercial vehicles, and establishing the foundations of a new commercial-mobility category in Egypt. Farizon strengthens the portfolio with future-focused technology while supporting the broader sustainability direction of Egypt Vision 2030.",
      ],
      cta: { label: "Explore Farizon", href: "https://www.global.geelycv.com" },
      image: "/images/brands/farizon-v6e.jpg",
      imageAlt: "Farizon V6E born-electric commercial van driving through Cairo",
      imagePosition: "50% 55%",
      accent: "electric" as const,
    },
    {
      id: "blu",
      name: "Blu",
      title: "A Product Built by Listening",
      paragraphs: [
        "Blu began with in-depth market research into Egypt's golf-cart sector, customer pain points, and the features users valued most. National Motors translated those insights into a mobility product combining practical comfort, premium leisure features, and technological advancement.",
        "A solar-panel-equipped model introduced an additional sustainability dimension to the range. Blu strengthened the National Motors portfolio with an owned brand developed around Egyptian market needs, local assembly capabilities, and the future of light mobility.",
      ],
      cta: { label: "Explore Blu", href: "https://www.blulightmobility.com" },
      image: "/images/brands/blu-light-mobility.png",
      imageAlt: "A Blu electric golf cart on a resort golf course at sunset",
      imagePosition: "50% 42%",
      accent: "blue" as const,
    },
  ],
};

/* ------------------------------------------------------------
   BRAND STORY — scroll-navigated milestone timeline.
   Mirrors the approved demo: a horizontal rail of representation
   milestones, newest → oldest. `mark` is the short label shown in
   the logo slot; `logo` (optional) points to a real brand logo file
   under /public/images/brands/timeline/ once supplied — when absent,
   the `mark` wordmark is rendered. Copy is reproduced from the
   approved demo; the earliest pre-2001 milestones remain to be
   supplied from the source.
   ------------------------------------------------------------ */
export const BRAND_TIMELINE = {
  eyebrow: "Brand Story",
  intro:
    "National Motors' automotive portfolio was not built by simply adding brands. Every decision began with a clear opportunity in the Egyptian market; an unmet customer need, a category ready to evolve, or a technology capable of changing how people and businesses move.",
  entries: [
    {
      id: "farizon",
      mark: "FARIZON",
      name: "Farizon",
      note: "Official distributor for Farizon in Egypt",
      period: "2025 – Present",
      accent: "electric" as const,
      logo: "/images/brands/timeline/farizon.png" as string | null,
    },
    {
      id: "joylong",
      mark: "JOYLONG",
      name: "Joylong",
      note: "Sole agent for Joylong",
      period: "2025 – Present",
      accent: "blue" as const,
      logo: "/images/brands/timeline/joylong.png" as string | null,
    },
    {
      id: "blu",
      mark: "BLU",
      name: "Blu Light Mobility",
      note: "Sole agent for BLU Golf Carts by Marshell",
      period: "2025 – Present",
      accent: "blue" as const,
      logo: "/images/brands/timeline/blu.png" as string | null,
    },
    {
      id: "dfsk",
      mark: "DFSK",
      name: "DFSK",
      note: "Sole agent for Dongfeng DFSK",
      period: "2014 – 2025",
      accent: "blue" as const,
      logo: "/images/brands/timeline/dfsk.png" as string | null,
    },
    {
      id: "saipa",
      mark: "SAIPA",
      name: "SAIPA",
      note: "Sole agent for SAIPA",
      period: "2008 – 2014",
      accent: "blue" as const,
      logo: "/images/brands/timeline/saipa.png" as string | null,
    },
    {
      id: "legacy-import",
      mark: "BMW · MB · VW · ISUZU",
      name: "BMW · MB · VW · ISUZU",
      note: "Leading auto importer for the ISUZU-KIA-VW Group",
      period: "2001 – 2011",
      accent: "blue" as const,
      logo: "/images/brands/timeline/legacy-import.png" as string | null,
    },
    {
      id: "kia",
      mark: "KIA",
      name: "KIA",
      note: "Partnered with Kia Egypt for the CKD Project",
      period: "2001 – 2003",
      accent: "blue" as const,
      logo: "/images/brands/timeline/kia.png" as string | null,
    },
    {
      id: "gm",
      mark: "GM",
      name: "GM",
      note: "Authorized distributor for General Motors",
      period: "1988 – 2001",
      accent: "blue" as const,
      logo: "/images/brands/timeline/gm.png" as string | null,
    },
    {
      id: "suzuki",
      mark: "SUZUKI",
      name: "SUZUKI",
      note: "Sales distributor of Suzuki motorcycles",
      period: "1980 – 1987",
      accent: "blue" as const,
      logo: "/images/brands/timeline/suzuki.png" as string | null,
    },
  ],
};

export const VISION = {
  eyebrow: "Our Vision",
  headline: "Shaping the Future of Mobility in Egypt",
  body: "National Motors aspires to become Egypt's most respected automotive group and a regional benchmark for customer experience, operational excellence, and sustainable mobility. Building on a heritage that began in 1978, we continue to evolve beyond vehicle representation to help shape a more efficient and responsible future for mobility in Egypt and across the region.",
  image: "/images/values/excellence.webp",
  imageAlt: "A highway at dusk leading toward a glowing city skyline",
};

export const MISSION = {
  eyebrow: "Our Mission",
  title: "Creating Value Throughout the Ownership Journey",
  body: "National Motors is committed to representing world-class automotive brands with excellence and delivering an integrated ownership experience at every stage—from enquiry and purchase to after-sales support. We create lasting value for our customers, partners, employees, and communities through professionalism, accountability, and sustainable growth.",
  est: "EST. 1978",
};

export const VALUES = {
  eyebrow: "Our Values",
  /* Display headline; the final word is accented in the UI. */
  headline: "What drives us.",
  items: [
    {
      n: "01",
      title: "Customers at the Heart of Everything",
      body: "We place customers at the center of every decision and deliver a consistent, reliable, and differentiated journey across every interaction; from the initial enquiry and vehicle purchase to ownership and after-sales support.",
      image: "/images/values/customers.webp",
      imageAlt: "Close-up of a National Motors commercial van on the road at dusk",
    },
    {
      n: "02",
      title: "Partnerships Built on Excellence",
      body: "We build strong, long-term partnerships with leading global automotive brands. Through responsible representation in Egypt, we protect each brand's identity, strengthen its market value, and create shared opportunities for sustainable success.",
      image: "/images/values/partnerships.webp",
      imageAlt: "The National Motors glass showroom at dusk",
    },
    {
      n: "03",
      title: "Excellence in Execution",
      body: "We pursue operational excellence through efficient processes, clear governance, measurable performance, and evolving digital capabilities. This enables National Motors to deliver consistently, respond effectively, and grow responsibly.",
      image: "/images/values/excellence.webp",
      imageAlt: "A highway with light trails and a city skyline at dusk",
    },
    {
      n: "04",
      title: "People Empowered to Lead",
      body: "We invest in talent, develop capable leaders, encourage accountability, and foster a high-performance culture where people are empowered to grow, take ownership, and contribute meaningfully to our shared success.",
      image: "/images/values/people.webp",
      imageAlt: "A leadership team looking out over a city from a high-rise office",
    },
    {
      n: "05",
      title: "Responsible, Sustainable Growth",
      body: "We pursue profitable, long-term business growth through strategic expansion, innovation, local capability development, and responsible corporate development; creating lasting value for our customers, partners, employees, and communities.",
      image: "/images/values/growth.webp",
      imageAlt: "A dew-covered leaf with a glowing blue vein",
    },
  ],
};

/* LEADERSHIP — "The Executive Team" (PPTX slides 19–21). */
export const LEADERSHIP = {
  eyebrow: "Leadership",
  headline: "The Executive Team Turning Strategy into Progress",
  intro:
    "National Motors' directors translate the company's vision into disciplined execution across product development, financial strategy, business growth, talent management, administration, and technology. Their combined expertise strengthens the systems, capabilities, and decisions behind the company's continued development.",
  people: [
    {
      name: "Mr. Nagy Mengel",
      role: "Chief Financial Officer",
      image: "/images/leadership/nagy-mengel.png",
      bio: "Nagy Mengel leads financial management at National Motors, including financial planning, investment evaluation, and performance management. He also brings commercial management experience across different products and industries.",
    },
    {
      name: "Mr. Ahmed Nazmy",
      role: "Business Development Director",
      image: "/images/leadership/ahmed-nazmy.png",
      bio: "Bringing extensive product and business-development experience spanning the introduction of international brands to Egypt, product design, manufacturing, and the development of commercially successful products for the Egyptian market. At National Motors, he leads initiatives that strengthen the business portfolio, identify new growth opportunities, and advance the company's capabilities.",
    },
    {
      name: "Mr. Mahmoud Abdelaziz",
      role: "Human Resources and Administration Director",
      image: "/images/leadership/mahmoud-abdelaziz.png",
      bio: "Mahmoud Abdelaziz leads human resources and administration at National Motors. His responsibilities include organizational development, talent management, recruitment, and building the organizational capabilities required to support the company's growth.",
    },
    {
      name: "Eng. Ahmed Farouk",
      role: "Information Technology Director",
      image: "/images/leadership/ahmed-farouk.png",
      bio: "Ahmed Farouk leads information technology at National Motors, overseeing the systems and technology platforms that support the company's operations. His responsibilities include SAP and other business systems, CRM, data management, IT infrastructure, and digital transformation initiatives across the organization.",
    },
  ],
};

/* Unified "Leadership" section header — one headline covering both the
   founding family (BOARD) and the executive team (LEADERSHIP). Copy is
   assembled from the approved board/leadership intros, not invented. */
export const LEADERSHIP_HEADER = {
  eyebrow: "Leadership",
  intro:
    "Since its establishment in 1978, National Motors has evolved through generations of family leadership—combining entrepreneurship, strategic thinking, and disciplined execution. Today, the founding family and an experienced executive team lead the company's continued evolution, bringing complementary expertise across portfolio management, brand development, electric mobility, strategic partnerships, and operational transformation.",
  familyLabel: "The Founding Family",
  familyNote: "A family business, led across generations.",
  execLabel: "Executive Team",
  execNote: "Experienced directors turning strategy into progress.",
};

/* BOARD MEMBERS (PPTX slides 15–18). */
export const BOARD = {
  eyebrow: "Board Members",
  headline: "Leadership That Builds Businesses, Markets, and Lasting Value",
  intro: [
    "Since its establishment in 1978, National Motors has evolved through generations of family leadership combining entrepreneurship, strategic thinking, and disciplined execution.",
    "Today, our management is leading the company's continued evolution, bringing complementary expertise in portfolio management, brand development, revenue growth, electric mobility, strategic partnerships, and operational transformation.",
  ],
  chairman: {
    name: "Mr. Emad Abdelnaby",
    role: "Chairman",
    image: "/images/leadership/emad-abdelnaby.webp",
    paragraphs: [
      "Emad Abdelnaby leads the development and diversification of National Motors' business portfolio. His responsibilities include identifying new business opportunities, developing new sectors, and overseeing investments across automotive, agriculture, real estate, and corporate social responsibility.",
    ],
  },
  members: [
    {
      name: "Mr. Ahmed Abdelnaby",
      role: "Chief Executive Officer",
      image: "/images/leadership/ahmed-abdelnaby.png",
      paragraphs: [
        "Ahmed Abdelnaby leads National Motors' overall business and brand development. His responsibilities include portfolio growth, business performance, and the development of new revenue opportunities across the company's automotive businesses.",
      ],
    },
    {
      name: "Mr. Hatem Abdelnaby",
      role: "Chief Operating Officer",
      image: "/images/leadership/hatem-abdelnaby.png",
      paragraphs: [
        "Hatem Abdelnaby leads operations and business execution across National Motors. His responsibilities include operational development, international supplier relationships, strategic partnerships, and the introduction of new products and business areas, including electric mobility.",
      ],
    },
    {
      name: "Mr. Omar Abdelnaby",
      role: "Managing Director",
      image: "/images/leadership/omar-abdelnaby.png",
      paragraphs: [
        "Omar Abdelnaby oversees day-to-day business operations and execution across National Motors. His experience includes product development and the development of Blu Light Mobility golf carts based on customer and market requirements in Egypt.",
      ],
    },
  ],
};

export const CSR = {
  eyebrow: "Corporate Social Responsibility",
  title: "Progress Creates Greater Value When It Is Shared",
  paragraphs: [
    "National Motors advances its corporate social responsibility through a dedicated nonprofit organization serving communities in one of Egypt's major governorates. This institutional commitment reflects our belief that responsible business growth should create value beyond commercial success.",
    "Through the organization, National Motors seeks to respond to genuine community needs, support individuals and families, and create meaningful social value that extends beyond temporary initiatives. This work represents a principle rooted in our legacy: successful businesses carry a responsibility to contribute to the strength, wellbeing, and future of the communities around them.",
  ],
};

export const FUTURE = {
  eyebrow: "The Next Chapter",
  markLines: ["National", "Motors", "Group"],
  meta: "2026",
  // Verbatim approved transition wording.
  statement:
    "National Motors is transitioning toward National Motors Group by the end of 2026.",
  image: "/images/hero/farizon-v6e.png",
  imageAlt: "A contemporary National Motors commercial vehicle",
  cta: { label: "Explore Our Brands", href: "/brands" },
};
