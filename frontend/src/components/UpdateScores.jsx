import React, { useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import Navbar from "./Navbar";
import { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import SubjectSlice from "../Store/SubjectSlice";
import { useSelector } from "react-redux";
import mathpic from "../img/mathpic.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateScores = () => {
  const [yearSelect, setSelectYear] = useState("");
  function handleSelectYear(e) {
    setSelectYear(e.target.value);
  }
  const user = JSON.parse(localStorage.getItem("user"));

  const subjectList = useSelector(
    (state) => state.subjects.subjectsByYear[yearSelect]
  );
  console.log(subjectList);

  // console.log(subjectList);
  const [csvFile, setCsvFile] = useState(null);
  const [marksData, setMarksData] = useState({});
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);

    if (file) {
      toast.success("CSV Uploaded!", {
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

  const parseCsvFile = async (e) => {
    if (csvFile == null) {
      toast.error("Please select a file!", {
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
    if (
      yearSelect != "FE" &&
      yearSelect != "SE" &&
      yearSelect != "TE" &&
      yearSelect != "BE"
    ) {
      toast.error("Select a Year!", {
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
    const results = await new Promise((resolve, reject) => {
      Papa.parse(csvFile, {
        header: true,
        complete: (result) => {
          resolve(result.data);
        },
        error: (error) => {
          reject(error.message || error);
        },
      });
    });
    // console.log(results);
    results.map((row) => {
      const marks = {};
      for (const subject of subjectList) {
        marks[subject] = row[subject];
      }
      // console.log("TEST");
      let data = {
        email: row.Email || row.email,
        marks: marks,
      };
      // setMarksData(data);
      // console.log(data);
      updateMarksAPI(data);
      setSelectYear("");
    });

    toast.success("Marks updated successfully!", {
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
  };
  const updateMarksAPI = async (data) => {
    try {
      const req = await axios.post("http://localhost:8000/update-marks", data);
      const response = req.data;
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="h-[100vh] overflow-hidden">
        <Navbar />
        <div className="flex h-[90%]">
          <div className="w-[17%] flex flex-col ">
            <TeacherSidebar />
          </div>
          <div className=" w-[83%] flex flex-col relative">
            <img
              src={mathpic}
              className="absolute bottom-[-7%] h-[40%] w-[100%] transform rotate-[0deg] z-[2] opacity-100 "
              alt=""
            />
            <div className="h-[15%]  w-[100]  flex items-center justify-center">
              <span className="font-bold text-[25px]">
                Upload the CSV File with Students' Marks
              </span>
            </div>
            <div className="h-[85%] bg-gray-200 w-[100%]  flex flex-col justify-start items-center p-[1%]">
              <div className="h-[10%] w-[100%] flex items-center justify-center  pb-[0.5%]">
                <select
                  value={yearSelect}
                  onChange={handleSelectYear}
                  className="px-[2%] py-[0.8%] border border-1 border-black selector-arrow-resources rounded-[20px]"
                >
                  <option value="">Select Year</option>
                  <option value="FE">FE</option>
                  <option value="SE">SE</option>
                  <option value="TE">TE</option>
                  <option value="BE">BE</option>
                </select>
              </div>
              <div class="flex items-center justify-center w-[80%] mt-[0]">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-[#dedbd7] dark:hover:border-gray-500 "
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-black">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-black"> CSV Only (MAX. 2MB)</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    accept=".csv"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <a
                onClick={() => {
                  parseCsvFile();
                }}
                className=" mt-[20px] relative inline-flex items-center justify-center p-4 px-[6] py-3 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-black rounded-full shadow-md group z-[2]"
              >
                <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease">
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
                  UPDATE
                </span>
                <span class="relative invisible">UPDATE</span>
              </a>
            </div>

            {/* <div>
              <h1>CSV Parser</h1>
              <input type="file" onChange={handleFileChange} />
              <button onClick={parseCsvFile}>Parse</button>
            </div> */}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default UpdateScores;
