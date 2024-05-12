const mongoose = require("mongoose");
const autoIncrement = require("mongoose-plugin-autoinc").autoIncrement;

// 1- create Object from mongoose Schema
const schema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  level: { type: String, required: true, enum: ["PreKG", "KG1", "KG2"] },
  address: {
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: Number, required: true },
  },
});

// Register the auto-increment plugin
schema.plugin(autoIncrement, {
  model: "childs",
  field: "_id",
  startAt: 1,
  incrementBy: 1,
});

//2-mapping
module.exports = mongoose.model("child", schema);
