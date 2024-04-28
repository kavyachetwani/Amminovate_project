import score from "../assets/scoreboard.png";
import coding from "../assets/data.png";
import libCard from "../assets/librarypng.png";
import libCardWhite from "../assets/output-onlinepngtools (2).png";
import railWhite from "../assets/output-onlinepngtools (1).png";
import scoreWhite from "../assets/output-onlinepngtools.png";
import resources from "../assets/note-pad.png";
import railway from "../assets/train (1).png";
import rooms from "../assets/university.png";
import scoredoodle from "../img/scoredoodle.png";
import computer from "../img/computer.png";
import notes from "../img/notes.png";
import rail from "../img/rail.png";
import rr1 from "../img/rr1.png";
import rr2 from "../img/rr2.png";
import lib from "../img/lib.png";
import peek from "../img/peek.png";
import teachsun1 from "../img/teachsun1.jpg";
import teachsun2 from "../img/teachsun2.jpeg";
import teachsun3 from "../img/teachsun3.jpg";

export const cardsData = [
  {
    id: 1,
    title: "Note It Down!",
    image: notes,
    nav: "/resources",
  },
  {
    id: 2,
    title: "Code Hive",
    image: computer,
    nav: "/coding",
  },
  {
    id: 3,
    title: "Readio Pass",
    image: lib,
    nav: "/library-card",
  },
  {
    id: 4,
    title: "Mark Mate",
    image: scoredoodle,
    nav: "/scores",
  },
  {
    id: 5,
    title: "Rail the Trail",
    image: rail,
    nav: "/railway",
  },
  {
    id: 6,
    title: "Spot Seeker",
    image: peek,
    nav: "/rooms",
  },
];

export const funCards = [
  {
    id: 1,
    title: "Event PlannerX",
    nav: "/calendar",
    image: "url('../src/img/studsun1.jpeg')",
  },
  {
    id: 2,
    title: "Money Minds",
    nav: "/finance",
    image: "url('../src/img/studsun6.jpeg')",
  },
  {
    id: 3,
    title: "360 Vision",
    nav: "/view360",
    image: "url('../src/img/studsun2.jpeg')",
  },
];

export const teacherWorks = [
  {
    id: 1,
    title: "Update Student Marks",
    url: "/update-scores",
    image: teachsun1,
  },
  {
    id: 2,
    title: " Schedule an Exam",
    url: "/test-scheduler",
    image: teachsun2,
  },
  {
    id: 1,
    title: "Upload Notes",
    url: "/upload-resource",
    image: teachsun3,
  },
];
