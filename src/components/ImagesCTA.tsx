import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import imgAssets1 from "/assets/imageCTA/ImageCTA1.webp";
import imgAssets2 from "/assets/imageCTA/ImageCTA2.jpg";
import imgAssets3 from "/assets/imageCTA/ImageCTA3.webp";
import imgAssets4 from "/assets/imageCTA/ImageCTA4.webp";
import WordAnimationImageCTA from "./WordAnimationImageCTA";
import ScrollCarousal3 from "./ScrollCarousal3";

const Words = [
  {
    text: "EXPLOREZ DE",
    direction: "ltr",
    triggerHeight: "140%",
  },
  {
    text: "NOUVEAUX",
    direction: "rtl",
    triggerHeight: "145%",
  },
  {
    text: "HORIZONS",
    direction: "ltr",
    triggerHeight: "150%",
  },
  {
    text: "DANS UN",
    direction: "ltr",
    triggerHeight: "235%",
  },
  {
    text: "CONFORT",
    direction: "rtl",
    triggerHeight: "240%",
  },
  {
    text: "ABSOLU",
    direction: "ltr",
    triggerHeight: "245%",
  },
];

const ImagesCTA = () => {
  useGSAP(() => {
    gsap.set(".imageClipPath", {
      yPercent: 20,
      clipPath: "inset(20% 35% 20% 35%)",
    });

    const bgImageScaleClipMoveTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".imageClipPath",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        markers: false,
      },
    });

    // Animate yPercent from 100% to 0% over the full scroll distance
    bgImageScaleClipMoveTl.to(
      ".imageClipPath",

      {
        yPercent: 0,
        duration: 0.12, // Represents the 12% of the total scroll distance
      },
      0
    );
    bgImageScaleClipMoveTl
      .fromTo(
        ".imageClipPath",
        {
          clipPath: "inset(20% 35% 20% 35%);",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1, // Takes full scroll
        },
        0
      )
      .from(
        ".imageCta",
        {
          scale: 1.5,
          duration: 1,
        },
        0
      );

    const centerImageTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".imagesCTAContainer",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        markers: false,
      },
    });

    // Calculate position ratios for a 400vh container
    // 0vh to 100vh = 0 to 0.25 of total scroll
    // 100vh to 200vh = 0.25 to 0.5 of total scroll
    // 200vh to 270vh = 0.5 to 0.675 of total scroll
    // 270vh to 300vh = 0.675 to 0.75 of total scroll (empty space)
    // 300vh to 350vh = 0.75 to 0.875 of total scroll
    // 350vh to 400vh = 0.875 to 1 of total scroll

    centerImageTl.fromTo(
      ".imageGirlCta",
      {
        yPercent: 110,
        clipPath: "inset(10%);",
      },
      {
        yPercent: 0,
        clipPath: "inset(0%)",
        duration: 0.15, // 0.25 of the total timeline (100vh worth)
      },
      0.2 // Start at 25% of the timeline (100vh)
    );

    // Second animations: 200vh to 300vh (0.5 to 0.75)
    // We want imageShoeCta to start halfway through this segment
    // So it starts at 0.5 + (0.75 - 0.5)/2 = 0.5875
    centerImageTl
      .to(
        ".imageGirlCta",
        {
          scale: 2.2,
          duration: 0.2, // 0.25 of the total timeline (100vh worth)
        },
        0.4 // Start at 50% of the timeline (200vh)
      )
      .fromTo(
        ".imageShoeCta",
        {
          yPercent: 110,
          clipPath: "inset(10%);",
        },
        {
          yPercent: 0,
          clipPath: "inset(0%)",
          duration: 0.18, // Half of 0.175 (35vh worth)
        },
        0.42 // Start halfway through the previous animation
      );

    // Empty scroll from 270vh to 300vh (0.675 to 0.75)
    // No animations during this period

    // Third animations: 300vh to 350vh (0.75 to 0.875) - Simultaneous
    centerImageTl
      .to(
        ".imageGirlCta",
        {
          scale: 2.45,
          duration: 0.15, // 0.125 of the total timeline (50vh worth)
        },
        0.7 // Start at 75% of the timeline (300vh)
      )
      .to(
        ".imageShoeCta",
        {
          scale: 0.9,
          duration: 0.15, // Same duration to ensure they run simultaneously
        },
        0.7 // Same start point to ensure they run simultaneously
      );

    // Fourth animation: 350vh to 400vh (0.875 to 1)
    centerImageTl
      .fromTo(
        ".footer",
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          duration: 0.15, // 0.125 of the total timeline (50vh worth)
        },
        0.85 // Start at 87.5% of the timeline (350vh)
      )
      .to(
        ".overlay",
        {
          opacity: 0.85,
          duration: 0.15,
        },
        0.85
      );
  });

  const getTextPosition = (index: number) => {
    switch (index) {
      case 0:
      case 3:
        return " left-[120px] top-[120px]";
      case 1:
      case 4:
        return " right-[120px] top-[50%] translate-y-[-50%]";
      case 2:
      case 5:
        return " left-[180px] bottom-[120px]";

      default:
        return "";
    }
  };
  return (
    <div
      id="imagesCTAContainer"
      className="imagesCTAContainer h-[600vh] relative w-screen "
    >
      <div className="imageClipPath sticky top-0 w-full h-[100vh]">
        <img src={imgAssets1} className="imageCta w-full h-full object-cover" />
      </div>
      <img
        src={imgAssets4}
        className="imageGirlCta w-[40vw]  h-[95vh] sticky top-[2.5vh] bottom-[2.5vh] object-cover  m-auto"
      />
      <img
        src={imgAssets3}
        className="imageShoeCta w-[40vw]  h-[95vh] sticky top-[2.5vh] bottom-[2.5vh] object-cover  m-auto"
      />
      <div className="ctaTextContainer pointer-events-none fixed inset-0 ">
        {Words.map((word, index) => {
          return (
            <div
              key={index}
              id={`ctaScrollTextContainer-${index}`}
              className={` absolute  ${getTextPosition(
                index
              )}  text-[260px] text-white leading-[150px]`}
              style={{
                fontVariationSettings: `
                  "slnt" 0,
                  "wdth" 60,
                  "GRAD" 0,
                  "XOPQ" 96,
                  "XTRA" 440,
                  "YOPQ" 79,
                  "YTAS" 750,
                  "YTDE" -203,
                  "YTFI" 738,
                  "YTLC" 514,
                  "YTUC" 712
                `,
                fontWeight: 50,
              }}
            >
              <WordAnimationImageCTA
                text={word.text}
                triggerHeight={word.triggerHeight}
                fontWeight={600}
                direction={word.direction as "ltr"}
                className=" uppercase"
                index={index}
              />
            </div>
          );
        })}
      </div>
      <div className="overlay pointer-events-none w-screen h-screen fixed bottom-0 bg-black opacity-0"></div>
      <div
        id="footerContainer"
        className="footer w-screen h-screen fixed bottom-0 "
      >
        <img
          src={imgAssets2}
          className="footerImage absolute inset-0 w-full h-full"
        />
        <ScrollCarousal3 />
        <div className=" absolute bottom-0 p-14 pb-6 left-0 right-0 flex justify-between text-gray-100 text-lg">
          <p>This is made only for learning purpose</p>
          <p>Developed by Yash Sarode</p>
        </div>
      </div>
    </div>
  );
};

export default ImagesCTA;
