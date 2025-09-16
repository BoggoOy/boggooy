"use client";
import WaveParticles from "@/components/ThreeJS/WaveParticles";
import { ICONS } from "@/constants/sizing";
import { useRevealer } from "@/hooks/useRevealer";
import { ArrowRight } from "lucide-react";
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
        {/* WaveParticles wrapper */}
        <div className="absolute left-0 top-0 right-0 mx-auto pointer-events-none -z-50 opacity-20">
          <WaveParticles />
        </div>
        {/* Hero / Intro */}
        <div className="max-w-[1450px] mb-20">
          <h2 className="font-geist text-[clamp(1.6rem,7vw,4.6rem)] leading-[1.05] indent-[2em]">
            Design and development create scalable digital solut&shy;ions
            centered on <span className="font-black italic">humans.</span>
          </h2>
        </div>

        {/* Grid section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
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

          <button
            aria-label="Contact us"
            className="relative flex gap-2 items-center font-mono uppercase cursor-pointer w-fit px-6 py-3 group hover:text-black"
            onClick={() => {}}
          >
            {/* SVG Ellipse taustalle */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 200 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <ellipse
                cx={100}
                cy={34}
                rx={100}
                ry={34}
                stroke="currentColor"
                strokeWidth="1"
                fill="transparent"
                className="transition group-hover:fill-white duration-800"
              />
            </svg>
            <p className="relative z-10">Contact</p>
            <ArrowRight className="relative z-10" size={ICONS.ICON_MEDIUM} />
          </button>
        </div>

        <div>
          <h4 className="max-w-[600px] mt-20 font-geist">
            We create high-quality and human-oriented software and applications.
            We bring your ideas to life with colors and functionality that leave
            a lasting impression.
          </h4>
        </div>
      </section>
      {/* <section className="min-h-svh bg-amber-100"></section> */}
    </main>
  );
}
