const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: "",
  },
  uid: {
    type: Number,
    default: 0,
  },
  year: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "none",
  },
  marks: {
    type: Object,
    default: {},
  },
  notesRef: {
    type: Array,
    default: [],
  },
  testData: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
