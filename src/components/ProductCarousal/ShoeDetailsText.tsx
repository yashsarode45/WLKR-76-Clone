import shoe from "/assets/shoeCarousal/shoe.png";
import { motion, AnimatePresence, Variants } from "motion/react";
import { ShoeDetails } from "../../constants/ShoeDetails";

const ShoeDetailsText = ({ currentShoe }: { currentShoe: number }) => {
  const detailsTextVariants: Variants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
      },
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <div className=" flex flex-col items-center  w-full gap-8 relative h-[260px]">
      <img src={shoe} className=" w-[65%] object-cover" />
      {ShoeDetails.map((shoe, ind) => {
        return (
          <AnimatePresence mode="wait">
            {currentShoe === ind && (
              <motion.div
                key={ind}
                variants={detailsTextVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.8 }}
                className=" absolute text-sm bottom-0 font-normal w-[80%] tracking-wider text-center font-mono"
              >
                {shoe.subTitle}
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}
    </div>
  );
};

export default ShoeDetailsText;
