import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Articles from "@/components/news/Articles";

export const metadata: Metadata = {
  title: "Articles & Insights",
  description:
    "Informative and educational articles covering the automotive market, commercial mobility, electric vehicles, fleet operations, after-sales, sustainability, and the sectors National Motors operates in.",
  alternates: { canonical: "/news/articles" },
  openGraph: {
    title: "Articles & Insights | National Motors",
    description: "Knowledge Built from Experience.",
    url: "/news/articles",
    images: [{ url: "/images/about-hero/real-estate.jpg", width: 1920, height: 1080, alt: "National Motors articles and insights" }],
  },
};

export default function ArticlesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Articles />
      </main>
      <Footer />
    </>
  );
}
