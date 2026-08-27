import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PressReleases from "@/components/news/PressReleases";

export const metadata: Metadata = {
  title: "Press Releases",
  description:
    "Official press releases from National Motors and its brands — corporate announcements, vehicle launches, strategic partnerships, business developments, and important milestones.",
  alternates: { canonical: "/news/press-releases" },
  openGraph: {
    title: "Press Releases | National Motors",
    description: "Official Announcements. Clear Facts.",
    url: "/news/press-releases",
    images: [{ url: "/images/hero/joylong-a4-high-roof.png", width: 1920, height: 1080, alt: "National Motors press releases" }],
  },
};

export default function PressReleasesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PressReleases />
      </main>
      <Footer />
    </>
  );
}
