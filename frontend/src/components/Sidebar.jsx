import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      transition: "background-color 0.3s",
      backgroundColor: isActive ? "#f2f4f3" : "white",
      width: "100%",
      height: "14%",
      fontSize: "15px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      
    };
  };

  const [isHoveredDash, setIsHoveredDash] = useState(false);
  const handleMouseEnterDash = () => {
    setIsHoveredDash(true);
  };
  const handleMouseLeaveDash = () => {
    setIsHoveredDash(false);
  };

  const [isHoveredRoom, setIsHoveredRoom] = useState(false);
  const handleMouseEnterRoom = () => {
    setIsHoveredRoom(true);
  };
  const handleMouseLeaveRoom = () => {
    setIsHoveredRoom(false);
  };

  const [isHoveredScore, setIsHoveredScore] = useState(false);
  const handleMouseEnterScore = () => {
    setIsHoveredScore(true);
  };
  const handleMouseLeaveScore = () => {
    setIsHoveredScore(false);
  };

  const [isHoveredRail, setIsHoveredRail] = useState(false);
  const handleMouseEnterRail = () => {
    setIsHoveredRail(true);
  };
  const handleMouseLeaveRail = () => {
    setIsHoveredRail(false);
  };

  const [isHoveredResource, setIsHoveredResource] = useState(false);
  const handleMouseEnterResource = () => {
    setIsHoveredResource(true);
  };
  const handleMouseLeaveResource = () => {
    setIsHoveredResource(false);
  };

  const [isHoveredCode, setIsHoveredCode] = useState(false);
  const handleMouseEnterCode = () => {
    setIsHoveredCode(true);
  };
  const handleMouseLeaveCode = () => {
    setIsHoveredCode(false);
  };

  const [isHoveredLibCard, setIsHoveredLibCard] = useState(false);
  const handleMouseEnterLibCard = () => {
    setIsHoveredLibCard(true);
  };
  const handleMouseLeaveLibCard = () => {
    setIsHoveredLibCard(false);
  };

  // const userrole = JSON.parse(localStorage.getItem("user")).role;

  const hoverStylesDef =
    "absolute top-[-20px] left-[-14px] bg-[#CDF3F2] py-[5px] px-[10px] text-[10px] rounded-[6px] ";

  return (
    <>
      <div className=" flex flex-col h-[100%] justify-center items-center h-full border-r-[3px] border-[#f2f4f3] ">
        <div className="flex flex-col h-[100%] w-[100%] items-center  ">
          <NavLink style={navLinkStyles} to="/stud-dash">
            <div
              className=" relative mb-[1rem] mt-[1rem] mr-[10px] ml-[0.5rem] flex items-center justify-between"
              onMouseEnter={handleMouseEnterDash}
              onMouseLeave={handleMouseLeaveDash}
            >
              {isHoveredDash && <div className={hoverStylesDef}>Dashboard</div>}
              <i class="ri-dashboard-fill text-[25px] text-[#5EBFBB] mx-[10%]"></i>
              {/* <div>Dashboard</div> */}
            </div>
          </NavLink>

          <NavLink style={navLinkStyles} to="/scores">
            <div className="my-[1rem] ml-[0.5rem]">
              <div
                className=" relative mb-[1rem] mt-[1rem] mr-[10px] ml-[0.5rem] flex items-center justify-between"
                onMouseEnter={handleMouseEnterScore}
                onMouseLeave={handleMouseLeaveScore}
              >
                {isHoveredScore && <div className={hoverStylesDef}>Scores</div>}
                <i class="ri-file-list-3-fill text-[25px] text-[#5EBFBB] mx-[10%]"></i>
                {/* <div>Scores</div> */}
              </div>
            </div>
          </NavLink>

          <NavLink style={navLinkStyles} to="/rooms">
            <div className="my-[1rem] ml-[0.5rem]">
              <div
                className=" relative mb-[1rem] mt-[1rem] mr-[10px] ml-[0.5rem] flex items-center justify-between"
                onMouseEnter={handleMouseEnterRoom}
                onMouseLeave={handleMouseLeaveRoom}
              >
                {isHoveredRoom && <div className={hoverStylesDef}>Rooms</div>}
                <i class="ri-home-wifi-fill text-[25px] text-[#5EBFBB] mx-[10%]"></i>
                {/* <div>Rooms</div> */}
              </div>
            </div>
          </NavLink>

          <NavLink style={navLinkStyles} to="/railway">
            <div className="my-[1rem] ml-[0.5rem]">
              <div
                className=" relative mb-[1rem] mt-[1rem] mr-[10px] ml-[0.5rem] flex items-center justify-between"
                onMouseEnter={handleMouseEnterRail}
                onMouseLeave={handleMouseLeaveRail}
              >
                {isHoveredRail && <div className={hoverStylesDef}>Railway</div>}{" "}
                <i class="ri-train-fill text-[25px] text-[#5EBFBB] mx-[10%]"></i>
                {/* <div>Railway</div> */}
              </div>
            </div>
          </NavLink>

          <NavLink style={navLinkStyles} to="/resources">
            <div className="my-[1rem] ml-[0.5rem]">
              <div
                className=" relative mb-[1rem] mt-[1rem] mr-[10px] ml-[0.5rem] flex items-center justify-between"
                onMouseEnter={handleMouseEnterResource}
                onMouseLeave={handleMouseLeaveResource}
              >
                {isHoveredResource && (
                  <div className={hoverStylesDef}>Resources</div>
                )}{" "}
                <i class="ri-book-open-fill text-[25px] text-[#5EBFBB] mx-[10%]"></i>
                {/* <div>Resources</div> */}
              </div>
            </div>
          </NavLink>

          <NavLink style={navLinkStyles} to="/coding">
            <div className="my-[1rem] ml-[0.5rem]">
              <div
                className=" relative mb-[1rem] mt-[1rem] mr-[10px] ml-[0.5rem] flex items-center justify-between"
                onMouseEnter={handleMouseEnterCode}
                onMouseLeave={handleMouseLeaveCode}
              >
                {isHoveredCode && <div className={hoverStylesDef}>Coding</div>}{" "}
                <i class="ri-code-s-slash-fill text-[25px] text-[#5EBFBB] mx-[10%]"></i>
                {/* <div>Coding</div> */}
              </div>
            </div>
          </NavLink>

          <NavLink style={navLinkStyles} to="/library-card">
            <div className="my-[1rem] ml-[0.5rem]">
              <div
                className=" relative mb-[1rem] mt-[1rem] mr-[10px] ml-[0.5rem] flex items-center justify-between"
                onMouseEnter={handleMouseEnterLibCard}
                onMouseLeave={handleMouseLeaveLibCard}
              >
                {isHoveredLibCard && (
                  <div className={hoverStylesDef}>LibraryCard</div>
                )}
                <i class="ri-id-card-fill text-[25px] text-[#5EBFBB] mx-[10%]"></i>
                {/* <div>LibraryCard</div> */}
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
