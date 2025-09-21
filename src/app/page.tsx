"use client";
import { ServiceDropDown } from "@/components/Service/ServiceDropDown";
import WaveParticles from "@/components/ThreeJS/WaveParticles";
import { useRevealer } from "@/hooks/useRevealer";
import React, { useState } from "react";

const SERVICE_DATA = [
  {
    title: "Development",
    description:
      "We design and build responsive, scalable, and user-friendly web & mobile applications. From MVPs to production-ready systems, our development process ensures quality, adaptability, and human-centered results.",
  },
  {
    title: "Advisory & Architecture",
    description:
      "We help businesses model and refine their ideas from a technical perspective. Our team provides consulting, UML modeling, and system architecture planning to create reliable, future-proof digital foundations.",
  },
  {
    title: "Design & Experience",
    description:
      "We craft intuitive and visually engaging user experiences. From UI/UX design and wireframing to interactive prototypes, we ensure your digital solutions are not only functional but also delightful to use.",
  },
  {
    title: "Strategy & Innovation",
    description:
      "We work with you to explore and validate new ideas, technologies, and business models. By combining technical insight with creative vision, we transform concepts into innovative digital solutions that stand out.",
  },
];
export default function Home() {
  const { revealer } = useRevealer();
  const [openServiceIndex, setOpenServiceIndex] = useState<number | null>(null);
  return (
    <main id="main" className="relative min-h-dvh px-5">
      <div
        aria-hidden="true"
        ref={revealer}
        className="fixed top-0 left-0 w-screen h-svh pointer-events-none z-20 bg-foreground origin-[center_top]"
      />
      <section className="min-h-dvh grid grid-rows-2 pt-40 mb-20 relative">
        {/* WaveParticles wrapper */}
        <WaveParticles />
        {/* Hero / Intro */}
        <div className="max-w-[1450px] mb-20">
          <h1 className="font-geist text-[clamp(1.6rem,7vw,4.6rem)] leading-[1.05] sm:indent-[2em] overflow-hidden hyphens-auto sm:hyphens-none">
            Design and development create scalable digital solutions centered on{" "}
            <span className="font-black italic">humans.</span>
          </h1>
        </div>

        {/* Grid section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
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
        </div> */}

        {/* Description text */}
        <div className="absolute bottom-5 flex flex-col sm:flex-row gap-3 justify-between w-full sm:items-center">
          <div className="flex flex-col text-right sm:text-left font-geist sm:max-w-[30em] text-[clamp(0.7rem,2vw,1.1rem)] whitespace-nowrap">
            <p className="">Based in Oulu, Finland</p>
            <p className="text-neutral-500 text-[clamp(0.65rem,1.8vw,1rem)]">
              Born in passion
            </p>
          </div>

          <h4 className="sm:max-w-[30em] font-geist text-[clamp(0.7rem,3vw,1.1rem)] leading-tight sm:leading-normal text-left sm:text-right">
            We create high-quality, human-centered software and applications,
            bringing your ideas to life in unforgettable ways.
          </h4>
        </div>
      </section>
      <section className="min-h-svh lg:grid lg:grid-cols-2 py-10">
        <h2 className="font-geist w-full text-[clamp(4.425rem,10.267vw+2.372rem,10.6rem)] lg:text-[clamp(3.5rem,10vw,7.8rem)] leading-[0.8]">
          Services
        </h2>
        <div className="space-y-20">
          <p className="text-[clamp(1.1rem,5vw,1.6rem)] leading-[1.05] mt-5 lg:mt-auto hyphens-auto">
            Our team is a highly collaborative group of stars that enjoys
            working together and learning from each other. We believe that the
            best solutions come from diverse perspectives and experiences, and
            we strive to create an inclusive environment where everyone feels
            valued and heard.
          </p>
          <article className="flex flex-col border-b">
            {SERVICE_DATA.map((service, idx) => (
              <ServiceDropDown
                key={service.title}
                title={service.title}
                description={service.description}
                isOpen={openServiceIndex === idx}
                onToggle={() =>
                  setOpenServiceIndex(openServiceIndex === idx ? null : idx)
                }
              />
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}
