import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Media from "@/components/news/Media";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Project-based collections of photographs, videos, documents, and other media that bring National Motors' work to life — from vehicle launches and partnerships to exhibitions and community projects.",
  alternates: { canonical: "/news/media" },
  openGraph: {
    title: "Media | National Motors",
    description: "Our Projects in Motion.",
    url: "/news/media",
    images: [{ url: "/images/about-hero/automotive.jpg", width: 1920, height: 1080, alt: "National Motors media gallery" }],
  },
};

export default function MediaPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Media />
      </main>
      <Footer />
    </>
  );
}
