import React from "react";
import { useLocation } from 'react-router-dom';
import Newsletter from "../common/Newsletter"; 

const Footer = () => {

  const location = useLocation();
  const path = location.pathname;

  let bgColor = 'bg-white'; // default
  if (path === '/shop/lookbook') bgColor = 'bg-[#c7c7c7]';
  else if (path.startsWith('/shop/product')) bgColor = 'bg-[#EFEFEF]';
  return (
    <>
      <div className={` w-screen flex flex-col  ${bgColor} h-screen`}>
        <div className="w-full flex items-center justify-between px-10 pt-20">
          <div className="flex flex-col justify-start items-start  text-[25px]" style={{fontFamily:"editorial-regular"}}> 
            <span>The </span>
            <span>
              House <span style={{fontFamily:"editorial-italic"}} className="lowercase px-1">of</span>Hues
            </span>
          </div>
          <div className="flex flex-col justify-start items-start">
            <h3 className="uppercase font-[700] text-[16px] mb-4" style={{fontFamily:"sohen-breit"}}>newsletters</h3>
            <Newsletter />
          </div>
        </div>

        <div className="w-full flex justify-between items-start mt-[40px] px-10">
          <div className="flex flex-col justify-start">
            <h2
              className="text-[16px] font-[700] uppercase"
              style={{ fontFamily: "sohen-breit" }}
            >
              buy
            </h2>
            <ul
              className="uppercase text-[16px] mt-[10px] leading-[24px] tracking-[-0.16px] "
              style={{ fontFamily: "frankton-mono-bold" }}
            >
              <li>new drops</li>
              <li>clothing </li>
              <li> lookbook</li>
              <li>collection</li>
            </ul>
          </div>

          <div className="flex flex-col justify-start">
            <h2
              className="text-[16px] font-[700] uppercase"
              style={{ fontFamily: "sohen-breit" }}
            >
              buy
            </h2>
            <ul
              className="uppercase text-[16px] mt-[10px] leading-[24px] tracking-[-0.16px] "
              style={{ fontFamily: "frankton-mono-bold" }}
            >
              <li>new drops</li>
              <li>clothing </li>
              <li> lookbook</li>
              <li>collection</li>
            </ul>
          </div>

          <div className="flex flex-col justify-start">
            <h2
              className="text-[16px] font-[700] uppercase  text-right w-full "
              style={{ fontFamily: "sohen-breit" }}
            >
              buy
            </h2>
            <ul
              className="uppercase text-[16px] mt-[10px] leading-[24px] tracking-[-0.16px] text-right "
              style={{ fontFamily: "frankton-mono-bold" }}
            >
              <li>new drops</li>
              <li>clothing </li>
              <li> lookbook</li>
              <li>collection</li>
            </ul>
          </div>

          <div className="flex flex-col justify-end">
            <h2
              className="text-[16px] font-[700] uppercase text-right w-full "
              style={{ fontFamily: "sohen-breit" }}
            >
              buy
            </h2>
            <ul
              className="uppercase text-[16px] mt-[10px] leading-[24px] tracking-[-0.16px]  text-right"
              style={{ fontFamily: "frankton-mono-bold" }}
            >
              <li>new drops</li>
              <li>clothing </li>
              <li> lookbook</li>
              <li>collection</li>
            </ul>
          </div>
        </div>
        <h2 className="uppercase text-[572px] tracking-[-11px] p-0  leading-[1] inline-block align-top" style={{fontFamily:"gt-regular"}}>
          Hueed
        </h2>

        <div className="flex justify-between px-10">
          <p className="uppercase text-[16px]">© 2025 hueed</p>
          <button className="uppercase border-b"> credits</button>
        </div>
      </div>
    </>
  );
};

export default Footer;
