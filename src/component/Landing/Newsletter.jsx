import React from "react";
import { CgArrowLongRight } from "react-icons/cg";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useEffect, useState, useRef } from "react";

const Newsletter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const dropdownRef = useRef(null);

  const handleSubmit = async () => {
    if (email.trim()) {
      try {
        const formData = new FormData();
        formData.append('EMAIL', email);
  formData.append('u', 'f039ab124ecbe9e0893d12cc8');
  formData.append('id', '91ee2091ac');
  formData.append('f_id', '006999e1f0');
  formData.append('b_f039ab124ecbe9e0893d12cc8_91ee2091ac', '');

        await fetch('https://gmail.us15.list-manage.com/subscribe/post?u=f039ab124ecbe9e0893d12cc8&id=91ee2091ac&f_id=006999e1f0', {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        });

        setIsOpen(true);
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        setIsOpen(true);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (dropdownRef.current) {
      if (isOpen) {
        // Animate down
        dropdownRef.current.style.transform = "translateY(0%)";
      } else {
        // Animate up (initially hidden)
        dropdownRef.current.style.transform = "translateY(-100%)";
      }
    }
  }, [isOpen]);

  return (
    <>
      <div className="w-screen h-screen bg-[#EFEFEF] relative overflow-hidden">
        <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[80px] text-red-400 z-50">
          <img src="/HueedLogo.png" alt="" />
        </div>
        <div className={`w-screen h-screen flex items-center justify-center transition-all duration-500 ${isOpen ? 'blur-sm' : 'blur-none'}`}>
          <div className="flex flex-col items-center justify-center">
            <h2
              className="text-[52px] max-[500px]:text-[46px] tracking-[-0.5px] flex flex-col items-center justify-center mb-4 leading-[60px] max-[500px]:leading-[50px] "
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              <span className="text-[#303030]">Are You</span>
              <span className="text-[#303030]">A Hueman?</span>
            </h2>
            <p
              className=" text-[12px] text-[#303030] text-center tracking-[4px] max-[500px]:tracking-[4px] uppercase max-[500px]:text-[10px] "
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              Join Our Newsletter
            </p>

            <div className="inline-flex w-[310px] max-[500px]:w-[270px] items-center border-b-2 border-[#b9b9b9] px-2 py-2  mt-[40px] ">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full text-[#303030] text-[16px] max-[500px]:text-[14px] outline-none placeholder-[#272727] bg-transparent"
                placeholder="EMAIL"
                style={{ fontFamily: "frankton-mono-bold" }}
              />
              <button onClick={handleSubmit}>
                <IoIosArrowRoundForward className="ml-4 text-[24px] cursor-pointer text-[#303030] transition-colors" />
              </button>
            </div>

            <p
              className=" text-[#303030] w-[400px] max-[500px]:w-[280px] text-center  text-[22px] max-[500px]:text-[20px] tracking-[-0.2px] leading-[26px] max-[500px]:leading-[23px] mt-[35px]"
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              To be a Hueman is to own more than a garment;  it is to own a part
              of a hue, a living story that resonates deeply within us all.
            </p>
          </div>
        </div>

        {/* dropdown content */}
        <div 
          ref={dropdownRef}
          className="w-full h-[60vh] bg-[#F7F7F7] z-20 absolute top-0 transition-transform duration-500 ease-in-out"
          style={{ transform: "translateY(-100%)" }}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <h2
               className="text-[52px] max-[500px]:text-[42px] tracking-[-0.5px] flex flex-col items-center justify-center mb-4 leading-[62px] max-[500px]:leading-[50px] "
               style={{ fontFamily: "eb-garamond-regular" }}
            >
              
              <span className="text-[#303030]">Launching Soon..</span>
            </h2>
            <p
              className=" text-[12px] text-[#303030] text-center tracking-[6px] max-[500px]:tracking-[4px] uppercase max-[500px]:text-[10px] mt-[2px] "
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              Welcome hueman
            </p>

            <p
              className=" text-[#303030] w-[400px] max-[500px]:w-[240px] text-center  text-[22px] max-[500px]:text-[20px] tracking-[-0.2px] leading-[26px] max-[500px]:leading-[23px] mt-[30px]"
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              We're excited to have you on board and can't wait to share valuable insights and exciting content with you.
            </p>
            <button 
              onClick={handleClose}
              className="text-[#303030] text-[22px] max-[500px]:text-[20px] absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded transition-colors" 
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newsletter;