"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useRef } from "react";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export function useRevealer() {
  const revealer = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    gsap.to(revealer.current, {
      scaleY: 0,
      duration: 1.25,
      delay: 1,
      ease: "hop",
    });
  }, {});

  return { revealer };
}
