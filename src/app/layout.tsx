import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = localFont({
  src: "../../public/fonts/Geist.ttf",
  variable: "--geist",
});
const geistItalic = localFont({
  src: "../../public/fonts/GeistItalic.ttf",
  variable: "--geist-italic",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMono.ttf",
  variable: "--geist-mono",
});
const geistMonoItalic = localFont({
  src: "../../public/fonts/GeistMonoItalic.ttf",
  variable: "--geist-mono-italic",
});

export const metadata: Metadata = {
  title: "Boggo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} ${geistItalic.variable} ${geistMonoItalic.variable} antialiased scroll-smooth`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
