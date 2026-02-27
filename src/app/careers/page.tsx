import type { Metadata } from "next";
import Section from "@/src/components/ui/Section";
import { getPositions, getBenefits } from "@/src/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Boggo — join our team. Open positions and opportunities at a Finnish IT consulting startup.",
};

type Position = {
  _id: string;
  title: string | null;
  type: string | null;
  location: string | null;
  description: string | null;
  requirements: string[] | null;
  applyEmail: string | null;
};

type Benefit = {
  _id: string;
  title: string | null;
  description: string | null;
};

export default async function CareersPage() {
  const [positions, benefits]: [Position[], Benefit[]] = await Promise.all([
    getPositions(),
    getBenefits(),
  ]);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center justify-center pt-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="fluid-h1 font-bold tracking-tighter text-neutral-900 mb-6">
            Careers
          </h1>
          <p className="fluid-body-lg max-w-2xl mx-auto text-neutral-500">
            We&apos;re building a team that cares about the work they do. If you
            want to do meaningful work with good people — this could be your
            place.
          </p>
        </div>
      </section>

      {/* Why Boggo */}
      <Section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <p className="fluid-xs uppercase tracking-widest text-neutral-400 mb-16">
            Why Boggo
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {benefits.map((benefit) => (
              <div key={benefit._id}>
                <h3 className="fluid-h3 font-semibold tracking-tight text-neutral-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="fluid-sm text-neutral-500">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <hr className="border-neutral-100" />
      </div>

      {/* Open positions */}
      <Section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <p className="fluid-xs uppercase tracking-widest text-neutral-400 mb-16">
            Open positions
          </p>

          <div className="space-y-0">
            {positions.map((position) => {
              const email = position.applyEmail || "hello@boggo.fi";
              return (
                <div
                  key={position._id}
                  className="border-t border-neutral-100 py-10 group"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="fluid-h3 font-semibold tracking-tight text-neutral-900">
                        {position.title}
                      </h3>
                      <div className="flex gap-4 mt-2">
                        <span className="fluid-xs uppercase tracking-widest text-neutral-400">
                          {position.type}
                        </span>
                        {position.location && (
                          <span className="fluid-xs uppercase tracking-widest text-neutral-400">
                            {position.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="fluid-sm text-neutral-500 mb-6 max-w-2xl">
                    {position.description}
                  </p>
                  {position.requirements &&
                    position.requirements.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {position.requirements.map((req) => (
                          <li key={req} className="flex items-start gap-3">
                            <span className="fluid-xs mt-1 text-neutral-300">
                              —
                            </span>
                            <span className="fluid-sm text-neutral-500">
                              {req}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  <a
                    href={`mailto:${email}?subject=Application: ${position.title}`}
                    className="inline-block fluid-xs uppercase tracking-widest border border-neutral-200 text-neutral-600 px-5 py-2.5 hover:border-neutral-400 hover:text-neutral-900 transition-colors"
                  >
                    Apply now
                  </a>
                </div>
              );
            })}
          </div>

          {/* Open application */}
          <div className="border-t border-neutral-100 py-10 mt-4">
            <h3 className="fluid-h3 font-semibold tracking-tight text-neutral-900 mb-4">
              Don&apos;t see your role?
            </h3>
            <p className="fluid-sm text-neutral-500 mb-6 max-w-xl">
              Send an open application — we&apos;re always looking for talented
              people. Tell us who you are, what you do, and why Boggo interests
              you.
            </p>
            <a
              href="mailto:hello@boggo.fi?subject=Open Application"
              className="inline-block bg-neutral-900 text-white fluid-xs uppercase tracking-widest px-6 py-3 hover:bg-neutral-700 transition-colors"
            >
              Send open application
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
