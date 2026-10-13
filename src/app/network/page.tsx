import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NetworkHub from "@/components/network/NetworkHub";
import ClientsMarquee from "@/components/sections/ClientsMarquee";

export const metadata: Metadata = {
  title: "Network",
  description:
    "National Motors' nationwide network — showrooms, service centers and authorized distributors for Joylong and Blu, bringing professional support closer to you across Egypt.",
  alternates: { canonical: "/network" },
  openGraph: {
    title: "National Motors — Network",
    description:
      "Showrooms, service centers and authorized distributors across Egypt — a network that keeps you moving.",
    url: "/network",
    images: [{ url: "/images/hero/joylong-a4-high-roof.png", width: 1920, height: 1080, alt: "National Motors" }],
  },
};

export default function NetworkPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <NetworkHub />
        <ClientsMarquee />
      </main>
      <Footer />
    </>
  );
}
