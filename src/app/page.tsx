import GrainyNoiseBackground from "../components/backgrounds/GrainyNoiseBackground";
import InvertColorText from "../components/backgrounds/Text/InvertColorText";
import { VerticalTextCarousel } from "../components/backgrounds/Text/VerticalTextCarousel";
import Section from "../components/ui/Section";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero — with GrainyNoiseBackground */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <GrainyNoiseBackground />
        <div className="relative z-10 container mx-auto px-6 mix-blend-difference text-white">
          <div className="flex flex-col items-center justify-center gap-6">
            <VerticalTextCarousel />
          </div>
        </div>
      </section>

      {/* Services — clean minimal white */}
      <Section className="py-28 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="fluid-xs uppercase tracking-widest text-neutral-400 mb-12">
            What we do
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                title: "Design",
                description:
                  "Experience design and interfaces that feel intuitive. We start with people — research, empathy, and craft shape every decision.",
              },
              {
                title: "Development",
                description:
                  "Custom software built to last. Modern web applications, scalable systems, and clean architecture — from concept to production.",
              },
              {
                title: "Consulting",
                description:
                  "Strategic technology guidance for businesses ready to grow. We turn complexity into clarity and plans into progress.",
              },
            ].map((service) => (
              <div key={service.title}>
                <h3 className="fluid-h3 font-semibold tracking-tight text-neutral-900 mb-3">
                  {service.title}
                </h3>
                <p className="fluid-sm text-neutral-500">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA — clean minimal */}
      <Section className="py-28 md:py-44 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="fluid-h2 font-bold tracking-tighter text-neutral-900 mb-6">
            Let&apos;s create something meaningful
          </h2>
          <p className="fluid-body-lg max-w-2xl mx-auto mb-10 text-neutral-500">
            Whether you need a new digital product, a design system, or expert
            IT consulting — we help Finnish businesses move forward with
            confidence.
          </p>
          <Link
            href="mailto:hello@boggo.fi"
            className="inline-block bg-neutral-900 text-white fluid-xs uppercase tracking-widest px-8 py-4 hover:bg-neutral-700 transition-colors"
          >
            Start a conversation
          </Link>
        </div>
      </Section>
    </div>
  );
}
