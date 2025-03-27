import { useRef } from "react";
import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
type WordAnimationProps = {
  text: string;
  direction?: "ltr" | "rtl";
  className?: string;
  triggerHeight: string;
  fontWeight?: number;
  index: number;
};

const WordAnimationImageCTA = ({
  className = "",
  direction = "ltr",
  text,
  triggerHeight,
  fontWeight = 700,
  index,
}: WordAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<any>(null);
  const disableOutAnimation = [3, 4, 5].includes(index);
  useGSAP(() => {
    if (!containerRef.current) return;
    // Split text into characters
    splitRef.current = new SplitType(containerRef.current, {
      types: "chars",
      tagName: "span",
    });

    const chars = splitRef.current.chars;
    const isLTR = direction === "ltr";

    // Initial state
    gsap.set(chars, {
      fontWeight: 50,
      fontVariationSettings: `"wdth" 60, "XTRA" 440`,
      opacity: 0,
      willChange: "font-variation-settings, opacity, font-weight",
    });

    // Calculate scroll positions based on triggerHeight percentage
    const scroller = document.getElementById("imagesCTAContainer");
    if (!scroller) return;

    const triggerPosition =
      (parseFloat(triggerHeight) / 100) * window.innerHeight;
    gsap.fromTo(
      ` #ctaScrollTextContainer-${index}`,
      {
        x: isLTR ? -250 : 250,
      },
      {
        scrollTrigger: {
          trigger: "#imagesCTAContainer",
          start: `top+=${triggerPosition} bottom`,
          end: "+=150",
          scrub: 1,
          markers: false, // Set to true for debugging
        },
        x: 0,
      }
    );

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#imagesCTAContainer",
        start: `top+=${triggerPosition} bottom`,
        end: "+=1100",
        scrub: 1,
        id: `${index}`,
        markers: false, // Set to true for debugging
      },
    });

    tl.to(chars, {
      fontWeight: fontWeight,
      fontVariationSettings: `"wdth" 25, "XTRA" 468`,
      opacity: 1,
      stagger: {
        each: 0.1,
        from: isLTR ? "start" : "end",
      },
      duration: 1.5,
      ease: "sine.in",
    });

    if (!disableOutAnimation) {
      tl.to(chars, {
        fontWeight: 50,
        opacity: 0,
        fontVariationSettings: `"wdth" 60, "XTRA" 440`,
        stagger: {
          each: 0.1,
          from: isLTR ? "start" : "end",
        },
        delay: 3,
        duration: 1.1,
        ease: "sine.in",
      });
    }
  }, [text, direction]);
  return (
    <div ref={containerRef} className={className}>
      {text}
    </div>
  );
};

export default WordAnimationImageCTA;
