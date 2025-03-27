import { useGSAP } from "@gsap/react";
import Hero from "./components/Hero";
import Video from "./components/Video";
import { useLenisGsap } from "./hooks/useLenisGsap";
import CloudGradient from "/assets/images/clouds.webp";
import gsap from "gsap";
import RailTracks from "./components/RailTracks";
import ProductCarousal from "./components/ProductCarousal";
import ImagesCTA from "./components/ImagesCTA";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import NotSupported from "./components/NotSupported";
const App = () => {
  useLenisGsap();
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  useGSAP(() => {
    gsap.to(".cloudGradientMove", {
      keyframes: {
        opacity: [0, 0.7, 0],
        easeEach: "power4.inOut",
      },
      scrollTrigger: {
        trigger: ".videoContainer",
        start: "top bottom",
        end: "top top",
        scrub: true,
        // markers: true,
      },
    });
    gsap.to(".gradientTransition", {
      scrollTrigger: {
        trigger: ".videoContainer",
        start: "-100px bottom",
        end: "+=80px",
        scrub: true,
        // markers: true,
      },
      opacity: 1,
    });
    gsap.to(".videoContainer", {
      scrollTrigger: {
        trigger: ".railTrackContainer",
        start: "top bottom",
        end: "top 20%",
        scrub: true,
        // markers: true,
      },
      opacity: 0.6,
    });
  });

  const [loader, setLoader] = useState(true);
  // Detect viewport orientation changes
  useEffect(() => {
    const handleResize = () => {
      const isNowPortrait = window.innerHeight > window.innerWidth;
      if (isNowPortrait !== isPortrait) {
        setIsPortrait(isNowPortrait);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {isPortrait ? (
        <NotSupported />
      ) : (
        <div className=" overflow-x-clip bg-black">
          {loader && <Loader setLoader={setLoader} />}
          <Navbar />
          <Hero />
          <div
            className="gradientTransition w-full h-[400px] z-[5] mb-[-200px] mt-[-200px] relative opacity-0"
            style={{
              background:
                "linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 36%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 64%, rgba(0, 0, 0, 0) 100%)",
            }}
          ></div>
          <img
            src={CloudGradient}
            className="cloudGradientMove w-full h-full object-cover fixed top-[20%] z-10 scale-150"
          />
          <Video />
          <div className="railTrackContainer w-screen h-screen relative  z-10 mt-[-100vh]">
            <RailTracks />
            <div className=" w-screen h-32 bg-white" />
            <ProductCarousal />
            <ImagesCTA />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
