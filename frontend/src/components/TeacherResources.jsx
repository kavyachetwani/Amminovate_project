import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import TeacherSidebar from "./TeacherSidebar";
import FileUploaderTeacher from "./FileUploaderTeacher";
import axios from "axios";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import filedoodle from "../img/filesdoodle2.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const TeacherResources = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [fileTitle, setFileTitle] = useState("");
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const fileInputRef = useRef(); // Create a ref for the file input

  // Define an object mapping each year to its subjects
  const subjectsByYear = {
    FE: ["Physics", "Chemistry", "Mathematics", "C Programming"],
    SE: ["Object-Oriented Programming", "Operating Systems"],
    TE: ["Data Structures", "Algorithms"],
    BE: ["Machine Learning", "Artificial Intelligence"],
  };

  // Handler for changing the selected year
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setSelectedSubject(""); // Reset selected subject when year changes
  };

  // Handler for changing the selected subject
  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  // const subjectsByYear = useSelector(
  //   (state) => state.subjects.subjectsByYear[selectedYear]
  // );

  function uploadFileToFirebaseStorage() {
    if (pdfFile == null) {
      toast.error("Upload the PDF File.", {
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
      return;
    }
    const pdfRef = ref(storage, `summit/${pdfFile.name + v4()}`);
    console.log(pdfRef, pdfFile);
    uploadBytes(pdfRef, pdfFile).then(() => {
      console.log("File Uploaded.");
    });

    setTimeout(() => {
      getDownloadURL(pdfRef).then((url) => {
        // console.log(url);
        setStudentNotesAPICall(url);
      });
    }, 2000);
  }

  const setStudentNotesAPICall = async (fileURL) => {
    try {
      const req = await axios.post("http://localhost:8000/update-notes", {
        year: selectedYear,

        notesLinks: {
          subject: selectedSubject,
          title: fileTitle,
          url: fileURL,
        },
      });

      const response = req.data;
      console.log(response);
      if (response.message == "Updated notesRef for undefined users.") {
        toast.success("File Shared.", {
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
        toast.error("ERROR!", {
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
    const formData = new FormData();
    if (selectedSubject && selectedYear && fileTitle && pdfFile) {
      formData.append("subject", selectedSubject);
      formData.append("year", selectedYear);
      formData.append("title", fileTitle);
      formData.append("file", pdfFile);
      // console.log(formData);
    } else {
      toast.error("All fields are required.", {
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
    uploadFileToFirebaseStorage();
    // console.log(selectedSubject, selectedYear, fileTitle, pdfFile);
    setFileTitle("");
    setSelectedSubject("");
    setSelectedYear("");
    setPdfFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <>
      <div className="h-[100vh]">
        <Navbar />
        <div className="flex h-[90%] overflow-hidden">
          <div className="w-[17%] flex flex-col ">
            <TeacherSidebar />
          </div>
          <div className=" w-[83%] flex flex-col pt-[5%] relative">
            <img
              src={filedoodle}
              className="absolute top-[31%] right-[-12%] h-[100%] transform rotate-[-120deg] z-[2] opacity-80 z-[2]"
              alt=""
            />
            <div className="h-[10%] w-[100%] flex">
              <div className="w-[25%] h-[100%] flex items-center justify-end">
                <div className="font-semibold text-[20px] mr-[5%]">
                  Enter PDF Title:
                </div>
              </div>
              <div className="w-[75%] h-[100%] flex items-center justify-start ">
                <input
                  className="ml-[5%] w-[48.8%] h-[50%] px-[10px] h-[65%]
                  border border-[#b1b3b1] border-[1px] rounded-[9px]"
                  placeholder="Enter Title..."
                  type="text"
                  value={fileTitle}
                  name="file-title"
                  onChange={(e) => {
                    setFileTitle(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="h-[10%] w-[100%] flex">
              <div className="w-[38%]  h-[100%] flex items-center justify-end">
                <select
                  className="h-[65%] px-[10px] w-[70%] mr-[4%] border border-[#b1b3b1] border-[1px] rounded-[9px]"
                  name="year-choice"
                  value={selectedYear}
                  onChange={handleYearChange}
                >
                  <option value="">Select Year</option>
                  <option value="FE">First Year</option>
                  <option value="SE">Second Year</option>
                  <option value="TE">Third Year</option>
                  <option value="BE">Fourth Year</option>
                </select>
              </div>
              <div className="w-[62%] h-[100%] flex items-center justify-start ">
                <select
                  className="border border-[#b1b3b1] border-[1px] rounded-[9px] h-[65%] px-[10px] w-[42%] ml-[2%]"
                  name="subject-choice"
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                >
                  <option value="">Select Subject</option>
                  {subjectsByYear[selectedYear] &&
                    subjectsByYear[selectedYear].map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="h-[50%] w-[100%] flex items-start pt-[2%] justify-start z-[3]">
              <FileUploaderTeacher
                uploadFileToFirebaseStorage={uploadFileToFirebaseStorage}
                pdfFile={pdfFile}
                setPdfFile={setPdfFile}
                fileInputRef={fileInputRef}
              />
            </div>
            <div className="h-[10%] w-[100%] flex items-center justify-start pl-[32%] pt-[-10%]">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-[18%] mt-[20px] relative inline-flex items-center justify-center p-4 px-[6] py-3 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-black rounded-full shadow-md group"
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
                  UPLOAD
                </span>
                <span class="relative invisible">UPLOAD</span>
              </button>
            </div>
            {/* <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <select
                name="year-choice"
                value={selectedYear}
                onChange={handleYearChange}
              >
                <option value="">Select Year</option>
                <option value="FE">First Year</option>
                <option value="SE">Second Year</option>
                <option value="TE">Third Year</option>
                <option value="BE">Fourth Year</option>
              </select>

              <select
                name="subject-choice"
                value={selectedSubject}
                onChange={handleSubjectChange}
              >
                <option value="">Select Subject</option>
                {subjectsByYear[selectedYear] &&
                  subjectsByYear[selectedYear].map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
              </select>
              <label>Enter Title:</label>
              <input
                type="text"
                value={fileTitle}
                name="file-title"
                onChange={(e) => {
                  setFileTitle(e.target.value);
                }}
              ></input>

              

              <button type="submit">Share</button>
            </form>  */}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default TeacherResources;
