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
};

const WordAnimation = ({
  className = "",
  direction = "ltr",
  text,
  triggerHeight,
  fontWeight = 700,
}: WordAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<any>(null);

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
      opacity: 0,
      willChange: "opacity, font-weight",
    });

    // Calculate scroll positions based on triggerHeight percentage
    const scroller = document.getElementById("videoScroller");
    if (!scroller) return;

    const totalScrollHeight = scroller.offsetHeight;
    const triggerPosition =
      (parseFloat(triggerHeight) / 100) * totalScrollHeight;

    gsap.fromTo(
      "#scrollTextContainer",
      {
        y: 50,
      },
      {
        scrollTrigger: {
          trigger: "#videoScroller",
          start: triggerPosition,
          end: "+=450",
          scrub: 1,
          markers: false, // Set to true for debugging
        },
        y: -50,
      }
    );
    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#videoScroller",
        start: triggerPosition,
        end: "+=450",
        scrub: 1,
        markers: false, // Set to true for debugging
      },
    });

    tl.to(chars, {
      fontWeight: fontWeight,
      opacity: 1,
      stagger: {
        each: 0.05,
        from: isLTR ? "start" : "end",
      },
      ease: "sine.in",
    });

    tl.to(
      chars,
      {
        fontWeight: 50,
        opacity: 0,
        stagger: {
          each: 0.05,
          from: isLTR ? "start" : "end",
        },
        ease: "sine.in",
      }
      // Adds a gap in the scroll-triggered progress, not an actual time delay. Need to scroll more
    );
  }, [text, direction]);
  return (
    <div ref={containerRef} className={className}>
      {text}
    </div>
  );
};

export default WordAnimation;
