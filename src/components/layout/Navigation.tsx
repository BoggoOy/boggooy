"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BoggoLogo from "@/src/components/ui/BoggoLogo";

const navLinks = [
  { href: "/", label: "Boggo" },
  { href: "/culture", label: "Culture" },
  { href: "/works", label: "Works" },
  { href: "/careers", label: "Careers" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // On the homepage hero has GrainyBackground — use white/blend mode
  // On other pages use dark text on white bg
  const isHome = pathname === "/";

  return (
    <nav
      className={`absolute top-0 left-0 w-full z-50 ${
        isHome ? "mix-blend-difference" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`hover:opacity-70 transition-opacity ${
            isHome ? "text-white" : "text-neutral-900"
          }`}
        >
          <BoggoLogo className="h-8 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`fluid-xs uppercase tracking-widest hover:opacity-70 transition-opacity ${
                isHome
                  ? "text-white"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className={`block w-6 h-0.5 ${isHome ? "bg-white" : "bg-neutral-900"}`}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className={`block w-6 h-0.5 ${isHome ? "bg-white" : "bg-neutral-900"}`}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className={`block w-6 h-0.5 ${isHome ? "bg-white" : "bg-neutral-900"}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-0 bg-white z-40 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-neutral-900 fluid-h2 font-light tracking-tight hover:opacity-70 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-neutral-900 text-2xl cursor-pointer"
              aria-label="Close menu"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
