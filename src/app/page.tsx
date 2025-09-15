"use client";
import { Heading } from "@/components/Text/Heading";
import { useRevealer } from "@/hooks/useRevealer";
import Link from "next/link";
import React from "react";
export default function Home() {
  const { revealer } = useRevealer();
  return (
    <main aria-label="Home Page" className="relative min-h-dvh px-5">
      <div
        aria-hidden="true"
        ref={revealer}
        className="fixed top-0 left-0 w-screen h-svh pointer-events-none z-20 bg-foreground origin-[center_top]"
      />
      <section className="min-h-svh">
        {/* Hero / Intro */}
        <div className="max-w-[1450px] mb-20">
          <h2 className="font-geist text-[clamp(1.6rem,7vw,4.6rem)] leading-[1.05] indent-[2em]">
            In harmony, design and development create scalable digital
            solut&shy;ions centered on{" "}
            <span className="font-black italic">humans.</span>
          </h2>
        </div>

        {/* Grid section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Vasemmalle yhteystiedot */}
          <div className="flex flex-col w-fit gap-px text-[clamp(0.85rem,1.2vw,1rem)] text-[--foreground] font-mono">
            <a
              href="mailto:hello@boggo.fi"
              aria-describedby="email-address"
              className="underline"
            >
              hello@boggo.fi
            </a>
            <a href="tel:+358505541882" aria-describedby="phone-number">
              +358 50 554 1882
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
