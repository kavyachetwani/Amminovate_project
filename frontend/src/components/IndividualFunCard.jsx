import React, { useState } from "react";
import { cardsData } from "./Data";
import "../App.css";
import { motion } from "framer-motion";

const IndividualFunCard = ({ funCard }) => {
  // console.log(funCard);
  const [showOverlay, setShowOverlay] = useState(false);

  let styleDiv = {
    backgroundImage: funCard.image,
    backgroundSize: "cover",
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
  };

  return (
    <>
      {/* <img src={funCard.image} className="w-12 h-12 opacity-70"></img> */}
      <motion.div
        initial={{ y: 12 }}
        animate={{}}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.1 }}
        style={styleDiv}
        className="rounded-t-[4rem] shadow-custom bg-[#A40E4C] w-full h-full absolute right-0 bottom-0 text-wrap fun-indv-card"
        onHoverStart={() => setShowOverlay(true)}
        onHoverEnd={() => setShowOverlay(false)}
      >
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 150 }}
            transition={{ duration: 0.1 }}
            className="w-full h-full rounded-t-[4rem] text-center flex items-center justify-center p-5 bg-[#0a4a3f]/50 "
          >
            <h1 className="text-5xl text-white w-full "> {funCard.title}</h1>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};
export default IndividualFunCard;
