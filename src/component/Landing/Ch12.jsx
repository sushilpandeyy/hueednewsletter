import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import ChapterMenu from "./ChapterMenu";

gsap.registerPlugin(ScrollTrigger);

const CombinedChapter = () => {
  const chapterRef = useRef();
  const section1Ref = useRef();
  const huesTextRef = useRef();
  const scrollTextRef = useRef();
  const section2Ref = useRef();
  const section2ContentRef = useRef();
  const scrollableContentRef = useRef();
  const chapter1HeadingRef = useRef();
  const chapter1Video = useRef();
  const videoClosureRef = useRef();
  const videoClosureTextRef = useRef();
  const artOfColorTextRef = useRef();
  const chapter2VideoRef = useRef();
  const chapter2HeadingRef = useRef();
  const chapter2ContentRef = useRef();
  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 2.5, // Increased from 1.8
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5, // Reduced from 2
      infinite: false,
      autoResize: true,
      syncTouch: true,
      syncTouchLerp: 0.05, // Reduced from 0.1
      touchInertiaMultiplier: 25, // Reduced from 35
      wheelMultiplier: 0.8, // Reduced from 1.2
      normalizeWheel: true,
    });

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
    });

    // RAF loop for Lenis
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      // Custom easing functions
      const verySlowEase = (t) => 1 - Math.pow(1 - t, 0.25);
      const gentleEase = (t) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const slowEase = (t) => 1 - Math.pow(1 - t, 0.5);
      const smoothEase = (t) => 1 - Math.pow(1 - t, 2);

      // Initial states
      gsap.set(chapter1HeadingRef.current, {
        opacity: 0,
        scale: 1.5,
        y: 0,
        color: "black",
      });
      gsap.set(chapter1Video.current, {
        width: 506,
        height: 266,
        position: "relative",
        zIndex: 1,
      });
      gsap.set(videoClosureTextRef.current, {
        opacity: 0,
        scale: 1,
        y: 0,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 40,
        mixBlendMode: "difference",
      });
      gsap.set(artOfColorTextRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 50,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 50,
        mixBlendMode: "difference",
      });
      gsap.set(chapter2VideoRef.current, {
        width: 800,
        height: 450,
        position: "relative",
        zIndex: 1,
        borderRadius: "8px",
      });
      gsap.set(chapter2ContentRef.current, {
        opacity: 0,
        y: 50,
        pointerEvents: "none",
      });
      gsap.set(chapter2HeadingRef.current, { opacity: 1, y: 0 });

      // Chapter 1 Main Timeline with updated heading animation
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "top top",
          end: "+=1200%",
          pin: true,
          pinSpacing: true,
          scrub: 3.5, // Increased from 1.5 for smoother scrolling
          markers: false,
          anticipatePin: 1,
          refreshPriority: -1,
          onUpdate: (self) => {
            const progress = self.progress;
            const logoAndMenu = document.querySelector(".fixed-elements");

            // Updated heading animation: fade in large at center, then move up and shrink, then pin at 20% from top
            if (progress <= 0.1) {
              // Fade in phase - large at center
              const fadeInProgress = gsap.utils.clamp(0, 1, progress / 0.1);
              const smoothFade = verySlowEase(fadeInProgress);
              gsap.set(chapter1HeadingRef.current, {
                opacity: smoothFade,
                scale: gsap.utils.interpolate(1.5, 1.2, smoothFade),
                y: 0,
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "45px",
              });
            } else if (progress <= 0.25) {
              // Move up and shrink phase
              const moveProgress = (progress - 0.1) / 0.15;
              const smoothMove = gentleEase(moveProgress);
              gsap.set(chapter1HeadingRef.current, {
                opacity: 1,
                scale: gsap.utils.interpolate(1.2, 0.6, smoothMove),
                position: "fixed",
                top: gsap.utils.interpolate(50, 20, smoothMove) + "%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: gsap.utils.interpolate(45, 30, smoothMove) + "px",
              });
            } else if (progress <= 0.7) {
              // Pinned phase - stays at 20% from top
              gsap.set(chapter1HeadingRef.current, {
                opacity: 1,
                scale: 0.6,
                position: "fixed",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "30px",
              });
            } else {
              // Fade out phase when video closure approaches
              const fadeOutProgress = (progress - 0.7) / 0.3;
              const smoothFadeOut = verySlowEase(fadeOutProgress);
              gsap.set(chapter1HeadingRef.current, {
                opacity: 1 - smoothFadeOut,
                scale: 0.6,
                position: "fixed",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "30px",
              });
            }

            // Logo and Menu visibility with smoother transitions
            if (progress >= 0.2 && progress <= 0.8) {
              const fadeIn = progress <= 0.25 ? (progress - 0.2) / 0.05 : 1;
              const fadeOut =
                progress >= 0.75 ? 1 - (progress - 0.75) / 0.05 : 1;
              const finalOpacity = Math.min(fadeIn, fadeOut);
              gsap.set(logoAndMenu, {
                visibility: "visible",
                opacity: finalOpacity,
                pointerEvents: finalOpacity > 0.5 ? "auto" : "none",
              });
            } else {
              gsap.set(logoAndMenu, {
                visibility: "hidden",
                opacity: 0,
                pointerEvents: "none",
              });
            }
          },
        },
      });

      // Slower chapter 1 animations with extended durations
      mainTimeline
        .to(
          huesTextRef.current,
          { scale: 0.2, y: -200, ease: "power0.25.out", duration: 2 },
          0
        )
        .to(
          scrollTextRef.current,
          { opacity: 0, y: 50, ease: "power0.25.out", duration: 1.5 },
          0.5
        )
        .to(".bg-video", { scale: 1.05, ease: "none", duration: 2 }, 0)
        .fromTo(
          section2Ref.current,
          { width: "0%", opacity: 1 },
          { width: "100%", ease: "power1.inOut", duration: 2.5 },
          2
        )
        .fromTo(
          section2ContentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 1.5 },
          4.5
        )
        .to(
          scrollableContentRef.current,
          {
            y: () =>
              -(scrollableContentRef.current.scrollHeight - window.innerHeight),
            ease: "none",
            duration: 6,
          },
          6
        );

      // Text reveal animations with slower timing
      const revealElements =
        chapterRef.current.querySelectorAll(".reveal-on-scroll");
      revealElements.forEach((element, index) => {
        mainTimeline.fromTo(
          element,
          { opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.5,
            ease: "power2.out",
          },
          8 + index * 0.8
        );
      });

      // Video Closure Animation with pinned state and extended duration
      const videoTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: videoClosureRef.current,
          start: "center center",
          end: "+=5000vh", // Increased from 3000vh for longer pinning
          pin: true,
          pinSpacing: true,
          scrub: 3.5, // Increased from 2 for smoother scrolling
          markers: false,
          refreshPriority: -1,
          onUpdate: (self) => {
            const progress = self.progress;

            // Updated phases with much longer pinned state
            if (progress <= 0.05) {
              // Initial text appearance (reduced from 0.08)
              const textProgress = progress / 0.05;
              const easedProgress = verySlowEase(textProgress);
              gsap.set(chapter1Video.current, {
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 506,
                height: 266,
                zIndex: 30,
              });
              gsap.set(videoClosureTextRef.current, {
                opacity: easedProgress,
                scale: gsap.utils.interpolate(0.9, 1, easedProgress),
                y: gsap.utils.interpolate(20, 0, easedProgress),
              });
              gsap.set(artOfColorTextRef.current, { opacity: 0 });
            } else if (progress > 0.05 && progress <= 0.1) {
              // First expansion phase (reduced from 0.15)
              const expansionProgress = (progress - 0.05) / 0.05;
              const easedExpansion = slowEase(expansionProgress);
              const targetWidth = window.innerWidth * 0.4;
              const targetHeight = window.innerHeight * 0.4;
              gsap.set(chapter1Video.current, {
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: gsap.utils.interpolate(506, targetWidth, easedExpansion),
                height: gsap.utils.interpolate(
                  266,
                  targetHeight,
                  easedExpansion
                ),
                zIndex: 30,
              });
              gsap.set(videoClosureTextRef.current, {
                opacity: gsap.utils.interpolate(1, 0.7, expansionProgress),
                scale: 1,
                y: 0,
              });
              gsap.set(artOfColorTextRef.current, { opacity: 0 });
            } else if (progress > 0.1 && progress <= 0.15) {
              // Second expansion phase (reduced from 0.25)
              const expansionProgress = (progress - 0.1) / 0.05;
              const easedExpansion = slowEase(expansionProgress);
              const startWidth = window.innerWidth * 0.4;
              const startHeight = window.innerHeight * 0.4;
              const targetWidth = window.innerWidth * 0.7;
              const targetHeight = window.innerHeight * 0.7;
              gsap.set(chapter1Video.current, {
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: gsap.utils.interpolate(
                  startWidth,
                  targetWidth,
                  easedExpansion
                ),
                height: gsap.utils.interpolate(
                  startHeight,
                  targetHeight,
                  easedExpansion
                ),
                zIndex: 30,
              });
              gsap.set(videoClosureTextRef.current, {
                opacity: gsap.utils.interpolate(0.7, 0.3, expansionProgress),
                scale: 1,
                y: 0,
              });
              gsap.set(artOfColorTextRef.current, { opacity: 0 });
            } else if (progress > 0.15 && progress <= 0.2) {
              // Final expansion to full screen (reduced from 0.35)
              const expansionProgress = (progress - 0.15) / 0.05;
              const easedExpansion = slowEase(expansionProgress);
              const startWidth = window.innerWidth * 0.7;
              const startHeight = window.innerHeight * 0.7;
              gsap.set(chapter1Video.current, {
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: gsap.utils.interpolate(
                  startWidth,
                  window.innerWidth,
                  easedExpansion
                ),
                height: gsap.utils.interpolate(
                  startHeight,
                  window.innerHeight,
                  easedExpansion
                ),
                zIndex: 30,
              });
              gsap.set(videoClosureTextRef.current, {
                opacity: gsap.utils.interpolate(0.3, 0, expansionProgress),
                scale: gsap.utils.interpolate(1, 0.9, expansionProgress),
                y: gsap.utils.interpolate(0, -20, expansionProgress),
              });
              gsap.set(artOfColorTextRef.current, { opacity: 0 });
            } else if (progress > 0.2 && progress <= 0.3) {
              // Art of Color text appears (reduced from 0.5)
              const artTextProgress = (progress - 0.2) / 0.1;
              const easedArtProgress = verySlowEase(artTextProgress);
              gsap.set(chapter1Video.current, {
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: window.innerWidth,
                height: window.innerHeight,
                zIndex: 30,
              });
              gsap.set(videoClosureTextRef.current, { opacity: 0 });
              gsap.set(artOfColorTextRef.current, {
                opacity: easedArtProgress,
                scale: gsap.utils.interpolate(0.9, 1, easedArtProgress),
                y: gsap.utils.interpolate(30, 0, easedArtProgress),
              });
            } else if (progress > 0.3 && progress <= 0.85) {
              // EXTENDED PINNED STATE - video stays full screen for much longer (increased from 0.8)
              gsap.set(chapter1Video.current, {
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: window.innerWidth,
                height: window.innerHeight,
                zIndex: 30,
              });
              gsap.set(videoClosureTextRef.current, { opacity: 0 });
              gsap.set(artOfColorTextRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
              });
            } else if (progress > 0.85) {
              // Exit phase - fade out and return to original size (starts at 0.85 instead of 0.8)
              const exitProgress = (progress - 0.85) / 0.15;
              const easedExit = gentleEase(exitProgress);
              gsap.set(artOfColorTextRef.current, {
                opacity: gsap.utils.interpolate(1, 0, exitProgress),
                scale: gsap.utils.interpolate(1, 0.8, exitProgress),
                y: gsap.utils.interpolate(0, -50, exitProgress),
              });
              gsap.set(chapter1Video.current, {
                position: exitProgress < 0.5 ? "fixed" : "relative",
                top: exitProgress < 0.5 ? "50%" : "auto",
                left: exitProgress < 0.5 ? "50%" : "auto",
                transform:
                  exitProgress < 0.5 ? "translate(-50%, -50%)" : "none",
                width: gsap.utils.interpolate(
                  window.innerWidth,
                  506,
                  easedExit
                ),
                height: gsap.utils.interpolate(
                  window.innerHeight,
                  266,
                  easedExit
                ),
                zIndex: exitProgress < 0.5 ? 30 : 1,
              });
            }
          },
        },
      });

      // Chapter 2 Animation with slower, smoother transitions
      const chapter2Trigger = ScrollTrigger.create({
        trigger: document.querySelector('[data-chapter="2"]'),
        start: "top bottom",
        end: "bottom top",
        scrub: 3.5,
        refreshPriority: -1,
        onUpdate: (self) => {
          const progress = self.progress;
          const direction = self.direction;
          setScrollDirection(direction === 1 ? "down" : "up");

          // Slower phase transitions
          const phase1End = 0.1;
          const phase2End = 0.15;
          const phase3End = 0.88;
          const phase4End = 0.95;

          const expansionProgress = Math.min(1, progress / phase2End);
          const easedExpansion = verySlowEase(expansionProgress);

          const videoWidth = gsap.utils.interpolate(
            800,
            window.innerWidth,
            easedExpansion
          );
          const videoHeight = gsap.utils.interpolate(
            450,
            window.innerHeight,
            easedExpansion
          );
          const videoBorderRadius = `${8 * (1 - easedExpansion)}px`;
          const videoZIndex = Math.floor(1 + easedExpansion * 29);

          if (progress <= phase1End) {
            gsap.set(chapter2VideoRef.current, {
              position: "relative",
              width: videoWidth,
              height: videoHeight,
              top: "auto",
              left: "auto",
              xPercent: 0,
              zIndex: videoZIndex,
              borderRadius: videoBorderRadius,
            });
            gsap.set(chapter2HeadingRef.current, {
              opacity: Math.max(0, 1 - expansionProgress * 1.2),
              y: -30 * expansionProgress,
            });
            gsap.set(chapter2ContentRef.current, {
              opacity: 0,
              y: 50,
              pointerEvents: "none",
            });
          } else if (progress > phase1End && progress <= phase3End) {
            gsap.set(chapter2VideoRef.current, {
              position: "fixed",
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              width: videoWidth,
              height: videoHeight,
              zIndex: videoZIndex,
              borderRadius: videoBorderRadius,
            });
            gsap.set(chapter2HeadingRef.current, { opacity: 0, y: -50 });

            const pinnedProgress =
              (progress - phase1End) / (phase3End - phase1End);
            // Slower content transitions
            if (pinnedProgress <= 0.25) {
              gsap.set(chapter2ContentRef.current, {
                opacity: 0,
                y: 50,
                pointerEvents: "none",
              });
            } else if (pinnedProgress > 0.25 && pinnedProgress <= 0.4) {
              const contentProgress = (pinnedProgress - 0.25) / 0.15;
              const easedContent = verySlowEase(contentProgress);
              gsap.set(chapter2ContentRef.current, {
                opacity: easedContent,
                y: 50 * (1 - easedContent),
                pointerEvents: easedContent > 0.5 ? "auto" : "none",
              });
            } else if (pinnedProgress > 0.4 && pinnedProgress <= 0.75) {
              gsap.set(chapter2ContentRef.current, {
                opacity: 1,
                y: 0,
                pointerEvents: "auto",
              });
            } else if (pinnedProgress > 0.75) {
              const fadeProgress = (pinnedProgress - 0.75) / 0.25;
              const easedFade = verySlowEase(fadeProgress);
              gsap.set(chapter2ContentRef.current, {
                opacity: 1 - easedFade,
                y: -50 * easedFade,
                pointerEvents: easedFade > 0.5 ? "none" : "auto",
              });
            }
          } else if (progress > phase3End && progress <= phase4End) {
            const unpinProgress =
              (progress - phase3End) / (phase4End - phase3End);
            const easedUnpin = gentleEase(unpinProgress);
            const shrinkExpansion = expansionProgress * (1 - easedUnpin);
            const shrinkWidth = gsap.utils.interpolate(
              800,
              window.innerWidth,
              shrinkExpansion
            );
            const shrinkHeight = gsap.utils.interpolate(
              450,
              window.innerHeight,
              shrinkExpansion
            );
            const shrinkBorderRadius = `${8 * (1 - shrinkExpansion)}px`;
            const shrinkZIndex = Math.floor(1 + shrinkExpansion * 29);

            if (unpinProgress < 0.6) {
              gsap.set(chapter2VideoRef.current, {
                position: "fixed",
                top: "50%",
                left: "50%",
                xPercent: -50,
                yPercent: -50,
                width: shrinkWidth,
                height: shrinkHeight,
                zIndex: shrinkZIndex,
                borderRadius: shrinkBorderRadius,
              });
            } else {
              gsap.set(chapter2VideoRef.current, {
                position: "relative",
                top: "auto",
                left: "auto",
                xPercent: 0,
                yPercent: 0,
                width: shrinkWidth,
                height: shrinkHeight,
                zIndex: shrinkZIndex,
                borderRadius: shrinkBorderRadius,
              });
            }
            gsap.set(chapter2ContentRef.current, {
              opacity: 0,
              y: -50,
              pointerEvents: "none",
            });
            gsap.set(chapter2HeadingRef.current, {
              opacity: Math.min(1, unpinProgress * 2),
              y: -30 * (1 - unpinProgress),
            });
          } else {
            gsap.set(chapter2VideoRef.current, {
              position: "relative",
              top: "auto",
              left: "auto",
              xPercent: 0,
              width: 800,
              height: 450,
              zIndex: 1,
              borderRadius: "8px",
            });
            gsap.set(chapter2ContentRef.current, {
              opacity: 0,
              y: 50,
              pointerEvents: "none",
            });
            gsap.set(chapter2HeadingRef.current, { opacity: 1, y: 0 });
          }
        },
      });
    }, chapterRef);

    return () => {
      ctx.revert();
      scrub: 3.5, lenis.destroy();
    };
  }, []);

  return (
    <div ref={chapterRef} data-chapter="1" className="chapter-container max-w-screen overflow-x-hidden">
      {/* Chapter 1 - Section 1 */}
      <div
        ref={section1Ref}
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-between"
      >
        <video
          className="bg-video absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="./Opening.mp4" type="video/mp4" />
        </video>

        <h1
          ref={huesTextRef}
          className="relative z-10 flex flex-col w-full items-center uppercase text-[235px] mt-[41px]   leading-[219px] tracking-[-14px]"
          style={{ willChange: "transform", fontFamily: "gt-light" }}
        >
          <div className="text-white">The</div>
          <div className="text-white">
            House{" "}
            <span
              className="lowercase mix-blend-difference mr-20"
              style={{ fontFamily: "editorial-italic" }}
            >
              of
            </span>{" "}
            hues
          </div>
        </h1>

        <div
          ref={scrollTextRef}
          className="relative z-10 uppercase flex flex-col gap-[34px] items-center justify-center w-[546px] h-[96px] mb-[50px]"
          style={{ willChange: "transform, opacity" }}
        >
          <p
            className="text-[12px] tracking-[36px] text-white"
            style={{ fontFamily: "affairs-regular" }}
          >
            Scroll Down
          </p>
          <p
            className="text-[16px] leading-[24px] text-center text-white w-[384px] tracking-[-0.16px]"
            style={{ fontFamily: "frankton-mono-bold" }}
          >
            where craft and art intertwine to create stories that transcend
            fabric.
          </p>
        </div>

        <div
          ref={section2Ref}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-screen bg-[#c7c7c7] overflow-hidden"
          style={{
            width: "0%",
            willChange: "width",
            transformOrigin: "center center",
            zIndex: 20,
          }}
        >
          <div className="absolute z-50 top-10 left-1/2 transform -translate-x-1/2 uppercase text-center">
            <h1
              className="text-[26px] "
              style={{ fontFamily: "gt-regular" }}
            >
              HUEÉD
            </h1>
            <p
              className="text-[10px] tracking-[10px]"
              style={{ fontFamily: "sohen-breit" }}
            >
              INDIA
            </p>
          </div>

          <div
            ref={section2ContentRef}
            className="w-full h-full opacity-0 relative overflow-hidden"
            style={{ willChange: "opacity" }}
          >
            <div
              ref={scrollableContentRef}
              className="w-full"
              style={{ willChange: "transform" }}
            >
              <div className="w-full min-h-screen flex flex-col relative">
                <div className="w-full h-screen flex items-center justify-center relative">
                  <h2
                    ref={chapter1HeadingRef}
                    className="uppercase tracking-[10px]  text-black"
                    style={{
                      fontFamily: "gt-light",
                      fontSize: "30px",
                      willChange: "transform, opacity, position, font-size",
                    }}
                  >
                    <span className="mr-[50px]">chapter</span>
                    <span>I</span>
                  </h2>
                </div>

                <div className="w-full flex flex-col text-center justify-center items-center py-20">
                  <h1
                    className="flex flex-col items-center justify-center text-[55px] leading-[65px] tracking-[3%] mb-8"
                    style={{ fontFamily: "eb-garamond-regular" }}
                  >
                    <span>Brand</span>
                    <span>Manifesto</span>
                  </h1>
                  <p
                    className="uppercase text-[16px] tracking-[10px] mb-12"
                    style={{ fontFamily: "gt-regular" }}
                  >
                    Why Hueéd exists.
                  </p>
                  <p
                    className=" text-[26px] leading-[26px]  max-w-[521px]"
                    style={{ fontFamily: "eb-garamond-regular" }}
                  >
                   Hueéd exists to celebrate the profound language of color — where craft and art intertwine to create stories that transcend fabric. Rooted in South Asian artistic heritage.
                  </p>
                </div>

                <div className="w-full flex flex-col h-screen gap-[105px] items-center justify-center px-20">
                  <div className="w-full flex flex-col gap-[28px] items-center justify-center text-[16px] ">
                    <h3
                      className="text-center text-[36px] leading-[50px]"
                      style={{ fontFamily: "eb-garamond-regular" }}
                    >
                      Crafted <br /> In Exclusivity
                    </h3>
                    <p
                      className="w-[220px] leading-[32px] text-center text-[24px]"
                      style={{ fontFamily: "eb-garamond-regular" }}
                    >
                      a numbered visual archieve of hue.
                    </p>
                  </div>

                  <div className="w-full flex justify-between items-center px-[20vw]  text-[16px]">
                    <div>
                      <h3
                       className="text-center text-[36px] leading-[50px]"
                       style={{ fontFamily: "eb-garamond-regular" }}
                      >
                        Hex <br />
                        signatures
                      </h3>
                      <p
                        className="w-[220px] leading-[32px] text-center text-[24px] mt-[28px]"
                        style={{ fontFamily: "eb-garamond-regular" }}
                      >
                        a soul of every piece, a mark of identity, significance
                        and essence.
                      </p>
                    </div>
                    <div>
                      <h3
                        className="text-center text-[36px] leading-[50px]"
                        style={{ fontFamily: "eb-garamond-regular" }}
                      >
                        Monochrome <br />
                        Collections
                      </h3>
                      <p
                       className="w-[220px] leading-[32px] text-center text-[24px] mt-[28px]"
                       style={{ fontFamily: "eb-garamond-regular" }}
                      >
                        a deliberate ode to the exploration of garments made on
                        singular shade.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Closure Section */}
      <div
        ref={videoClosureRef}
        className="relative w-full h-screen overflow-hidden bg-[#c7c7c7] flex items-center justify-center"
      >
        <video
          ref={chapter1Video}
          className="object-cover"
          style={{ willChange: "width, height, transform, position" }}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="./Chapter1.mp4" type="video/mp4" />
        </video>
        <h2
          ref={videoClosureTextRef}
          className="leading-[18px] uppercase text-white text-[46px] pointer-events-none"
          style={{
            fontFamily: "eb-garamond-medium",
            willChange: "opacity, transform, scale",
          }}
        >
          next chapter
        </h2>
        <div
          ref={artOfColorTextRef}
          className="w-full pointer-events-none text-[235px] leading-[210px] flex flex-col items-center justify-center "
          style={{ willChange: "opacity, transform, scale" }}
        >
          <h2
            className="text-white uppercase tracking-[2px] leading-[220px]"
            style={{ fontFamily: "gt-regular" }}
          >
            The
          </h2>
          <h2
            className="text-white uppercase tracking-[2px] flex leading-[210px]"
            style={{ fontFamily: "gt-regular" }}
          >
            Art{" "}
            <span
              className="lowercase"
              style={{ fontFamily: "editorial-italic" }}
            >
              of
            </span>{" "}
            Color
          </h2>
        </div>
      </div>

      {/* Chapter 2 Section */}
      <div
        data-chapter="2"
        className="relative w-full bg-[#c7c7c7] flex flex-col items-center justify-start py-20 pt-[50vh]"
        style={{ height: "1000vh" }}
      >
        <h2
          ref={chapter2HeadingRef}
          className="text-center uppercase text-[30px] mb-32"
          style={{ fontFamily: "gt-light", willChange: "opacity, transform" }}
        >
          <div className="flex justify-center items-center gap-8">
            <span>Chapter</span>
            <span className="text-[30px]">II</span>
          </div>
        </h2>

        <video
          ref={chapter2VideoRef}
          className="object-cover"
          style={{
            willChange: "width, height, transform, position, border-radius",
            width: "800px",
            height: "450px",
            position: "relative",
            zIndex: 1,
            display: "block",
            borderRadius: "8px",
          }}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="./Chapter2.mp4" type="video/mp4" />
        </video>

        {/* Chapter 2 Content - Appears over pinned video */}
        <div
          ref={chapter2ContentRef}
          className="fixed inset-0 flex"
          style={{
            willChange: "opacity, transform",
            zIndex: 40,
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          {/* Chapter 2 Left Content */}
          <div className="w-1/2 flex flex-col items-center justify-end mb-[107px]  text-white text-[16px]">
            <div className="flex flex-col items-start justify-start  ">
              <h3 className="text-[28px]" style={{ fontFamily: "eb-garamond-regular" }}>One</h3>
              <p
                className="w-[346px] mt-[10px] text-[24px]"
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                features four symmetrically aligned buttons for a formal look.
              </p>
            </div>

            <div className="flex flex-col items-start justify-start mt-[40px] ml-[134px]">
              <h3 className="text-[28px]" style={{ fontFamily: "eb-garamond-regular" }}>Two</h3>
              <p
                className="w-[346px] mt-[10px] text-[24px]"
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                Structured lapel collar-wide, notched lapels emphasize tailored
                elegance.
              </p>
            </div>

            <div className="flex flex-col items-start justify-start mt-[72px] ml-[275px] ">
              <h3 className="text-[28px]" style={{ fontFamily: "eb-garamond-regular" }}>three</h3>
              <p
                className="w-[346px] mt-[10px] text-[24px]"
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                two cleanly outlined hip-level pockets add functionality and
                style.
              </p>
            </div>
          </div>

          {/* Chapter 2 Right Content */}
          <div className="w-1/2 flex flex-col items-center justify-end mb-[107px]   text-[16px] text-white">
            <div className="flex flex-col items-end justify-end ">
              <h3 className="text-[28px]" style={{ fontFamily: "eb-garamond-regular" }}>Four</h3>
              <p
                className="w-[346px] mt-[10px] text-[24px] text-right"
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                features four symmetrically aligned buttons for a formal look.
              </p>
            </div>

            <div className="flex flex-col items-end justify-end mt-[40px] mr-[134px]">
              <h3 className="text-[28px]" style={{ fontFamily: "eb-garamond-regular" }}>Five</h3>
              <p
                className="w-[346px] mt-[10px] text-[24px] text-right"
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                Structured lapel collar-wide, notched lapels emphasize tailored
                elegance.
              </p>
            </div>

            <div className="flex flex-col items-end justify-start mt-[72px] mr-[275px] ">
              <h3 className="text-[28px]" style={{ fontFamily: "eb-garamond-regular" }}>Six</h3>
              <p
                className="w-[346px] mt-[10px] text-[24px] text-right"
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                two cleanly outlined hip-level pockets add functionality and
                style.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CombinedChapter;
