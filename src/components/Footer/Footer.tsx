import React from "react";
// import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-full bg-main-secondary p-l md:p-10 rounded-t-4xl grid grid-rows-6 gap-4"
      aria-label="Site Footer"
      role="contentinfo"
    >
      <div className="md:col-span-6 text-white">
        <p
          className="text-title-mobile leading-[1.05em] font-geist whitespace-nowrap"
          role="heading"
          aria-level={2}
        >
          You made it! <br />
          We should&nbsp;
          <span className="inline-block underline font-geist-italic">
            talk?
          </span>
        </p>
      </div>

      {/* Terms & Final Section */}
      <div
        className="md:col-span-6 flex flex-col md:flex-row items-start justify-between text-xs text-white mt-8 gap-4"
        role="contentinfo"
        aria-label="Terms and Conditions"
      >
        <div>
          <a
            href="https://bou.co/privacy-policy"
            className="underline hover:text-main-accent transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy policy
          </a>
          <span className="mx-2">|</span>
          <a
            href="#edit-consent"
            className="underline hover:text-main-accent transition"
          >
            Edit consent
          </a>
        </div>
        <div className="whitespace-pre-line">
          © 2025 Bou
          <br />
          All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
