import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/providers/Cursor";
import SectionEyebrows from "@/components/providers/SectionEyebrows";
import RevealFallback from "@/components/providers/RevealFallback";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const SITE_URL = "https://www.nationalmotorsco.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "National Motors | Automotive & Mobility Solutions in Egypt",
    template: "%s | National Motors",
  },
  description:
    "National Motors is an Egyptian automotive and diversified business group founded in 1978, representing Joylong, Farizon and Blu Light Mobility across automotive, tyres, agriculture and real estate.",
  keywords: [
    "National Motors",
    "Joylong Egypt",
    "Farizon Egypt",
    "Blu Light Mobility",
    "commercial vehicles Egypt",
    "electric commercial vans",
  ],
  authors: [{ name: "National Motors" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "National Motors",
    title: "National Motors | Automotive & Mobility Solutions in Egypt",
    description:
      "An Egyptian automotive and diversified business group founded in 1978 — moving toward National Motors Group.",
    images: [{ url: "/images/hero/joylong-a4-high-roof.png", width: 1920, height: 1080, alt: "National Motors" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "National Motors | Automotive & Mobility Solutions in Egypt",
    description:
      "An Egyptian automotive and diversified business group founded in 1978.",
    images: ["/images/hero/joylong-a4-high-roof.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080A0B",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className={manrope.variable} suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('nm-ready')}}catch(e){}",
          }}
        />
        <SmoothScroll />
        <Cursor />
        <SectionEyebrows />
        <RevealFallback />
        {children}
      </body>
    </html>
  );
}
