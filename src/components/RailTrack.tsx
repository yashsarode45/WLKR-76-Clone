import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

type RailTrackProps = { imgs: string[]; text: string; index: number };

const RailTrack = ({ imgs, index, text }: RailTrackProps) => {
  const isTrackEven = index % 2 === 0;
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<any>(null);
  useGSAP(() => {
    if (!containerRef.current || !textRef.current) return;
    // Split text into characters
    splitRef.current = new SplitType(textRef.current, {
      types: "chars",
      tagName: "span",
    });

    const chars = splitRef.current.chars;
    const isLTR = isTrackEven;

    // Set CSS variables for initial state
    containerRef.current.style.setProperty("--title-tagline-xtra", "468");
    containerRef.current.style.setProperty("--title-tagline-width", "25");

    // Initial state
    gsap.set(chars, {
      fontWeight: 50,
      fontVariationSettings: `"wdth" 40, "XTRA" 450`,
      scaleX: 0.8,
      willChange: "font-variation-settings, scale-x,font-weight",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#railTrack-${index}`,
        start: "top 90%",
        end: "bottom 20%",
        scrub: 1,
        markers: false, // Set to true for debugging
      },
    });

    tl.to(chars, {
      fontWeight: 600,
      fontVariationSettings: `"wdth" 25, "XTRA" 468`,
      scaleX: 1,
      stagger: {
        each: 0.05,
        from: isLTR ? "start" : "end",
      },
      //   ease: "sine.in",
    });
    tl.to(
      `#railTrack-${index}`,
      {
        x: isLTR ? -25 : 25,
      },
      0
    );
  }, [text, index]);
  return (
    <div
      key={index}
      id={`railTrack-${index}`}
      className={`w-max  h-[203px] transition-all flex gap-11 whitespace-nowrap relative ${
        index === 2 ? "left-[15vw]" : ""
      }`}
    >
      {imgs.map((img, i) => {
        if (isTrackEven && i == 1) {
          return (
            <div
              key={i}
              ref={containerRef}
              style={{
                fontVariationSettings: `
                "wdth" var(--title-tagline-width),
                "XTRA" var(--title-tagline-xtra)
              `,
                fontWeight: 50,
              }}
              className="  leading-[213px] text-[287px] text-black flex gap-11 h-full"
            >
              <img src={img} className="h-full w-[25vw] object-cover" />
              <span ref={textRef} className="railText">
                {text}
              </span>
            </div>
          );
        } else if (!isTrackEven && i == 0) {
          return (
            <div
              key={i}
              ref={containerRef}
              style={{
                fontVariationSettings: `
                  "slnt" 0,
                  "wdth" var(--title-tagline-width),
                  "GRAD" 0,
                  "XOPQ" 96,
                  "XTRA" var(--title-tagline-xtra),
                  "YOPQ" 79,
                  "YTAS" 750,
                  "YTDE" -203,
                  "YTFI" 738,
                  "YTLC" 514,
                  "YTUC" 712
                `,
                fontWeight: 50,
              }}
              className="  leading-[213px] text-[287px] text-black flex gap-11 h-full"
            >
              <img src={img} className="h-full w-[25vw] object-cover" />
              <span ref={textRef} className="railText">
                {text}
              </span>
            </div>
          );
        }
        return <img src={img} className="h-full w-[25vw] object-cover" />;
      })}
    </div>
  );
};

export default RailTrack;
