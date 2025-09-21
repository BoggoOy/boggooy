import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ChevronDown, ChevronUp } from "lucide-react";

export function ServiceDropDown({
  title,
  description,
  isOpen,
  onToggle,
}: {
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const descRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (descRef.current) {
      if (isOpen) {
        gsap.fromTo(
          descRef.current,
          { height: 0, opacity: 0 },
          {
            height: descRef.current.scrollHeight,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          }
        );
      } else {
        gsap.to(descRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isOpen]);

  // // GSAP hover tausta
  // const handleMouseEnter = () => {
  //   if (sectionRef.current) {
  //     gsap.to(sectionRef.current, {
  //       backgroundColor: "#fff",
  //       duration: 0.3,
  //       ease: "power2.out",
  //     });
  //   }
  // };

  // const handleMouseLeave = () => {
  //   if (sectionRef.current) {
  //     gsap.to(sectionRef.current, {
  //       backgroundColor: "transparent",
  //       duration: 0.3,
  //       ease: "power2.in",
  //     });
  //   }
  // };

  return (
    <section
      ref={sectionRef}
      className="border-t cursor-pointer py-5"
      aria-label={title}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`service-title-${title}`}
    >
      <div className="flex justify-between items-center text-white">
        <h3 className="font-geist text-2xl">{title}</h3>
        <span className="text-2xl">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>

      <p
        ref={descRef}
        id={`desc-${title}`}
        style={{
          height: 0,
          overflow: "hidden",
          opacity: 0,
        }}
        className="text-neutral-50 text-[clamp(0.6rem,5vw,1.2rem)] mt-2 hyphens-auto"
        aria-hidden={!isOpen}
      >
        {description}
      </p>
    </section>
  );
}
