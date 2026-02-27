export function GET() {
  const content = `# Boggo

> Design-driven software development, UX design, and IT consulting studio based in Oulu, Finland.

## About

Boggo is a Finnish design and technology studio that builds digital experiences for growing businesses. We combine human-centered design with modern software engineering to help companies solve real problems. Our approach is "design before tech" — we start with people, not platforms.

Founded in Oulu, Finland, we work with clients across Finland and internationally. We specialize in serving small and medium-sized enterprises (SMEs) who deserve enterprise-level expertise without the overhead.

## Services

- **Design**: UX/UI design, user research, design systems, and digital experience design. We put people at the center of every interface.
- **Development**: Custom software development, modern web applications, scalable systems, and clean architecture — from concept to production.
- **Consulting**: Strategic IT consulting, technology audits, architecture planning, and digital transformation guidance for businesses ready to grow.

## Core Values

- **Human-first**: Every solution starts with people. Technology is the tool — people are the purpose.
- **Quality over quantity**: Every line of code and every design decision is made with precision.
- **Ikigai thinking**: The best work happens when passion, skill, need, and value align.
- **Finnish DNA**: Sisu, honesty, and practicality. We don't oversell — we build what's needed.
- **Transparency**: Open communication, no hidden agendas.
- **Continuous learning**: We invest in learning and experimentation as part of everyday work.

## Work Principles

1. Understand before you build
2. The power of simplicity
3. Iterate and improve
4. Own it
5. Make it visible

## Links

- [Homepage](https://boggo.fi): Main landing page with service overview
- [Culture](https://boggo.fi/culture): Our values, principles, and story
- [Works](https://boggo.fi/works): Selected projects and case studies
- [Careers](https://boggo.fi/careers): Open positions and why to join Boggo

## Contact

- Email: hello@boggo.fi
- Location: Oulu, Finland
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
