"use client";
import Link from "next/link";
import BoggoLogo from "./BoggoLogo";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";

export default function Navbar() {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const items = [
    { href: "/about", name: "About", description: "Learn more about us" },
    {
      href: "/studio",
      name: "Studio",
      description: "Learn more about our studio",
    },
    { href: "/lab", name: "Lab", description: "Learn more about our lab" },
    { href: "/work", name: "Work", description: "Learn more about our work" },
  ];

  function triggerPageTransition() {
    document.documentElement.animate(
      [
        {
          clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.9, 0, 0.1, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const handleNavigation =
    (path: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (path === pathname) {
        e.preventDefault();
        return;
      }

      router.push(path, {
        onTransitionReady: triggerPageTransition,
      });
    };

  return (
    <header className="flex fixed top-0 left-0 w-screen z-50 gap-[1em] items-start p-5">
      <div className="flex w-full mx-auto items-center gap-6">
        <div className="flex-1 w-fit">
          <Link
            href="/"
            aria-label="Move back to home"
            rel="home"
            className="inline-flex items-center"
            onClick={handleNavigation("/")}
          >
            <BoggoLogo height={20} width={80} />
            <span className="sr-only">Boggo Oy</span>
          </Link>
        </div>

        <nav className="flex-2" aria-label="Main Navigation">
          <ul className="flex items-center gap-6">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="underline uppercase mix-blend-color"
                  aria-label={`${item.name} page`}
                  aria-description={item.description}
                  onClick={handleNavigation(item.href)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic text-sm" aria-label="Location">
          Oulu, Finland
        </address>
      </div>
    </header>
  );
}
