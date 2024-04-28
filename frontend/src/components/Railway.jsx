import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RailwayPDF from "./RailwayPDF"; // Import your VoucherSlip component
import train from "../img/train2.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Railway = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    branch: "",
    aadhar: "",
    year: "",
    dob: "",
    mobile: "",
    travelFrom: "",
    travelTo: "",
  });
  const [studentData, setStudentData] = useState({
    name: "",
    address: "",
    branch: "",
    aadhar: "",
    year: "",
    dob: "",
    mobile: "",
    travelFrom: "",
    travelTo: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const clearFormdata = () => {
    setFormData({
      name: "",
      address: "",
      branch: "",
      aadhar: "",
      year: "",
      dob: "",
      mobile: "",
      travelFrom: "",
      travelTo: "",
    });
  };
  const handleSubmit = () => {
    setStudentData(formData);
    for (let key in formData) {
      if (formData[key] === "") {
        // Display an alert if any parameter is empty
        // window.alert(
        //   `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`
        // );

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

        setIsSubmitted(false);
        return;
      }
    }
    setIsSubmitted(true);

    toast.success("Download the form and avail concession.", {
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

    clearFormdata();
  };
  return (
    <>
      <div className="h-[100vh] overflow-hidden">
        <Navbar />
        <div className="flex h-[90%]">
          <div className="w-[7.5%] flex flex-col ">
            <Sidebar />
          </div>
          <div className=" w-[92.5%] flex flex-col items-center justify-center p-[1%] relative">
            <img
              src={train}
              className="absolute bottom-0 right-[-10%] h-[24%] w-[100%]"
              alt=""
            />
            <div className=" w-[100%] h-[13%] text-[30px] flex items-center justify-center font-bold mb-[1%]">
              Fill this form to avail concession!
            </div>
            <div className=" flex w-[100%]  h-[87%]">
              <div className="flex  w-[50%]   h-[100%] ">
                <div className="flex flex-col  w-[40%]  h-[100%] ">
                  <div className="h-[10%] flex  items-center justify-end mr-[10%]">
                    <span className="text-[18px]  font-semibold">NAME:</span>
                  </div>
                  <div className="h-[10%] flex items-center justify-end mr-[10%]">
                    <span className="text-[18px]  font-semibold">ADDRESS:</span>
                  </div>
                  <div className="h-[10%] flex items-center justify-end mr-[10%]">
                    <span className="text-[18px]  font-semibold">MOBILE:</span>
                  </div>
                  <div className="h-[10%] flex items-center justify-end mr-[10%]">
                    <span className="text-[18px]  font-semibold">AADHAR:</span>
                  </div>
                  <div className="h-[10%] flex items-center justify-end mr-[10%]">
                    <span className="text-[18px]  font-semibold">DOB:</span>
                  </div>
                  <div className="h-[10%] flex items-center justify-end mt-[5%] mr-[0%]"></div>
                </div>
                <div className="flex flex-col w-[60%] h-[100%] ">
                  <div className="h-[10%] flex items-center justify-start">
                    <input
                      type="text"
                      name="name"
                      className=" h-[70%] ml-[2%] pl-[10px] w-[95%] text-[19px] border border-[#B3B4B2] border-1 rounded-[10px]"
                      placeholder="Enter Name..."
                      value={formData.name}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    ></input>
                  </div>
                  <div className="h-[10%] flex items-center justify-start">
                    <input
                      name="address"
                      className="h-[70%] ml-[2%] pl-[10px] w-[95%] text-[19px] border border-[#B3B4B2] border-1 rounded-[10px]"
                      placeholder="Enter Address..."
                      value={formData.address}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      type="text"
                    ></input>
                  </div>

                  <div className="h-[10%] flex items-center justify-start">
                    <input
                      name="mobile"
                      className="h-[70%] ml-[2%] pl-[10px] w-[95%] text-[19px] border border-[#B3B4B2] border-1 rounded-[10px]"
                      placeholder="Enter Mobile Number..."
                      value={formData.mobile}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      type="text"
                    ></input>
                  </div>

                  <div className="h-[10%] flex items-center justify-start">
                    <input
                      className="h-[70%] ml-[2%] pl-[10px] w-[95%] text-[19px] border border-[#B3B4B2] border-1 rounded-[10px]"
                      placeholder="Enter your Aadhar ID..."
                      name="aadhar"
                      value={formData.aadhar}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      type="text"
                    ></input>
                  </div>

                  <div className="h-[10%] flex items-center justify-start">
                    <input
                      className="h-[70%] ml-[2%] px-[10px] w-[95%] text-[19px] border border-[#B3B4B2] border-1 rounded-[10px]border border-[#B3B4B2] border-1 rounded-[10px]"
                      name="dob"
                      value={formData.dob}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      type="date"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  w-[50%] h-[100%]">
                <div className="h-[40%] w-[100%] flex">
                  <div className="flex flex-col  w-[30%] h-[100%] ">
                    <div className="h-[25%] flex items-center justify-end mr-[10%]">
                      <span className="text-[18px]  font-semibold">
                        BRANCH:
                      </span>
                    </div>
                    <div className="h-[25%] flex items-center justify-end mr-[10%]">
                      <span className="text-[18px]  font-semibold">YEAR:</span>
                    </div>
                    <div className="h-[25%] flex items-center justify-end mr-[10%]">
                      <span className="text-[18px]  font-semibold">FROM:</span>
                    </div>
                    <div className="h-[25%] flex items-center justify-end mr-[10%]">
                      <span className="text-[18px]  font-semibold">TO:</span>
                    </div>
                  </div>
                  <div className="flex flex-col w-[60%] h-[100%] ">
                    <div className="h-[25%] flex items-center justify-start">
                      <input
                        name="branch"
                        className="h-[70%] ml-[2%] pl-[10px] w-[95%] text-[19px] border border-[#B3B4B2] border-1 rounded-[10px]"
                        placeholder="Enter Branch..."
                        value={formData.branch}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        type="text"
                      ></input>
                    </div>
                    <div className="h-[25%] flex items-center justify-start">
                      <input
                        name="year"
                        className="h-[70%] ml-[2%] pl-[10px] w-[95%] text-[19px] border border-[#B3B4B2] border-1 rounded-[10px]"
                        placeholder="Enter Year..."
                        value={formData.year}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        type="text"
                      ></input>
                    </div>

                    <div className="h-[25%] flex items-center justify-start">
                      <input
                        className="h-[70%] ml-[2%] pl-[10px] w-[95%] text-[19px] border border-[#B3B4B2] border-1 rounded-[10px]"
                        placeholder="Enter source station..."
                        name="travelFrom"
                        value={formData.travelFrom}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        type="text"
                      ></input>
                    </div>

                    <div className="h-[25%] flex items-center justify-start">
                      <input
                        className="h-[70%] ml-[2%] pl-[10px] w-[95%] text-[19px] border border-[#B3B4B2] border-1 rounded-[10px]"
                        placeholder="Enter destination station..."
                        name="travelTo"
                        value={formData.travelTo}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        type="text"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="h-[60%] w-[100%] mt-[1%] flex justify-start ml-[15%]">
                  <button
                    type="submit"
                    onClick={() => {
                      handleSubmit();
                    }}
                    className="w-[20%] h-[20%] mt-[3%] bg-[#2056b3] relative inline-flex items-center justify-center p-4 px-[6] py-2 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full border border-2  border-[#2056b3] group"
                  >
                    <span class="absolute flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full  bg-white group-hover:translate-x-0 ease">
                      <svg
                        class="w-6 h-6 text-[#2056b3]"
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
                    <span class="absolute text-white flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease ">
                      UPLOAD
                    </span>
                    <span class="relative invisible">UPLOAD</span>
                  </button>
                  {isSubmitted && (
                    <PDFDownloadLink
                      document={<RailwayPDF student={studentData} />}
                      fileName={`RailwayConcession${user.name.toUpperCase()}`}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        backgroundColor: isHovered ? "white" : "#2056b3",
                        height: "20%",
                        width: "22%",
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: "20px",
                        marginTop: "3%",
                        alignItems: "center",
                        borderRadius: "39px",
                        border: isHovered ? "solid" : "none",
                        borderWidth: "2px",
                        borderColor: "#2056b3",
                        color: isHovered ? "#2056b3" : "white",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? "Loading document..." : "DOWNLOAD"
                      }
                    </PDFDownloadLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Railway;
