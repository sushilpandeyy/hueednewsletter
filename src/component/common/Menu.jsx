import React, { useState, useRef, useEffect } from "react";


const Menu = ({ isOpen, onClose, onOpenLogin, onOpenSignup, onOpenCart }) => {
  const videos = ["/1.mp4", "/2.mp4", "/3.mp4", "/4.mp4"];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const menuRef = useRef(null);

  const nextReel = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReel = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const handleAuthClick = (openAuthModal) => {
    onClose(); // Close menu first
    setTimeout(() => openAuthModal(), 300); // Then open auth modal with slight delay
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="w-screen h-[65vh] bg-white relative flex items-end"
    >
      <button
        onClick={onClose}
        className="absolute right-10 top-5 text-[#232323] hover:opacity-70 transition-opacity uppercase text-[16px] max-[1000px]:text-[14px] max-[520px]:text-[10px]"
        style={{ fontFamily: "sohen-breit" }}
      >
        close
      </button>

      {/* Menu Content */}
      <div className="w-full text-[#232323] px-10 flex justify-between pb-12  ">
        {/* Left: Menu Grid */}
        <div className="w-[60%]  max-[1000px]:w-full flex flex-col gap-[3vh] max-[520px]:gap-0 ">
          <div className="grid grid-cols-3 gap-8 max-[520px]:flex max-[520px]:flex-col max-[520px]:gap-0  ">
            {/* Row 1 */}
            <div>
              <h2
                className="text-left text-[40px]  tracking-[-1.2px] leading-[50px] max-[1300px]:text-[35px] max-[1300px]:leading-[45px] max-[600px]:text-[30px] max-[520px]:leading-[28px] max-[520px]:text-[22px]"
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                New Drops <br /> LookBook <br /> New Arrival
              </h2>
            </div>

            <div className="max-[520px]:hidden">
              <h2
                className="text-[40px] leading-[50px] tracking-[-1.2px] max-[1300px]:text-[35px] max-[600px]:text-[30px] "
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                Tops
              </h2>
              <ul
                className="text-[16px]  leading-[24px] tracking-[-0.16px] uppercase mt-[15px] max-[1300px]:text-[14px]"
                style={{ fontFamily: "frankton-mono-bold" }}
              >
                <li className="hover:opacity-70 transition-opacity cursor-pointer">
                  Shirts
                </li>
                <li className="hover:opacity-70 transition-opacity cursor-pointer">
                  Jackets
                </li>
              </ul>
            </div>

            <div className="max-[520px]:py-[5vh]">
              <h2
                className="text-[40px]   tracking-[-1.2px] max-[1300px]:text-[34px] max-[600px]:text-[30px] max-[520px]:text-[22px]"
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                Account
              </h2>
              <ul
                className="text-[16px] leading-[24px] tracking-[-0.16px] uppercase mt-[15px]  max-[1300px]:text-[14px] max-[520px]:text-[12px] max-[520px]:leading-[16px] max-[520px]:mt-0"
                style={{ fontFamily: "frankton-mono-bold" }}
              >
                <li
                  onClick={() => handleAuthClick(onOpenLogin)}
                  className="hover:opacity-70 transition-opacity cursor-pointer"
                >
                  Login
                </li>
                <li
                  onClick={() => handleAuthClick(onOpenSignup)}
                  className="hover:opacity-70 transition-opacity cursor-pointer"
                >
                  Signup
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Row 2 */}
            <div>
              <h2
                className="text-[24px]   tracking-[1px]  max-[1300px]:text-[22px] max-[520px]:text-[20px]"
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                Buy
              </h2>
              <ul
                className="text-[16px]  leading-[24px] tracking-[-0.16px] uppercase mt-[15px] max-[1300px]:text-[14px] max-[1300px]:mt-[10px] max-[520px]:text-[12px] max-[520px]:leading-[16px]"
                style={{ fontFamily: "frankton-mono-bold" }}
              >
                <li
                  onClick={() => {
                    onClose(); // Close the menu first
                    setTimeout(onOpenCart, 300); // Delay to match the animation, then open cart
                  }}
                  className="hover:opacity-70 transition-opacity cursor-pointer"
                >
                  Cart
                </li>

                <li className="hover:opacity-70 transition-opacity cursor-pointer">
                  New drops
                </li>
                <li className="hover:opacity-70 transition-opacity cursor-pointer">
                  clothing
                </li>
                <li className="hover:opacity-70 transition-opacity cursor-pointer">
                  LookBook
                </li>
                <li className="hover:opacity-70 transition-opacity cursor-pointer">
                  collection
                </li>
              </ul>
            </div>

            <div>
              <h2
                className="text-[24px]   tracking-[1px]  max-[1300px]:text-[22px] max-[520px]:text-[20px]"
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                Support
              </h2>
              <ul
                className="text-[16px] leading-[24px] tracking-[-0.16px] uppercase mt-[15px] max-[1300px]:text-[14px] max-[1300px]:mt-[10px] max-[520px]:leading-[16px] max-[520px]:text-[12px] "
                style={{ fontFamily: "frankton-mono-bold" }}
              >
                <li className="hover:opacity-70 transition-opacity cursor-pointer">
                  faq
                </li>
                <li className="hover:opacity-70 transition-opacity cursor-pointer">
                  contact
                </li>
                <li className="hover:opacity-70 transition-opacity cursor-pointer">
                  privacy & cookies
                </li>
                <li className="hover:opacity-70 transition-opacity cursor-pointer">
                  account
                </li>
              </ul>
            </div>

            <div>
              <h2
               className="text-[24px]   tracking-[1px]  max-[1300px]:text-[22px] max-[520px]:text-[20px]"
               style={{ fontFamily: "eb-garamond-regular" }}
              >
                Customer Care
              </h2>
              <ul
                className="text-[16px] leading-[24px] tracking-[-0.16px] uppercase mt-[15px] max-[1300px]:text-[14px] max-[1300px]:mt-[10px] max-[520px]:text-[12px] max-[520px]:leading-[16px]"
                style={{ fontFamily: "frankton-mono-bold" }}
              >
                <li className="hover:opacity-70 transition-opacity cursor-pointer">
                  track order
                </li>
                <li className="hover:opacity-70 transition-opacity cursor-pointer">
                  cancel order
                </li>
                <li className="hover:opacity-70 transition-opacity cursor-pointer">
                  shipping
                </li>
                <li className="hover:opacity-70 transition-opacity cursor-pointer">
                  returns
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Placeholder for Reels */}
        <div className="flex flex-col items-end justify-end w-[25vw]  max-[1000px]:hidden  ">
          <video
            key={currentVideoIndex}
            className=" w-[100%] h-[260px] object-cover"
            autoPlay
            muted
            loop
          >
            <source src={videos[currentVideoIndex]} type="video/mp4" />
          </video>

          <div
            className="flex w-full justify-between mt-[20px]"
            style={{ fontFamily: "frankton-mono-bold" }}
          >
            <button
              className="uppercase  text-[16px] tracking-[-0.16px] hover:opacity-70 transition-opacity"
              onClick={prevReel}
            >
              prev reel
            </button>
            <button
              className="uppercase text-[16px] tracking-[-0.16px] hover:opacity-70 transition-opacity"
              onClick={nextReel}
            >
              next reel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
