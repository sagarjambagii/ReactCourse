//Lecture 132.0 Introduction,react model,react function(backend), Create models:Reacts.js
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const reactSchema = new mongoose.Schema({
  react: {
    type: String,
    enum: ["like", "love", "haha", "sad", "angry", "wow"],
    required: true,
  },
  postRef: {
    type: ObjectId,
    ref: "Post",
  },
  reactBy: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("React", reactSchema);
