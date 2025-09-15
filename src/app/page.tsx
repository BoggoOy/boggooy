"use client";
import { useRevealer } from "@/hooks/useRevealer";
export default function Home() {
  const { revealer } = useRevealer();
  return (
    <>
      <div
        ref={revealer}
        className="fixed top-0 left-0 w-screen h-svh pointer-events-none z-20 bg-foreground origin-[center_top]"
      />
      <main>
        <section className="flex flex-col items-center justify-center min-h-dvh text-center px-5">
          <h2 className="uppercase font-mono absolute">
            [digital solutions coming soon]
          </h2>
        </section>
      </main>
    </>
  );
}
