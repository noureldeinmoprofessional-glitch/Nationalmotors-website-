import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactView from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have a question about National Motors vehicles, services, or mobility solutions? Complete the form and our team will get in touch with you as soon as possible.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | National Motors",
    description: "Let's Get in Touch.",
    url: "/contact",
    images: [{ url: "/images/hero/joylong-a4-high-roof.png", width: 1920, height: 1080, alt: "Contact National Motors" }],
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <ContactView />
      </main>
      <Footer />
    </>
  );
}
