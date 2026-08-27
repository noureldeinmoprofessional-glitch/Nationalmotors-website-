import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FaqView from "@/components/faq/FaqView";
import { FAQ_CATEGORIES } from "@/lib/faqData";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about National Motors — our company, brands (Farizon, Joylong, Blu Light Mobility), vehicles, after-sales services, and business sectors.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | National Motors",
    description: "Answers about National Motors — company, brands, vehicles, after-sales, and sectors.",
    url: "/faq",
    images: [{ url: "/images/hero/joylong-a4-high-roof.png", width: 1920, height: 1080, alt: "National Motors FAQ" }],
  },
};

// FAQPage structured data built from the approved PPTX content.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_CATEGORIES.flatMap((c) =>
    c.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    }))
  ),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main id="main">
        <FaqView />
      </main>
      <Footer />
    </>
  );
}
