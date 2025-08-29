"use client";
import { useRevealer } from "@/hooks/useRevealer";
export default function About() {
  const { revealer } = useRevealer();
  return (
    <>
      <div
        ref={revealer}
        className="fixed top-0 left-0 w-screen h-svh pointer-events-none z-20 bg-foreground origin-[center_top]"
      />
      <main>
        <h1 className="text-4xl font-bold text-center mt-20">
          Welcome to the About Page
        </h1>
      </main>
    </>
  );
}
