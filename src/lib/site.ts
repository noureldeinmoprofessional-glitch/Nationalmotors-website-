/* ============================================================
   NATIONAL MOTORS — Site data (approved source content only)
   ============================================================ */

export const CONTACT = {
  hotline: "16302",
  whatsapp: "01066673747",
  email: "info@nationalmotorsco.com",
  socials: {
    linkedin: "https://www.linkedin.com/company/nationalmotors42/",
    facebook: "https://www.facebook.com/nationalmotors42/",
    instagram: "https://www.instagram.com/nationalmotors42/",
    tiktok: "https://www.tiktok.com/@nationalmotorscompany",
    youtube: "#",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** When true, the top-level label is not a link itself — it only opens the
   *  dropdown. Used for "News & Media", whose landing page is disabled while
   *  its sub-pages remain navigable. */
  disabled?: boolean;
  children?: { label: string; href: string }[];
};

export const NAV: NavItem[] = [
  { label: "About Us", href: "/about" },
  {
    label: "Our Brands",
    href: "/brands",
    children: [
      { label: "Joylong", href: "/brands/joylong" },
      { label: "Farizon", href: "/brands/farizon" },
      { label: "Blu Light Mobility", href: "/brands/blu-light-mobility" },
    ],
  },
  { label: "After-Sales", href: "/after-sales" },
  {
    label: "News & Media",
    href: "/news",
    disabled: true,
    children: [
      { label: "Press Releases", href: "/news/press-releases" },
      { label: "Articles & Insights", href: "/news/articles" },
      { label: "Media", href: "/news/media" },
    ],
  },
  {
    label: "Locations",
    href: "/locations/showrooms",
    children: [
      { label: "Showrooms", href: "/locations/showrooms" },
      { label: "Service Centers", href: "/locations/service-centers" },
    ],
  },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export type HeroSlide = {
  id: string;
  category: string;
  accent: "green" | "electric";
  titleLines: string[];
  officialTitle: string;
  description: string;
  cta: { label: string; href: string };
  image: string;
  imageAlt: string;
  imagePosition: string; // object-position
  model: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "a4-high-roof",
    category: "Press Release",
    accent: "green",
    titleLines: ["Joylong A4", "High Roof"],
    officialTitle:
      "National Motors Introduces the Joylong A4 High Roof High Line in Egypt",
    description:
      "The new high-roof configuration expands the Joylong lineup with greater interior space and practical comfort for passenger transportation.",
    cta: { label: "Download Press Release", href: "/news/press-releases#a4-high-roof" },
    image: "/images/hero/joylong-a4-high-roof.png",
    imageAlt:
      "Joylong A4 High Roof High Line minibus parked at a hotel entrance in Egypt",
    imagePosition: "50% 60%",
    model: "Joylong A4 High Roof High Line",
  },
  {
    id: "farizon-v6e",
    category: "Test Drive",
    accent: "electric",
    titleLines: ["Farizon V6E", "Born Electric."],
    officialTitle: "Experience the Farizon V6E",
    description:
      "Discover the Farizon V6E firsthand and see how a born-electric commercial van can support your everyday business operations.",
    cta: { label: "Book Your Test Drive Now", href: "/test-drive" },
    image: "/images/hero/farizon-v6e.png",
    imageAlt:
      "Farizon V6E born-electric commercial van driving through a modern city",
    imagePosition: "50% 62%",
    model: "Farizon V6E",
  },
  {
    id: "a4-standard",
    category: "Press Release",
    accent: "green",
    titleLines: ["Joylong A4", "Standard"],
    officialTitle: "National Motors Introduces the Joylong A4 Standard in Egypt",
    description:
      "A practical new addition combining the essential features businesses and operators need for demanding day-to-day transportation.",
    cta: { label: "Download Press Release", href: "/news/press-releases#a4-standard" },
    image: "/images/hero/joylong-a4-standard.png",
    imageAlt: "Joylong A4 Standard van driving through Cairo",
    imagePosition: "50% 60%",
    model: "Joylong A4 Standard",
  },
];

export const SECTORS = [
  { n: "01", name: "Automotive", note: "Passenger, cargo & new-energy commercial vehicles." },
  { n: "02", name: "After Market", note: "After-market products and supply." },
  { n: "03", name: "Agriculture", note: "Large yards, plant trading and export." },
  { n: "04", name: "Real Estate", note: "Property ownership and investment in and beyond Egypt." },
];

export const BRANDS = [
  { name: "Joylong", note: "Commercial vehicles" },
  { name: "Farizon", note: "New-energy commercial vehicles" },
  { name: "Blu Light Mobility", note: "Light mobility & golf carts" },
];

export type Testimonial = {
  id: string;
  title: string;
  client: string;
  sector: string;
  youtube: string; // embed id or url (placeholder for now)
  poster: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    title: "Building a new category of electric commercial mobility",
    client: "Farizon Fleet Partner",
    sector: "New Energy",
    youtube: "",
    poster: "/images/service/featured-v6e.png",
  },
  {
    id: "t2",
    title: "Reliability that keeps our daily operations moving",
    client: "Joylong Operator",
    sector: "Passenger Transport",
    youtube: "",
    poster: "/images/people/omar-abdelnaby.png",
  },
  {
    id: "t3",
    title: "After-sales support we can genuinely depend on",
    client: "Long-standing Client",
    sector: "After-Sales",
    youtube: "",
    poster: "/images/people/nagy-mengel.png",
  },
];

