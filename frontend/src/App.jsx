import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import "remixicon/fonts/remixicon.css";
import Scores from "./components/Scores";
import Rooms from "./components/Rooms";
import Railway from "./components/Railway";
import Resources from "./components/Resources";
import CodingPlatform from "./components/CodingPlatform";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import LibraryDashboard from "./components/LibraryDashboard";
import TestScheduler from "./components/TestScheduler";
import UpdateScores from "./components/UpdateScores";
import TeacherResources from "./components/TeacherResources";
import Calendar from "./components/Calendar";
import IssueLibCard from "./components/IssueLibCard";
import View360 from "./components/View360";
import * as ml5 from "ml5";
import Finance from "./components/Finance";
import Landing from "./components/Landing";
import TeacherRoute from "./components/TeacherRoute";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }
  // let teacherRoute;
  let defaultRoute;
  switch (user.role) {
    case "student":
      defaultRoute = <Landing role={user.role} />;
      break;
    case "teacher":
      defaultRoute = <TeacherDashboard />;
      break;
    case "library":
      defaultRoute = <Landing role={user.role} />;
      break;
    default:
      defaultRoute = <Login />; // Handle unexpected roles
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={defaultRoute} />
          <Route path="/landing" element={<Landing role={user.role} />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/railway" element={<Railway />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/coding" element={<CodingPlatform />} />
          <Route path="/update-scores" element={<UpdateScores />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/test-scheduler" element={<TestScheduler />} />
          <Route path="/upload-resource" element={<TeacherResources />} />
          <Route path="/library-card" element={<IssueLibCard />} />
          <Route path="/view360" element={<View360 />} />
          <Route path="/finance" element={<Finance />} />
          {/* <Route path="/teach-dash" element={<TeacherDashboard />} /> */}
          <Route path="/stud-dash" element={<StudentDashboard />} />
          <Route path="/lib-dash" element={<LibraryDashboard />} />
          <Route path="/update-scores" element={<UpdateScores />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
