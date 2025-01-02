//Lecture 12.1 Let's setup routes
const express = require("express");
//Lecture 12.8
// const { home } = require("../controllers/user");
//Lecture 22.1 import register route
//Lecture 27.2 import activateAccount route
//Lecture 28.1 import Login route
//Lecture 61.1 import auth
//Lecture 65.0 import sendVerification
const {
  register,
  activateAccount,
  login,
  auth,
  sendVerification,
  //Lecture 71.1 import findUser
  findUser,
  //Lecture 72.17 import sendResetPasswordCode
  sendResetPasswordCode,
  //Lecture 73.9 import validateResetCode
  validateResetCode,
  //Lecture 74.5 import changePassword
  changePassword,
  //Lecture 98.0 import getProfile
  getProfile,
  //Lecture 108.15 import updateProfilePicture
  updateProfilePicture,
  //Lecture 113.0 import update cover
  updateCover,
  //Lecture 117.0 import updateDetails
  updateDetails,
  //Lecture 124.0 import route
  addFriend,
  //Lecture 124.14 import cancelRequest
  cancelRequest,
  //Lecture 124.21 import follow and unfollow
  follow,
  unfollow,
  //Lecture 124.37 import acceptRequest
  acceptRequest,
  //Lecture 125.0 import unfriend
  unfriend,
  //Lecture 125.10 import deleteRequest
  deleteRequest,
  //Lecture 145.0 import search
  search,
  //Lecture 146.1 import addToSearchHistory
  addToSearchHistory,
  //Lecture 147.0 import getSearchHistory
  getSearchHistory,
  //Lecture 148.0 import removeFromSearch
  removeFromSearch,
  //Lecture 150.0 import getFriendsPageInfos
  getFriendsPageInfos,
} = require("../controllers/user");
//Lecture 61.15 import authUser
const { authUser } = require("../middlwares/auth");

//Lecture 12.2
const router = express.Router();

//Lecture 12.4
// router.get("/user", (req, res) => {
//   res.send("welcome from user home");
// });
//Lecture 12.7
// router.get("/user", home);
//Lecture 22.0 Register and validate data and using Regex to validate email
router.post("/register", register);
//Lecture 27.1 create route
// router.post("/activate", activateAccount);
//Lecture 64.2 add auth user in activate account
router.post("/activate", authUser, activateAccount);
//Lecture 28.0 Login
router.post("/login", login);
//Lecture 61.0 Authentification middlware
// router.post("/auth", auth);
//Lecture 61.15 add authUser
// router.post("/auth", authUser, auth);
//Lecture 65.0 re-Send verification code, Create send verification fn
router.post("/sendVerification", authUser, sendVerification);
//Lecture 71.0 Find user route
router.post("/findUser", findUser);
//Lecture 72.17 define sendResetPasswordCode route
router.post("/sendResetPasswordCode", sendResetPasswordCode);
//Lecture 73.9 Create validateResetCode route
router.post("/validateResetCode", validateResetCode);
//Lecture 74.5 create changePassword route, postman : http://localhost:8000/changePassword, raw: JSON : {"email":"sagar@gmail.com","password":"123456"}
router.post("/changePassword", changePassword);
//Lecture 98.0 Get profile informations and images from cloudinary, Create new route
router.get(
  "/getProfile/:username",
  //Lecture 99.16 add auth user
  authUser,
  getProfile
);
//Lecture 108.15 route for updateProfilePicture, get
//Lecture 108.39 get the data and add path, put
router.put("/updateProfilePicture", authUser, updateProfilePicture);
//Lecture 113.0 Update cover picture part 2, add cover route
router.put("/updateCover", authUser, updateCover);
//Lecture 117.0 Display profile infos intro part 3, add updateDetails
router.put("/updateDetails", authUser, updateDetails);
//Lecture 124.0 send ,cancel,accept request,follow,unfollow backend, Create addfriend route
router.put("/addFriend/:id", authUser, addFriend);
//Lecture 124.14 create cancelRequest route
router.put("/cancelRequest/:id", authUser, cancelRequest);
//Lecture 124.21 create follow and unfollow route
router.put("/follow/:id", authUser, follow);
router.put("/unfollow/:id", authUser, unfollow);
//Lecture 124.37 create acceptRequest route
router.put("/acceptRequest/:id", authUser, acceptRequest);
//Lecture 125.0 Unfriend,delete request,prepare data to send back
router.put("/unfriend/:id", authUser, unfriend);
//Lecture 125.10 Create deleteRequest route
router.put("/deleteRequest/:id", authUser, deleteRequest);
//Lecture 145.0 Live search,display search results, create search route
router.post("/search/:searchTerm", authUser, search);
//Lecture 146.1 Create addToSearchHistory route
router.put("/addToSearchHistory", authUser, addToSearchHistory);
//Lecture 147.0 Display Search History and sort, Create getSearchHistory
router.get("/getSearchHistory", authUser, getSearchHistory);
//Lecture 148.0 Delete from search history and live update, Create removeFromSearch route
router.put("/removeFromSearch", authUser, removeFromSearch);
//Lecture 150.0 Get friends,requests,sent request lists
router.get("/getFriendsPageInfos", authUser, getFriendsPageInfos);

//Lecture 12.3
module.exports = router;
