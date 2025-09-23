import React from "react";
import { HiMiniBars2 } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { RiHandbagLine } from "react-icons/ri";

const ProductMenu = ({ onOpenMenu }) => {
  const location = useLocation();
  const path = location.pathname;

  let bgColor = 'bg-white'; // default
  if (path === '/shop/lookbook') bgColor = 'bg-[#c7c7c7]';
  else if (path.startsWith('/shop/product')) bgColor = 'bg-[#EFEFEF]';

  return (
    <>
      <div className={`w-full relative flex items-center justify-between py-[20px] px-[38px] max-[900px]:px-[20px] max-[500px]:px-[15px] pt-[20px] top-0`}>
        {/* left options */}
        <div className="flex items-center text-[#232323] max-[500px]:flex-shrink-0">
          <button onClick={onOpenMenu} className="flex items-center hover:opacity-70 transition-opacity">
            <HiMiniBars2 className="w-[22px] h-[22px] max-[500px]:hidden" />
            <div
              className="flex ml-[10px] max-[500px]:ml-0 uppercase text-[16px] tracking-[1px] max-[1440px]:text-[14px] max-[1280px]:text-[12px] max-[1024px]:text-[11px] max-[768px]:text-[10px] max-[640px]:text-[9px] max-[480px]:text-[8px]"
              style={{ fontFamily: "sohen-breit" }}
            >
              <span className="uppercase font-[700] max-[768px]:text-[14px] whitespace-nowrap">Menu</span>
            </div>

            <span className="ml-[64px] max-[500px]:hidden uppercase font-[700] max-[768px]:opacity-0 cursor-pointer hover:opacity-70 transition-opacity tracking-[1px] text-[16px] max-[1440px]:text-[14px] max-[1280px]:text-[12px] max-[1024px]:text-[11px]" style={{ fontFamily: "sohen-breit" }}>Lookbook</span>
          </button>
        </div>

        {/* logo */}
        <div className="fixed top-10 -translate-y-1/2 left-1/2 -translate-x-1/2 uppercase text-center flex flex-col items-center justify-center mix-blend-difference"
        style={{
          fontFamily: "frankton-mono-bold",
          mixBlendMode: "difference",
          color: "white",
        }}>
          <img src="/HueedLogo.png" alt="" className="w-[7vw] mix-blend-difference max-[1300px]:w-[9vw] max-[900px]:w-[12vw] mt-[-12px] max-[500px]:w-[20vw]" />
        </div>

        {/* right options */}
        <div className="flex items-center gap-[32px] max-[500px]:gap-[10px] max-[500px]:flex-shrink-0 text-[#232323]">
          <IoSearchOutline className="w-[22px] h-[22px] max-[768px]:opacity-0 cursor-pointer hover:opacity-70 transition-opacity" />
          <IoMdHeartEmpty className="w-[22px] h-[22px] max-[768px]:opacity-0 cursor-pointer hover:opacity-70 transition-opacity" />
          <FiUser className="w-[22px] h-[22px] max-[768px]:opacity-0 cursor-pointer hover:opacity-70 transition-opacity" />
          <RiHandbagLine className="w-[22px] h-[22px] max-[500px]:opacity-0 cursor-pointer hover:opacity-70 transition-opacity"/>
          <p className="hidden max-[500px]:block uppercase text-[14px]  font-[700] whitespace-nowrap" style={{fontFamily:"sohen-breit"}}>Cart (2)</p>
        </div>
      </div>
    </>
  );
};

export default ProductMenu;