import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BrandPage from "@/components/brands/BrandPage";
import { JOYLONG } from "@/lib/brandsData";

export const metadata: Metadata = {
  title: "Joylong",
  description:
    "Joylong by National Motors — commercial vehicles including passenger minibuses, cargo vans, and transport solutions. Explore Joylong's authorized distributors and dealers across Egypt.",
  alternates: { canonical: "/brands/joylong" },
  openGraph: {
    title: "Joylong | National Motors",
    description:
      "Commercial vehicles engineered for reliability, efficiency, and everyday performance.",
    url: "/brands/joylong",
    images: [{ url: JOYLONG.hero.image, width: 1920, height: 1080, alt: "Joylong by National Motors" }],
  },
};

export default function JoylongPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <BrandPage brand={JOYLONG} />
      </main>
      <Footer />
    </>
  );
}
