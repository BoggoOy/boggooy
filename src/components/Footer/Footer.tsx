import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-full bg-[#f9f9f9] p-l md:p-10 transition-all duration-300 rounded-t-4xl"
      aria-label="Site Footer"
      role="contentinfo"
    >
      <section className="">
        <div className="">
          {/* <BoggoLogoWithText
            showTrademark={false}
            width={120}
            height={40}
            role="img"
            aria-label="Boggo Logo with Text and Trademark"
          /> */}
          <p className="md:text-title text-title-mobile leading-[1.05em] font-geist whitespace-nowrap">
            You made it! <br />
            We should&nbsp;
            <Link href="/contact">
              <span className="underline font-geist-italic">talk?</span>
            </Link>
          </p>
        </div>
      </section>
    </footer>
  );
}
