import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import HeritageTimeline from "@/components/about/HeritageTimeline";
import SectorsSection from "@/components/about/SectorsSection";
import BrandStories from "@/components/about/BrandStories";
import VisionMission from "@/components/about/VisionMission";
import ValuesSection from "@/components/about/ValuesSection";
import LeadershipSection from "@/components/about/LeadershipSection";
import BoardSection from "@/components/about/BoardSection";
import CSRSection from "@/components/about/CSRSection";
import FutureSection from "@/components/about/FutureSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "National Motors is an Egyptian automotive group founded in 1978, managed across generations of the Abdelnaby family and transitioning toward National Motors Group by the end of 2026 — across automotive, tyres, agriculture and real estate.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About National Motors",
    description:
      "Founded in 1978. An Egyptian automotive group across automotive, tyres, agriculture and real estate — moving toward National Motors Group.",
    url: "/about",
    images: [{ url: "/images/hero/joylong-a4-high-roof.png", width: 1920, height: 1080, alt: "National Motors" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <AboutHero />
        <HeritageTimeline />
        <SectorsSection />
        <BrandStories />
        <VisionMission />
        <ValuesSection />
        <BoardSection />
        <LeadershipSection />
        <CSRSection />
        <FutureSection />
      </main>
      <Footer />
    </>
  );
}
