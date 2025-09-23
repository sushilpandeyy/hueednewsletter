import React from "react";

const Login = ({ onClose }) => {
  return (
    <>
      <div className="w-[712px] max-[1300px]:w-[550px] max-[800px]:w-screen max bg-white h-screen flex flex-col">

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
          className="absolute w-[72px] h-[206px] right-[-72px] top-1/2 -translate-y-1/2 bg-white text-[#232323] flex items-center justify-center   max-[800px]:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Your login content goes here */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#232323] text-center ">
            <h2
              className="flex flex-col items-center justify-center text-[35px] leading-[35px] tracking-[-1.75px] font-[400]"
              style={{ fontFamily: "editorial-reuglar" }}
            >
              <span>The</span>
              <span className="flex gap-2">
                House <span style={{ fontFamily: "editorial-italic" }}>of</span>
                Hues{" "}
              </span>
            </h2>

            <div className="py-[90px] w-[325px]">
              <h3
                className="text-[16px] font-[700] tracking-[1px] leading-[22px] uppercase w-full text-left"
                style={{ fontFamily: "sohen-breit" }}
              >
                sign up
              </h3>

              <div
                className="py-[38px] text-[16px] tracking-[-0.16px]"
                style={{ fontFamily: "frankton-mono-bold" }}
              >
                <input
                  type="text"
                  placeholder="NAME"
                  className="pl-4 w-full pb-[10px] border-b-[#939393] border-b-2 outline-none bg-transparent "
                />
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="pl-4 w-full pb-[10px] border-b-[#939393] border-b-2 outline-none bg-transparent mt-[15px]"
                />

                <input
                  type="password"
                  placeholder="PASSWORD"
                  className="pl-4 w-full pb-[10px] border-b-[#939393] border-b-2 outline-none bg-transparent mt-[15px]"
                />

                <input
                  type="password"
                  placeholder="CONFIRM PASSWORD"
                  className="pl-4 w-full pb-[10px] border-b-[#939393] border-b-2 outline-none bg-transparent mt-[15px]"
                />

                
              </div>

              <button
                className="w-full bg-[#C7C7C7] text-[#232323] uppercase text-[16px] px-[104px] py-[13px] font-[700] leading-[22px] tracking-[1px] "
                style={{ fontFamily: "sohen-breit" }}
              >
               
                Register
              </button>
            </div>

            <div className="uppercase ">
              <p
                className="text-[16px] font-[700] tracking-[-0.16px]"
                style={{ fontFamily: "frankton-mono-bold" }}
              >
                Already have an account?
              </p>
              <button
                className="mt-[10px] uppercase text-[16px] tracking-[1px] leading-[22px] border-b-2 font-[700]"
                style={{ fontFamily: "sohen-breit" }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
