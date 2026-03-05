"use client";

import { useSidePanel } from "@/src/context/SidePanelContext";

interface OpenPanelButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function OpenPanelButton({
  className,
  children,
}: OpenPanelButtonProps) {
  const { open } = useSidePanel();

  return (
    <button onClick={open} className={`cursor-pointer ${className ?? ""}`}>
      {children}
    </button>
  );
}
