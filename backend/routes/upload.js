//Lecture 82.1 route for upload, Create routes:upload.js
const express = require("express");
//Lecture 82.1 import uploadImages route
const {
  uploadImages,
  //Lecture 98.7 import listImages
  listImages,
} = require("../controllers/upload");
//Lecture 82.1 import authUser
const { authUser } = require("../middlwares/auth");
//Lecture 82.10 import imageupload
const imageUpload = require("../middlwares/imageUpload");

//Lecture 82.1 define router
const router = express.Router();

//Lecture 82.1 uploadImages route
// router.post("/uploadImages", uploadImages);
//Lecture 82.10 add imageupload middleware
router.post("/uploadImages", authUser, imageUpload, uploadImages);
//Lecture 98.7 add listImages route
// router.get("/listImages", listImages);
//Lecture 105.18 create post route
router.post("/listImages", authUser, listImages);

module.exports = router;
