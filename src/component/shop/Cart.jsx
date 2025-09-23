import React, { useState, useRef, useEffect } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

// Mock data for demonstration
const mockItems = [
  {
    id: 1,
    name: "Embroidered Trench Coat",
    size: "L",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    price: 35000,
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    size: "M",
    image:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=400&fit=crop",
    price: 25000,
  },
  {
    id: 3,
    name: "Silk Evening Dress",
    size: "S",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
    price: 45000,
  },
  {
    id: 4,
    name: "Leather Boots",
    size: "9",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    price: 18000,
  },
];

const Cart = ({ onClose }) => {
  // Start with mockItems to show the functionality
  const [cartItems, setCartItems] = useState(mockItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Simple slide animation using CSS transitions
  const animateSlide = (direction) => {
    if (isAnimating || cartItems.length <= 1) return;

    setIsAnimating(true);

    // Calculate next index
    let newIndex;
    if (direction === "left") {
      newIndex = currentIndex === 0 ? cartItems.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === cartItems.length - 1 ? 0 : currentIndex + 1;
    }

    // Use timeout to simulate animation duration
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 300);
  };

  const handleLeftClick = () => animateSlide("left");
  const handleRightClick = () => animateSlide("right");

  const removeItem = (itemId) => {
    const newItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(newItems);

    // Adjust current index if necessary
    if (currentIndex >= newItems.length && newItems.length > 0) {
      setCurrentIndex(newItems.length - 1);
    } else if (newItems.length === 0) {
      setCurrentIndex(0);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  // Reset animation state when items change
  useEffect(() => {
    setIsAnimating(false);
  }, [cartItems]);

  return (
    <div className="w-[712px] max-[1300px]:w-[550px] max-[800px]:w-screen max bg-white h-screen relative flex flex-col items-center justify-center text-[#232323] z-50">

       {/* mobile close */}
       <button
          onClick={onClose}
          className="absolute top-10 right-10 text-[#232323] uppercase font-[700] text-[10px] hidden max-[800px]:block "
          style={{fontFamily:"sohen-breit"}}
        >
          close
        </button>

        
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute w-[72px] h-[206px] left-[-72px] top-1/2 -translate-y-1/2 bg-white text-[#232323] flex items-center justify-center "
      >
        <X className="text-[22px]" />
      </button>

      <div className="flex flex-col items-center justify-center gap-8 px-8">
        <h2
          className="text-2xl  text-[55px] font-[400] tracking-[-1.65px]"
          style={{ fontFamily: "editorial-regular" }}
        >
          Cart
        </h2>

        {/* Item count */}
        <p
          className="text-gray-300  mt-[18px] text-[16px] font-[700] uppercase tracking-[-0.16px]"
          style={{ fontFamily: "frankton-mono-bold" }}
        >
          {cartItems.length === 0
            ? "Your cart is empty"
            : `${cartItems.length} item${
                cartItems.length > 1 ? "s" : ""
              } in the cart`}
        </p>

        {/* Items list - only show if cart has items */}
        {cartItems.length > 0 && (
          <div className="flex items-center gap-[3vw] min-h-[200px]">
            {/* Left arrow - only show if more than one item */}
            {cartItems.length > 1 && (
              <button
                onClick={handleLeftClick}
                disabled={isAnimating}
                className="text-[#232323] hover:text-gray-300 transition-colors disabled:opacity-50 p-2"
              >
                <ArrowLeft className="text-xl" />
              </button>
            )}

            {/* Items container */}
            <div className="min-w-[350px]  min-h-[120px] flex flex-col items-center ">
              <div className="flex gap-[70px]">
                <div
                  className={`w-[50%] min-w-[150px] flex flex-col gap-2 transition-all duration-300 ${
                    isAnimating
                      ? "opacity-50 transform scale-95"
                      : "opacity-100 transform scale-100"
                  }`}
                >
                  <p
                    className="font-medium text-lg text-[20px] leading-[25px] tracking-[-0.16px]"
                    style={{ fontFamily: "editorial-regular" }}
                  >
                    {cartItems[currentIndex]?.name}
                  </p>
                  <p
                    className="text-[#232323] mt-[16px] font-[700] uppercase"
                    style={{ fontFamily: "frankton-mono-bold" }}
                  >
                    Size {cartItems[currentIndex]?.size}
                  </p>
                  {/* <p className="text-[#232323] font-semibold">
                    ₹{cartItems[currentIndex]?.price.toLocaleString()}
                  </p> */}
                </div>
                <div
                  className={`w-24 h-24 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                    isAnimating
                      ? "opacity-50 transform scale-95"
                      : "opacity-100 transform scale-100"
                  }`}
                >
                  <img
                    src={cartItems[currentIndex]?.image}
                    alt={cartItems[currentIndex]?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjNEE1NTY4Ii8+CjxwYXRoIGQ9Ik0xMiA2QzEzLjEwNDYgNiAxNCA2Ljg5NTQzIDE0IDhDMTQgOS4xMDQ1NyAxMy4xMDQ2IDEwIDEyIDEwQzEwLjg5NTQgMTAgMTAgOS4xMDQ1NyAxMCA4QzEwIDYuODk1NDMgMTAuODk1NCA2IDEyIDZaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xOCAxNkwxNS41IDE0TDEyLjUgMTcuNUwxMC41IDE1LjVMNiAxOEgxOFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";
                    }}
                  />
                </div>
              </div>

              <button
                onClick={() => removeItem(cartItems[currentIndex]?.id)}
                className="text-sm w-full items-center transition-colors mt-[20px] "
                disabled={isAnimating}
                style={{ fontFamily: "sohen-breit" }}
              >
                <span className="uppercase border-b font-[700] text-[12px]">
                  remove
                </span>
              </button>
            </div>

            {/* Right arrow - only show if more than one item */}
            {cartItems.length > 1 && (
              <button
                onClick={handleRightClick}
                disabled={isAnimating}
                className="text-[#232323] hover:text-gray-300 transition-colors disabled:opacity-50 p-2"
              >
                <ArrowRight className="text-xl" />
              </button>
            )}
          </div>
        )}

        {/* Item indicators */}
        {/* {cartItems.length > 1 && (
          <div className="flex gap-2">
            {cartItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating && index !== currentIndex) {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentIndex(index);
                      setIsAnimating(false);
                    }, 300);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        )} */}

        {/* Total */}
        {cartItems.length > 0 && (
          <div
            className="flex justify-between w-[308px] pt-4 border-t border-[#939393] uppercase"
            style={{ fontFamily: "frankton-mono-bold" }}
          >
            <p className="font-medium">Total</p>
            <p>
              <span className="font-bold">{totalPrice.toLocaleString()}</span>
              <span className="ml-1 text-sm">INR</span>
            </p>
          </div>
        )}

        {/* Checkout button */}
        {cartItems.length > 0 && (
          <button
            className="uppercase bg-[#C7C7C7] text-[16px]  px-[104px] py-[10px] text-[#232323] font-[700] tracking-[1px]"
            style={{ fontFamily: "sohen-breit" }}
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
