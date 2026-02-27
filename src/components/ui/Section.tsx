"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Animoitu osio-komponentti, joka fade-in efektillä tulee näkyviin
 * kun se tulee viewportiin.
 */
export default function Section({
  children,
  className = "",
  id,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.section>
  );
}
