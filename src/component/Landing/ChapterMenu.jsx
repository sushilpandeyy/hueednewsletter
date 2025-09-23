import { gsap } from "gsap";
import { useRef, useState, useEffect, useCallback } from "react";

const ChapterMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chapterButtonRef = useRef(null);
  const chapterMenuRef = useRef(null);

  // Memoize animation function to prevent recreating on each render
  const animateMenu = useCallback((open) => {
    if (!chapterButtonRef.current || !chapterMenuRef.current) return;

    if (open) {
      gsap.to(chapterButtonRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power1.out"
      });

      gsap.to(chapterMenuRef.current, {
        x: 0,
        duration: 0.4,
        ease: "power2.in"
      });
    } else {
      gsap.to(chapterButtonRef.current, {
        x: 0,
        duration: 0.3,
        ease: "power1.in"
      });

      gsap.to(chapterMenuRef.current, {
        x: "-300%", // Use percentage for better responsiveness
        duration: 0.7,
        ease: "power2.out"
      });
    }
  }, []);

  useEffect(() => {
    animateMenu(isOpen);
  }, [isOpen, animateMenu]);

  // Set initial position of menu off-screen
  useEffect(() => {
    if (chapterMenuRef.current) {
      gsap.set(chapterMenuRef.current, { x: "100%" });
    }
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const chapters = [
    { number: "I", title: ["brand", "Manifesto"] },
    { number: "II", title: ["The Art of", "color"] },
    { number: "III", title: ["craftsmanship"] },
    { number: "IV", title: ["sensory", "experience"] },
    { number: "V", title: ["becoming a", "hueman"] }
  ];

  return (
    <div className="w-screen h-screen relative z-50">
      {/* Chapter button */}
      <button
        className="absolute top-1/2 -translate-y-1/2 right-0 uppercase h-[206px] w-[65px] bg-[#232323] flex items-center justify-center cursor-pointer hover:bg-[#333333] transition-colors duration-200"
        ref={chapterButtonRef}
        onClick={toggleMenu}
        aria-label="Toggle chapters menu"
      >
        <p className="text-white text-[12px] -rotate-90 pointer-events-none">
          chapters
        </p>
      </button>

      {/* Chapter menu */}
      <div 
        className="absolute top-0 left-0 h-screen w-1/3 bg-[#232323]" 
        ref={chapterMenuRef}
        role="navigation"
        aria-label="Chapters navigation"
      >
        <div className="relative flex items-center justify-center text-white w-full h-full">
          {/* Close button */}
          <button
            className="absolute -right-[71px] top-1/2 -translate-y-1/2 h-[206px] w-[72px] bg-[#232323] flex items-center justify-center cursor-pointer hover:bg-[#333333] transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Close chapters menu"
          >
            <p className="rotate-45 text-[32px] pointer-events-none">+</p>
          </button>

          <div className="px-8">
            <h1 
              className="uppercase text-[38px] flex flex-col items-center mb-12" 
              style={{ fontFamily: "fk-regular" }}
            >
              <span>The</span>
              <span>
                house{" "}
                <span 
                  className="lowercase" 
                  style={{ fontFamily: "editorial-italic" }}
                >
                  of
                </span>{" "}
                Hues
              </span>
            </h1>

            <nav>
              <ul className="flex flex-col gap-[40px]">
                {chapters.map((chapter, index) => (
                  <li 
                    key={chapter.number}
                    className="flex flex-col items-center justify-center uppercase gap-[10px] cursor-pointer hover:opacity-80 transition-opacity duration-200" 
                    style={{ fontFamily: "fk-regular" }}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <p className="text-[10px] tracking-[5px]">
                      {chapter.number}
                    </p>
                    <h3 className="w-[180px] text-[16px] flex flex-col items-center justify-center leading-[22px] tracking-wider text-center">
                      {chapter.title.map((line, lineIndex) => (
                        <span key={lineIndex}>{line}</span>
                      ))}
                    </h3>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterMenu;