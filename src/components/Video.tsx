import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import WordAnimation from "./WordAnimation";

type VideoProps = {
  onImagesLoaded: () => void;
};

const Video = ({ onImagesLoaded }: VideoProps) => {
  const [val, setval] = useState({
    currentIndex: 1,
    maxIndex: 650,
  });

  const imageObject = useRef<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentDiv = useRef<HTMLDivElement>(null);

  const imagesLoadedSignaled = useRef(false);

  // step 2: Preload Images
  const preload = () => {
    if (imageObject.current.length > 0) return;
    let loadedCount = 0;
    for (let i = 1; i <= val.maxIndex; i++) {
      const imagesURL = `../assets/videoimgs/${i
        .toString()
        .padStart(3, "0")}.jpg`;
      const img = new Image();
      img.src = imagesURL;

      const handleLoad = () => {
        loadedCount++;

        if (loadedCount === val.maxIndex && !imagesLoadedSignaled.current) {
          console.log("All images preloaded."); // For debugging
          showImg(0); // Show the first frame immediately after loading
          onImagesLoaded(); // Call the callback function passed from App
          imagesLoadedSignaled.current = true; // Set the flag
        }
        // Clean up listeners to prevent potential memory leaks, though less critical here
        img.removeEventListener("load", handleLoad);
        img.removeEventListener("error", handleError);
      };

      const handleError = () => {
        loadedCount++; // Still increment count even on error to not block loading forever
        console.error(`Failed to load image: ${imagesURL}`);
        // Decide how to handle errors - maybe call onImagesLoaded anyway after all attempts?
        if (loadedCount === val.maxIndex && !imagesLoadedSignaled.current) {
          console.warn("Signaling load complete despite image errors.");
          showImg(0);
          onImagesLoaded();
          imagesLoadedSignaled.current = true;
        }
        img.removeEventListener("load", handleLoad);
        img.removeEventListener("error", handleError);
      };

      img.addEventListener("load", handleLoad);
      img.addEventListener("error", handleError);
      imageObject.current.push(img);
    }
  };

  const showImg = (index: number) => {
    if (index >= 0 && index <= val.maxIndex) {
      const img = imageObject.current[index];
      const canvas = canvasRef.current;

      if (canvas && img) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          // Adjust the scale based on the responsive dimensions
          const scaleX = canvas.width / img.width;
          const scaleY = canvas.height / img.height;

          // Choose the scaling strategy
          const scale = Math.max(scaleX, scaleY);

          const newWidth = img.width * scale;
          const newHeight = img.height * scale;

          // Center the image on the canvas
          const offsetX = (canvas.width - newWidth) / 2;
          const offsetY = (canvas.height - newHeight) / 2;

          // Clear canvas before drawing
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Enable high-quality image rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          // Draw the image on the canvas
          ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

          setval((prev) => ({
            ...prev,
            currentIndex: index,
          }));
        }
      }
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentDiv.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      },
    });

    tl.to(val, {
      currentIndex: val.maxIndex,
      onUpdate: () => {
        showImg(Math.floor(val.currentIndex));
      },
    });
  });

  // Call the preload
  useEffect(() => {
    preload();
  });

  const Words = [
    {
      firstWord: {
        text: "INSPIREE",
        direction: "ltr",
        triggerHeight: "20%",
      },
      secondWord: {
        text: "PHASR LHAS VILLE",
        direction: "rtl",
        triggerHeight: "20%",
      },
    },
    {
      firstWord: {
        text: "Et Les hasrchives footwehasr",
        direction: "ltr",
        triggerHeight: "26%",
      },
      secondWord: {
        text: "de DechasthLon",
        direction: "rtl",
        triggerHeight: "26%",
      },
    },
    {
      firstWord: {
        text: "Lhas WLKR 76",
        direction: "ltr",
        triggerHeight: "31%",
      },
      secondWord: {
        text: "ceLebre",
        direction: "rtl",
        triggerHeight: "31%",
      },
    },
    {
      firstWord: {
        text: "45 hasnnees",
        direction: "ltr",
        triggerHeight: "40%",
      },
      secondWord: {
        text: "d'expertise",
        direction: "rtl",
        triggerHeight: "40%",
      },
    },
    {
      firstWord: {
        text: "Et vous invite",
        direction: "ltr",
        triggerHeight: "50%",
      },
      secondWord: {
        text: "has redefinir",
        direction: "rtl",
        triggerHeight: "50%",
      },
    },
    {
      firstWord: {
        text: "votre experience",
        direction: "ltr",
        triggerHeight: "62%",
      },
      secondWord: {
        text: "de Lhas viLLe",
        direction: "rtl",
        triggerHeight: "62%",
      },
    },
  ];
  return (
    <div className="videoContainer w-screen bg-amber-50">
      <div ref={parentDiv} id="videoScroller" className=" w-full h-[800vh]">
        <div className=" w-full h-screen sticky left-0 top-0">
          <canvas ref={canvasRef} className="w-full h-screen" />
        </div>
        <div className="textContainer fixed inset-0 z-30">
          {Words.map((word, index) => {
            return (
              <div
                key={index}
                id="scrollTextContainer"
                className=" absolute bottom-14 left-16 text-[64px] text-white leading-[70px]"
              >
                <WordAnimation
                  triggerHeight={word.firstWord.triggerHeight}
                  text={word.firstWord.text}
                  direction={word.firstWord.direction as "ltr"}
                  className=" italic uppercase"
                />
                <WordAnimation
                  triggerHeight={word.secondWord.triggerHeight}
                  text={word.secondWord.text}
                  direction={word.secondWord.direction as "rtl"}
                  fontWeight={900}
                  className=" uppercase"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Video;
