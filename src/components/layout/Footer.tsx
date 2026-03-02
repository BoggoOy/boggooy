import Link from "next/link";
import BoggoLogo from "@/src/components/ui/BoggoLogo";
import { getSocialLinks } from "@/src/sanity/lib/queries";

const pageLinks = [
  { label: "Culture", href: "/culture" },
  { label: "Works", href: "/works" },
  { label: "Careers", href: "/careers" },
];

export default async function Footer() {
  const socialLinks = await getSocialLinks();

  const contactLinks = [
    { label: "hello@boggo.fi", href: "mailto:hello@boggo.fi" },
    ...(socialLinks?.linkedin
      ? [{ label: "LinkedIn", href: socialLinks.linkedin }]
      : []),
  ];

  const footerGroups = [
    { title: "Pages", links: pageLinks },
    { title: "Contact", links: contactLinks },
  ];

  return (
    <footer className="relative z-10 bg-white border-t border-neutral-100">
      <div className="w-full px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-neutral-900 hover:opacity-70 transition-opacity inline-block"
            >
              <BoggoLogo className="h-10 w-auto" />
            </Link>
            <p className="mt-4 fluid-sm max-w-xs text-neutral-500">
              A full-service development partner. We help small and medium-sized
              businesses navigate the digital world by building modern,
              human-centered software solutions. Design before tech &mdash;
              usability and people always come first.
            </p>
          </div>

          {/* Links */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="fluid-xs uppercase tracking-widest mb-4 font-semibold text-neutral-400">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="fluid-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="fluid-xs text-neutral-400">
            &copy; {new Date().getFullYear()} Boggo. All rights reserved.
          </p>
          <p className="fluid-xs text-neutral-400">Oulu, Finland</p>
        </div>
      </div>
    </footer>
  );
}
