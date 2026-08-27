import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BrandPage from "@/components/brands/BrandPage";
import { BLU } from "@/lib/brandsData";

export const metadata: Metadata = {
  title: "Blu Light Mobility",
  description:
    "Blu Light Mobility by National Motors — premium electric golf carts for resorts, hotels, gated communities, and recreational destinations. Explore Blu's authorized distributors and dealers.",
  alternates: { canonical: "/brands/blu-light-mobility" },
  openGraph: {
    title: "Blu Light Mobility | National Motors",
    description: "Smart mobility for every journey.",
    url: "/brands/blu-light-mobility",
    images: [{ url: BLU.hero.image, width: 1920, height: 1080, alt: "Blu Light Mobility by National Motors" }],
  },
};

export default function BluPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <BrandPage brand={BLU} />
      </main>
      <Footer />
    </>
  );
}
