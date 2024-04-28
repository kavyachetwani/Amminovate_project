import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useStatStyles } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// import "@react-pdf-viewer/core/lib/styles/index.css";

const Resources = () => {
  const subjectsByYear = useSelector(
    (state) => state.subjects.subjectsByYear || {}
  );
  // console.log(subjectsByYear);
  const student = localStorage.getItem("user");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const studentObject = JSON.parse(student);
  const notesArr = studentObject.notesRef;
  // console.log(notesArr);
  const subNotes = notesArr.filter((note) => {
    // Return true if the note's subject matches the selected subject
    return note.subject === selectedSubject;
  });

  // console.log(selectedSubject);
  // console.log(subNotes);

  const userYear = studentObject.year;
  let subjects = [];
  // console.log(userYear);
  if (subjectsByYear.hasOwnProperty(userYear)) {
    // Retrieve the value associated with the key that matches userYear
    subjects = subjectsByYear[userYear];
    // console.log(subjects);
  } else {
    console.log(`No subjects found for the year ${userYear}.`);
  }
  const handleSubjectSelection = (e) => {
    setSelectedSubject(e.target.value);
  };
  const handleOpenPdf = (note) => {
    const subUrl = note.url;
    // Pass the URL directly to window.open
    window.open(subUrl, "_blank");
  };
  //   console.log(subjectsByYear);

  // const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
  const CORS_PROXY = "http://localhost:3000/proxy?url=";
  async function downloadPDF(link, title) {
    try {
      const corsUrl = CORS_PROXY + encodeURIComponent(link);
      console.log(link);
      console.log(".");
      console.log(corsUrl); //hagging
      console.log(".");
      const response = await fetch(corsUrl);
      console.log(response);
      console.log(".");
      const contentType = response.headers.get("Content-Type");
      console.log("Content-Type:", contentType);

      const blob = await response.blob();
      console.log(blob);

      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = blobUrl;
      a.download = title;
      a.click();

      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  }

  // Example usage:
  return (
    <>
      <div className="h-[100vh]">
        <Navbar />
        <div className="flex h-[90%]">
          <div className="w-[7.5%] flex flex-col ">
            <Sidebar />
          </div>
          <div className=" justify-center w-[92.5%] flex flex-col">
            <div className="w-[100%] h-[15%] border border-[#F2F4F3] border-x-0 border-t-0 border-b-2  flex">
              <div className="h-[100%] w-[30%] flex items-center justify-center">
                <select
                  className=" selector-arrow-resources py-[2.5%] px-[4%] rounded-[9px] borded border-[1px] border-gray-200 text-[#374151]"
                  name="subject-choice"
                  value={selectedSubject}
                  onChange={handleSubjectSelection}
                >
                  <option value={null}>Select Subject</option>
                  {subjects.map((subject) => {
                    return (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="h-[100%] w-[70%] flex items-center justify-start ">
                <span className="font-semibold text-[24px]">
                  Select the subject to view Teacher's Special Resources
                </span>
              </div>
            </div>
            <div className="w-[100%] h-[85%] overflow-y-auto">
              <div class="relative overflow-x-auto border border-2 border-gray-200 shadow-md w-[98%] sm:rounded-lg m-[1%] ">
                <table class="w-[100%] text-sm text-left  rtl:text-right text-gray-500">
                  <thead class=" text-xs text-gray-700 h-[80px] w-[100%] uppercase bg-gray-200">
                    <tr className="w-[100%] text-[16px] bg-[#67ad9c] rounded-[10px] ">
                      <th scope="col" class=" w-[15%] text-white text-center ">
                        Icon
                      </th>
                      <th scope="col" class="text-white w-[35%] pl-[10%] ">
                        Title
                      </th>
                      {/* <th scope="col" class=""></th> */}
                      <th scope="col" class="text-white w-[25%] text-center">
                        View
                      </th>
                      <th scope="col" class="text-white w-[25%] text-center">
                        Download
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {subNotes
                      .slice()
                      .reverse()
                      .map((note, index) => {
                        return (
                          <>
                            <tr class="bg-white border-b h-[75px] w-[100%] hover:bg-gray-50 ">
                              <td class=" w-[15%] text-center ">
                                <i class="ri-file-text-fill text-[25px]"></i>
                              </td>
                              <th
                                scope="row"
                                class=" w-[45%]  pl-[10%]  font-medium text-gray-900 whitespace-nowrap "
                              >
                                {note.title.toUpperCase()}
                              </th>
                              {/* <th class="px-6 py-4 bg-red-200"></th> */}
                              <td
                                class=" w-[20%]  text-center  hover:cursor-pointer "
                                onClick={() => {
                                  handleOpenPdf(note);
                                  // downloadBlobPDF(note.link, "downloaded-file.pdf");
                                }}
                              >
                                <i class="ri-eye-fill text-[22px]"></i>
                              </td>
                              <td
                                class="w-[20%]  text-center hover:cursor-pointer"
                                onClick={() => {
                                  // handleOpenPdf(note);
                                  downloadPDF(note.url, `${note.title}.pdf`);
                                }}
                              >
                                <i class="ri-file-download-fill text-[22px] "></i>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              {/* <div className='bg-[#ada3a3] h-[20%] flex border border-black border-bottom-0'>
                <div className='bg-[#b8f2ff] border-r-[1.5px] border-black w-[10%] flex justify-center items-center text-[20px]'>
                <b>SR NO.</b>
                </div>
                <div className='bg-[#ff9696] w-[50%] border-r-[1.5px] border-black flex justify-center items-center text-[20px]'> <b>TITLE</b> </div>
                <div className='bg-[#ff9696] w-[20%] border-r-[1.5px] border-black flex justify-center items-center text-[20px]'><b>VIEW</b></div>
                <div className='bg-[#b8f2ff] w-[20%] border-r-[1.5px] border-black flex justify-center items-center text-[20px]'><b>DOWNLOAD</b></div>
              </div>
              {subNotes.map((note, index) => {

                return(
                  <div className='bg-[#ada3a3] h-[10%] flex border border-black border-bottom-0'>
                    <div className='bg-[#b8f2ff] border-r-[1.5px] border-black w-[10%] flex justify-center items-center'>
                    {index+1}
                    </div>
                    <div className='bg-[#ff9696] w-[50%] border-r-[1.5px] border-black flex justify-center items-center'> {(note.title).toUpperCase()} </div>
                    <div className='bg-[#ff9696] w-[20%] border-r-[1.5px] border-black flex justify-center items-center hover:cursor-pointer'
                    onClick={() => {
                            handleOpenPdf(note);
                            // downloadBlobPDF(note.link, "downloaded-file.pdf");
                          }}
                    >view</div>
                    <div className='bg-[#b8f2ff] w-[20%] border-r-[1.5px] border-black flex justify-center items-center hover:cursor-pointer'
                    onClick={() => {
                      // handleOpenPdf(note);
                      downloadBlobPDF(note.link, `${note.title}.pdf`);
                    }}
                    >download</div>
                  </div>
                );


                // return (
                //   <p
                //     key={note.title}
                //     onClick={() => {
                //       handleOpenPdf(note);
                //       // downloadBlobPDF(note.link, "downloaded-file.pdf");
                //     }}
                //   >
                //     {note.title}
                //   </p>
                // );
              })} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;
