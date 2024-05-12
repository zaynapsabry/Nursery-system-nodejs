const mongoose = require("mongoose");

// 1- create Object from mongoose Schema
const schema = new mongoose.Schema({
  fullName: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true },
  image: String,
});

//2-mapping
module.exports = mongoose.model("teacher", schema);
