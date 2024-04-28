import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";
import bgcalendar from "../img/calendarimg2.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TestScheduler = () => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [startTime, setStartTime] = useState("");
  const [end, setEnd] = useState("");
  const [endTime, setEndTime] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [year, setYear] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStartChange = (e) => {
    setStart(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndChange = (e) => {
    setEnd(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleAllDayChange = (e) => {
    setAllDay(e.target.checked);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };
  const setEventsAPI = async (year, eventArr) => {
    try {
      const req = await axios.post("http://localhost:8000/update-events", {
        year: year,
        eventArr: eventArr,
      });

      const response = req.data;
      console.log(response.message);
      if (response.message == "Tests updated for undefined users.") {
        toast.success("Event Scheduled!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error("ERROR! Try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("API call error:", error);
      // Handle the error (e.g., display a message to the user)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use the individual state values (title, start, startTime, end, endTime, allDay) as needed
    if (title && start && startTime && end && year) {
      if (allDay) {
        setEventsAPI(year, {
          title: title,
          start: start,
          allDay: true,
        });
      } else {
        setEventsAPI(year, {
          title: title,
          start: `${start}T${startTime}:00`,
          end: `${end}T${endTime}:00`,
        });
      }
    } else {
      toast.error("All fields are compulsary!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <div className="h-[100vh] overflow-hidden">
        <Navbar />
        <div className="flex h-[90%]">
          <div className="w-[17%] flex flex-col">
            <TeacherSidebar />
          </div>
          <div className="-[#dfbbfa] w-[83%] flex flex-col relative">
            <img
              src={bgcalendar}
              className="absolute top-[39%] right-[-15%] h-[70%] transform rotate-[-9deg] z-[2] opacity-80 "
              alt=""
            />
            <div className="h-[20%] w-[100%] -[#74eaf2] flex items-center justify-start  border border-b-[2px] border-x-0 border-t-0 border-[#F3F4F3]">
              <span className="ml-[11%] font-bold text-[27px]">
                Fill in Details & Submit to Schedule a Test
              </span>
            </div>
            <div className="h-[80%] w-[100%] flex flex-col -[#a3ff8c] z-[3]">
              <div className="flex h-[80%] w-[100%] mt-[3%]">
                <div className="h-[100%] w-[25%] -[#ff8b6e] flex flex-col">
                  <div className="font-semibold text-[20px] h-[14.285%] flex items-center justify-end mr-[4%]">
                    Enter Title:
                  </div>
                  <div className="font-semibold text-[20px] h-[14.285%] flex items-center justify-end mr-[4%]">
                    Select Year:
                  </div>
                  <div className="font-semibold text-[20px] h-[14.285%] flex items-center justify-end mr-[4%]">
                    Enter Start Date:
                  </div>
                  <div className="font-semibold text-[20px] h-[14.285%] flex items-center justify-end mr-[4%]">
                    Enter Start Time:
                  </div>
                  <div className="font-semibold text-[20px] h-[14.285%] flex items-center justify-end mr-[4%]">
                    Enter End Date:
                  </div>
                  <div className="font-semibold text-[20px] h-[14.285%] flex items-center justify-end mr-[4%]">
                    Enter End Time:
                  </div>

                  <div className="font-semibold text-[20px] h-[14.285%] flex items-center justify-end mr-[4%]">
                    All Day:
                  </div>
                </div>
                <div className="h-[100%] w-[75%] -[#d7f573]">
                  <div className=" h-[14.285%] flex items-center justify-start ml-[4%]">
                    <input
                      className="h-[58%] rounded-[8px] pl-[10px] w-[35%] border border-[#b1b3b1] border-[1px]"
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="Enter Title"
                    />
                  </div>
                  <div className=" h-[14.285%] flex items-center justify-start ml-[4%]">
                    <select
                      className="h-[58%] rounded-[8px] px-[10px] w-[35%] border border-[#b1b3b1] border-[1px]"
                      name="YEAR"
                      value={year}
                      onChange={handleYearChange}
                    >
                      <option value="">Select Year</option>
                      <option value="FE">FE</option>
                      <option value="SE">SE</option>
                      <option value="TE">TE</option>
                      <option value="BE">BE</option>
                    </select>
                  </div>
                  <div className=" h-[14.285%] flex items-center justify-start ml-[4%]">
                    <input
                      className="h-[58%] rounded-[8px] px-[10px] w-[35%] border border-[#b1b3b1] border-[1px]"
                      type="date"
                      value={start}
                      onChange={handleStartChange}
                    />
                  </div>
                  <div className=" h-[14.285%] flex items-center justify-start ml-[4%]">
                    <input
                      className="h-[58%] rounded-[8px] px-[10px] w-[35%] border border-[#b1b3b1] border-[1px]"
                      type="time"
                      value={startTime}
                      onChange={handleStartTimeChange}
                    />
                  </div>
                  <div className=" h-[14.285%] flex items-center justify-start ml-[4%]">
                    <input
                      className="h-[58%] rounded-[8px] px-[10px] w-[35%] border border-[#b1b3b1] border-[1px]"
                      type="date"
                      value={end}
                      onChange={handleEndChange}
                    />
                  </div>
                  <div className=" h-[14.285%] flex items-center justify-start ml-[4%]">
                    <input
                      className="h-[58%] rounded-[8px] px-[10px] w-[35%] border border-[#b1b3b1] border-[1px]"
                      type="time"
                      value={endTime}
                      onChange={handleEndTimeChange}
                    />
                  </div>

                  <div className=" h-[14.285%] flex items-center justify-start ml-[4%]">
                    <input
                      className="p-[10px]"
                      type="checkbox"
                      checked={allDay}
                      onChange={handleAllDayChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex h-[20%] ml-[30%] mt-[-2.5%] items-start justify-start w-[100%]">
                <a
                  onClick={handleSubmit}
                  className=" mt-[20px] bg-[#e3e6e4] relative inline-flex items-center justify-center p-4 px-[6] py-3 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-black rounded-full shadow-md group"
                >
                  <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#e3e6e4] group-hover:translate-x-0 ease">
                    <svg
                      class="w-6 h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span class="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
                    SCHEDULE
                  </span>
                  <span class="relative invisible">SCHEDULE</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default TestScheduler;

{
  /*
<button type="submit" onClick={handleSubmit}>Submit</button> */
}
