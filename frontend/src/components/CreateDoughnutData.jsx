import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PersonSlice from "../Store/PersonSlice";
import { useSelector } from "react-redux";
import axios from "axios";
const CreateDoughnutData = () => {
  const [count, setCount] = useState(0);
  const fetchCount = async (e) => {
    try {
      const request = await axios.post("http://localhost:8000/get-count", {
        sys: "lib",
      });
      const response = request.data;
      setCount(response.count);
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    fetchCount();
    const intervalId = setInterval(() => {
      fetchCount();
    }, 1000); // Adjust interval time as needed (e.g., 5000ms for 5 seconds)

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);
  //   const count = useSelector((state) => {
  //     console.log("personCount in Redux store:", state.people.personCount);
  //     return state.people.personCount;
  //   });
  const percentage = count ? (count / 2) * 100 : 0;

  // Return the CircularProgressbar component
  return <CircularProgressbar value={percentage} text={`${percentage}%`} />;
};

export default CreateDoughnutData;
