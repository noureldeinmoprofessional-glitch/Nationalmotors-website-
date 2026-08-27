import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CareersView from "@/components/careers/CareersView";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Careers at National Motors — submit your job application to our recruitment team at hr@nationalmotorsco.com.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers | National Motors",
    description: "Submit your job application to National Motors.",
    url: "/careers",
    images: [{ url: "/images/about-hero/real-estate.jpg", width: 1920, height: 1080, alt: "National Motors Careers" }],
  },
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <CareersView />
      </main>
      <Footer />
    </>
  );
}
