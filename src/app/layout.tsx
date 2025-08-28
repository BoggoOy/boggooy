import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = localFont({
  src: "../../public/fonts/Geist.ttf",
  variable: "--font-geist",
});
const geistItalic = localFont({
  src: "../../public/fonts/GeistItalic.ttf",
  variable: "--font-geist-italic",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMono.ttf",
  variable: "--font-geist-mono",
});
const geistMonoItalic = localFont({
  src: "../../public/fonts/GeistMonoItalic.ttf",
  variable: "--font-geist-mono-italic",
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
        className={`${geist.variable} ${geistMono.variable} ${geistItalic.variable} ${geistMonoItalic.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
