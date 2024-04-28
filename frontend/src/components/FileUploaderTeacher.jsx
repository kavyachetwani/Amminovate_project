import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FileUploaderTeacher = ({
  pdfFile,
  setPdfFile,
  fileInputRef,
  uploadFileToFirebaseStorage,
}) => {
  // const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);

    if (file) {
      toast.success("File Uploaded.", {
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

  const handleOpenPdf = () => {
    if (pdfFile) {
      const url = URL.createObjectURL(pdfFile);
      window.open(url, "_blank");
    }
  };

  return (
    <div className="w-[70%] ml-[9.2%]">
      <div class="flex items-center justify-center w-[80%]">
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
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-black">PDF Only (MAX. 2MB)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {pdfFile && <button onClick={handleOpenPdf}>View Document</button>}
    </div>
  );
};

export default FileUploaderTeacher;
