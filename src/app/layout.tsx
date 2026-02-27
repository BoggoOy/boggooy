import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/src/components/layout/Navigation";
import Footer from "@/src/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Boggo — Design-Driven Software Development & IT Consulting | Oulu, Finland",
    template: "%s | Boggo",
  },
  description:
    "Boggo is an Oulu-based design and technology studio. We craft digital experiences, build custom software, and provide strategic IT consulting for growing businesses across Finland.",
  keywords: [
    "software development Finland",
    "IT consulting Oulu",
    "UX design Finland",
    "custom software development",
    "digital design studio Oulu",
    "web development Finland",
    "technology consulting SME",
    "human-centered design",
    "Finnish software company",
  ],
  metadataBase: new URL("https://boggo.fi"),
  openGraph: {
    title: "Boggo — Design-Driven Software & IT Consulting",
    description:
      "Oulu-based studio crafting digital experiences and custom software for growing businesses.",
    url: "https://boggo.fi",
    siteName: "Boggo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boggo — Design-Driven Software & IT Consulting",
    description:
      "Oulu-based studio crafting digital experiences and custom software for growing businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://boggo.fi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-neutral-900`}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
