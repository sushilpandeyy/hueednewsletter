import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../../store/slices/productSlice";

const CatalogueCard = ({ itemDetails, cardDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleCardClick = () => {
    // Set the selected product in Redux store
    dispatch(setSelectedProduct(itemDetails));

    // Navigate to product details page with the product ID
    navigate(`/shop/products/${itemDetails.id}`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 }); // Reset position when leaving
  };

  const handleMouseMove = (e) => {
    if (!isHovered) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Calculate mouse position relative to the card (not centered)
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  return (
    <div
      className="h-full cursor-pointer"
      style={{ 
        width: cardDetails.width,
        '--width-1370': cardDetails.width1370,
        '--height-1370': cardDetails.height1370,
        '--width-800': cardDetails.width800,
        '--height-800': cardDetails.height800
      }}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* item image */}
      <div
        className="relative w-full p-[30px] bg-cover bg-center bg-no-repeat overflow-hidden text-[#232323]"
        style={{
          backgroundImage: `url(${itemDetails.img})`,
          height: cardDetails.height,
        }}
      >
        {/* Fixed positioned hover container that follows cursor */}
        <div 
          className={`absolute w-[150px] h-[150px] rounded-full bg-white/20 backdrop-blur-[10px] flex items-center justify-center transition-opacity duration-300 ease-out pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            left: `${mousePosition.x - 75}px`, // Center the 150px circle on cursor
            top: `${mousePosition.y - 75}px`,  // Center the 150px circle on cursor
            transform: 'translate(0, 0)', // Remove the previous transform
          }}
        >
          <p 
            className="text-white text-[12px] uppercase" 
            style={{fontFamily:"frankton-mono-bold"}}
          >
            Hover
          </p>
        </div>
        
        {/* Heart icon in fixed position */}
        <div className="absolute top-4 right-4">
          <IoMdHeartEmpty className="w-[24px] h-[24px] text-white mix-blend-difference cursor-pointer hover:scale-110 transition-transform duration-200" />
        </div>
      </div>

      {/* items details */}
      <div className="w-full mt-4 text-[#232323]">
        <div className="flex items-start justify-between mb-2">
          <p
            className="text-[24px] max-[1441px]:text-[22px] max-[1025px]:text-[20px]  leading-[32px]   flex-1 mr-4"
            style={{ fontFamily: "eb-garamond-regular" }}
          >
            {itemDetails.name}
          </p>
          <p
            className="text-[16px] max-[1441px]:text-[14px] max-[1025px]:text-[12px] uppercase font-[700] tracking-[-0.16px] leading-[22px]"
            style={{ fontFamily: "frankton-mono-bold" }}
          >
            {itemDetails.color}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            className="text-[14px] max-[1441px]:text-[12px] max-[1025px]:text-[10px] uppercase font-[700] tracking-[-0.16px] leading-[22px]"
            style={{ fontFamily: "eb-garamond-medium" }}
          >
            {itemDetails.price} <span>INR</span>
          </p>
          <button className="border-b-2 border-black hover:bg-black hover:text-white transition-colors duration-200  text-[24px] leading-[32px]" style={{fontFamily:"eb-garamond-regular"}}>
            Buy
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1370px) {
          div[style*="--width-1370"] {
            width: var(--width-1370) !important;
          }
          div[style*="--height-1370"] > div:first-child {
            height: var(--height-1370) !important;
          }
        }
        
        @media (max-width: 800px) {
          div[style*="--width-800"] {
            width: var(--width-800) !important;
          }
          div[style*="--height-800"] > div:first-child {
            height: var(--height-800) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CatalogueCard;