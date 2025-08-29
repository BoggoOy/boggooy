import Link from "next/link";
import BoggoLogo from "./BoggoLogo";

export default function Navbar() {
  return (
    <header className="flex items-center fixed top-0 left-0 w-screen p-4 z-10 gap-[1em]">
      <Link
        href="/"
        className="flex-1"
        aria-label="Logo and back to home button"
      >
        <BoggoLogo height={30} width={100} />
      </Link>

      <div className="flex-2 flex-col justify-between">
        <nav className="">
          <Link
            href="/about"
            className=""
            aria-label="About page"
            aria-description="Learn more about us"
          >
            About
          </Link>
          <Link
            href="/studio"
            className=""
            aria-label="Studio page"
            aria-description="Learn more about our studio"
          >
            Studio
          </Link>
          <Link
            href="/lab"
            className=""
            aria-label="Lab page"
            aria-description="Learn more about our lab"
          >
            Lab
          </Link>
          <Link
            href="/work"
            className=""
            aria-label="Work page"
            aria-description="Learn more about our work"
          >
            Work
          </Link>
        </nav>
      </div>

      <p>Oulu, FI</p>
    </header>
  );
}
