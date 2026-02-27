import type { Metadata } from "next";
import Section from "@/src/components/ui/Section";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Culture",
  description:
    "Boggo — our values, principles, and the way we work. Human-centered technology from Finland.",
};

const values = [
  {
    title: "Human-first",
    description:
      "Every solution starts with people. We understand user needs, our clients' business, and the well-being of our team. Technology is the tool — people are the purpose.",
  },
  {
    title: "Transparency",
    description:
      "We communicate openly — with our clients, within the team, and in decision-making. No hidden agendas, no surprises. Honesty builds trust.",
  },
  {
    title: "Quality over quantity",
    description:
      "We don't compromise on quality. Every line of code, every design decision, and every consultation is made with ambition and precision.",
  },
  {
    title: "Continuous learning",
    description:
      "Technology evolves constantly, and so do we. We invest in learning, experimentation, and exploration as part of our everyday work.",
  },
  {
    title: "Ikigai thinking",
    description:
      "We believe the best work happens when passion, skill, need, and value align. We seek that sweet spot for every project and every team member.",
  },
  {
    title: "Finnish DNA",
    description:
      "We do what we promise. Sisu, honesty, and practicality are in our roots. We don't oversell — we build what's needed.",
  },
];

const principles = [
  {
    number: "01",
    title: "Understand before you build",
    description:
      "We take the time to understand the real problem before writing a single line of code.",
  },
  {
    number: "02",
    title: "The power of simplicity",
    description:
      "The best solution is often the simplest. We avoid unnecessary complexity in everything we do.",
  },
  {
    number: "03",
    title: "Iterate and improve",
    description:
      "We don't aim for perfection on the first try. We build, measure, learn, and improve.",
  },
  {
    number: "04",
    title: "Own it",
    description:
      "Every team member owns their work from start to finish. Responsibility isn't a burden — it's a sign of trust.",
  },
  {
    number: "05",
    title: "Make it visible",
    description:
      "We document our decisions, share what we learn, and make our work transparent to all stakeholders.",
  },
];

export default function CulturePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center justify-center pt-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="fluid-h1 font-bold tracking-tighter text-neutral-900 mb-6">
            Culture
          </h1>
          <p className="fluid-body-lg max-w-2xl mx-auto text-neutral-500">
            Boggo is not just a company — it&apos;s a way of working. We believe
            the best technology emerges when culture, values, and people are
            aligned.
          </p>
        </div>
      </section>

      {/* Our story */}
      <Section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <p className="fluid-xs uppercase tracking-widest text-neutral-400 mb-8">
            Our story
          </p>
          <div className="space-y-6">
            <p className="fluid-body text-neutral-600">
              Boggo was born from a simple observation: SMEs deserve the same
              level of technology expertise as large enterprises — without the
              bureaucracy and oversized teams.
            </p>
            <p className="fluid-body text-neutral-600">
              We&apos;re a group of engineers, designers, and consultants who
              love what they do. We believe the most successful technology is
              built with understanding, not assumptions.
            </p>
            <p className="fluid-body text-neutral-600">
              Based in Oulu, we work with clients across Finland — and
              internationally when the opportunity calls.
            </p>
          </div>
        </div>
      </Section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <hr className="border-neutral-100" />
      </div>

      {/* Values */}
      <Section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <p className="fluid-xs uppercase tracking-widest text-neutral-400 mb-16">
            Our values
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="fluid-h3 font-semibold tracking-tight text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="fluid-sm text-neutral-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <hr className="border-neutral-100" />
      </div>

      {/* Principles */}
      <Section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <p className="fluid-xs uppercase tracking-widest text-neutral-400 mb-16">
            How we work
          </p>
          <div className="space-y-12">
            {principles.map((principle) => (
              <div
                key={principle.number}
                className="flex gap-6 items-start border-t border-neutral-100 pt-8"
              >
                <span className="fluid-h2 font-bold text-neutral-200 tracking-tighter shrink-0">
                  {principle.number}
                </span>
                <div>
                  <h3 className="fluid-h3 font-semibold tracking-tight text-neutral-900 mb-2">
                    {principle.title}
                  </h3>
                  <p className="fluid-sm text-neutral-500">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-24 md:py-40">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="fluid-h2 font-bold tracking-tighter text-neutral-900 mb-6">
            Want to be part of this?
          </h2>
          <p className="fluid-body max-w-xl mx-auto mb-10 text-neutral-500">
            We&apos;re always looking for new people who share our values and
            want to build something meaningful.
          </p>
          <Link
            href="/careers"
            className="inline-block bg-neutral-900 text-white fluid-xs uppercase tracking-widest px-8 py-4 hover:bg-neutral-700 transition-colors"
          >
            Open positions
          </Link>
        </div>
      </Section>
    </div>
  );
}
