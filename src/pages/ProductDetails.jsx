import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { addToCart } from "../store/slices/cartSlice";
import { setSelectedProduct } from "../store/slices/productSlice";
import CatalogueCard from "../component/shop/CatalougeCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showPackaging, setShowPackaging] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  const { products, selectedProduct } = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);

  const [cardDimensions, setCardDimensions] = useState({
    card1: { width: "20vw", height: "41.02vh" },
    card2: { width: "26.56vw", height: "55.09vh" },
    card3: { width: "29.69vw", height: "61.57vh" },
    card4: { width: "19.90vw", height: "41.20vh" },
  });

  // Refs
  const leftContainerRef = useRef(null);
  const productImageRef = useRef(null);
  const productDetailsRef = useRef(null);
  const packagingContentRef = useRef(null);
  const careContentRef = useRef(null);
  const packagingIconRef = useRef(null);
  const careIconRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  // Image navigation
  const changeImage = (newIndex) => {
    if (!product?.images || newIndex === currentImageIndex) return;
    setCurrentImageIndex(newIndex);
  };

  const nextImage = () => {
    if (!product?.images) return;
    const newIndex =
      currentImageIndex === product.images.length - 1
        ? 0
        : currentImageIndex + 1;
    changeImage(newIndex);
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

  const prevImage = () => {
    if (!product?.images) return;
    const newIndex =
      currentImageIndex === 0
        ? product.images.length - 1
        : currentImageIndex - 1;
    changeImage(newIndex);
  };

  // Touch handlers for mobile only
  const handleTouchStart = (e) => {
    if (window.innerWidth >= 1000) return; // Disable on larger screens
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e) => {
    if (window.innerWidth >= 1000) return; // Disable on larger screens
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      deltaX > 0 ? prevImage() : nextImage();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 900);

      if(screenWidth <=500){
        setCardDimensions({
          card1: { width: "90vw", height: "50vh" },
          card2: { width: "90vw", height: "50vh" },
          card3: { width: "90vw", height: "50vh" },
          card4: { width: "90vw", height: "50vh" },
        })
      }

      else if (screenWidth <= 900) {
        setCardDimensions({
          card1: { width: "80vw", height: "50vh" },
          card2: { width: "80vw", height: "50vh" },
          card3: { width: "80vw", height: "50vh" },
          card4: { width: "80vw", height: "50vh" },
        });
      } else if (screenWidth <= 1024) {
        setCardDimensions({
          card1: { width: "30vw", height: "30vh" },
          card2: { width: "24vw", height: "38vh" },
          card3: { width: "32vw", height: "48vh" },
          card4: { width: "21vw", height: "33vh" },
        });
      } else if (screenWidth <= 1370) {
        setCardDimensions({
          card1: { width: "20vw", height: "45vh" },
          card2: { width: "28vw", height: "65vh" },
          card3: { width: "30vw", height: "70vh" },
          card4: { width: "20vw", height: "41.20vh" },
        });
      } else {
        setCardDimensions({
          card1: { width: "20vw", height: "50vh" },
          card2: { width: "30vw", height: "70vh" },
          card3: { width: "30vw", height: "75vh" },
          card4: { width: "15vw", height: "38vh" },
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "ArrowRight") nextImage();
      else if (e.key === "Escape" && showImagePreview)
        setShowImagePreview(false);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentImageIndex, product, showImagePreview]);

  // Product loading
  useEffect(() => {
    const id = parseInt(productId);
    if (selectedProduct?.id === id) {
      setProduct(selectedProduct);
    } else {
      const foundProduct = products.find((item) => item.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        dispatch(setSelectedProduct(foundProduct));
      } else {
        navigate("/shop/products");
      }
    }
  }, [productId, selectedProduct, products, dispatch, navigate]);

  // GSAP sticky scroll
  useEffect(() => {
    if (
      !product ||
      !leftContainerRef.current ||
      !productDetailsRef.current ||
      !productImageRef.current ||
      isMobile
    )
      return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: productDetailsRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftContainerRef.current,
        pinSpacing: false,
      });
      ScrollTrigger.create({
        trigger: productDetailsRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: productImageRef.current,
        pinSpacing: false,
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [product, isMobile]);

  // Dropdown animations
  const animateDropdown = (ref, iconRef, show) => {
    if (!ref.current) return;

    if (show) {
      gsap.fromTo(
        ref.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3 }
      );
      gsap.to(iconRef.current, { rotation: 45, duration: 0.3 });
    } else {
      gsap.to(ref.current, { height: 0, opacity: 0, duration: 0.3 });
      gsap.to(iconRef.current, { rotation: 0, duration: 0.3 });
    }
  };

  useEffect(() => {
    animateDropdown(packagingContentRef, packagingIconRef, showPackaging);
  }, [showPackaging]);

  useEffect(() => {
    animateDropdown(careContentRef, careIconRef, showProductDetails);
  }, [showProductDetails]);

  // Modal scroll lock
  useEffect(() => {
    document.body.style.overflow = showImagePreview ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showImagePreview]);

  // Handlers
  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 1) {
      alert("Please select a size");
      return;
    }
    const sizeToAdd = selectedSize || product.sizes?.[0] || "One Size";
    dispatch(addToCart({ product, size: sizeToAdd, quantity }));
    alert(`Added ${quantity} ${product.name} (${sizeToAdd}) to cart!`);
  };

  const handleArrowClick = (e, direction) => {
    e.stopPropagation(); // Prevent modal from opening
    direction === "next" ? nextImage() : prevImage();
  };

  if (!product) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  const currentImage = product.images?.[currentImageIndex] || product.img;
  const totalImages = product.images?.length || 1;

  return (
    <>
      <div className="overflow-x-hidden w-screen max-[550px]:pt-[2vh]">
        <div className="w-full min-h-screen px-[4vw] max-[900px]:px-0 max-[1440px]:px-[2vw] max-[1024px]:px-[2vw] max-[768px]:px-[1px]">
          <div
            className={`relative ${
              isMobile ? "flex flex-col space-y-8" : "flex justify-between"
            }  pt-[15%] max-[900px]:pt-[10%] text-[#232323]`}
            ref={productDetailsRef}
          >
            {/* Mobile: Image first */}
            {isMobile && (
              <div className="w-full flex justify-center">
                <div className="w-[100vw] overflow-hidden relative">
                  <div
                    className="relative overflow-hidden w-full h-full cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onClick={() => setShowImagePreview(true)}
                  >
                    <img
                      src={currentImage}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      draggable={false}
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />

                    {/* Hover container */}
                    <div
                      className={`absolute w-[100px] h-[100px] rounded-full bg-white/20 backdrop-blur-[10px] flex items-center justify-center transition-opacity duration-300 ease-out pointer-events-none ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        left: `${mousePosition.x - 50}px`,
                        top: `${mousePosition.y - 50}px`,
                        transform: "translate(0, 0)",
                      }}
                    >
                      <p
                        className="text-white text-[7px] uppercase tracking-[1px]"
                        style={{ fontFamily: "frankton-mono-bold" }}
                      >
                        Drag
                      </p>
                    </div>
                  </div>

                  {/* Navigation arrows - positioned relative to the container */}
                  {totalImages > 1 && (
                    <>
                      <button
                        onClick={(e) => handleArrowClick(e, "prev")}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/40 transition-all z-10"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M15 18l-6-6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => handleArrowClick(e, "next")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/40 transition-all z-10"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M9 18l6-6-6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image dots */}
                  {totalImages > 1 && (
                    <div className="flex justify-center mt-2 space-x-2">
                      {Array.from({ length: totalImages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => changeImage(index)}
                          className={`w-[5px] h-[2px] rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? "bg-black scale-125"
                              : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  <div className="text-center mt-2">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                      Swipe to browse images
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* Left Container */}
            <div
              className={`${
                isMobile ? "w-full px-[15vw]" : "w-[375px]  max-[1440px]:w-[24vw]"
              }`}
              ref={leftContainerRef}
            >
              
              <h1
                className="w-full text-left mt-[5px] text-[30px] max-[1440px]:text-[28px] tracking-[-0.35px]  leading-[45px]"
                style={{ fontFamily: "eb-garamond-regular" }}
              >
                {product.name}
              </h1>

              <div className="flex items-center justify-between mt-[10px]">
                <div>
                
                  <p
                    className="text-2xl text-[30px] max-[1440px]:text-[14px] max-[1024px]:text-[12px] mt-[10px]"
                    style={{ fontFamily: "eb-garamond-regular" }}
                  >
                    <span>{product.price}</span>{" "}
                    
                  </p>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {isWishlisted ? (
                    <IoMdHeart className="w-6 h-6 text-red-500" />
                  ) : (
                    <IoMdHeartEmpty className="w-6 h-6 text-gray-600" />
                  )}
                </button>
              </div>

              {/* Size Selector */}
              {product.sizes?.length > 1 && (
                <div className="mt-[42px]">
                  <div className="flex items-center justify-between" style={{ fontFamily: "frankton-mono-bold" }}>
                    <p
                      className="text-[14px] tracking-[1px] max-[1440px]:text-[12px] max-[1024px]:text-[10px] text-[#232332] uppercase "
                      
                    >
                      select size
                    </p>
                    <button className="uppercase hover:text-gray-900 text-[14px] underline max-[1440px]:text-[12px] max-[1024px]:text-[10px]" >
                      Guide
                    </button>
                  </div>
                  <div className="flex mt-4 w-full">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`flex-1 px-4 py-2 transition-colors max-[1440px]:text-[14px] max-[1024px]:text-[12px] ${
                          selectedSize === size
                            ? " bg-black text-white"
                            : " hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                className="w-full bg-black tracking-[1px] text-white py-4 px-8 hover:bg-gray-900 transition-colors   mt-8 text-[22px] max-[1440px]:text-[20px] max-[1024px]:text-[14px]"
                style={{ fontFamily: "eb-garamond-medium" }}
              >
                Add to Cart
              </button>
            </div>

            {!isMobile && (
              <div
                ref={productImageRef}
                className="absolute left-1/2  top-30 z-10 overflow-hidden"
                style={{ transform: "translate(-50%,0)" }}
              >
                <div className=" top-8 relative ">
                  <div
                    className="relative overflow-hidden w-full h-full cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onClick={() => setShowImagePreview(true)}
                  >
                    <img
                      src={currentImage}
                      alt={product.name}
                      className=" object-contain  w-[570px] h-[660px] max-[1440px]:w-[450px] max-[1440px]:h-[520px] max-[1025px]:w-[350px] max-[1025px]:h-[400px] max-[900px]:w-[280px] max-[900px]:h-[320px]"
                      draggable={false}
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />

                    {/* Fixed positioned hover container that follows cursor */}
                    <div
                      className={`absolute w-[150px] h-[150px] max-[1440px]:w-[120px] max-[1440px]:h-[120px] max-[768px]:w-[100px] max-[768px]:h-[100px] rounded-full bg-white/20 backdrop-blur-[10px] flex items-center justify-center transition-opacity duration-300 ease-out pointer-events-none ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        left: `${mousePosition.x - 75}px`, // Center the circle on cursor
                        top: `${mousePosition.y - 75}px`, // Center the circle on cursor
                        transform: "translate(0, 0)",
                      }}
                    >
                      <p
                        className="text-white text-[12px] tracking-[1px] max-[1440px]:text-[10px] max-[768px]:text-[8px] uppercase"
                        style={{ fontFamily: "frankton-mono-bold" }}
                      >
                        Drag
                      </p>
                    </div>
                  </div>

                  {/* Navigation arrows - positioned relative to the sticky container */}
                  {totalImages > 1 && (
                    <>
                      <button
                        onClick={(e) => handleArrowClick(e, "prev")}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/40 transition-all z-10"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M15 18l-6-6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => handleArrowClick(e, "next")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/40 transition-all z-10"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M9 18l6-6-6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image dots */}
                  {totalImages > 1 && (
                    <div className="flex justify-center mt-4 max-[1440px]:mt-3 max-[768px]:mt-2 space-x-3 max-[768px]:space-x-2">
                      {Array.from({ length: totalImages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => changeImage(index)}
                          className={`w-[8px] h-[4px] max-[1440px]:w-[6px] max-[1440px]:h-[3px] max-[768px]:w-[5px] max-[768px]:h-[2px] rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? "bg-black scale-125"
                              : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {totalImages > 1 && (
                    <div className="md:hidden text-center mt-2">
                      <p className="text-xs max-[768px]:text-[10px] text-gray-500 uppercase tracking-wide">
                        Swipe to browse images
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Right Container */}
            <div
              className={`${
                isMobile
                  ? "w-full px-[15vw]"
                  : "w-[375px] pb-[50vh]  max-[1440px]:w-[24vw]"
              }`}
            >
              <div className="pt-8 border-b pb-2">
                <h3
                  className="w-full text-center text-[14px] uppercase tracking-[1px] max-[1440px]:text-[12px] max-[1024px]:text-[10px]"
                  style={{ fontFamily: "frankton-mono-bold" }}
                >
                  Details
                </h3>
                <p
                  className="text-[22px] max-[1440px]:text-[18px] max-[1024px]:text-[14px]  leading-[28px] tracking-[-0.16px]  mt-[10px] "
                  style={{ fontFamily: "eb-garamond-regular" }}
                >
                  {product.details}
                </p>
              </div>

              {/* Packaging */}
              <div className={`border-b pt-8 pb-2 ${!isMobile && "mt-[50vh]"}`}>
                <button
                  onClick={() => setShowPackaging(!showPackaging)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span
                    className="text-[16px] tracking-[1px] max-[1440px]:text-[14px] max-[1024px]:text-[12px] uppercase font-[700]"
                    style={{ fontFamily: "frankton-mono-bold" }}
                  >
                    Packaging
                  </span>
                  <FaPlus ref={packagingIconRef} className="w-5 h-5" />
                </button>
                <div
                  ref={packagingContentRef}
                  className="overflow-hidden"
                  style={{ height: showPackaging ? "auto" : 0 }}
                >
                  <div
                    className="mt-4 text-gray-700 leading-relaxed uppercase font-[700] text-[16px] max-[1440px]:text-[14px] max-[1024px]:text-[12px]"
                    style={{ fontFamily: "frankton-mono-bold" }}
                  >
                    {product.packaginDetails ||
                      "Eco-friendly packaging with sustainable materials. Each product is carefully wrapped to ensure safe delivery while minimizing environmental impact."}
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="border-b pt-8 pb-2">
                <button
                  onClick={() => setShowProductDetails(!showProductDetails)}
                  className="flex items-center justify-between w-full text-left max-[1440px]:text-[14px] max-[1024px]:text-[12px]"
                >
                  <span
                    className="text-[16px] tracking-[1px] max-[1440px]:text-[14px] max-[1024px]:text-[12px] uppercase font-[700] "
                    style={{ fontFamily: "frankton-mono-bold" }}
                  >
                    Shipping & Returns
                  </span>
                  <FaPlus ref={careIconRef} className="w-5 h-5" />
                </button>
                <div
                  ref={careContentRef}
                  className="overflow-hidden uppercase text-[16px] max-[1440px]:text-[14px] max-[1024px]:text-[12px]"
                  style={{ height: showProductDetails ? "auto" : 0 }}
                >
                  <div
                    className="mt-4 text-gray-700 leading-[24px] font-[700]"
                    style={{ fontFamily: "frankton-mono-bold" }}
                  >
                    <p>
                      Delivery Time: 5-7 days
                      <br />
                      <br />
                      Due to additional health and safety measures to protect
                      our logistics teams, your delivery may take a little
                      longer. Please note, that we might not be able to deliver
                      to all areas. You will be notified about the same during
                      checkout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-20 pt-16 px-4 md:px-8 lg:px-16 mb-[40vh]">
          <div className="text-center mb-12">
            <p
              className="text-[14px] max-[1440px]:text-[12px] max-[1024px]:text-[10px] text-gray-600 uppercase  tracking-[1px]"
              style={{ fontFamily: "frankton-mono-bold" }}
            >
              You May Also Like
            </p>
            <h2
              className="text-[30px] max-[1440px]:text-[28px] max-[1024px]:text-[24px] "
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              Drop Collection
            </h2>
          </div>
          <div className="flex px-[181px] max-[1440px]:px-[80px] justify-between mt-[180px] max-[900px]:flex-col max-[900px]:gap-[81px] max-[900px]:items-center max-[900px]:px-4">
            <CatalogueCard
              itemDetails={products[1]}
              cardDetails={cardDimensions.card1}
            />
            <CatalogueCard
              itemDetails={products[1]}
              cardDetails={cardDimensions.card2}
            />
          </div>

          <div className="flex px-[181px] max-[1440px]:px-[80px] max-[1440px]:justify-center gap-[340px] mt-[200px] max-[900px]:mt-[81px] max-[1440px]:gap-[130px] max-[900px]:flex-col max-[900px]:gap-[81px] max-[900px]:items-center max-[900px]:px-4">
            <CatalogueCard
              itemDetails={products[1]}
              cardDetails={cardDimensions.card3}
            />
            <CatalogueCard
              itemDetails={products[1]}
              cardDetails={cardDimensions.card4}
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="w-screen h-screen flex flex-col items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(to right, black, rgba(0, 0, 0, 0)), url(/bg/product-details-bg.png)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="text-white flex flex-col items-center justify-center">
            <h2
              className="text-[40px]"
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              Hueéd & You
            </h2>
            <p
              className="uppercase mt-[10px] text-[16px] max-[1440px]:text-[14px] max-[1024px]:text-[12px] font-[500] tracking-[4px]"
              style={{ fontFamily: "gt-regular" }}
            >
              care beyond the garment
            </p>
          </div>
          <div className=" text-white flex flex-col items-center justify-center mt-[40px]">
            <p
              className="w-[421px] max-[600px]:w-[70vw] text-center text-[22px] max-[1440px]:text-[20px] max-[1024px]:text-[18px] leading-[28px] tracking-[-0.16px] "
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              Preserve the spirit of every shade with personalized services that
              restore, revive, and honor your Hueéd piece—season after season.
            </p>
            <button
              className=" text-[24px] max-[1440px]:text-[22px] max-[1024px]:text-[20px] border-b-2 border-white mt-[10px] tracking-[1px] leading-[28px]"
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Image Preview Modal */}
        {showImagePreview && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={() => setShowImagePreview(false)}
          >
            <div className="relative max-w-[90vw] max-h-[90vh] overflow-hidden">
              <button
                onClick={() => setShowImagePreview(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className="relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={currentImage}
                  alt={product.name}
                  className="max-w-full max-h-[80vh] object-contain"
                  draggable={false}
                  style={{ maxWidth: "100%", maxHeight: "80vh" }}
                />

                {totalImages > 1 && (
                  <>
                    <button
                      onClick={() => prevImage()}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M15 18l-6-6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => nextImage()}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 18l6-6-6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </>
                )}

                {totalImages > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {totalImages}
                  </div>
                )}
              </div>

              {totalImages > 1 && (
                <div className="flex justify-center mt-6 space-x-3 max-w-full overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => changeImage(index)}
                      className={`flex-shrink-0 transition-all duration-200 hover:scale-105 overflow-hidden ${
                        index === currentImageIndex
                          ? "ring-2 ring-white ring-offset-2 ring-offset-black/50"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-lg"
                        draggable={false}
                        style={{ maxWidth: "64px", maxHeight: "64px" }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
