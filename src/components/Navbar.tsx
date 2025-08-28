import Link from "next/link";
import BoggoLogo from "./BoggoLogo";

export default function Navbar() {
  return (
    <div className="">
      <div>
        <div>
          <BoggoLogo />
        </div>
      </div>
      <Link href="/">Etusivu</Link>
    </div>
  );
}
