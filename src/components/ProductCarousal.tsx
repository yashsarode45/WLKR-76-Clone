import { useGSAP } from "@gsap/react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { useRef, useState } from "react";
import { ShoeDetails } from "../constants/ShoeDetails";
import gsap from "gsap";
import ProductCarousalControls from "./ProductCarousal/ProductCarousalControls";

const ProductCarousal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [currentShoe, setCurrentShoe] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const subImagesRef = useRef<HTMLImageElement[]>([]);
  const prevShoeRef = useRef(currentShoe);
  const debounceTimer = useRef<number | null>(null);
  const totalShoes = ShoeDetails.length;

  const [carousalScrollTop, setCarousalScrollTop] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "top center",
        scrub: true,
        markers: false,
      },
    });
    tl.from(".imageContainer", {
      clipPath: "inset(0% 100% 0% 0%)",
    });
    tl.from(
      ".subImageContainer",
      {
        y: 250,
      },
      0
    );

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom bottom",
        end: "bottom 90%",
        scrub: true,
        markers: false,
      },
    });
    tl2.to("#scroll-indicator", {
      opacity: 0,
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom 90%",
        scrub: false,
        markers: false,
        onEnter: () => {
          setCarousalScrollTop(window.scrollY);
        },
      },
    });
  });
  useGSAP(() => {
    const direction = scrollDirection === "down" ? "left" : "right";

    const startClip =
      direction === "left" ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)";

    const startClipSub =
      direction === "left" ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)";

    const endClip = "inset(0% 0% 0% 0%)";

    gsap.set(imagesRef.current[currentShoe], {
      clipPath: startClip,
      zIndex: 2,
    });

    gsap.set(subImagesRef.current[currentShoe], {
      clipPath: startClipSub,
      zIndex: 2,
    });

    // Animate current image
    gsap.to(imagesRef.current[currentShoe], {
      clipPath: endClip,
      duration: 0.4,
      ease: "power2.in",
    });

    // Animate the <img> inside imagesRef.current[currentShoe] using gsap.from
    const targetImage = imagesRef.current[currentShoe]?.querySelector("img");
    if (targetImage) {
      gsap.from(targetImage, {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.in",
      });
    }

    // Animate sub image
    gsap.to(subImagesRef.current[currentShoe], {
      clipPath: endClip,
      duration: 0.4,
      ease: "power2.in",
    });

    // Animate the <img> inside imagesRef.current[currentShoe] using gsap.from
    const targetSubImage =
      subImagesRef.current[currentShoe]?.querySelector("img");
    if (targetSubImage) {
      gsap.from(targetSubImage, {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.in",
      });
    }

    prevShoeRef.current = currentShoe;
  }, [currentShoe]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Clear any existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set a new timer to update the shoe after a delay
    debounceTimer.current = setTimeout(() => {
      const shoeIndex = Math.min(
        Math.floor(current * totalShoes),
        totalShoes - 1
      );
      setCurrentShoe(shoeIndex);
    }, 15); // delay in milliseconds

    const diff = current - (scrollYProgress?.getPrevious() as number);
    setScrollDirection(diff > 0 ? "down" : "up");
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const getZIndex = (index: number) => {
    if (index === currentShoe) {
      return 2;
    }
    if (index === prevShoeRef.current) {
      return 1;
    }
    return 0;
  };

  const scrollToShoe = (progressValue: number) => {
    if (!containerRef.current) return;

    const containerHeight = containerRef.current?.offsetHeight;
    const heightScrolledInContainer = containerHeight * progressValue;

    // Calculate the total scrollable height
    const targetScrollPosition = carousalScrollTop + heightScrolledInContainer;
    window.scrollTo({ top: targetScrollPosition });
  };

  return (
    <div
      ref={containerRef}
      className=" productCarousalContainer w-screen h-[300vh] "
    >
      <div className=" h-screen w-screen bg-white sticky top-0 flex">
        <div className=" imageContainer h-full w-[50vw]">
          {ShoeDetails.map((shoe, index) => (
            <>
              <div
                key={shoe.id}
                ref={(el) =>
                  (imagesRef.current[index] = el as HTMLImageElement)
                }
                className="absolute top-0 left-0 w-[50vw] h-full  overflow-hidden"
                style={{ zIndex: getZIndex(index) }}
              >
                <img
                  src={shoe.shoe}
                  alt={shoe.title}
                  className=" w-full h-full object-cover"
                />
              </div>
            </>
          ))}
        </div>
        <div className="subImageContainer absolute inset-0 m-auto aspect-[4/5.5] w-[30vw] z-[2]">
          {ShoeDetails.map((shoe, index) => (
            <div
              key={`${shoe.id}_subshoe`}
              ref={(el) =>
                (subImagesRef.current[index] = el as HTMLImageElement)
              }
              className="absolute inset-0 "
              style={{ zIndex: getZIndex(index) }}
            >
              <img
                src={shoe.subShoe}
                alt={shoe.subTitle}
                className=" w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <ProductCarousalControls
          setCurrentShoe={setCurrentShoe}
          currentShoe={currentShoe}
          scrollYProgress={scrollYProgress}
          scrollToShoe={scrollToShoe}
        />
        <motion.div
          id="scroll-indicator"
          style={{
            scaleX,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 5,
            originX: 0,
            backgroundColor: "#545841",
          }}
          className=" z-10"
        />
      </div>
    </div>
  );
};

export default ProductCarousal;
