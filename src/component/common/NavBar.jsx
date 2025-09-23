import React, { useState, useRef, useEffect } from "react";
import { Circle } from "lucide-react";

const NavBar = ({ onOpenMenu }) => {
  const [activeOption, setActiveOption] = useState("Home");
  const optionRefs = useRef({});

  const handleOptionClick = (option) => {
    const prevActiveOption = activeOption;
    setActiveOption(option);

    const prevRef = optionRefs.current[prevActiveOption];
    const currentRef = optionRefs.current[option];

    if (prevRef) {
      if (prevRef.style.transform.includes("translateX")) {
        prevRef.style.transition = "transform 0.5s ease";
        prevRef.style.transform = "translateX(0px)";
      }
    }

    if (currentRef) {
      currentRef.style.transition = "transform 0.5s ease";
      currentRef.style.transform = "translateX(10px)";
    }

    // Open menu if Menu option is clicked
    if (option === "Menu") {
      onOpenMenu();
    }
  };

  useEffect(() => {
    Object.values(optionRefs.current).forEach((ref, index) => {
      if (ref) {
        ref.style.transform = "translateY(10px)";
        ref.style.opacity = "0";

        setTimeout(() => {
          ref.style.transition = "transform 0.5s ease, opacity 0.5s ease";
          ref.style.transform = "translateY(0px)";
          ref.style.opacity = "1";
        }, index * 100);
      }
    });

    const initialActiveRef = optionRefs.current[activeOption];
    if (initialActiveRef) {
      setTimeout(() => {
        initialActiveRef.style.transition = "transform 0.5s ease";
        initialActiveRef.style.transform = "translateX(10px)";
      }, 600);
    }
  }, []);

  return (
    <div className="flex w-full relative px-14 justify-between z-30" style={{fontFamily:"grotesk-medium"}}>
      <div>
        <ul className="flex flex-col py-5 leading-[1.375rem] tracking-tight text-xl uppercase text-[1rem]">
          <li
            ref={(el) => (optionRefs.current["Home"] = el)}
            className="cursor-pointer flex items-center relative text-white mix-blend-difference hover:opacity-70 transition-opacity"
            onClick={() => handleOptionClick("Home")}
          >
            {activeOption === "Home" && (
              <Circle
                className="absolute -left-4 mix-blend-difference"
                size={8}
                fill="white"
                strokeWidth={0}
              />
            )}
            Home
          </li>
        </ul>
      </div>

      <div>
        <ul className="flex flex-col py-5 leading-[1.375rem] tracking-[-1px] text-xl uppercase text-[1rem]">
          <li
            ref={(el) => (optionRefs.current["Menu"] = el)}
            className="cursor-pointer flex items-center relative text-white mix-blend-difference hover:opacity-70 transition-opacity"
            onClick={() => handleOptionClick("Menu")}
          >
            {activeOption === "Menu" && (
              <Circle
                className="absolute -left-4 mix-blend-difference"
                size={8}
                fill="white"
                strokeWidth={0}
              />
            )}
            Menu
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;