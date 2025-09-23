import { useState, useEffect, useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";

import "./Fonts.css";

// landing page imports
import ItemDetails from "./pages/ItemDetails";
import Landing from "./pages/Landing";
import Home from "./Layout/HomeLayout";

// shop imports
import Shop from "./Layout/ShopLayout";
import Catalogue from "./pages/Catalogue";
import ProductDetails from "./pages/ProductDetails";
import Lookbook from "./pages/Lookbook";

import Login from "./component/common/Login";
import Signup from "./component/common/Signup";
import Menu from "./component/common/Menu";
import Cart from "./component/shop/Cart";

function App() {
  const [loading, setLoading] = useState(true);
  const [currentColor, setCurrentColor] = useState("C7C7C7");
  const [showMenu, setShowMenu] = useState(false);
  const [modalType, setModalType] = useState(null); // 'login' or 'signup' or null

  const modalBackdropRef = useRef(null);
  const modalBoxRef = useRef(null);
  const appContentRef = useRef(null);
  const menuContainerRef = useRef(null);

  const [showCart, setShowCart] = useState(false);
  const cartBackdropRef = useRef(null);
  const cartBoxRef = useRef(null);

  const onLoadingComplete = () => setLoading(false);

  // Modal management functions
  const openModal = (type) => {
    setModalType(type);

    requestAnimationFrame(() => {
      gsap.set(modalBackdropRef.current, { opacity: 0 });
      gsap.set(modalBoxRef.current, { x: -712 });

      gsap
        .timeline()
        .to(modalBackdropRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          modalBoxRef.current,
          { x: 0, duration: 0.5, ease: "power3.out" },
          0.1
        );
    });
  };

  const closeModal = () => {
    gsap
      .timeline({ onComplete: () => setModalType(null) })
      .to(modalBoxRef.current, { x: -712, duration: 0.4, ease: "power3.in" })
      .to(
        modalBackdropRef.current,
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        0.1
      );
  };

  const switchModal = (type) => {
    gsap.to(modalBoxRef.current, {
      x: -712,
      duration: 0.3,
      ease: "power3.in",
      onComplete: () => {
        setModalType(type);
        gsap.to(modalBoxRef.current, {
          x: 0,
          duration: 0.3,
          ease: "power3.out",
        });
      },
    });
  };

  // Menu functions
  const openMenu = () => {
    setShowMenu(true);
    requestAnimationFrame(() => {
      gsap.set(menuContainerRef.current, { y: "-100%" });
      gsap.to(menuContainerRef.current, {
        y: "0%",
        duration: 0.6,
        ease: "power3.out",
      });
    });
  };

  const closeMenu = () => {
    gsap.to(menuContainerRef.current, {
      y: "-100%",
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => setShowMenu(false),
    });
  };

  const openCart = () => {
    setShowCart(true);
    requestAnimationFrame(() => {
      gsap.set(cartBackdropRef.current, { opacity: 0 });
      gsap.set(cartBoxRef.current, { x: 712 });

      gsap
        .timeline()
        .to(cartBackdropRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          cartBoxRef.current,
          { x: 0, duration: 0.5, ease: "power3.out" },
          0.1
        );
    });
  };

  const closeCart = () => {
    gsap
      .timeline({ onComplete: () => setShowCart(false) })
      .to(cartBoxRef.current, { x: 712, duration: 0.4, ease: "power3.in" })
      .to(
        cartBackdropRef.current,
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        0.1
      );
  };

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Color picker functionality
  useEffect(() => {
    const getPixelColor = (e) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const { clientX: x, clientY: y } = e;
      const element = document.elementFromPoint(x, y);

      canvas.width = canvas.height = 1;

      if (
        element instanceof HTMLImageElement ||
        element instanceof HTMLVideoElement
      ) {
        try {
          ctx.drawImage(
            element,
            -(x - element.getBoundingClientRect().left),
            -(y - element.getBoundingClientRect().top),
            element.clientWidth,
            element.clientHeight
          );

          const pixelData = ctx.getImageData(0, 0, 1, 1).data;
          const hex = Array.from(pixelData.slice(0, 3))
            .map((x) => x.toString(16).padStart(2, "0"))
            .join("");
          setCurrentColor(hex);
        } catch (err) {
          // Handle cross-origin issues silently
        }
      } else {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        if (bgColor !== "transparent" && bgColor !== "rgba(0, 0, 0, 0)") {
          const rgb = bgColor.match(/\d+/g);
          if (rgb) {
            const hex = Array.from(rgb.slice(0, 3))
              .map((x) => parseInt(x).toString(16).padStart(2, "0"))
              .join("");
            setCurrentColor(hex);
          }
        }
      }
    };

    let timeout;
    const throttledGetPixelColor = (e) => {
      if (!timeout) {
        timeout = setTimeout(() => {
          getPixelColor(e);
          timeout = null;
        }, 50);
      }
    };

    window.addEventListener("mousemove", throttledGetPixelColor);
    return () => {
      window.removeEventListener("mousemove", throttledGetPixelColor);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home onOpenMenu={openMenu} />,
      children: [
        { index: true, element: <Landing /> },
        { path: "item/:id", element: <ItemDetails /> },
      ],
    },
    {
      path: "shop",
      element: <Shop onOpenMenu={openMenu} />,
      children: [
        { path: "products", element: <Catalogue /> },
        { path: "products/:productId", element: <ProductDetails /> },
        { path: "lookbook", element: <Lookbook /> },
      ],
    },
  ]);

  return (
    <div className="w-full max-w-screen overflow-x-hidden">
      <Provider store={store}>
        <div className="App">
          {/* Main content */}
          <div ref={appContentRef}>
            <RouterProvider router={router} />
          </div>

          {/* Menu */}
          {showMenu && (
            <div
              ref={menuContainerRef}
              className="fixed top-0 left-0 w-full z-50"
            >
              <Menu
                isOpen={showMenu}
                onClose={closeMenu}
                onOpenLogin={() => openModal("login")}
                onOpenSignup={() => openModal("signup")}
                onOpenCart={openCart}
              />
            </div>
          )}

          {/* Modal (Login/Signup) */}
          {modalType && (
            <div
              ref={modalBackdropRef}
              className="fixed inset-0 z-60 bg-opacity-20"
              style={{ backdropFilter: "blur(8px)" }}
              onClick={closeModal}
            >
              <div
                ref={modalBoxRef}
                className="absolute left-0 top-0 h-full"
                onClick={(e) => e.stopPropagation()}
              >
                {modalType === "login" ? (
                  <Login
                    onClose={closeModal}
                    onSwitchToSignup={() => switchModal("signup")}
                  />
                ) : (
                  <Signup
                    onClose={closeModal}
                    onSwitchToLogin={() => switchModal("login")}
                  />
                )}
              </div>
            </div>
          )}

          {/* Cart Modal */}
          {showCart && (
            <div
              ref={cartBackdropRef}
              className="fixed inset-0 z-60 bg-opacity-20"
              style={{ backdropFilter: "blur(8px)" }}
              onClick={closeCart}
            >
              <div
                ref={cartBoxRef}
                className="absolute right-0 top-0 h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Cart onClose={closeCart} />
              </div>
            </div>
          )}
        </div>
      </Provider>

      {/* Color Display */}
      <div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 uppercase tracking-[2px] pointer-events-none"
        style={{
          fontFamily: "frankton-mono-regular",
          mixBlendMode: "difference",
          color: "white",
        }}
      >
        <span
          className="text-[14px] font-semibold"
          style={{ fontFamily: "sohen-breit" }}
        >
          HEX{" "}
        </span>
        <span className="text-[16px] ml-[0.8vw]" style={{ fontFamily: "fk-regular" }}>
          {currentColor}
        </span>
      </div>
    </div>
  );
}

export default App;
