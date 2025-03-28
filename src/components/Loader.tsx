import { useRef } from "react";
import Cloud from "/assets/images/clouds.webp";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { gsap } from "gsap";
type LoaderProps = {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>; // Function to remove loader from DOM
  startExitAnimation: boolean; // Signal to start the exit animation
};
const Loader = ({ setLoader, startExitAnimation }: LoaderProps) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const splitRef = useRef<any>(null);

  const tlRepeat = useRef<gsap.core.Timeline | null>(null); // Ref to hold the repeating timeline
  const exitTl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!textRef.current) return;
    splitRef.current = new SplitType(textRef?.current, {
      types: "chars",
      tagName: "span",
    });
    const chars = splitRef.current.chars;

    // Set the initial styles for each character
    gsap.set(chars, {
      fontWeight: 1000,
      "--title-launcher-xtra": 468,
      "--title-launcher-width": 25,
      transformOrigin: "95% 80%",
    });

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.1,
      yoyo: true,
      defaults: {
        duration: 0.5,
        ease: "power1.inOut",
      },
    });
    tl.to(chars, {
      fontWeight: 100,
      "--title-launcher-xtra": 600,
      "--title-launcher-width": 120,
      scaleY: 0.4,
      stagger: {
        each: 0.05,
        from: "start",
      },
    });

    // Reverse animation: animate back to the original state
    tl.to(
      chars,
      {
        fontWeight: 1000,
        "--title-launcher-xtra": 468,
        "--title-launcher-width": 25,
        scaleY: 1,
        stagger: {
          each: 0.05,
          from: "start",
        },
      },
      "-=0.1"
    );

    tlRepeat.current = tl; // Store the repeating timeline in the ref
  });

  // Effect to handle starting the exit animation
  useGSAP(() => {
    // Only run if the exit signal is true AND the repeating timeline exists
    if (startExitAnimation && tlRepeat.current) {
      console.log("Loader: Received exit signal.");

      // Stop the repeating timeline
      tlRepeat.current.kill(); // Use kill() to stop and remove tweens

      // Make sure chars exist before animating exit
      const chars = splitRef.current?.chars;
      if (!chars || chars.length === 0) {
        console.warn("Loader: Cannot start exit animation, chars not found.");
        setLoader(false); // Hide loader immediately if something is wrong
        return;
      }

      // Create and run the exit timeline
      exitTl.current = gsap.timeline({
        onComplete: () => {
          setLoader(false); // Remove loader component from DOM *after* animation finishes
        },
      });

      exitTl.current
        .to(chars, {
          duration: 0.4,
          scaleY: 0,
          opacity: 0,
          ease: "power1.inOut",
          stagger: {
            each: 0.04,
            from: "start",
          },
        })
        .to(
          ".cloudBG",
          { duration: 0.6, opacity: 0, ease: "power1.inOut" },
          "-=0.3"
        )
        .to(
          ".cloudImg",
          { duration: 0.6, opacity: 0, ease: "power1.inOut" },
          "<"
        )
        .from(".heroImage", { scale: 1.1, duration: 0.6 }, "<");
    }
  }, [startExitAnimation, setLoader]);

  return (
    <div className=" fixed inset-0 z-[100] flex items-center justify-center">
      <div className="cloudBG absolute inset-0 bg-[#dddddd]"></div>
      <img src={Cloud} className="cloudImg absolute h-full w-full" />
      <h1
        style={{
          fontVariationSettings:
            '"slnt" 0, "wdth" var(--title-launcher-width), "GRAD" 0, "XOPQ" 96, "XTRA" var(--title-launcher-xtra), "YOPQ" 79, "YTAS" 750, "YTDE" -203, "YTFI" 738, "YTLC" 514, "YTUC" 712',
        }}
        className=" text-black z-10 text-6xl "
        ref={textRef}
      >
        LOADING
      </h1>
    </div>
  );
};

export default Loader;
