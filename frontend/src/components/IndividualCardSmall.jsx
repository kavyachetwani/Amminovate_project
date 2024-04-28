import React from "react";
import { cardsData } from "./Data";
import "../App.css";
const IndividualCardSmall = ({ card }) => {
  // console.log(cardsData);
  return (
    <>
      <img src={card.image} className="w-24 h-24 opacity-100 "></img>
      <div className=" text-wrap text-lg roboto-mono-dashFont">
        {card.title}
      </div>
    </>
  );
};
export default IndividualCardSmall;
