import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  Transition,
  useAnimate,
  useSpring,
} from "motion/react";
import type { SpringOptions, PanInfo } from "motion/react";
import { useGSAP } from "@gsap/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import gsap from "gsap";

const imgs = [
  "/assets/carousel/carousal1.webp",
  "/assets/carousel/carousal2.webp",
  "/assets/carousel/carousal3.webp",
  "/assets/carousel/carousal4.webp",
  "/assets/carousel/carousal5.webp",
  "/assets/carousel/carousal6.webp",
  "/assets/carousel/carousal7.webp",
  "/assets/carousel/carousal8.webp",
  "/assets/carousel/carousal9.webp",
  "/assets/carousel/carousal10.webp",
];
// Constants
const GAP = 16; // gap between images in pixels
const TOTAL_DOTS = 5; // number of dots (pages)
const VELOCITY_THRESHOLD = 50; // threshold for flick velocity

const ScrollCarousal3 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgsContainerRef = useRef<HTMLDivElement[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const x = useMotionValue(0);
  const [scope, animate] = useAnimate();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [cursorVisible, setCursorVisible] = useState(false);

  const SPRING_OPTIONS: SpringOptions = {
    stiffness: 300,
    damping: 20,
  };
  const cursorSpringX = useSpring(cursorX, SPRING_OPTIONS);
  const cursorSpringY = useSpring(cursorY, SPRING_OPTIONS);

  // Measure container width on mount and on resize
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Calculate dimensions and snap positions only when containerWidth is available
  const imageWidth = 0.35 * window.innerWidth;

  // Total width: sum of all image widths plus gaps between them
  const totalInnerWidth =
    imgs.length * imageWidth + (imgs.length + 1) * GAP + imageWidth;

  // Maximum drag (a negative value; 0 is the starting position)
  const maxDrag = containerWidth - totalInnerWidth;

  // Create an array of snap positions (one per dot)
  const snapPositions = Array.from(
    { length: TOTAL_DOTS },
    (_, i) => maxDrag * (i / (TOTAL_DOTS - 1))
  );

  const SPRING_TRANSITION_OPTIONS: Transition = {
    type: "spring",
    stiffness: 250,
    damping: 20,
  };

  const TRANSITION_OPTIONS: Transition = {
    ease: [0.5, 1, 0.89, 1],
    duration: 1,
  };

  // Handle drag end: decide snap based on offset and flick velocity
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const currentX = x.get();
    let newPage = currentPage;

    // Use flick velocity to determine page change
    if (
      info.velocity.x < -VELOCITY_THRESHOLD &&
      currentPage < snapPositions.length - 1
    ) {
      newPage = currentPage + 1;
    } else if (info.velocity.x > VELOCITY_THRESHOLD && currentPage > 0) {
      newPage = currentPage - 1;
    } else {
      // Otherwise, choose the snap position closest to current x
      const closest = snapPositions.reduce((prev, curr) =>
        Math.abs(curr - currentX) < Math.abs(prev - currentX) ? curr : prev
      );
      newPage = snapPositions.indexOf(closest);
    }

    setCurrentPage(newPage);

    if (currentX > 0 && newPage === 0) {
      animate(
        scope.current,
        { x: snapPositions[newPage] },
        { ...SPRING_TRANSITION_OPTIONS }
      );
    } else if (currentX < maxDrag && newPage === snapPositions.length - 1) {
      animate(
        scope.current,
        { x: snapPositions[newPage] },
        { ...SPRING_TRANSITION_OPTIONS }
      );
    } else {
      animate(
        scope.current,
        { x: snapPositions[newPage] },
        { ...TRANSITION_OPTIONS }
      );
    }
  };

  useGSAP(() => {
    gsap.to(".footerImage", {
      scale: `1.${currentPage}`,
      duration: 0.6,
      ease: `[0.5, 1, 0.89, 1]`,
    });
  }, [currentPage]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".imagesCTAContainer",
        start: `bottom-=${window.innerHeight} bottom`,
        end: "bottom bottom",
        scrub: true,
        markers: false,
        onEnter: () => {
          x.set(0);
          setCurrentPage(0);
        },
      },
    });

    tl.from(imgsContainerRef.current, {
      x: "200%",
      stagger: 0.05,
    });
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const container = containerRef.current;
    if (container) {
      const rect = container?.getBoundingClientRect();
      // Get mouse position relative to container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cursorX.set(x);
      cursorY.set(y);
    }
  };

  return (
    <div
      onMouseEnter={() => setCursorVisible(true)}
      onMouseLeave={() => setCursorVisible(false)}
      onMouseMove={handleMouseMove}
      ref={containerRef}
      className="carousalContainer absolute top-[190px] bottom-[80px] w-full overflow-hidden "
    >
      <motion.div
        className="cursor pointer-events-none fixed z-50 flex items-center justify-center gap-4 bg-[#545841] w-24 h-24 p-2 rounded-full"
        animate={{
          scale: cursorVisible ? 1 : 0,
        }}
        transition={{
          ease: "easeIn",
          duration: 0.2,
        }}
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
        }}
      >
        <IoIosArrowBack className=" text-white" />
        <IoIosArrowForward className=" text-white" />
      </motion.div>
      <motion.div
        drag="x"
        dragElastic={0.3} // allow slight overscroll which will bounce back
        dragConstraints={{ left: maxDrag, right: 0 }}
        style={{ x, display: "flex", gap: GAP }}
        onDragEnd={handleDragEnd}
        ref={scope}
        className=" h-full pl-[35vw]"
      >
        {imgs.map((imgSrc, idx) => (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            ref={(el: HTMLDivElement) => {
              if (imgsContainerRef.current) {
                imgsContainerRef.current[idx] = el;
              }
            }}
            className="h-full min-w-[35vw]"
          />
        ))}
      </motion.div>
      <div className="mt-4 left-[50%] translate-x-[-50%] absolute bottom-0 flex justify-center gap-2 z-50">
        {snapPositions.map((snap, idx) => (
          <button
            key={idx}
            onClick={() => {
              console.log("fired");
              setCurrentPage(idx);
              animate(scope.current, { x: snap }, { ...TRANSITION_OPTIONS });
            }}
            className={`h-3 w-3 cursor-pointer rounded-full transition-colors ${
              currentPage === idx ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollCarousal3;
