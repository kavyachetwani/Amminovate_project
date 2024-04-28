const mongoose = require("mongoose");
var system = new mongoose.Schema({
  sys: {
    type: String,
    default: "",
    unique: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});
const SystemRoom = mongoose.model("SystemRoom", system);

module.exports = SystemRoom;
