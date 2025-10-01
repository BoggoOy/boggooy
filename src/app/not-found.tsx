import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

// SEO meta tags
export const metadata = {
  title: "404 – Page Not Found | Boggo",
  description:
    "404 – Page not found. The page you are looking for does not exist.",
  robots: "noindex, follow",
};
export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      role="main"
      aria-label="404 Not Found"
    >
      <section
        className="text-center text-white"
        role="region"
        aria-labelledby="notfound-heading"
      >
        <h1
          id="notfound-heading"
          className="text-6xl font-geist-mono font-light mb-4"
        >
          404
        </h1>
        <p className="text-text-title-mobile md:text-text-title font-geist mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-full bg-white text-black font-geist font-medium shadow transition hover:bg-gray-100"
          aria-label="Go to homepage"
        >
          Go to homepage
          <ArrowRight
            aria-hidden="true"
            focusable="false"
            className="inline ml-2"
          />
        </Link>
      </section>
    </main>
  );
}
