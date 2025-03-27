import { ShoeDetails } from "../../constants/ShoeDetails";
import { motion, AnimatePresence, Variants } from "motion/react";

const CarousalTitleSubtitle = ({ currentShoe }: { currentShoe: number }) => {
  const titleTextVariants: Variants = {
    initial: {
      opacity: 0,
      fontWeight: 50,
      "--numberspecs-width": "60", // starting value for mounting element
    },
    animate: {
      opacity: 1,
      fontWeight: 900,
      "--numberspecs-width": "25", // end value for mounting element
      transition: {
        delay: 0.6,
      },
    },
    exit: {
      opacity: 0,
      fontWeight: 50,
      "--numberspecs-width": "60", // animate back on unmount
    },
  };

  const subTitleTextVariants: Variants = {
    initial: {
      opacity: 0,
      fontWeight: 10,
      "--numberspecs-width": "0", // starting value for mounting element
    },
    animate: {
      opacity: 1,
      fontWeight: 1000,
      "--numberspecs-width": "25", // end value for mounting element
      transition: {
        delay: 0.6,
      },
    },
    exit: {
      opacity: 0,
      fontWeight: 10,
      "--numberspecs-width": "0", // animate back on unmount
    },
  };
  const fontSettings =
    '"slnt" 0, "wdth" var(--numberspecs-width), "GRAD" 0, "XOPQ" 96, "XTRA" 468, "YOPQ" 79, "YTAS" 750, "YTDE" -203, "YTFI" 738, "YTLC" 514, "YTUC" 712';
  return (
    <div className=" relative w-full h-[130px]">
      {ShoeDetails.map((shoe, ind) => {
        return (
          <AnimatePresence mode="wait">
            {currentShoe === ind && (
              <>
                <motion.div
                  key={`${ind}_count`}
                  variants={titleTextVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.8 }}
                  className=" absolute left-[50%] translate-x-[-50%]  text-[#E7D2AB] text-[96px]"
                  style={{
                    fontVariationSettings: fontSettings,
                    clipPath: "polygon(0 0, 100% 0, 100% 60%, 0 60%)",
                  }}
                >
                  0{currentShoe + 1}
                </motion.div>
                <motion.div
                  key={ind}
                  variants={subTitleTextVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.8 }}
                  className=" absolute left-[50%] uppercase translate-x-[-50%] bottom-0 text-[16px] text-[#7E8368]"
                  style={{
                    fontVariationSettings: fontSettings,
                  }}
                >
                  {shoe.title}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        );
      })}
    </div>
  );
};

export default CarousalTitleSubtitle;
