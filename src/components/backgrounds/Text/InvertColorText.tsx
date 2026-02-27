import { InvertColorTextProps } from "@/src/types/Text/InvertColorTextType";

export default function InvertColorText({
  children,
  className = "",
  as: Component = "span",
}: InvertColorTextProps) {
  return (
    <Component
      className={className}
      style={{
        color: "white",
        mixBlendMode: "difference",
        isolation: "isolate",
      }}
    >
      {children}
    </Component>
  );
}
