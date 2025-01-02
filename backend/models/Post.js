//Lecture 81.0 Post model + create post function, Create models:Post.js
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "profilePicture",
        // "cover"
        //Lecture 113.27 change it to coverPicture
        "coverPicture",
        ,
        null,
      ],
      default: null,
    },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    background: {
      type: String,
    },
    comments: [
      {
        comment: {
          type: String,
        },
        image: {
          type: String,
        },
        commentBy: {
          type: ObjectId,
          ref: "User",
        },
        commentAt: {
          type: Date,
          //Lecture 138.26 remove new Date
          // default: new Date(),
          //Lecture 138.27 add required true
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
