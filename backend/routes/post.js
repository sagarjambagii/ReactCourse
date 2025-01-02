//Lecture 81.1 Create routes:post.js
const express = require("express");
//Lecture 81.3 import createpost
const {
  createPost,
  //Lecture 90.0 import getAllPosts
  getAllPosts,
  //Lecture 137.0 import comment
  comment,
  //Lecture 141.0 import savePost
  savePost,
  //Lecture 143.0 import deletePost
  deletePost,

} = require("../controllers/post");
//Lecture 81.3 import authUser
const { authUser } = require("../middlwares/auth");

//Lecture 81.1 Create routes:post.js
const router = express.Router();

//Lecture 81.3 Create post route
router.post("/createPost", authUser, createPost);
//Lecture 90.0 Display all posts, Create getallposts
// router.get("/getAllPosts", getAllPosts);
//Lecture 90.18 add authUser middleware
router.get("/getAllPosts", authUser, getAllPosts);
//Lecture 137.0 Create comment + comment with image, Create comment
router.put("/comment", authUser, comment);
//Lecture 141.0 Save, unsave post, Create savePost
router.put("/savePost/:id", authUser, savePost);
//Lecture 143.0 Delete post and refresh data, Create delete route
router.delete("/deletePost/:id", authUser, deletePost);


module.exports = router;
