import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BrandsIndex from "@/components/brands/BrandsIndex";

export const metadata: Metadata = {
  title: "Our Brands",
  description:
    "The National Motors automotive portfolio — Joylong, Farizon and Blu Light Mobility. Choose a brand to explore.",
  alternates: { canonical: "/brands" },
  openGraph: {
    title: "Our Brands | National Motors",
    description:
      "Joylong, Farizon and Blu Light Mobility — three brands within one National Motors portfolio.",
    url: "/brands",
    images: [{ url: "/images/brands/farizon-v6e.jpg", width: 1920, height: 1080, alt: "National Motors brands" }],
  },
};

export default function BrandsPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <BrandsIndex />
      </main>
      <Footer />
    </>
  );
}
