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
   PPTX summary. Automotive references the approved brand portfolio. Tyres has
   no supplied description, so it carries only its label. */
export const SECTORS = [
  {
    n: "01",
    name: "Automotive",
    note: "Passenger and commercial vehicles through Joylong, Farizon, and Blu Light Mobility.",
    image: "/images/hero/farizon-v6e.png",
    imageAlt: "A National Motors commercial vehicle",
  },
  {
    n: "02",
    name: "After Market",
    note: "",
    image: "/images/sectors/tyres.png",
    imageAlt: "Close inspection of a tyre tread",
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
      name: "Blu Light Mobility",
      title: "A Product Built by Listening",
      paragraphs: [
        "Blu Light Mobility began with in-depth market research into Egypt's golf-cart sector, customer pain points, and the features users valued most. National Motors translated those insights into a mobility product combining practical comfort, premium leisure features, and technological advancement.",
        "A solar-panel-equipped model introduced an additional sustainability dimension to the range. Blu Light Mobility strengthened the National Motors portfolio with an owned brand developed around Egyptian market needs, local assembly capabilities, and the future of light mobility.",
      ],
      cta: { label: "Explore Blu Light Mobility", href: "https://www.blulightmobility.com" },
      image: "/images/brands/blu-light-mobility.png",
      imageAlt: "A Blu Light Mobility electric golf cart on a resort golf course at sunset",
      imagePosition: "50% 42%",
      accent: "blue" as const,
    },
  ],
};

export const VISION = {
  eyebrow: "Our Vision",
  headline: "Shaping the Future of Mobility in Egypt",
  headlineLines: ["Shaping the Future", "of Mobility", "in Egypt"],
  body: "National Motors aspires to become Egypt's most respected automotive group and a regional benchmark for customer experience, operational excellence, and sustainable mobility. Building on a heritage that began in 1978, we continue to evolve beyond vehicle representation to help shape a more efficient and responsible future for mobility in Egypt and across the region.",
};

export const MISSION = {
  eyebrow: "Our Mission",
  headline: "Creating Value Throughout the Ownership Journey",
  body: "National Motors is committed to representing world-class automotive brands with excellence and delivering an integrated ownership experience at every stage—from enquiry and purchase to after-sales support. We create lasting value for our customers, partners, employees, and communities through professionalism, accountability, and sustainable growth.",
};

export const VALUES = {
  eyebrow: "Our Values",
  title: "The Principles Behind Every Decision",
  intro:
    "At National Motors, our values define how we serve our customers, represent global automotive brands, develop our people, strengthen our operations, and create sustainable value in Egypt and beyond.",
  items: [
    {
      n: "01",
      title: "Customers at the Heart of Everything",
      body: "We place customers at the center of every decision and deliver a consistent, reliable, and differentiated journey across every interaction; from the initial enquiry and vehicle purchase to ownership and after-sales support.",
    },
    {
      n: "02",
      title: "Partnerships Built on Excellence",
      body: "We build strong, long-term partnerships with leading global automotive brands. Through responsible representation in Egypt, we protect each brand's identity, strengthen its market value, and create shared opportunities for sustainable success.",
    },
    {
      n: "03",
      title: "Excellence in Execution",
      body: "We pursue operational excellence through efficient processes, clear governance, measurable performance, and evolving digital capabilities. This enables National Motors to deliver consistently, respond effectively, and grow responsibly.",
    },
    {
      n: "04",
      title: "People Empowered to Lead",
      body: "We invest in talent, develop capable leaders, encourage accountability, and foster a high-performance culture where people are empowered to grow, take ownership, and contribute meaningfully to our shared success.",
    },
    {
      n: "05",
      title: "Responsible, Sustainable Growth",
      body: "We pursue profitable, long-term business growth through strategic expansion, innovation, local capability development, and responsible corporate development; creating lasting value for our customers, partners, employees, and communities.",
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
      bio: "Combining financial leadership with extensive commercial-management experience across diverse products and industries. At National Motors, he supports disciplined financial management, investment evaluation, and expansion planning; helping the company pursue larger opportunities with a balance of ambition, commercial insight, and financial responsibility.",
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
      bio: "Mr. Mahmoud Abdelaziz is a key steward of National Motors' organization and people. Drawing on extensive experience in human resources and talent management, he has introduced a strategic approach to organizational development, administration, and capability building; bringing experienced professionals and innovative thinkers together within a clear, accountable, and performance-focused organization.",
    },
    {
      name: "Eng. Ahmed Farouk",
      role: "Information Technology Director",
      image: "/images/leadership/ahmed-farouk.png",
      bio: "Leading technology development beyond the boundaries of traditional IT support. From developing business applications to continuously strengthening the company's digital infrastructure, he has initiated multiple technological advancements across National Motors; positioning technology as a driver of operational efficiency, connectivity, scalability, and future growth.",
    },
  ],
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
    image: null, // No authentic portrait supplied — rendered as a monogram placeholder.
    paragraphs: [
      "Mr. Emad Abdelnaby is the architect of National Motors' modern business legacy. Building on the established foundation, he shaped a leadership philosophy defined by independent thinking, market creation, and disciplined diversification.",
      "Rather than competing only within established categories, he has consistently pursued a blue-ocean approach; identifying unmet needs, opening new markets, and building businesses with clear strategic distinction.",
      "His ability to guide a diverse portfolio across the automotive, after-market, agriculture, and real-estate sectors has been central to National Motors' resilience, expansion, and long-term success.",
    ],
  },
  members: [
    {
      name: "Mr. Ahmed Abdelnaby",
      role: "Chief Executive Officer",
      image: "/images/leadership/ahmed-abdelnaby.png",
      paragraphs: [
        "Mr. Ahmed Abdelnaby has played a defining role in developing some of National Motors' flagship and highest-performing brands. His leadership focuses on strengthening business models, elevating brand performance, and creating scalable and sustainable sources of revenue.",
        "Throughout the past decade, he has helped guide National Motors through changing market conditions, operational challenges, and important strategic turning points. His ability to combine forward-looking business thinking with decisive executive leadership has contributed to the company's continued strength and development.",
        "His professional journey represents a compelling example of leadership built through experience, adaptability, and the ability to transform challenges into opportunities for growth.",
      ],
    },
    {
      name: "Mr. Hatem Abdelnaby",
      role: "Chief Operating Officer",
      image: "/images/leadership/hatem-abdelnaby.png",
      paragraphs: [
        "Mr. Hatem Abdelnaby leads operational strategy and execution across National Motors. He played a central role in introducing electric vehicles into the company's portfolio and continues to oversee relationships with international suppliers, strategic partners, and government stakeholders.",
        "Combining strategic vision with hands-on execution, he drives new-market entry, category development, operational transformation, and cross-functional delivery across the company.",
        "His leadership connects ambitious ideas with the systems, partnerships, and operational capabilities required to turn them into sustainable businesses, new mobility solutions, and long-term market opportunities.",
      ],
    },
    {
      name: "Mr. Omar Abdelnaby",
      role: "Managing Director",
      image: "/images/leadership/omar-abdelnaby.png",
      paragraphs: [
        "Maintaining close oversight of National Motors' ongoing business processes, helping ensure that strategy translates into coordinated execution. His product-development experience includes directing one of the company's most successful initiatives: transforming market feedback into the development of Blu Light Mobility golf carts designed around the needs of customers in Egypt.",
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
