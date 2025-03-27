import type { MotionValue } from "motion/react";
import React from "react";
import CarousalPagination from "./CarousalPagination";
import CarousalTitleSubtitle from "./CarousalTitleSubtitle";
import ShoeDetailsText from "./ShoeDetailsText";

export type ProductCarousalControlsProps = {
  setCurrentShoe: React.Dispatch<React.SetStateAction<number>>;
  currentShoe: number;
  scrollYProgress: MotionValue<number>;
  scrollToShoe: (progressValue: number) => void;
};
const ProductCarousalControls = (props: ProductCarousalControlsProps) => {
  const { currentShoe, setCurrentShoe, scrollYProgress, scrollToShoe } = props;

  return (
    <div className="carousalControls h-full w-[50vw] flex flex-col justify-between items-center pb-[5vh] pl-[15vw] pt-[10vw]">
      <CarousalTitleSubtitle currentShoe={currentShoe} />
      <ShoeDetailsText currentShoe={currentShoe} />
      <CarousalPagination
        currentShoe={currentShoe}
        scrollYProgress={scrollYProgress}
        setCurrentShoe={setCurrentShoe}
        scrollToShoe={scrollToShoe}
      />
    </div>
  );
};

export default ProductCarousalControls;
