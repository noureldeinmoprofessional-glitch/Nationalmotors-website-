/* ============================================================
   NATIONAL MOTORS — Careers: Available Opportunities (DEMO DATA)
   These six positions are DEMONSTRATION opportunities only — placeholder
   content for designing/testing the Careers UX. They are NOT confirmed
   National Motors vacancies. Every entry is flagged `isDemo`, and all
   descriptions/requirements are written as clearly demo content.
   Replace this array with real HR/CMS data (same shape) — the UI needs
   no redesign. When real data arrives with `isDemo: false`, the "DEMO
   OPPORTUNITY" labels disappear automatically.
   ============================================================ */

export type Opportunity = {
  id: string;
  department: string;
  title: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
  isDemo: boolean;
  // Extensible for real vacancies (unused for demo):
  status?: "active" | "inactive";
  image?: string;
  closingDate?: string;
};

const DEMO_DESC =
  "This is a demonstration opportunity used to preview the National Motors careers experience. The real role summary and responsibilities will be provided by the recruitment team when this position becomes available.";

const DEMO_REQS = [
  "Placeholder requirement — provided for demonstration only.",
  "Placeholder requirement — real criteria will be supplied by HR.",
  "Placeholder requirement — not an actual National Motors requirement.",
  "Placeholder requirement — replace with approved recruitment content.",
];

export const OPPORTUNITIES: Opportunity[] = [
  { id: "demo-01", department: "Automotive", title: "Sales Executive", location: "Cairo", employmentType: "Full-time", description: DEMO_DESC, requirements: DEMO_REQS, isDemo: true },
  { id: "demo-02", department: "Sales", title: "Sales Manager", location: "Cairo", employmentType: "Full-time", description: DEMO_DESC, requirements: DEMO_REQS, isDemo: true },
  { id: "demo-03", department: "Marketing", title: "Marketing Specialist", location: "Cairo", employmentType: "Full-time", description: DEMO_DESC, requirements: DEMO_REQS, isDemo: true },
  { id: "demo-04", department: "After-Sales", title: "Service Advisor", location: "Giza", employmentType: "Full-time", description: DEMO_DESC, requirements: DEMO_REQS, isDemo: true },
  { id: "demo-05", department: "Finance", title: "Financial Analyst", location: "Cairo", employmentType: "Full-time", description: DEMO_DESC, requirements: DEMO_REQS, isDemo: true },
  { id: "demo-06", department: "Operations", title: "Operations Coordinator", location: "Cairo", employmentType: "Full-time", description: DEMO_DESC, requirements: DEMO_REQS, isDemo: true },
];

// True while any listed opportunity is demo content (drives the section notice).
export const HAS_DEMO = OPPORTUNITIES.some((o) => o.isDemo);
