import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
const TeacherSidebar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      transition: "background-color 0.3s",
      backgroundColor: isActive ? "#f2f4f3" : "white",
      width: "100%",
      height: "25%",
      fontSize: "15px",
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
    };
  };

  return (
    <>
      <div className=" flex flex-col justify-start items-center h-full border-r-[3px] border-[#f2f4f3] ">
        <div className="flex flex-col h-[78%] w-[100%] items-center ">
          <NavLink style={navLinkStyles} to="/">
            <div className="my-[1rem] w-full  ml-[1.5rem]">
              <div className=" flex items-center justify-start gap-10">
                <i class="ri-dashboard-fill text-[27px] text-[#4FD9C5]"></i>
                <div className="text-base -ml-5 roboto-mono-dashFont font-normal">
                  Dashboard
                </div>
              </div>
            </div>
          </NavLink>
          <NavLink style={navLinkStyles} to="/update-scores">
            <div className="my-[1rem] w-full ml-[1.5rem]">
              <div className=" flex items-center  justify-start gap-10">
                <i class="ri-pencil-ruler-2-fill text-[27px] text-[#4FD9C5]"></i>
                <div className="text-base -ml-5 roboto-mono-dashFont font-normal">
                  Update Scores
                </div>
              </div>
            </div>
          </NavLink>

          <NavLink style={navLinkStyles} to="/test-scheduler">
            <div className="my-[1rem] w-full  ml-[1.5rem]">
              <div className=" flex items-center justify-start gap-10">
                <i class="ri-calendar-event-fill  text-[27px] text-[#4FD9C5]"></i>
                <div className="text-base -ml-5 roboto-mono-dashFont font-normal">
                  Schedular
                </div>
              </div>
            </div>
          </NavLink>

          <NavLink style={navLinkStyles} to="/upload-resource">
            <div className="my-[1rem] w-full ml-[1.5rem]">
              <div className=" flex items-center  justify-start gap-10">
                <i class="ri-sticky-note-add-fill  text-[27px] text-[#4FD9C5]"></i>
                <div className="text-base -ml-5 roboto-mono-dashFont font-normal">
                  Upload PDF
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default TeacherSidebar;
