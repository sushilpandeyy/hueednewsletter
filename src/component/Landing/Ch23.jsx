import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const UnifiedChapters = () => {
  const mainContainerRef = useRef(null);
  const blackContainerRef = useRef(null);
  const chapterHeadingRef = useRef(null);
  const chapterContentRef = useRef(null);
  const chapter3VideoSectionRef = useRef(null);
  const chapter3NextChapterTextRef = useRef(null);
  const chapter3VideoRef = useRef(null);
  const chapter3ParagraphRef = useRef(null);

  // New video section between Chapter 3 and 4
  const betweenVideoSectionRef = useRef(null);
  const betweenVideoRef = useRef(null);
  const betweenNextChapterTextRef = useRef(null);
  const betweenParagraphRef = useRef(null);

  const chapter4ContentRef = useRef(null);
  const chapter4VideoSectionRef = useRef(null);
  const chapter4VideoRef = useRef(null);
  const chapter4NextChapterTextRef = useRef(null);
  const chapter4ParagraphRef = useRef(null);
  const chapter4CurtainRef = useRef(null);

  // Chapter 5 refs
  const chapter5SectionRef = useRef(null);
  const chapter5HeadingRef = useRef(null);
  const chapter5BgRef = useRef(null);
  const content1Ref = useRef(null);
  const content2Ref = useRef(null);
  const content3Ref = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new (window.Lenis ||
      class {
        constructor() {
          console.warn("Lenis not loaded");
        }
        raf() {}
        destroy() {}
      })({
      duration: 2.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(chapterContentRef.current, { opacity: 0, y: 50 });
      gsap.set(chapter4ContentRef.current, { opacity: 0, y: 50 });
      gsap.set(chapter4VideoSectionRef.current, { y: "100vh" });
      gsap.set(chapter4ParagraphRef.current, { opacity: 0, y: 30 });
      gsap.set(chapter4CurtainRef.current, { width: "0%" });
      gsap.set(chapter4NextChapterTextRef.current, { opacity: 1, scale: 1 });

      // Between video section initial states
      gsap.set(betweenVideoSectionRef.current, { y: "100vh" });
      gsap.set(betweenNextChapterTextRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(betweenParagraphRef.current, { opacity: 0, y: 30 });

      // Chapter 5 initial states
      gsap.set(chapter5HeadingRef.current, { opacity: 0, scale: 1, y: 0 });
      gsap.set(chapter5BgRef.current, { y: "100%" });
      gsap.set(
        [content1Ref.current, content2Ref.current, content3Ref.current],
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
        }
      );

      // Main unified timeline
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: "top top",
          end: "+=30000vh", // Extended for new section
          pin: true,
          scrub: 3.5,
          anticipatePin: 1,
          refreshPriority: -1,
        },
      });

      // Chapter 3 Animation (0-25%)
      mainTimeline
        .to(
          blackContainerRef.current,
          {
            width: window.innerWidth,
            height: window.innerHeight,
            duration: 5,
            ease: "power2.out",
          },
          0
        )
        .to(
          chapterHeadingRef.current,
          {
            opacity: 0,
            y: -50,
            duration: 4,
            ease: "power2.out",
          },
          0
        )
        .to(
          blackContainerRef.current,
          {
            backgroundColor: "#c7c7c7",
            duration: 6,
            ease: "power2.inOut",
          },
          3
        )
        .to(
          chapterContentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 5,
            ease: "power2.out",
          },
          6
        )
        .to(
          chapterContentRef.current,
          {
            opacity: 1,
            duration: 12,
            ease: "none",
          },
          11
        )
        .to(
          chapterContentRef.current,
          {
            opacity: 0,
            y: -50,
            duration: 5,
            ease: "power2.in",
          },
          23
        )

        // Between video section animation (25-50%)
        .to(
          betweenVideoSectionRef.current,
          {
            y: 0,
            duration: 6,
            ease: "power3.out",
          },
          30
        )
        .to(
          betweenNextChapterTextRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 8,
            ease: "power2.out",
          },
          34
        )
        .to(
          betweenNextChapterTextRef.current,
          {
            opacity: 0,
            scale: 0.8,
            duration: 4,
            ease: "power2.in",
          },
          42
        )
        .to(
          betweenVideoRef.current,
          {
            width: window.innerWidth,
            height: window.innerHeight,
            borderRadius: 0,
            duration: 8,
            ease: "power3.out",
          },
          46
        )
        .to(
          betweenParagraphRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 5,
            ease: "power2.out",
          },
          54
        )
        .to(
          betweenParagraphRef.current,
          {
            opacity: 1,
            duration: 8,
            ease: "none",
          },
          59
        )
        .to(
          betweenVideoRef.current,
          {
            width: "50vw",
            height: "50vh",
            duration: 8,
            ease: "power3.out",
          },
          67
        )
        .to(
          betweenVideoSectionRef.current,
          {
            y: "-100vh",
            duration: 6,
            ease: "power3.in",
          },
          75
        )

        // Chapter 4 Animation (50-75%)
        .to(
          chapter4ContentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 6,
            ease: "power2.out",
          },
          93
        )
        .to(
          chapter4ContentRef.current,
          {
            opacity: 1,
            duration: 15,
            ease: "none",
          },
          120
        )
        .to(
          chapter4ContentRef.current,
          {
            opacity: 0,
            y: -50,
            duration: 5,
            ease: "power2.in",
          },
          145
        )
        .to(
          chapter4VideoSectionRef.current,
          {
            y: 0,
            duration: 6,
            ease: "power3.out",
          },
          160
        )
        .to(
          chapter4NextChapterTextRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 8,
            ease: "power2.out",
          },
          166
        )
        .to(
          chapter4NextChapterTextRef.current,
          {
            opacity: 0,
            scale: 0.8,
            duration: 4,
            ease: "power2.in",
          },
          174
        )
        .to(
          chapter4VideoRef.current,
          {
            width: window.innerWidth,
            height: window.innerHeight,
            borderRadius: 0,
            duration: 8,
            ease: "power3.out",
          },
          178
        )
        .to(
          chapter4ParagraphRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 5,
            ease: "power2.out",
          },
          186
        )
        .to(
          chapter4ParagraphRef.current,
          {
            opacity: 1,
            duration: 8,
            ease: "none",
          },
          191
        )
        .to(
          chapter4CurtainRef.current,
          {
            width: "100%",
            duration: 6,
            ease: "power2.inOut",
          },
          199
        )

        // Chapter 5 Animation (75-100%)
        .to(
          chapter5HeadingRef.current,
          {
            opacity: 1,
            scale: 0.3,
            y: -window.innerHeight * 0.377,
            duration: 8,
            ease: "power3.out",
          },
          205
        )
        .to(
          chapter5BgRef.current,
          {
            y: "0%",
            duration: 8,
            ease: "power3.out",
          },
          205
        )
        .to(
          content1Ref.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 8,
            ease: "power2.out",
          },
          213
        )
        .to(
          content1Ref.current,
          {
            opacity: 1,
            duration: 15,
            ease: "none",
          },
          221
        )
        .to(
          content1Ref.current,
          {
            opacity: 0,
            y: -50,
            scale: 0.9,
            duration: 6,
            ease: "power2.in",
          },
          236
        )
        .to(
          content2Ref.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 8,
            ease: "power2.out",
          },
          242
        )
        .to(
          content2Ref.current,
          {
            opacity: 1,
            duration: 15,
            ease: "none",
          },
          250
        )
        .to(
          content2Ref.current,
          {
            opacity: 0,
            y: -50,
            scale: 0.9,
            duration: 6,
            ease: "power2.in",
          },
          265
        )
        .to(
          content3Ref.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 8,
            ease: "power2.out",
          },
          271
        )
        .to(
          content3Ref.current,
          {
            opacity: 1,
            duration: 20,
            ease: "none",
          },
          279
        );
    }, mainContainerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  // Add Lenis script to document head
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lenis/1.0.42/lenis.min.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      ref={mainContainerRef}
      className="relative max-w-screen overflow-x-hidden h-screen bg-[#c7c7c7] overflow-hidden"
      style={{ willChange: "transform" }}
    >
      {/* Chapter 3 Heading */}
      <h2
        ref={chapterHeadingRef}
        className="absolute top-[190px] left-1/2 -translate-x-1/2 uppercase tracking-[10px] text-[30px] font-light text-black z-20"
        style={{ fontFamily: "gt-light", willChange: "opacity, transform" }}
      >
        <span className="mr-[50px]">chapter</span>
        <span>III</span>
      </h2>

      {/* Black container */}
      <div
        ref={blackContainerRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[578px] h-[292px] bg-[#111111] z-10"
        style={{ willChange: "width, height, background-color" }}
      />

      {/* Chapter 3 content */}
      <div
        ref={chapterContentRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full z-20"
        style={{ willChange: "opacity, transform" }}
      >
        <h2 className="uppercase tracking-[10px] text-[18px] font-light text-black">
          <span className="mr-[10px]">Chapter</span>
          <span>III</span>
        </h2>
        <div className="w-[546px] h-[364px] mt-[122px] flex items-center justify-center">
          <img src="/chapter3-asset.png" alt="" />
        </div>
        <div className="mt-[115px] w-[658px]">
          <h3
            className="text-center text-[28px] leading-[32px] tracking-[4px]  text-black"
            style={{ fontFamily: "eb-garamond-regular" }}
          >
            By Artists,
            <br /> Through Artisans
          </h3>
          <p
            className="text-[20px] text-center leading-[24px] mt-[40px]  mb-[90px] text-black"
            style={{ fontFamily: "eb-garamond-regular" }}
          >
            Indian artisanship at its finest — each piece a testament to the
            human touch.Every garment is crafted with precision and meticulous
            attention to detail. Each Hueéd creation is made in a single
            handcrafted process, where tradition meets innovation. The delicate
            embroidery, the subtle textures, and the signature hex code are
          </p>
        </div>
      </div>

      {/* Between Video section (Chapter 3 to 4) */}
      <div
        ref={betweenVideoSectionRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen flex items-center justify-center z-30"
        style={{ willChange: "transform" }}
      >
        <h2
          ref={betweenNextChapterTextRef}
          className="uppercase text-white text-[45px] mix-blend-difference absolute z-20 tracking-[18px]"
          style={{ willChange: "opacity, transform", fontFamily: "gt-regular" }}
        >
          Next Chapter
        </h2>

        <div
          ref={betweenVideoRef}
          className="bg-gray-800 flex items-center justify-center text-white z-10"
          style={{
            willChange: "width, height, border-radius",
            width: "800px",
            height: "450px",
            borderRadius: "8px",
          }}
        >
          <video
            className="object-cover"
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              zIndex: 10,
              display: "block",
              borderRadius: "8px",
            }}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="./sample.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <p
          ref={betweenParagraphRef}
          className="absolute text-white text-center text-[30px] leading-[28px] max-w-[600px] px-8 z-30 uppercase mix-blend-difference font-[400] tracking-[22.5px]"
          style={{
            willChange: "opacity, transform",
            fontFamily: "gt-regular",
          }}
        >
          chapter Iv
        </p>
      </div>

      {/* Chapter 4 content */}
      <div
        ref={chapter4ContentRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full z-20"
        style={{ willChange: "opacity, transform" }}
      >
        <h2 className="uppercase tracking-[10px] text-[18px] font-light text-black">
          <span className="mr-[10px]">Chapter</span>
          <span>IV</span>
        </h2>
        <div className="mt-[115px] w-[658px] mx-auto">
          <h3
            className="text-center text-[26px] leading-[32px] tracking-[4px]  text-black"
            style={{ fontFamily: "eb-garamond-regular" }}
          >
            Sensory
            <br /> Experience
          </h3>
          <p
            className="text-[20px] text-center leading-[24px] mt-[40px]  mb-[90px] text-black"
            style={{ fontFamily: "eb-garamond-regular" }}
          >
            Sensory experience A journey beyond sight — a multi-sensory
            celebration of color and craft. At Hueéd, we believe that true
            luxury lies in experiencing a piece with all your senses. That’s why
            each art piece arrives wrapped in potpourri-scent infused packaging,
            carefully curated to resonate with the essence of its hue.
          </p>
        </div>
      </div>

      {/* Chapter 4 Video section */}
      <div
        ref={chapter4VideoSectionRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen flex items-center justify-center z-30"
        style={{ willChange: "transform" }}
      >
        <h2
          ref={chapter4NextChapterTextRef}
          className="uppercase text-white text-[45px] mix-blend-difference absolute z-20"
          style={{ willChange: "opacity, transform" }}
        >
          next chapter
        </h2>

        <div
          ref={chapter4VideoRef}
          className="bg-gray-800 flex items-center justify-center text-white z-10"
          style={{
            willChange: "width, height, border-radius",
            width: "800px",
            height: "450px",
            borderRadius: "8px",
          }}
        >
          <video
            className="object-cover"
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              zIndex: 10,
              display: "block",
              borderRadius: "8px",
            }}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="./sample.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <p
          ref={chapter4ParagraphRef}
          className="absolute bottom-30 text-white text-center text-[18px] leading-[28px] max-w-[600px] px-8 z-30"
          style={{
            fontFamily: "frankton-mono-bold",
            willChange: "opacity, transform",
          }}
        >
          <h3
            className="text-center text-[26px] leading-[32px] tracking-[4px]  text-white"
            style={{ fontFamily: "eb-garamond-regular" }}
          >
            Info
          </h3>
          <p
            className="text-[20px] text-center leading-[24px] mt-[40px]  mb-[90px] text-white"
            style={{ fontFamily: "eb-garamond-regular" }}
          >
            This layered sensory approach invites you to step fully into the world behind the color — to see, touch, and even smell the story it tells.
          </p>
        </p>

        <div
          ref={chapter4CurtainRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#C7C7C7] h-full z-40"
          style={{ willChange: "width" }}
        />
      </div>

      {/* Chapter 5 Section */}
      <div
        ref={chapter5SectionRef}
        className="absolute inset-0 w-full h-full z-50"
      >
        <div
          ref={chapter5BgRef}
          className="absolute inset-0 w-full h-full"
          style={{
            willChange: "transform",
            backgroundImage: "url('/chapter5.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1
            ref={chapter5HeadingRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl uppercase text-white pointer-events-none tracking-[18px] flex gap-[50px] z-60"
            style={{
              willChange: "transform, opacity, scale",
              fontFamily: "gt-light",
            }}
          >
            <span>Chapter</span>
            <span>V</span>
          </h1>

          <div className="relative w-full h-full flex items-center justify-center">
            <div
              ref={content1Ref}
              className="absolute text-white flex flex-col items-center justify-center z-60"
              style={{ willChange: "opacity, transform" }}
            >
              <h2
                className="text-[55px] tracking-[-1.65px]"
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                The Hueman
              </h2>
              <p
                className="uppercase mt-[15px] tracking-[20px] text-[16px] text-center"
                style={{ fontFamily: "frankton-mono-bold" }}
              >
                community
              </p>
            </div>

            <div
              ref={content2Ref}
              className="absolute text-white flex flex-col items-center justify-center z-60"
              style={{ willChange: "opacity, transform" }}
            >
              <h2
                className="text-[55px] tracking-[-1.65px] mb-4 flex flex-col items-center justify-center "
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                <span>Becoming</span>
                <span>The Hueman</span>
              </h2>
              <p
                className=" tracking-[-0.16px] text-[24px] mt-[40px] w-[473px] text-center leading-[32px]"
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                Welcome to the Hue-man community — a exclusive circle for those
                who cherish art and revel in the delicate balance between the
                fictional and the real world of color.
              </p>
            </div>

            <div
              ref={content3Ref}
              className="absolute text-white flex flex-col items-center justify-center z-60"
              style={{ willChange: "opacity, transform" }}
            >
              <h2
                className="text-[55px] tracking-[-1.65px] flex flex-col items-center justify-center mb-4"
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                <span>Are You</span>
                <span>A Hueman?</span>
              </h2>
              <p
                className=" text-[24px] leading-[32px] text-center tracking-[4px]"
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                Join Our Newsletter
              </p>
              <input
                type="text"
                className="w-[325px] text-[16px] border-b-2 mt-[100px] border-[#939393] bg-transparent outline-none text-white placeholder-gray-400"
                placeholder="EMAIL"
                style={{ fontFamily: "frankton-mono-bold" }}
              />
              <p
                className="w-[490px] text-center text-[24px] tracking-[-0.16px] leading-[32px] mt-[40px] "
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                To be a Hueman is to own more than a garment; it is to own a
                part of a hue, a living story that resonates deeply within us
                all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedChapters;
