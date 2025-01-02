//Lecture 20.0 Let's setup the User modal, Creating models folder:User.js
const mongoose = require("mongoose");

//Lecture 20.2
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      text: true,
      unique: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    picture: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
      trim: true,
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      // type: Array,
      // default: [],
      //Lecture 130.0 Display friends list, make it objectId
      type: ObjectId,
      ref: "User",
    },
    following: {
      // type: Array,
      // default: [],
      //Lecture 130.0 Display friends list, make it objectId
      type: ObjectId,
      ref: "User",
    },
    followers: {
      // type: Array,
      // default: [],
      //Lecture 130.0 Display friends list, make it objectId
      type: ObjectId,
      ref: "User",
    },
    requests: {
      // type: Array,
      // default: [],
      //Lecture 130.0 Display friends list, make it objectId
      type: ObjectId,
      ref: "User",
    },
    //Lecture 20.1
    search: [
      {
        user: {
          // type: ObjectId,
          // ref: "User",
          //Lecture 130.0 Display friends list, make it objectId
          type: ObjectId,
          ref: "User",
          //Lecture 146.0 required true
          required: true,
        },
        //Lecture 146.0 Add to search history, add created at
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
      instagram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          // default: new Date(),
          //Lecture 141.6 required true
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Lecture 20.3 Exporting model
module.exports = mongoose.model("User", userSchema);
