import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import LibCard from "./LibCard";
import axios from "axios";
import LibrarySidebar from "./LibrarySidebar";
import books from "../img/book.png";
import bookstack from "../img/books.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const IssueLibCard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.name;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const [isValidated, setIsValidated] = useState(false);
  const [fieldsMissing, setFieldsMissing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    uid: "",
    branch: "",
    year: "",
    dob: "",
    mobile: "",
    image: "",
  });

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    password: "",
    uid: "",
    branch: "",
    year: "",
    dob: "",
    mobile: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      const reader = new FileReader();
      //   console.log(reader.result);
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result, // Store base64 data URL of the image
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFormData = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      uid: "",
      branch: "",
      year: "",
      dob: "",
      mobile: "",
      image: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const fileInputRef = useRef(); // Create a ref for the file input

  const handleSubmit = () => {
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

        // Set fieldsMissing to true if any field is empty
        return true;
      }
    }
    return false;
    // Set the studentData state
    // setStudentData(formData);
    // console.log(formData);
  };

  const validateUser = async (e) => {
    try {
      const req = await axios.post("http://localhost:8000/validate-user", {
        email: formData["email"],
        password: formData["password"],
      });
      const response = req.data;
      // console.log("Success");
      toast.success("Success! You can download your library card.", {
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

      setIsValidated(true);
      setStudentData(formData);
      clearFormData();
    } catch (error) {
      console.error(error.message);
      // alert("No User Found. Please check the credentials.");
      toast.error("No User Found. Please check the credentials.", {
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
          <div className="w-[7.5%] flex flex-col ">
            <Sidebar />
          </div>
          <div className=" w-[92.5%] px-[1%] flex flex-col relative ">
            <img
              src={books}
              className="absolute bottom-[0%] right-[-1%] -rotate-3 "
              alt=""
            />
            <img
              src={bookstack}
              className="absolute h-[100%] w-[22%] bottom-[0%] right-[5%] "
              alt=""
            />
            <div className=" w-[100%] h-[8%] text-[30px] flex items-center justify-center font-bold "></div>
            <div className=" flex w-[70%] h-[87%]">
              <div className="flex  w-[50%] h-[100%]">
                <div className="flex flex-col  w-[40%] h-[100%] ">
                  <div className="h-[10%] flex items-center justify-end mr-[10%]">
                    <span className="text-[18px] font-semibold">NAME:</span>
                  </div>
                  <div className="h-[10%] flex items-center justify-end mr-[10%]">
                    <span className="text-[18px] font-semibold">EMAIL:</span>
                  </div>
                  <div className="h-[10%] flex items-center justify-end mr-[10%]">
                    <span className="text-[18px] font-semibold">PASSWORD:</span>
                  </div>
                  <div className="h-[10%] flex items-center justify-end mr-[10%]">
                    <span className="text-[18px] font-semibold">UID:</span>
                  </div>
                  <div className="h-[10%] flex items-center justify-end mr-[10%]">
                    <span className="text-[18px] font-semibold">DOB:</span>
                  </div>
                  <div className="h-[10%] flex items-center justify-end mt-[5%] mr-[0%]"></div>
                </div>
                <div className="flex flex-col w-[60%] h-[100%] ">
                  <div className="h-[10%] flex items-center justify-start">
                    <input
                      className="h-[70%] ml-[2%] px-[10px] w-[95%] text-[19px] border border-[#e8b7dc] border-[2px] rounded-[10px]border border-[#e8b7dc] border-[2px] rounded-[10px]"
                      placeholder="Enter Name..."
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="h-[10%] flex items-center justify-start">
                    <input
                      className="h-[70%] ml-[2%] px-[10px] w-[95%] text-[19px] border border-[#e8b7dc] border-[2px] rounded-[10px]border border-[#e8b7dc] border-[2px] rounded-[10px]"
                      name="email"
                      placeholder="Enter Email..."
                      value={formData.email}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>

                  <div className="h-[10%] flex items-center justify-start">
                    <input
                      className="h-[70%] ml-[2%] px-[10px] w-[95%] text-[19px] border border-[#e8b7dc] border-[2px] rounded-[10px]border border-[#e8b7dc] border-[2px] rounded-[10px]"
                      name="password"
                      placeholder="Enter Password..."
                      value={formData.password}
                      onChange={handleInputChange}
                      type="password"
                    />
                  </div>

                  <div className="h-[10%] flex items-center justify-start">
                    <input
                      className="h-[70%] ml-[2%] px-[10px] w-[95%] text-[19px] border border-[#e8b7dc] border-[2px] rounded-[10px]border border-[#e8b7dc] border-[2px] rounded-[10px]"
                      name="uid"
                      placeholder="Enter UID..."
                      value={formData.uid}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>

                  <div className="h-[10%] flex items-center justify-start">
                    <input
                      className="h-[70%] ml-[2%] px-[10px] w-[95%] text-[19px] border border-[#e8b7dc] border-[2px] rounded-[10px]border border-[#e8b7dc] border-[2px] rounded-[10px]"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      type="date"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col  w-[50%] h-[100%]">
                <div className="h-[40%] w-[100%] flex">
                  <div className="flex flex-col  w-[30%] h-[100%] ">
                    <div className="h-[25%] flex items-center justify-end mr-[10%]">
                      <span className="text-[18px] font-semibold">BRANCH:</span>
                    </div>
                    <div className="h-[25%] flex items-center justify-end mr-[10%]">
                      <span className="text-[18px] font-semibold">YEAR:</span>
                    </div>
                    <div className="h-[25%] flex items-center justify-end mr-[10%]">
                      <span className="text-[18px] font-semibold">PHONE:</span>
                    </div>
                    <div className="h-[25%] flex items-center justify-end mr-[10%]">
                      <span className="text-[18px] font-semibold">PHOTO:</span>
                    </div>
                  </div>
                  <div className="flex flex-col w-[60%] h-[100%] ">
                    <div className="h-[25%] flex items-center justify-start">
                      <input
                        className="h-[70%] ml-[2%] px-[10px] w-[95%] text-[19px] border border-[#e8b7dc] border-[2px] rounded-[10px]border border-[#e8b7dc] border-[2px] rounded-[10px]"
                        name="branch"
                        placeholder="Enter Branch..."
                        value={formData.branch}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>
                    <div className="h-[25%] flex items-center justify-start">
                      <input
                        className="h-[70%] ml-[2%] px-[10px] w-[95%] text-[19px] border border-[#e8b7dc] border-[2px] rounded-[10px]border border-[#e8b7dc] border-[2px] rounded-[10px]"
                        name="year"
                        placeholder="Enter Year..."
                        value={formData.year}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>

                    <div className="h-[25%] flex items-center justify-start">
                      <input
                        className="h-[70%] ml-[2%] px-[10px] w-[95%] text-[19px] border border-[#e8b7dc] border-[2px] rounded-[10px]border border-[#e8b7dc] border-[2px] rounded-[10px]"
                        name="mobile"
                        placeholder="Enter Mobile Num..."
                        value={formData.mobile}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>

                    <div className="h-[25%] flex items-center justify-start">
                      <input
                        class="block ml-[2%] w-[95%] pt-[1.7%]  px-[10px] text-sm text-gray-900 flex items-center justify-center rounded-[10px] h-[70%]  cursor-pointer focus:outline-none  "
                        id="file_input"
                        type="file"
                        ref={fileInputRef}
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
                <div className="h-[60%] w-[100%] mt-[1%] flex justify-start ml-[14%]">
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      // console.log("HelloMoto");
                      let field = handleSubmit();
                      if (!field) {
                        // console.log(field);
                        validateUser();
                      }
                    }}
                    className="w-[30%] h-[20%] mt-[3%] relative inline-flex items-center justify-center overflow-hidden font-medium text-black transition duration-300 ease-out border-2  border-[#db6ec0] bg-[#db6ec0] rounded-full shadow-md group"
                  >
                    <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease">
                      <svg
                        class="w-6 h-6 text-black text-[#db6ec0]"
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
                    <span class="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease text-white">
                      UPLOAD
                    </span>
                    <span class="relative invisible">UPLOAD</span>
                  </button>
                  {isValidated && (
                    <PDFDownloadLink
                      document={<LibCard student={studentData} />}
                      fileName={`LibCard${username.toUpperCase()}.pdf`}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        backgroundColor: isHovered ? "white" : "#db6ec0",
                        height: "20%",
                        width: "33%",
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: "20px",
                        marginTop: "3%",
                        alignItems: "center",
                        borderRadius: "39px",
                        border: isHovered ? "solid" : "none",
                        borderWidth: "2px",
                        borderColor: "#db6ec0",
                        color: isHovered ? "#db6ec0" : "white",
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

            {/* <img src={books} className="absolute bottom-0 right-[-3%] h-[70%]" alt="" /> */}
            {/* <div className="h-[90%] flex w-[100%]"> */}
            {/* <div className="  h-[100%] w-[15%]">
                <div className="h-[11.11%] items-center flex justify-end font-semibold text-[20px] pr-[4%] ">Name: </div>
                <div className="h-[11.11%] items-center flex justify-end font-semibold text-[20px] pr-[4%] ">Email:</div>
                <div className="h-[11.11%] items-center flex justify-end font-semibold text-[20px] pr-[4%] ">Password:</div>
                <div className="h-[11.11%] items-center flex justify-end font-semibold text-[20px] pr-[4%] ">UID:</div>
                <div className="h-[11.11%] items-center flex justify-end font-semibold text-[20px] pr-[4%] ">Branch:</div>
                <div className="h-[11.11%] items-center flex justify-end font-semibold text-[20px] pr-[4%] ">Year:</div>
                <div className="h-[11.11%] items-center flex justify-end font-semibold text-[20px] pr-[4%] ">DOB:</div>
                <div className="h-[11.11%] items-center flex justify-end font-semibold text-[20px] pr-[4%] ">Phone:</div>
                <div className="h-[11.11%] items-center flex justify-end font-semibold text-[20px] pr-[4%] ">Photo:</div>

              </div> */}
            {/* <div className=" h-[100%] w-[85%] flex flex-col">
                  <div className=" pl-[4%] h-[11.11%] flex items-center ">
                    <input
                      className="w-[50%] py-[1.3%] px-[10px] border border-black border-[1px]"
                      placeholder="Enter Name..."
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className=" pl-[4%] h-[11.11%] flex items-center ">
                    <input
                      className="w-[50%] py-[1.3%] px-[10px] border border-black border-[1px]"
                      name="email"
                      placeholder="Enter Email..."
                      value={formData.email}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>
                  <div className=" pl-[4%] h-[11.11%] flex items-center ">
                    <input
                      className="w-[50%] py-[1.3%] px-[10px] border border-black border-[1px]"
                      name="password"
                      placeholder="Enter Password..."
                      value={formData.password}
                      onChange={handleInputChange}
                      type="password"
                    />
                  </div>
                  <div className=" pl-[4%] h-[11.11%] flex items-center ">
                    <input
                      className="w-[50%] py-[1.3%] px-[10px] border border-black border-[1px]"
                      name="uid"
                      placeholder="Enter UID..."
                      value={formData.uid}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>
                  <div className=" pl-[4%] h-[11.11%] flex items-center ">
                    <input
                      className="w-[50%] py-[1.3%] px-[10px] border border-black border-[1px]"
                      name="branch"
                      placeholder="Enter Branch..."
                      value={formData.branch}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>

                  <div className=" pl-[4%] h-[11.11%] flex items-center ">
                    <input
                      className="w-[50%] py-[1.3%] px-[10px] border border-black border-[1px]"
                      name="year"
                      placeholder="Enter Year..."
                      value={formData.year}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>
                  <div className=" pl-[4%] h-[11.11%] flex items-center ">
                    <input
                      className="w-[50%] py-[1.3%] px-[10px] border border-black border-[1px]"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      type="date"
                    />
                  </div>
                  <div className=" pl-[4%] h-[11.11%] flex items-center ">
                    <input
                      className="w-[50%] py-[1.3%] px-[10px] border border-black border-[1px]"
                      name="mobile"
                      placeholder="Enter Mobile Num..."
                      value={formData.mobile}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>

                  <div className=" pl-[4%] h-[11.11%] flex items-center ">
 
                      <input class="block w-[50%] py-[1.3%] px-[10px] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:border-gray-600 " id="file_input" type="file" ref={fileInputRef} name="image" onChange={handleImageChange}/>


                  </div>
                  
              </div> */}

            {/* </div> */}
            {/* <div className="h-[10%] w-[100%] py-[2.5%] flex items-center justify-center">
              <button type="submit" className="mr-[8px] text-[27px] h-[40px] w-[90px] text-blue-700 hover:text-white border  border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={(e) => {
                  e.preventDefault();
                  let field = handleSubmit();
                  if (!field) {
                    console.log(field);
                    validateUser();
                  }
                  clearFormData();
                }}>
                  Apply
              </button>
              {isValidated && (
              <PDFDownloadLink
                document={<LibCard student={studentData} />}
                fileName="voucher_slip.pdf"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}

                style={{
                  backgroundColor: isHovered ? "#3B82F6" : "",
                  height: "40px",
                  width: "150px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  border: isHovered ? "none" : "solid",
                  borderWidth: "1px",
                  borderColor: "#3B82F6",
                  color: isHovered? "white" : "#3B82F6",
                  fontSize: "12.5px"

                }}
              >
                {({ loading }) =>
                  loading ? "Loading document..." : "Download Voucher Slip"
                }
              </PDFDownloadLink>
            )}
            </div> */}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default IssueLibCard;
