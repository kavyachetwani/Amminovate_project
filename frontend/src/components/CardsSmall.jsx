import React from "react";
import IndividualCardSmall from "./IndividualCardSmall";
import { cardsData } from "./Data";
import "../App.css";
import { NavLink } from "react-router-dom";
const CardsSmall = () => {
  return (
    <div className="flex justify-center items-center w-full h-full ">
      <div className="w-[95%] h-[90%]">
        <div className="grid grid-cols-3 gap-5  justify-items-start items-center w-full h-full">
          {cardsData.map((card, id) => {
            return (
              <>
                <NavLink
                  to={card.nav}
                  className={`w-[95%]  h-[85%] hover:scale-105 duration-100 flex bg-gray-80 ${
                    id % 2 == 0 ? "shadow-[#73A2CC]" : "shadow-[#F49D6E]"
                  }  relative p-4 rounded-[1rem] shadow-custom  `}
                >
                  <div className="flex items-center  gap-4 ">
                    <IndividualCardSmall card={card} />
                  </div>
                </NavLink>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CardsSmall;
