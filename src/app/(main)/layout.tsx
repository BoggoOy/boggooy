import Footer from "@/components/Footer/Footer";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {/* <Footer /> */}
    </>
  );
}
