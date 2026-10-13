/* ============================================================
   NATIONAL MOTORS — Site search index
   A curated, static index of the site's pages and key content.
   No backend: search runs client-side over this index. Add entries
   here as new pages/sections ship.
   ============================================================ */

import { FAQS } from "@/lib/site";

export type SearchCategory =
  | "Brands"
  | "Sectors"
  | "Company"
  | "Support"
  | "Network"
  | "Locations"
  | "News"
  | "Careers"
  | "Contact"
  | "Help";

export type SearchEntry = {
  title: string;
  href: string;
  category: SearchCategory;
  description?: string;
  keywords?: string[];
};

const PAGES: SearchEntry[] = [
  // Company
  { title: "About Us", href: "/about", category: "Company", description: "An Egyptian automotive group, founded in 1978.", keywords: ["company", "history", "group", "national motors", "overview"] },
  { title: "Our Story", href: "/about#story", category: "Company", description: "Where it began — National Motors since 1978.", keywords: ["heritage", "history", "founded", "1978", "legacy"] },
  { title: "Leadership", href: "/about#leadership", category: "Company", description: "The founding family and executive team.", keywords: ["team", "board", "chairman", "executives", "management", "abdelnaby", "ceo", "directors"] },
  { title: "Vision & Mission", href: "/about#philosophy", category: "Company", description: "Shaping the future of mobility in Egypt.", keywords: ["vision", "mission", "values", "purpose", "philosophy"] },

  // Brands
  { title: "Our Brands", href: "/brands", category: "Brands", description: "Three brands, one portfolio.", keywords: ["portfolio", "brands", "lineup"] },
  { title: "Joylong", href: "/brands/joylong", category: "Brands", description: "Commercial vehicles — passenger and cargo transport.", keywords: ["minibus", "commercial", "passenger", "cargo", "a4", "van", "bus"] },
  { title: "Farizon", href: "/brands/farizon", category: "Brands", description: "Electric commercial vehicles — born electric.", keywords: ["electric", "ev", "new energy", "v6e", "f1e", "h8e", "sv", "van", "commercial", "geely"] },
  { title: "Blu", href: "/brands/blu-light-mobility", category: "Brands", description: "Electric light mobility and golf carts.", keywords: ["golf cart", "light mobility", "drift", "tide", "crest", "electric", "leisure"] },

  // Sectors
  { title: "Sectors", href: "/sectors", category: "Sectors", description: "National Motors across four connected sectors.", keywords: ["business", "group", "divisions", "industries"] },
  { title: "Automotive", href: "/sectors/automotive", category: "Sectors", description: "Passenger and commercial vehicles.", keywords: ["vehicles", "cars", "commercial", "mobility"] },
  { title: "Agriculture", href: "/sectors/agriculture", category: "Sectors", description: "Yards, trading and exporting plants.", keywords: ["farming", "yards", "plants", "export", "land"] },
  { title: "Real Estate", href: "/sectors/real-estate", category: "Sectors", description: "Property ownership and investment.", keywords: ["property", "investment", "development", "buildings"] },
  { title: "CSR", href: "/sectors/csr", category: "Sectors", description: "Creating lasting value for our communities.", keywords: ["corporate social responsibility", "community", "sustainability", "impact"] },

  // Support / After-Sales
  { title: "After-Sales", href: "/after-sales", category: "Support", description: "Service, maintenance and genuine parts.", keywords: ["service", "maintenance", "repair", "support", "warranty", "care"] },
  { title: "Spare Parts", href: "/after-sales#spare-parts", category: "Support", description: "Genuine spare parts and supply.", keywords: ["parts", "genuine parts", "components"] },
  { title: "Maintenance", href: "/after-sales#maintenance", category: "Support", description: "Scheduled maintenance and inspections.", keywords: ["service", "repair", "inspection", "checkup"] },
  { title: "Book a Service", href: "/after-sales#book", category: "Support", description: "Arrange a service appointment.", keywords: ["appointment", "booking", "schedule", "service"] },
  { title: "Book a Test Drive", href: "/brands", category: "Support", description: "Try a Joylong, Farizon or Blu vehicle.", keywords: ["test drive", "book", "demo", "try", "experience"] },

  // Network
  { title: "Network", href: "/network", category: "Network", description: "Showrooms, service centers and authorized distributors.", keywords: ["showrooms", "service centers", "distributors", "coverage", "nationwide", "dealers"] },

  // Locations
  { title: "Showrooms", href: "/locations/showrooms", category: "Locations", description: "Visit a National Motors showroom.", keywords: ["branches", "dealers", "visit", "location", "address", "map"] },
  { title: "Service Centers", href: "/locations/service-centers", category: "Locations", description: "Find a service center near you.", keywords: ["service", "maintenance", "location", "branches", "workshop"] },

  // News
  { title: "Press Releases", href: "/news/press-releases", category: "News", description: "Official announcements and clear facts.", keywords: ["news", "announcements", "media", "press"] },
  { title: "Articles & Insights", href: "/news/articles", category: "News", description: "Knowledge built from experience.", keywords: ["blog", "insights", "articles", "stories"] },
  { title: "Media", href: "/news/media", category: "News", description: "Our projects in motion.", keywords: ["gallery", "photos", "videos", "press", "media"] },

  // Careers
  { title: "Careers", href: "/careers", category: "Careers", description: "Build your career with National Motors.", keywords: ["jobs", "hiring", "work", "vacancies", "apply", "recruitment"] },

  // Contact / Help
  { title: "Contact Us", href: "/contact", category: "Contact", description: "Reach our team — hotline, email and more.", keywords: ["contact", "phone", "email", "hotline", "reach", "support", "enquiry"] },
  { title: "FAQ", href: "/faq", category: "Help", description: "Answers to common questions.", keywords: ["questions", "help", "faq", "support"] },
];

