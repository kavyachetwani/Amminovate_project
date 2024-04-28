const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const User = require("./models/User");
require("dotenv").config();
const SystemRoom = require("./models/SystemRoom");
const saltRounds = 10;
// app.set("view engine", "ejs");
const bodyparser = require("body-parser");

app.use(cors());
//app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// app.all("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   if ("OPTIONS" == req.method) {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });

const mongo_uri = process.env.MONGO_URI;
mongoose
  .connect(
    mongo_uri,
    { useNewUrlParser: true },
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

app.post("/register", async (req, res) => {
  const { role, name, email, password, gender, uid, year } = req.body;
  if (
    !role ||
    !name ||
    !email ||
    !password ||
    !gender ||
    (role == "student" && (!uid || !year))
  )
    return res.status(400).send("One or more of the fields are missing.");
  try {
    const user = await User.findOne({
      email,
    });
    if (user) return res.status(400).send("User already exists.");

    // const usersWithSameYear = await User.find({ year });
    // const notesRefData = usersWithSameYear.map((user) => user.notesRef).flat();

    const notesRefData = await User.find({ year: year }).distinct("notesRef");
    const examSched = await User.find({ year: year }).distinct("testData");
    // const allNotesRef = [].concat(...notesRefData);

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let marks;
    if (year === "FE") {
      marks = {
        Physics: "",
        Chemistry: "",
        Mathematics: "",
        "C Programming": "",
      };
    } else if (year === "SE") {
      marks = {
        "Object-Oriented Programming": "",
        "Operating Systems": "",
      };
    } else if (year === "TE") {
      marks = {
        "Data Structures": "",
        Algorithms: "",
      };
    } else if (year === "BE") {
      marks = {
        "Machine Learning": "",
        "Artificial Intelligence": "",
      };
    } else {
      marks = {};
    }

    const newUser = new User({
      role: role,
      name: name,
      email,
      password: hashedPassword,
      gender: gender,
      uid: uid,
      year: year,
      location: "none",
      marks: {},
      notesRef: notesRefData,
      testData: examSched,
    });
    await newUser.save();
    res.status(201).send("User created successfully.");
  } catch (err) {
    //return the error message
    res.status(500).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!password || !email)
    return res.status(400).send("One or more of the fields are missing.");
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) return res.status(400).send("User does not exist.");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials.");
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/update-location", async (req, res) => {
  const { email, location } = req.body;
  if (!email)
    return res.status(400).send("One or more of the fields are missing.");
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) return res.status(400).send("User does not exist.");
    user.location = location;
    await user.save();
    res.status(200).send("Location updated successfully.");
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.post("/update-user", async (req, res) => {
  const { email, gender } = req.body;
  if (!email)
    return res.status(400).send("One or more of the fields are missing.");
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) return res.status(400).send("User does not exist.");
    user.gender = gender;
    await user.save();
    res.status(200).send("Gender updated successfully.");
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.post("/update-marks", async (req, res) => {
  const { email, marks } = req.body;
  if (!email)
    return res.status(400).send("One or more of the fields are missing.");
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) return res.status(400).send("User does not exist.");
    user.marks = marks;
    await user.save();
    res.status(200).send("Marks updated successfully.");
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.post("/update-notes", async (req, res) => {
  const { year, notesLinks } = req.body;
  if (!year)
    return res.status(400).send("One or more of the fields are missing.");
  try {
    const result = await User.updateMany(
      { year: year }, // Query filter: find users whose 'year' matches the 'year' parameter
      { $push: { notesRef: notesLinks } } // Update: set 'notesRef' to 'notesLinks'
    );

    return res
      .status(200)
      .json({ message: `Updated notesRef for ${result.nModified} users.` });
  } catch (err) {
    console.error("Error updating notesRef:", err);
    return res
      .status(500)
      .send("An error occurred while updating the notesRef field.");
  }
});

app.post("/update-events", async (req, res) => {
  const { year, eventArr } = req.body;
  if (!year)
    return res.status(400).send("One or more of the fields are missing.");
  try {
    const result = await User.updateMany(
      { year: year }, // Query filter: find users whose 'year' matches the 'year' parameter
      { $push: { testData: eventArr } } // Update: set 'notesRef' to 'notesLinks'
    );

    return res
      .status(200)
      .json({ message: `Tests updated for ${result.nModified} users.` });
  } catch (err) {
    console.error("Error updating tests:", err);
    return res
      .status(500)
      .send("An error occurred while updating the tests field.");
  }
});

app.post("/validate-user", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!password || !email)
    return res.status(400).send("One or more of the fields are missing.");
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) return res.status(400).send("User does not exist.");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials.");
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/set-count", async (req, res) => {
  const { sys, count } = req.body;
  if (!sys || !count)
    return res.status(400).send("One or more of the fields are missing.");
  try {
    const system = await SystemRoom.findOne({
      sys,
    });
    if (system) return res.status(400).send("User already exists.");
    //  const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newSystem = new SystemRoom({
      sys,
      count: count,
    });
    await newSystem.save();
    res.status(201).send("System created successfully.");
  } catch (err) {
    //return the error message
    res.status(500).send(err.message);
  }
});

app.post("/update-peoplecount", async (req, res) => {
  const { sys, count } = req.body;
  if (!sys || count === undefined || count === null)
    return res.status(400).send("One or more of the fields are missing.");
  try {
    const system = await SystemRoom.findOne({
      sys,
    });
    if (!system) return res.status(400).send("System does not exist.");
    system.count = count;
    await system.save();
    res.status(200).send("Count updated successfully.");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/get-count", async (req, res) => {
  const { sys } = req.body;
  // console.log(email, password);
  if (!sys)
    return res.status(400).send("One or more of the fields are missing.");
  try {
    const system = await SystemRoom.findOne({
      sys,
    });
    if (!system) return res.status(400).send("User does not exist.");
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return res.status(400).send("Invalid credentials.");
    res.status(200).send(system);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.delete("/users/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send("User does not exist.");

    await User.deleteOne({ email });

    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.get("/", async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).send("Email is missing.");
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) return res.status(400).send("User does not exist.");
    res.status(200).send(user.todos);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const port = 8000;
app.listen(port, () => {
  console.log("Server started at " + port);
});
