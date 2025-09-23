import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import CatalogueCard from "../component/shop/CatalougeCard";

const Catalogue = () => {
  const { products } = useSelector((state) => state.products);

  const [cardDimensions, setCardDimensions] = useState({
    card1: { width: "712px", height: "830px" },
    card2: { width: "400px", height: "443px" },
    card3: { width: "400px", height: "595px" },
    card4: { width: "570px", height: "665px" },
    card5: { width: "382px", height: "445px" },
  });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 700) {
        setCardDimensions({
          card1: { width: "90vw", height: "60vh" },
          card2: { width: "90vw", height: "60vh" },
          card3: { width: "90vw", height: "60vh" },
          card4: { width: "90vw", height: "60vh" },
          card5: { width: "90vw", height: "60vh" },
        });
      } else if (screenWidth <= 900) {
        setCardDimensions({
          card1: { width: "80vw", height: "70vh" },
          card2: { width: "40vw", height: "40vh" },
          card3: { width: "45vw", height: "50vh" },
          card4: { width: "50vw", height: "50vh" },
          card5: { width: "35vw", height: "35vh" },
        });
      } else if (screenWidth <= 1150) {
        setCardDimensions({
          card1: { width: "60vw", height: "70vh" },
          card2: { width: "35vw", height: "45vh" },
          card3: { width: "35vw", height: "55vh" },
          card4: { width: "45vw", height: "60vh" },
          card5: { width: "30vw", height: "40vh" },
        });
      } else if (screenWidth <= 1370) {
        setCardDimensions({
          card1: { width: "600px", height: "700px" },
          card2: { width: "350px", height: "400px" },
          card3: { width: "350px", height: "520px" },
          card4: { width: "480px", height: "580px" },
          card5: { width: "320px", height: "380px" },
        });
      } else {
        setCardDimensions({
          card1: { width: "712px", height: "830px" },
          card2: { width: "400px", height: "443px" },
          card3: { width: "400px", height: "595px" },
          card4: { width: "570px", height: "665px" },
          card5: { width: "382px", height: "445px" },
        });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="mt-[54px] w-screen min-h-screen pt-20">
        {/* log menu */}
        <div className="relative w-full px-[38px] max-[700px]:px-4 flex justify-between ">
          <button className="fixed z-10 text-white mix-blend-difference  flex items-center justify-between w-[208px]  border-b-2 border-[#414141]  max-[700px]:w-[93px] max-[700px]:mt-[40px]">
            <span
              className="text-[24px] max-[700px]:text-[22px] "
              style={{ fontFamily: "editorial-regular" }}
            >
              Refine
            </span>{" "}
            <FaPlus className="w-[22px] h-[22px] max-[700px]:w-[18px] max-[700px]:h-[14px]" />
          </button>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
            <p
              className="uppercase text-[16px] max-[700px]:text-[10px] font-[700]"
              style={{ fontFamily: "sohen-breit" }}
            >
              drop one
            </p>
            <h3
              className="text-[40px] max-[900px]:text-[32px] max-[700px]:text-[22px] leading-[50px] max-[700px]:leading-[30px] tracking-[-0.4px] font-[400] mt-1"
              style={{ fontFamily: "editorial-regular" }}
            >
              Sky Blue
            </h3>
          </div>

          <button className="fixed right-[38px] max-[700px]:right-4 z-10 items-center text-white mix-blend-difference  flex justify-between w-[208px]  border-b-2 border-[#414141]   max- max-[700px]:w-[93px] max-[700px]:mt-[40px]">
            <span
              className="text-[24px] max-[700px]:text-[22px] "
              style={{ fontFamily: "editorial-regular" }}
            >
              Story
            </span>{" "}
            <FaPlus className="w-[22px] h-[22px] max-[700px]:w-[18px] max-[700px]:h-[14px]" />
          </button>
        </div>

        {/* catalogue items */}
        <div className="w-full">
          <div className="flex items-center justify-center mt-[90px] max-[700px]:mt-[20vh]">
            <CatalogueCard
              itemDetails={products[1]}
              cardDetails={cardDimensions.card1}
            />
          </div>

          <div className="flex px-[181px] max-[1150px]:px-[50px] max-[900px]:px-[20px] max-[700px]:flex-col max-[700px]:items-center max-[700px]:gap-8 justify-between mt-[200px] max-[700px]:mt-[100px]">
            <CatalogueCard
              itemDetails={products[1]}
              cardDetails={cardDimensions.card2}
            />

            <CatalogueCard
              itemDetails={products[1]}
              cardDetails={cardDimensions.card3}
            />
          </div>

          <div className="flex items-end justify-center gap-[374px] max-[1700px]:gap-[15vw] max-[1024px]:gap-[10vw] max-[900px]:gap-[5vw] max-[700px]:flex-col max-[700px]:items-center max-[700px]:gap-8 mt-[92px] max-[700px]:mt-[60px] mb-[450px] max-[700px]:mb-[200px]">
            <CatalogueCard
              itemDetails={products[1]}
              cardDetails={cardDimensions.card4}
            />

            <CatalogueCard
              itemDetails={products[1]}
              cardDetails={cardDimensions.card5}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalogue;