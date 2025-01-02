//Lecture 72.0 Send reset code email, Create models:Code.js, codeSchema
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const codeSchema = new mongoose.Schema({
  code: {
    // type: Number,
    //Lecture 73.24 type eq string
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Code", codeSchema);
