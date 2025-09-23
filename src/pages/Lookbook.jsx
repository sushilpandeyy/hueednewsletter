import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Lookbook = () => {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const leftCenterRef = useRef(null);
  const rightCenterRef = useRef(null);
  const leftCornerRef = useRef(null);
  const rightCornerRef = useRef(null);
  const numberRefs = useRef([]);
  const imageSetRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  const lookbookData = [
    [
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
    ],
    [
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
    ],
    [
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
    ],
    [
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
      { img1: "/lookbook-sample.png", img2: "/lookbook-sample.png" },
    ],
  ];

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Don't initialize GSAP animations on mobile

    const container = containerRef.current;
    const frame = frameRef.current;
    const [leftCenter, rightCenter, leftCorner, rightCorner] = [
      leftCenterRef.current,
      rightCenterRef.current,
      leftCornerRef.current,
      rightCornerRef.current,
    ];

    // Get all image sets - now including all groups
    const allImageSets = [
      leftCorner,
      leftCenter,
      rightCenter,
      rightCorner,
      ...imageSetRefs.current,
    ].filter(Boolean);

    // Separate center and corner sets for all groups
    const centerSets = [leftCenter, rightCenter];
    const cornerSets = [leftCorner, rightCorner];

    // Add center and corner sets from other groups
    imageSetRefs.current.forEach((set, index) => {
      if (set) {
        const positionInGroup = index % 4;
        if (positionInGroup === 1 || positionInGroup === 2) {
          centerSets.push(set);
        } else {
          cornerSets.push(set);
        }
      }
    });

    // Initial positions for ALL groups
    gsap.set(
      [
        leftCenter,
        ...centerSets.filter((s) => s !== leftCenter && s !== rightCenter),
      ],
      {
        xPercent: -50,
        opacity: 1,
      }
    );
    gsap.set(
      [
        rightCenter,
        ...centerSets.filter((s) => s !== leftCenter && s !== rightCenter),
      ],
      {
        xPercent: 30,
        opacity: 1,
      }
    );
    gsap.set(cornerSets, { x: 0, opacity: 0, scale: 1 });
    gsap.set(numberRefs.current, { opacity: 0, scale: 0 });
    gsap.set(frame, { x: 0 });
    gsap.set(allImageSets, { scale: 1 });

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "100% top",
      scrub: 1,
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // First half: zoom out and fade in corner sets + numbers
        if (progress <= 0.5) {
          const zoomProgress = progress * 2;

          // Apply positioning to ALL center sets
          centerSets.forEach((centerSet, index) => {
            if (centerSet) {
              const isRightCenter =
                index % 2 === 1 || centerSet === rightCenter;
              if (isRightCenter) {
                gsap.set(centerSet, { xPercent: 30 - zoomProgress * 20 }); // 30 to 10
              } else {
                gsap.set(centerSet, { xPercent: -50 + zoomProgress * 40 }); // -50 to -10
              }
            }
          });

          // Scale ALL corner sets
          gsap.set(cornerSets, { scale: 1 - zoomProgress * 0.3 });

          gsap.set(cornerSets, { opacity: zoomProgress });

          // Numbers appear after 70% of zoom progress
          if (zoomProgress > 0.7) {
            gsap.set(numberRefs.current, {
              opacity: (zoomProgress - 0.7) / 0.3,
              scale: (zoomProgress - 0.7) / 0.3,
            });
          } else {
            gsap.set(numberRefs.current, { opacity: 0, scale: 0 });
          }
        }

        // Second half: horizontal scroll
        if (progress > 0.5) {
          const scrollProgress = (progress - 0.5) * 2;
          const totalSets = lookbookData.length;
          const moveDistance = (totalSets - 1) * 100;

          gsap.set(frame, { x: -(scrollProgress * moveDistance) + "vw" });
          gsap.set(cornerSets, { scale: 0.7, opacity: 1 });

          // Keep ALL center sets at their final positions
          centerSets.forEach((centerSet, index) => {
            if (centerSet) {
              const isRightCenter =
                index % 2 === 1 || centerSet === rightCenter;
              if (isRightCenter) {
                gsap.set(centerSet, { xPercent: 10 });
              } else {
                gsap.set(centerSet, { xPercent: -10 });
              }
            }
          });

          gsap.set(numberRefs.current, { opacity: 1, scale: 1 });
        } else {
          gsap.set(frame, { x: 0 });
        }
      },
    });

    return () => {
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  const renderImageSet = (data, setIndex, isFirstSet = false) => {
    if (isMobile) {
      // Mobile layout - preserve desktop structure but stack vertically
      return (
        <div key={setIndex} className="w-full mb-16 ">
          {/* Group 1 - Left corner */}
          <div
            className="flex relative justify-end pr-[20px] items-end mb-[30px] "
            style={{ gap: "2vw" }}
          >
            <div className="absolute top-[40%] left-[35%] z-10">
              <span className="text-[10px]  font-bold bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center">
                {String(setIndex * 4 + 1).padStart(2, "0")}
              </span>
            </div>
            <img
              src={data[0].img1}
              alt=""
              className="h-[20vh] w-[25vw] object-cover"
            />
            <img
              src={data[0].img2}
              alt=""
              className="h-[40vh] w-[50vw] object-cover"
            />
          </div>

          {/* Group 2 - Center left */}
          <div
            className="flex  relative items-start justify-start mb-[30px] pl-[20px]"
            style={{ gap: "2vw" }}
          >
            <div className="absolute top-[50%] left-[20%] z-10">
              <span className="text-[10px] font-bold bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center">
                {String(setIndex * 4 + 2).padStart(2, "0")}
              </span>
            </div>
            <img
              src={data[1].img1}
              alt=""
              className="h-[22vh] w-[25vw] object-cover"
            />
            <img
              src={data[1].img2}
              alt=""
              className="h-[43vh] w-[50vw] object-cover"
            />
          </div>

          {/* Img 3 - Center right */}
          <div
            className="flex relative items-start justify-start mt-[120px] ml-[20px]"
            style={{ gap: "16px" }}
          >
            <div className="absolute top-[5%] right-[30%] z-10">
              <span className="text-[10px] font-bold bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center">
                {String(setIndex * 4 + 3).padStart(2, "0")}
              </span>
            </div>
            <img
              src={data[2].img1}
              alt=""
              className="h-[18vh] w-[60vw] object-cover content-center"
            />
            
          </div>

          {/* Img 4 - Right corner */}
          <div
            className="flex items-end relative justify-end mt-[28px] pr-[20px]"
            style={{ gap: "40px" }}
          >
            <div className="absolute -bottom-[30%] right-[5%] z-10">
              <span className="text-[10px] font-bold bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center">
                {String(setIndex * 4 + 4).padStart(2, "0")}
              </span>
            </div>
            <img
              src={data[3].img1}
              alt=""
              className="h-[10vh] w-[35vw] object-cover"
            />
           
          </div>

          <div
            className="flex items-end relative justify-start mt-[70px] pl-[20%]"
            style={{ gap: "40px" }}
          >
            <div className="absolute top-[10%] left-[10%] z-10">
              <span className="text-[10px] font-bold bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center">
                {String(setIndex * 4 + 4).padStart(2, "0")}
              </span>
            </div>
            <img
              src={data[3].img1}
              alt=""
              className="h-[30vh] w-[40vw] object-cover"
            />
           
          </div>
        </div>
      );
    }

    // Desktop layout - original horizontal layout
    return (
      <div
        key={setIndex}
        className={`h-screen flex items-start justify-center pt-[15vh] ${
          setIndex > 0 ? "ml-2" : ""
        }`}
        style={{ width: "calc(100vw - 10px)" }}
      >
        {/* Left corner */}
        <div
          ref={
            isFirstSet
              ? leftCornerRef
              : (el) => {
                  if (el && !isFirstSet)
                    imageSetRefs.current[(setIndex - 1) * 4] = el;
                }
          }
          className="flex relative"
          style={{ gap: "2vw" }}
        >
          <div className="absolute top-[20%] -left-[10%] z-10">
            <span
              ref={(el) => {
                if (el) numberRefs.current[setIndex * 4] = el;
              }}
              className="text-[1.3vw] font-bold  bg-opacity-50  rounded-full w-8 h-8 flex items-center justify-center"
            >
              {String(setIndex * 4 + 1).padStart(2, "0")}
            </span>
          </div>
          <img
            src={data[0].img1}
            alt=""
            className="h-[35vh] w-[12vw] object-cover "
          />
          <img
            src={data[0].img2}
            alt=""
            className="h-[20vh] w-[10vw] object-cover"
          />
        </div>

        {/* Center left */}
        <div
          ref={
            isFirstSet
              ? leftCenterRef
              : (el) => {
                  if (el && !isFirstSet)
                    imageSetRefs.current[(setIndex - 1) * 4 + 1] = el;
                }
          }
          className="flex items-end relative ml-2"
          style={{ gap: "2vw" }}
        >
          <div className="absolute top-[30%] left-[30%] z-10">
            <span
              ref={(el) => {
                if (el) numberRefs.current[setIndex * 4 + 1] = el;
              }}
              className="text-[1.3vw] font-bold  bg-opacity-50  rounded-full w-8 h-8 flex items-center justify-center"
            >
              {String(setIndex * 4 + 2).padStart(2, "0")}
            </span>
          </div>
          <img
            src={data[1].img1}
            alt=""
            className="h-[35vh] w-[12vw] object-cover "
          />
          <img
            src={data[1].img2}
            alt=""
            className="h-[60vh] w-[20vw] object-cover "
          />
        </div>

        {/* Center right */}
        <div
          ref={
            isFirstSet
              ? rightCenterRef
              : (el) => {
                  if (el && !isFirstSet)
                    imageSetRefs.current[(setIndex - 1) * 4 + 2] = el;
                }
          }
          className="flex relative"
          style={{ gap: "16px" }}
        >
          <div className="absolute -bottom-[10%] left-[40%] z-10">
            <span
              ref={(el) => {
                if (el) numberRefs.current[setIndex * 4 + 2] = el;
              }}
              className="text-[1.3vw] font-bold  bg-opacity-50  rounded-full w-8 h-8 flex items-center justify-center"
            >
              {String(setIndex * 4 + 3).padStart(2, "0")}
            </span>
          </div>
          <img
            src={data[2].img1}
            alt=""
            className="h-[25vh] w-[10vw] object-cover"
          />
          <img
            src={data[2].img2}
            alt=""
            className="h-[47vh] w-[15vw] object-cover"
          />
        </div>

        {/* Right corner */}
        <div
          ref={
            isFirstSet
              ? rightCornerRef
              : (el) => {
                  if (el && !isFirstSet)
                    imageSetRefs.current[(setIndex - 1) * 4 + 3] = el;
                }
          }
          className="flex items-end relative ml-15"
          style={{ gap: "40px" }}
        >
          <div className="absolute -bottom-[10%] right-[20%] z-10">
            <span
              ref={(el) => {
                if (el) numberRefs.current[setIndex * 4 + 3] = el;
              }}
              className="text-[1.3vw] font-bold  bg-opacity-50  rounded-full w-8 h-8 flex items-center justify-center"
            >
              {String(setIndex * 4 + 4).padStart(2, "0")}
            </span>
          </div>
          <img
            src={data[3].img1}
            alt=""
            className="h-[45vh] w-[12vw] object-cover"
          />
          <img
            src={data[3].img2}
            alt=""
            className="h-[20vh] w-[10vw] object-cover"
          />
        </div>
      </div>
    );
  };

  if (isMobile) {
    // Mobile layout - groups stacked vertically with original sizing
    return (
      <div className="min-h-screen bg-[#c7c7c7] py-8 wider pt-[10vh]">
        <div className="text-center mb-8">
        <p className="text-[16px] uppercase tracking-[1px] font-[900] max-[500px]:text-[10px]" style={{fontFamily:"sohen-breit"}}>drop one</p>
        <h2 className="text-[22px] font-[400] leading-[28px] tracking-[-0.22px]" style={{fontFamily:"editorial-regular"}}>Lookbook</h2>
        </div>
        <div className="w-full">
          {lookbookData.map((data, idx) =>
            renderImageSet(data, idx, idx === 0)
          )}
        </div>
      </div>
    );
  }

  // Desktop layout - original with GSAP animations
  return (
    <div style={{ height: "200vh" }}>
      <div
        ref={containerRef}
        className="w-screen h-screen bg-[#c7c7c7] relative overflow-hidden px-10"
      >
        <div
          ref={frameRef}
          className="flex items-center"
          style={{ width: "410vw", height: "100vh" }}
        >
          {lookbookData.map((data, idx) =>
            renderImageSet(data, idx, idx === 0)
          )}
        </div>

        <div className="text-white mix-blend-difference absolute bottom-20 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p className="text-[16px] uppercase tracking-wider max-[500px]:text-[10px]" style={{fontFamily:"sohen-breit"}}>drop one</p>
          <h2 className="text-[55px]  font-[400] mb-2 font-serif" style={{fontFamily:"editorial-regular"}}>Lookbook</h2>
        </div>
      </div>
    </div>
  );
};

export default Lookbook;
