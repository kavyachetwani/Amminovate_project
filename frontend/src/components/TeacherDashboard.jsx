import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearUser } from "../Store/UserSlice";
import TeacherSidebar from "./TeacherSidebar";
import { teacherWorks } from "./Data";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import teachsun1 from "../img/teachsun1.jpg";
import teachsun2 from "../img/teachsun2.jpeg";
import teachsun3 from "../img/teachsun3.jpg";

const TeacherDashboard = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const { userObj } = useSelector((state) => state.user);
  const username = JSON.parse(localStorage.getItem("user")).name;
  // console.log(username);
  // const userName = userObj.name;
  // dispatch and navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(teacherWorks);

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <motion.div className="w-full h-[100vh]">
        {/* //Component here */}
        <motion.div
          initial={{ opacity: 0, y: -500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeIn" }}
          className="w-full h-full"
        >
          <Navbar />
          <div className="flex h-[90%]">
            <div className=" w-full teachDash-bg  flex items-center justify-center">
              <div className="w-[90%] h-[90%]  flex flex-col justify-item-center items-center ">
                <div className=" w-[75%] h-[45%] flex flex-col items-center justify-center ">
                  <h1 className="text-5xl font-black  text-[#21206d]">
                    Welcome {username}!
                  </h1>
                  <p className="text-xl mt-5  text-[#21206d]">
                    What would you like to do today?
                  </p>
                </div>
                <div className="flex items-center  justify-evenly w-full h-[55%]">
                  {teacherWorks.map((work, id) => {
                    return (
                      <motion.div
                        initial={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        className="w-[30%] h-[90%]"
                      >
                        <NavLink
                          style={{
                            backgroundImage: `url(${work.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                          className="rounded-[1.5rem] p-5 shadow-custom-teacher w-full h-full flex text-white justify-start items-center text-2xl"
                          to={work.url}
                        >
                          <div className="w-[100%] h-[100%] text-wrap relative  flex items-center">
                            <h1 className="text-[2.72rem] text-[#cf857e] leading-9 absolute bottom-0  bebas-neue-regular">
                              {work.title}
                            </h1>
                          </div>
                        </NavLink>
                      </motion.div>
                    );
                  })}
                </div>
                {/* <button
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button> */}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
export default TeacherDashboard;
