//Lecture 132.1 Create route:react.js
const express = require("express");
//Lecture 132.3 import reactPost
const {
  reactPost,
  //Lecture 133.10 import getReacts
  getReacts,
} = require("../controllers/react");
const { authUser } = require("../middlwares/auth");

const router = express.Router();
//Lecture 132.3 Create reactPost route
router.put("/reactPost", authUser, reactPost);
//Lecture 133.10 create getReacts route
router.get("/getReacts/:id", authUser, getReacts);
module.exports = router;
