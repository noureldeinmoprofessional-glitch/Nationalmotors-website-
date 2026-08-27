import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsMedia from "@/components/news/NewsMedia";

export const metadata: Metadata = {
  title: "News & Media",
  description:
    "Stories, insights, and milestones from National Motors — official press releases, articles and insights, and multimedia stories documenting our brands, projects, and partnerships.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News & Media | National Motors",
    description: "Stories, Insights, and Milestones from National Motors.",
    url: "/news",
    images: [{ url: "/images/hero/joylong-a4-high-roof.png", width: 1920, height: 1080, alt: "National Motors News & Media" }],
  },
};

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <NewsMedia />
      </main>
      <Footer />
    </>
  );
}
