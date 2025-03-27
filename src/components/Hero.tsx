import HeroImg from "/assets/images/splash_home.jpg";
import CloudGradient from "/assets/images/clouds.webp";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  useGSAP(() => {
    gsap.to(".cloudGradient", {
      scrollTrigger: {
        start: "top top",
        end: "+=60%",
        scrub: 1,
        // markers: true,
      },
      opacity: 1,
    });
  }, []);

  return (
    <div className=" w-full h-[110vh] overflow-hidden relative ">
      <img src={HeroImg} className="heroImage w-full h-full object-cover" />
      <img
        src={CloudGradient}
        className="cloudGradient w-full h-full object-cover absolute top-0 left-0 opacity-0"
      />
      <div className="ctaTextContainer w-full absolute inset-x-0 bottom-[10vh] flex flex-col items-center">
        <h1 className=" ctaText text-[18px] leading-5  font-black uppercase text-white mb-4">
          Discover our <br /> new sneaker
        </h1>
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="14"
            viewBox="0 0 19 14"
            fill="none"
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 0,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.5,
            }}
          >
            <path
              d="M1.5 2L9.5 11L17.5 2"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
            ></path>
          </motion.svg>
        ))}
        <div className="verticalBar h-16 w-[1px] bg-white mt-3"></div>
      </div>
    </div>
  );
};

export default Hero;
