import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Footer from "../component/Landing/Footer";

import Ch12 from "../component/Landing/Ch12";
import Ch23 from "../component/Landing/Ch23";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const containerRef = useRef(null);
  const lenisRef = useRef(null);


  // Initialize Lenis smooth scroll with proper configuration
  useEffect(() => {
    const initLenis = async () => {
      try {
        // In a real implementation, you would import Lenis like this:
        // import Lenis from '@studio-freight/lenis'

        // Mock Lenis configuration for smooth scrolling
        const mockLenis = {
          // Smooth scroll configuration
          duration: 1.2, // Animation duration
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
          direction: "vertical",
          gestureDirection: "vertical",
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,

          raf: (time) => {
            // Update ScrollTrigger on each frame
            ScrollTrigger.update();
          },

          on: (event, callback) => {
            if (event === "scroll") {
              // Call ScrollTrigger update on scroll
              callback();
            }
          },

          destroy: () => {
            console.log("Lenis destroyed");
          },

          scrollTo: (target, options = {}) => {
            console.log("Scrolling to:", target);
          },
        };

        lenisRef.current = mockLenis;

        // Smooth animation loop
        function raf(time) {
          lenisRef.current?.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Connect Lenis with ScrollTrigger for smooth updates
        lenisRef.current.on("scroll", () => {
          ScrollTrigger.update();
        });

        // Add Lenis to GSAP ticker for better performance
        gsap.ticker.add((time) => {
          lenisRef.current?.raf(time * 1000);
        });

        // Configure ScrollTrigger for smooth scrolling
        ScrollTrigger.config({
          // Reduce lag and improve smoothness
          autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
          ignoreMobileResize: true,
        });

        // Set default ease for all GSAP animations
        gsap.defaults({
          ease: "power2.out",
          duration: 0.6,
        });

        console.log("Smooth scroll initialized");
      } catch (error) {
        console.log("Lenis not available, using native scroll");

        // Fallback: Configure ScrollTrigger for native scroll
        ScrollTrigger.config({
          autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
          ignoreMobileResize: true,
        });
      }
    };

    initLenis();

    // Refresh ScrollTrigger after initialization
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove((time) => {
        lenisRef.current?.raf(time * 1000);
      });
      lenisRef.current?.destroy();
    };
  }, []);

  // Global scroll optimization
  useEffect(() => {
    // Optimize scroll performance
    const optimizeScroll = () => {
      // Reduce motion for users who prefer it
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

      if (prefersReducedMotion.matches) {
        gsap.globalTimeline.timeScale(0.5); // Slow down animations
      }

      // Throttle scroll events for better performance
      let ticking = false;

      const updateScrollTriggers = () => {
        ScrollTrigger.update();
        ticking = false;
      };

      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(updateScrollTriggers);
          ticking = true;
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    };

    const cleanup = optimizeScroll();

    return cleanup;
  }, []);

  // Cleanup all scroll triggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ScrollTrigger.clearMatchMedia();
    };
  }, []);

  // Handle resize events for responsive behavior
  useEffect(() => {
    // Custom debounce function
    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    const handleResize = debounce(() => {
      ScrollTrigger.refresh();
    }, 300);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  

  return (
    <>
      <div
        ref={containerRef}
        className="w-screen relative  max-w-screen overflow-x-hidden"
        style={{
          willChange: "scroll-position",
          scrollBehavior: "smooth",
        }}
      >
        <Ch12/>
        <Ch23 />
        
        <Footer/>
      </div>

      
    </>
  );
};

export default Landing;
