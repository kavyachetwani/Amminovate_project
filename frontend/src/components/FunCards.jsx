import React from "react";
import IndividualFunCard from "./IndividualFunCard";
import { funCards } from "./Data";
import "../App.css";
import { NavLink } from "react-router-dom";
const FunCards = () => {
  return (
    <>
      {/* <<div className="w-full bg-yellow-200">> */}
      {funCards.map((funCard, id) => {
        return (
          <>
            <NavLink
              to={funCard.nav}
              className="w-[28.5%] h-[100%]  relative   "
            >
              <IndividualFunCard funCard={funCard} />
            </NavLink>
          </>
        );
      })}
      {/* </div> */}
    </>
  );
};
export default FunCards;
