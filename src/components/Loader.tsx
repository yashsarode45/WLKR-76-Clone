import { useRef } from "react";
import Cloud from "/assets/images/clouds.webp";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { gsap } from "gsap";

const Loader = ({
  setLoader,
}: {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const splitRef = useRef<any>(null);

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

    // After 1.5 sec, stop the repeating animation and run the exit animations
    gsap.delayedCall(2, () => {
      // Stop the repeating timeline
      tl.kill();

      // Create an exit timeline
      const exitTl = gsap.timeline({
        onComplete: () => {
          setLoader(false);
        },
      });
      exitTl
        .to(chars, {
          duration: 0.4,
          scaleY: 0,
          ease: "power1.inOut",
          stagger: {
            each: 0.04,
            from: "start",
          },
        })
        .to(
          ".cloudBG",
          { duration: 0.6, opacity: 0, ease: "power1.inOut" },
          "-=0.1"
        )
        .to(
          ".cloudImg",
          { duration: 0.6, opacity: 0, ease: "power1.inOut" },
          "<"
        )
        .from(
          ".heroImage",
          {
            scale: 1.1,
            duration: 0.6,
          },
          "<"
        );
    });
  });
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
