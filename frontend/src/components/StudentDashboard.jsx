import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../Store/UserSlice";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";

import "./StudentDashboard/Dash.css";
import CardsSmall from "./CardsSmall";
import FunCards from "./FunCards";
import { Suspense, useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Experience } from "./Experience";
const StudentDashboard = () => {
  const [showAvatar, setShowAvatar] = useState(false);
  const { userObj } = useSelector((state) => state.user);

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

  useEffect(() => {
    setTimeout(() => {
      setShowAvatar(true);
    }, 1000);
  }, []);

  return (
    <>
      {" "}
      {/* <div className="w-full h-full"> */}{" "}
      <motion.div
        initial={{ opacity: 0, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="w-full h-[100vh] "
      >
        <Navbar />
        <div className="flex h-[90%]">
          {/* <Canvas
            className={`w-full h-full`}
            camera={{ position: [0, 19, 0], fov: 30 }}
            resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
            style={{
              position: "absolute",
              height: "80vh",
              zIndex: 100,
              width: "50vw",
              backgroundColor: "red",
            }}
          >
            {/* <color attach="background" args={["#ececec"]} /> 
            <Experience1 />
          </Canvas> */}
          {/* <Canvas
            className={`w-full h-full
                `}
            shadows
            camera={{ position: [0, 0, 10] }} */}
          {/* camera={{ position: [0, 5, 25], fov: 10 }} */}
          {/* >
            <color attach="background" args={["#ececec"]} />
            <Experience1 />
          </Canvas> */}
          {/* <div className="w-[7.5%] flex flex-col ">
            <Sidebar />
          </div> */}
          <div className=" py-2 px-7 bgimg w-full h-full  ">
            <div className="w-full h-full backdrop-blur-sm bg-white/20  rounded-[1.5rem]">
              <div className="flex flex-wrap  justify-center overflow-hidden gap-[3%] h-[52.5%] ">
                <div className="w-[65%]">
                  <CardsSmall />
                </div>
                <div className="flex justify-center items-center w-[24.8%] h-[98%]">
                  <div className="rounded-full flex justify-end items-center  border-2 overflow-hidden w-[98%] h-[98%]">
                    {showAvatar && (
                      <Canvas camera={{ position: [1, 0.2, 1.7], fov: 30 }}>
                        {/* shadows camera={{ position: [0, 2, 5], fov: 30 }}> */}
                        {/* <color attach="background" args={["#ececec"]} /> */}
                        <Experience />
                      </Canvas>
                    )}
                    {/* <Canvas
                      className={`w-full h-full
                `}
                      shadows
                      camera={{ position: [0, 0, 0] }}
                      // camera={{ position: [0, 5, 25], fov: 10 }}
                    >
                      // {/* <color attach="background" args={["#ececec"]} /> */}
                    {/* <Experience1 />
                    </Canvas> */}
                  </div>
                </div>
              </div>
              <div className="flex overflow-hidden justify-center w-full h-[47.5%]">
                <div className="flex w-full  gap-[5%] justify-center mt-2 ">
                  <FunCards />
                </div>
              </div>{" "}
            </div>
            {/* <div>
              
              <div className="grid grid-cols-3 overflow-hidden gap-10  ">
                <div className=" bg-yellow-200">
                  <CardsSmall />
                </div>
                <div className=" bg-yellow-200">2</div>
              </div> */}
            {/* <div className=" bg-yellow-200">2</div>
              <div className="div3 bg-purple-200">3</div> */}
            {/* </div> */}
            {/* <div className="w-[440px] h-[600px]"> */}
            {/* <Canvas
              className="z-[120] "
              shadows
              camera={{ position: [0, 1, 9], fov: 29 }}
            > */}

            {/* </div> */}
            {/* <button
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button> */}
          </div>
        </div>
      </motion.div>{" "}
      {/* </div> */}
    </>
  );
};
export default StudentDashboard;
