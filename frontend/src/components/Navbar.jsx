import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../img/logo-final.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../Store/UserSlice";
import { AnimatePresence, motion } from "framer-motion";
import userpic from "../img/user.png";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [toggleProfile, setToggleProfile] = useState(false);
  function handleToggleProfile() {
    setToggleProfile(!toggleProfile);
  }
  // const { userObj } = useSelector((state) => state.user);

  // dispatch and navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const [color, setColor] = useState("bg-white");
  // console.log(user);
  const location = useLocation();
  const routeName = location.pathname;
  let pagetitle = "";
  if (routeName == "/") {
    if (user.role == "teacher") {
      pagetitle = "DASHBOARD";
    }
  } else if (routeName == "/stud-dash") {
    pagetitle = "DASHBOARD";
  } else if (routeName == "/lib-dash") {
    pagetitle = "SURVEILLANCE";
  } else if (routeName == "/scores") {
    pagetitle = "SCORES";
  } else if (routeName == "/rooms") {
    pagetitle = "ROOMS";
  } else if (routeName == "/railway") {
    pagetitle = "RAILWAY CONCESSIONS";
  } else if (routeName == "/resources") {
    pagetitle = "RESOURCES";
  } else if (routeName == "/coding") {
    pagetitle = "CODING";
  } else if (routeName == "/view360") {
    pagetitle = "CAMPUS TOUR";
  } else if (routeName == "/update-scores") {
    pagetitle = "UPLOAD SCORES";
  } else if (routeName == "/calendar") {
    pagetitle = "SCHEDULAR";
  } else if (routeName == "/test-scheduler") {
    pagetitle = "TEST SCHEDULAR";
  } else if (routeName == "/upload-resource") {
    pagetitle = "UPLOAD RESOURCES";
  } else if (routeName == "/library-card") {
    pagetitle = "ISSUE LIBRARY CARD";
  }
  // console.log(color);
  return (
    <nav
      className={`flex ${
        routeName === "/stud-dash"
          ? "bg-[#ffffff]"
          : routeName === "/lib-dash"
          ? "bg-[#89ccc6]"
          : routeName == "/"
          ? "bg-white"
          : "bg-white"
      } justify-between h-[10%] border-b-[2px]`}
    >
      <div className=" w-[17%] flex items-center justify-center">
        <img src={logo} className="h-[55px] w-[100px] " />
      </div>
      <div className=" w-[60%] flex justify-between items-center pl-[10%] pr-[10%]">
        <div></div>
        <div className="text-[19px] font-semibold ">{pagetitle}</div>
        <div></div>
      </div>
      {/* HADD BAHAR GANDA CSS LIKHA HAI , BEWARE! */}
      <div className=" w-[23%] flex items-center justify-center">
        <div onClick={handleToggleProfile} className=" relative">
          <AnimatePresence>
            <motion.div
              data-isOpen={toggleProfile}
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0, y: 10 }}
              transition={{
                duration: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
                delay: 0.1,
              }}
              // variants={item}
              // initial="hidden"
              // animate="show"
              layout
              className={` ${
                toggleProfile ? "profileDivOpen" : "  absolute top-0 right-0"
              } `}
            >
              {toggleProfile && (
                <>
                  <motion.div className=" profileDivOpen rounded-[1rem] flex flex-col items-center justify-center shadow-custom bg-[#fcf5d2] h-[50%] p-2">
                    <div className="w-full h-full flex flex-col gap-2 rounded-[1rem] justify-center items-center ">
                      <h1 className="font-semibold  text-4xl ">{user.name}</h1>

                      <p className="text-lg  ">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        {user.role === "student" ? ` , ${user.year}` : ""}
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      <i class="ri-logout-box-line absolute top-[18px] left-[15px] text-[23px]"></i>
                    </div>
                  </motion.div>
                  {/* </motion.div> */}
                </>
              )}
            </motion.div>
          </AnimatePresence>
          {/* <motion.div
            initial={{ opacity: 1, y: 20, x: 0 }}
            animate={{ opacity: 1, y: 50, x: -5 }}
            transition={{ duration: 0.2 }}
            className="profileDivOpen  bg-[#8efafa] flex flex-col  "
          > */}
          <img
            src={userpic}
            class=" h-[48px] rounded-full text-[#5471F7] text-[27px] hover:cursor-pointer relative z-[120]"
          ></img>

          {/* </motion.div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
