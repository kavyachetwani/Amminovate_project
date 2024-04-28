import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "../components/Sidebar";
import SubjectSlice from "../Store/SubjectSlice";
import { useSelector } from "react-redux";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Scores = () => {
  const currentStudent = JSON.parse(localStorage.getItem("user"));

  const studentYear = currentStudent.year;
  // console.log(studentYear);
  const subjectList = useSelector(
    (state) => state.subjects.subjectsByYear[studentYear]
  );
  // console.log(subjectList);

  if (!currentStudent.marks) {
    let marks = {};
    subjectList.forEach((subject) => {
      marks[subject] = 0;
    });

    // console.log(marks);

    currentStudent.marks = marks;
    localStorage.setItem("user", JSON.stringify(currentStudent));
  }

  let array = [];
  function test() {
    if (currentStudent.marks) {
      array = subjectList.map((subject, index) =>
        Number(currentStudent.marks[subject])
      );
      return array;
    } else {
      return Array(subjectList.length).fill(0);
    }
  }
  // console.log(test());

  const chartData = {
    labels: subjectList,
    datasets: [
      {
        label: "TEST LABEL",
        data: test(),
        backgroundColor: "rgba(252, 229, 96, 0.4)",
        borderColor: "#ebd036",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
  };
  // console.log("hi");

  return (
    <>
      <div className="h-[100vh] overflow-hidden ">
        <Navbar />
        <div className="flex h-[90%]">
          <div className="w-[7.5%] flex flex-col ">
            <Sidebar />
          </div>
          <div className=" w-[92.5%] flex flex-col">
            <div className=" h-[40%] w-[100%] flex items-center justify-center my-[2%]">
              <Bar data={chartData} options={chartOptions} height={"100%"} />
            </div>
            <div className=" h-[60%] w-[100%] px-[1%]">
              <div class="relative overflow-x-auto overflow-y-auto shadow-md w-[100%] h-[48vh]  sm:rounded-lg ">
                <table class="w-[100%] text-sm text-left  rtl:text-right text-gray-500 ">
                  <thead class="text-xs text-gray-700 h-[80px] w-[100%] uppercase bg-gray-50">
                    <tr className="w-[100%] bg-[#f7df52] bg-opacity-[80%]">
                      <th scope="col" class="px-6 text-center py-4">
                        Sr No.
                      </th>
                      <th scope="col" class="px-6 text-center py-4 ">
                        Subject
                      </th>
                      <th scope="col" class="px-6 text-center py-4">
                        Marks Scored
                      </th>
                      <th scope="col" class="px-6 text-center py-4">
                        Total Marks
                      </th>
                      <th scope="col" class="px-6 text-center py-4">
                        Percentage
                      </th>
                      {/* #ebd036 */}
                    </tr>
                  </thead>
                  <tbody className="">
                    {subjectList.map((subject, index) => {
                      return (
                        <>
                          <tr class="bg-white border-b h-[75px]  hover:bg-gray-50 ">
                            <td class="px-6 text-center py-4">{index + 1}</td>
                            <th
                              scope="row"
                              class="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              {subject}
                            </th>
                            <td class="px-6 text-center py-4">
                              {currentStudent.marks[subject]}
                            </td>
                            <td class="px-6 text-center py-4">{Number(100)}</td>
                            <td class="px-6 text-center py-4">
                              {currentStudent.marks[subject]}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Scores;
