const mongoose = require("mongoose");
const autoIncrement = require("mongoose-plugin-autoinc").autoIncrement;

// 1- create Object from mongoose Schema
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "teachers" }, // Change type to ObjectId
  children: [{ type: Number, ref: "childs" }],
});

// Register the auto-increment plugin
schema.plugin(autoIncrement, {
  model: "class",
  field: "_id",
  startAt: 1,
  incrementBy: 1,
});

//2-mapping
module.exports = mongoose.model("class", schema);
