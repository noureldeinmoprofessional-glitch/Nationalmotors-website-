import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BrandPage from "@/components/brands/BrandPage";
import { FARIZON } from "@/lib/brandsData";

export const metadata: Metadata = {
  title: "Farizon",
  description:
    "Farizon by National Motors — intelligent electric commercial vehicles for modern logistics and urban transportation. Explore Farizon's showrooms across Egypt.",
  alternates: { canonical: "/brands/farizon" },
  openGraph: {
    title: "Farizon | National Motors",
    description: "Driving the future of electric mobility.",
    url: "/brands/farizon",
    images: [{ url: FARIZON.hero.image, width: 1920, height: 1080, alt: "Farizon by National Motors" }],
  },
};

export default function FarizonPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <BrandPage brand={FARIZON} />
      </main>
      <Footer />
    </>
  );
}
