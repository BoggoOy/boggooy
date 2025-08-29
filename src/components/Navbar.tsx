import Link from "next/link";
import BoggoLogo from "./BoggoLogo";

export default function Navbar() {
  return (
    <header className="">
      <Link href="/" className="" aria-label="Logo and back to home button">
        <BoggoLogo />
      </Link>

      <div className="flex flex-col">
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
    </header>
  );
}