export const FAQS = [
  {
    q: "What is National Motors?",
    a: "National Motors is an Egyptian company founded in 1978. The company operates across the automotive sector and several other industries, supported by a growing network of showrooms, service centers, facilities, and strategic partners.",
  },
  {
    q: "What automotive brands does National Motors represent?",
    a: "The National Motors automotive portfolio includes Farizon, Joylong, and Blu Light Mobility. Each brand serves different passenger transportation, cargo transportation, electric mobility, and light-mobility requirements.",
  },
  {
    q: "What sectors does National Motors operate in?",
    a: "National Motors operates across the automotive, after-market products, agriculture, and real estate sectors. The company also maintains investments in other fields and supports communities through its corporate social responsibility activities.",
  },
  {
    q: "Does National Motors offer electric commercial vehicles in Egypt?",
    a: "Yes. National Motors offers new-energy commercial vehicles through Farizon, Geely's commercial-vehicle brand specializing in new-energy mobility. Available solutions support cargo transportation, passenger transportation, and different business requirements.",
  },
  {
    q: "What after-sales services does National Motors provide?",
    a: "National Motors provides scheduled maintenance, vehicle inspections, technical support, spare-parts support, and other after-sales services through its service capabilities and specialized teams. Service availability may vary by brand and vehicle model.",
  },
  {
    q: "How can I book a Farizon V6E test drive?",
    a: "You can book a Farizon V6E test drive by completing the test-drive form on the National Motors website. Select the V6E, provide your contact information, and the responsible team will contact you to arrange the appointment.",
  },
];

export const FOOTER_NAV = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/about#story" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Our Sectors", href: "/about#sectors" },
      { label: "Corporate Social Responsibility", href: "/about#csr" },
    ],
  },
  {
    heading: "Our Brands",
    links: [
      { label: "Joylong", href: "/brands/joylong" },
      { label: "Farizon", href: "/brands/farizon" },
      { label: "Blu Light Mobility", href: "/brands/blu-light-mobility" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "After-Sales Services", href: "/after-sales" },
      { label: "Spare Parts", href: "/after-sales#spare-parts" },
      { label: "Maintenance", href: "/after-sales#maintenance" },
      { label: "Service Centers", href: "/after-sales#centers" },
      { label: "Book a Service", href: "/after-sales#book" },
    ],
  },
  {
    heading: "Discover",
    links: [
      { label: "News & Media", href: "/news/press-releases" },
      { label: "Press Releases", href: "/news/press-releases" },
      { label: "Articles & Insights", href: "/news/articles" },
      { label: "Media", href: "/news/media" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Locations",
    links: [
      { label: "Showrooms", href: "/locations/showrooms" },
      { label: "Service Centers", href: "/locations/service-centers" },
    ],
  },
];
