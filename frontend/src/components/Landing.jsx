import { useState } from "react";
import StudentDashboard from "./StudentDashboard";
import { motion } from "framer-motion";
import LibraryDashboard from "./LibraryDashboard";
import { NavLink } from "react-router-dom";
import logo from "../img/logo-final.png";
import "../App.css";
const Landing = ({ role }) => {
  // const [showDashboard, setShowDashboard] = useState(false);
  const username = JSON.parse(localStorage.getItem("user")).name;
  return (
    <>
      <motion.div className="w-full h-[100vh]">
        <motion.div className="absolute top-0 left-0  montserrat-font landingBg w-full h-[100vh] flex justify-center items-center">
          <div className=" w-[17%] absolute top-2 left-3 ">
            <img src={logo} className="w-[80px] h-[45px]" />
          </div>
          <div className=" w-[95%] h-[50%] flex flex-col justify-center items-center gap-8">
            <h1 className="text-8xl text-[#065653] w-[100%] text-center font-black">
              Welcome {role === "student" ? username : "to Library System"}!
            </h1>
            <p className="text-3xl text-[#065653]/70 ">
              You have logged in successfully.
            </p>
            <NavLink
              to={role === "student" ? "/stud-dash" : "/lib-dash"}
              className="cursor-default"
            >
              <button
                onClick={() => setShowDashboard(true)}
                className=" mt-10 relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-[#044240] rounded-xl group"
              >
                <span class="absolute cursor-default top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#05615e] rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span class="absolute cursor-default bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-[#064a48] rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                  {role === "student" ? "Get Started" : "View Surveillance Cam"}
                </span>
              </button>
            </NavLink>
          </div>{" "}
        </motion.div>

        {/* Render your dashboard component here */}
      </motion.div>
    </>
  );
};
export default Landing;
