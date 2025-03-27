import type { ProductCarousalControlsProps } from "./ProductCarousalControls";
import { ShoeDetails } from "../../constants/ShoeDetails";

const CarousalPagination = ({
  currentShoe,
  setCurrentShoe,
  scrollYProgress,
  scrollToShoe,
}: ProductCarousalControlsProps) => {
  const totalShoes = ShoeDetails.length;
  const handleLeftClick = () => {
    const newIndex = currentShoe === 0 ? totalShoes - 1 : currentShoe - 1;
    const progress = newIndex / totalShoes;
    scrollYProgress.set(progress);
    scrollToShoe(progress);
    setCurrentShoe(newIndex);
  };

  const handleRightClick = () => {
    const newIndex = currentShoe === totalShoes - 1 ? 0 : currentShoe + 1;
    const progress = newIndex / totalShoes;
    scrollYProgress.set(progress);
    scrollToShoe(progress);
    setCurrentShoe(newIndex);
  };

  // Update scroll progress & currentShoe when clicking on pagination dots
  const handlePaginationClick = (index: number) => {
    const progress = index / totalShoes;
    scrollYProgress.set(progress);
    scrollToShoe(progress);
    setCurrentShoe(index);
  };
  return (
    <div className="pagination w-full flex justify-center items-center">
      <button onClick={handleLeftClick} className=" cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <circle
            cx="14"
            cy="14"
            r="13.5"
            stroke="#ADAA9A"
            stroke-opacity="0.26"
          ></circle>
          <path
            d="M15.9963 9.22852L11.0743 13.8428L15.9963 18.4571"
            stroke="#36373B"
            stroke-width="2"
            stroke-linecap="round"
          ></path>
        </svg>
      </button>
      <ul className=" px-[25px] flex gap-2.5">
        {ShoeDetails.map((_, index) => (
          <li
            key={index}
            className=" rounded-full size-2  relative cursor-pointer"
          >
            <button
              onClick={() => handlePaginationClick(index)}
              className={`absolute rounded-full inset-0 bg-[#adaa9a] cursor-pointer ${
                index === currentShoe ? "opacity-100" : "opacity-30"
              } transition-opacity duration-300 `}
            ></button>
          </li>
        ))}
      </ul>
      <button onClick={handleRightClick} className=" cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <circle
            cx="14"
            cy="14"
            r="13.5"
            transform="matrix(-1 0 0 1 28 0)"
            stroke="#ADAA9A"
            stroke-opacity="0.26"
          ></circle>
          <path
            d="M12.0037 9.22852L16.9257 13.8428L12.0037 18.4571"
            stroke="#36373B"
            stroke-width="2"
            stroke-linecap="round"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default CarousalPagination;
