import { useState } from "react";
import Logo from "/assets/logo.webp";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const Navbar = () => {
  const [invertColour, setInvertColour] = useState(false);
  const [iconColour, setIconColour] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#railTrackWrapper",
      start: "top top",
      end: "bottom+=128",
      markers: false,
      onEnter: () => setInvertColour(true),
      onEnterBack: () => setInvertColour(true),
      onLeaveBack: () => setInvertColour(false),
      onLeave: () => setInvertColour(false),
    });

    ScrollTrigger.create({
      trigger: ".productCarousalContainer",
      start: "top top",
      markers: false,
      onEnter: () => setIconColour(true),
      onEnterBack: () => setIconColour(true),
      onLeaveBack: () => setIconColour(false),
      onLeave: () => setIconColour(false),
    });
  }, []);
  return (
    <div className=" fixed top-0 left-0 right-0 p-14 flex justify-between z-[50]">
      <img
        className={`w-34 ${
          invertColour ? " invert" : ""
        } duration-300 transition-all`}
        src={Logo}
      />
      <div
        className={`flex items-center text-white gap-3 ${
          invertColour || iconColour ? " invert" : ""
        } duration-300 transition-all `}
      >
        <a
          className="hover:invert transition-all duration-300"
          target="_blank"
          href="https://decathlon-wlkr76.index.studio/"
        >
          <FaArrowUpRightFromSquare className=" w-8 h-8" />
        </a>

        <a
          className="hover:invert  transition-all duration-300"
          target="_blank"
          href="https://github.com/yashsarode45"
        >
          <FaGithub className=" w-9 h-9" />
        </a>

        <a
          className="hover:invert transition-all duration-300"
          target="_blank"
          href="https://www.linkedin.com/in/yashsarode/"
        >
          {" "}
          <FaLinkedin className=" w-9 h-9" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
