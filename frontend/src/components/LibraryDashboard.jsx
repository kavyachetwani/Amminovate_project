import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../Store/UserSlice";
import { updatePersonCount } from "../Store/PersonSlice";
import "../App.css";
import * as ml5 from "ml5";
import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import LibrarySidebar from "./LibrarySidebar";
const dimensions = {
  width: 800,
  height: 500,
};
const LibraryDashboard = () => {
  const { userObj } = useSelector((state) => state.user);
  const [newCount, setNewCount] = useState(0);
  // dispatch and navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const finalCount = useSelector((state) => state.people.personCount);
  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const webcamRef = useRef();
  const canvasRef = useRef();
  const { width, height } = dimensions;
  const updateCountAPI = async (e) => {
    try {
      const request = await axios.post(
        "http://localhost:8000/update-peoplecount",
        {
          sys: "lib",
          count: newCount,
        }
      );
      const response = request.data;
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    let detectionInterval;

    const modelLoaded = () => {
      webcamRef.current.video.width = width;
      webcamRef.current.video.height = height;
      canvasRef.current.width = width;
      canvasRef.current.height = height;

      detectionInterval = setInterval(() => {
        detect();
      }, 1000);
    };

    const objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    const incrementPersonCount = (newCount) => {
      dispatch(updatePersonCount(newCount));
    };
    const detect = () => {
      if (webcamRef.current.video.readyState !== 4) {
        console.warn("Video not ready yet");
        return;
      }

      objectDetector.detect(webcamRef.current.video, (err, results) => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, width, height);
        setNewCount(0);
        if (results && results.length) {
          results.forEach((detection) => {
            const { label, x, y, width, height } = detection;
            if (label === "person") {
              setNewCount((prevCount) => prevCount + 1);

              ctx.beginPath();
              ctx.fillStyle = "#FF0000";

              ctx.fillText(label, x, y - 5);
              ctx.rect(x, y, width, height);
              ctx.stroke();
              // console.log("Dispatched personCount:", finalCount);
            }
          });
        }
        incrementPersonCount(newCount);
        // console.log(finalCount);
      });
    };

    return () => {
      if (detectionInterval) {
        clearInterval(detectionInterval);
      }
    };
  }, [width, height]);
  useEffect(() => {
    console.log("hi");
    updateCountAPI();
  }, [newCount]);
  return (
    <>
      <div className="h-[100vh]">
        <Navbar />
        <div className="flex p-5 h-[90%] flex justify-evenly">
          {/* <div className="w-[17%] flex flex-col ">
            <LibrarySidebar />
          </div> */}

          <div className="App w-[100%]">
            <Webcam ref={webcamRef} className="webcam" />
            <canvas ref={canvasRef} className="canvas" />
          </div>
          <div className=" w-[25%] flex flex-col gap-10 items-center justify-center">
            {/* <div className="flex flex-col  items-center justify-center gap-10"> */}
            <h1 className="noto-sans-dashFont text-center text-[44px]">
              Library Surveillance is ON
            </h1>
            <p className="noto-sans-dashFont text-center text-[24px]">
              Number of Students : {newCount}
            </p>
            {/* </div> */}
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
    </>
  );
};
export default LibraryDashboard;
