import type { Metadata } from "next";
import Section from "@/src/components/ui/Section";
import Link from "next/link";
import { getProjects } from "@/src/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Boggo — our projects and references. See what we've built for our clients.",
};

type Project = {
  _id: string;
  title: string | null;
  client: string | null;
  category: string | null;
  year: string | null;
  description: string | null;
  tags: string[] | null;
};

const categories = ["All", "Development", "Design", "Consulting"];

export default async function WorksPage() {
  const projects: Project[] = await getProjects();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center justify-center pt-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="fluid-h1 font-bold tracking-tighter text-neutral-900 mb-6">
            Works
          </h1>
          <p className="fluid-body-lg max-w-2xl mx-auto text-neutral-500">
            Selected projects where we&apos;ve helped companies grow, optimize
            operations, and create better digital experiences.
          </p>
        </div>
      </section>

      {/* Category filters */}
      <Section className="pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat, i) => (
              <span
                key={cat}
                className={`fluid-xs uppercase tracking-widest px-4 py-2 border transition-colors cursor-pointer ${
                  i === 0
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "border-neutral-200 text-neutral-500 hover:border-neutral-400"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Project list */}
      <Section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-0">
            {projects.map((project) => (
              <div
                key={project._id}
                className="border-t border-neutral-100 py-10 md:py-14 group cursor-pointer hover:bg-neutral-50 transition-colors px-4 -mx-4 rounded"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="fluid-xs uppercase tracking-widest text-neutral-400">
                        {project.category}
                      </span>
                      <span className="fluid-xs text-neutral-300">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="fluid-h3 font-semibold tracking-tight text-neutral-900 mb-3">
                      {project.title}
                    </h3>
                    <p className="fluid-sm text-neutral-500 max-w-xl">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end shrink-0">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="fluid-xs uppercase tracking-widest border border-neutral-200 text-neutral-400 px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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
            Interested in working together?
          </h2>
          <p className="fluid-body max-w-xl mx-auto mb-10 text-neutral-500">
            Tell us what you&apos;re building — let&apos;s explore how we can
            help.
          </p>
          <Link
            href="/careers"
            className="inline-block bg-neutral-900 text-white fluid-xs uppercase tracking-widest px-8 py-4 hover:bg-neutral-700 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </Section>
    </div>
  );
}