const FAQ_ENTRIES: SearchEntry[] = FAQS.map((f) => ({
  title: f.q,
  href: "/faq",
  category: "Help" as const,
  description: f.a,
  keywords: ["faq", "question", "help"],
}));

export const SEARCH_INDEX: SearchEntry[] = [...PAGES, ...FAQ_ENTRIES];

/** A curated set shown before the user types anything. */
export const QUICK_LINKS: SearchEntry[] = [
  PAGES.find((p) => p.href === "/brands")!,
  PAGES.find((p) => p.title === "Farizon")!,
  PAGES.find((p) => p.title === "Book a Test Drive")!,
  PAGES.find((p) => p.href === "/network")!,
  PAGES.find((p) => p.href === "/after-sales")!,
  PAGES.find((p) => p.href === "/contact")!,
];

const norm = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Lightweight relevance scoring. All query tokens must match somewhere. */
export function searchSite(query: string, limit = 8): SearchEntry[] {
  const q = norm(query).trim();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  const scored: { entry: SearchEntry; score: number }[] = [];

  for (const entry of SEARCH_INDEX) {
    const title = norm(entry.title);
    const kw = norm((entry.keywords ?? []).join(" "));
    const desc = norm(entry.description ?? "");
    const cat = norm(entry.category);

    let total = 0;
    let matchedAll = true;

    for (const t of tokens) {
      let s = 0;
      const wordStart = new RegExp(`\\b${escapeRe(t)}`).test(title);
      if (title === t) s += 120;
      else if (title.startsWith(t)) s += 70;
      else if (wordStart) s += 50;
      else if (title.includes(t)) s += 30;

      if (kw.includes(t)) s += 22;
      if (cat.includes(t)) s += 14;
      if (desc.includes(t)) s += 8;

      if (s === 0) {
        matchedAll = false;
        break;
      }
      total += s;
    }

    if (matchedAll) scored.push({ entry, score: total });
  }

  scored.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));
  return scored.slice(0, limit).map((r) => r.entry);
}
