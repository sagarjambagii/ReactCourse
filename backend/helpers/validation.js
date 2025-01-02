//Lecture 23.1 import user model
const User = require("../models/User");
//Lecture 22.8 Create helpers folder:validation.js, Regex: yourname @ domain . (extension) (.again)
exports.validateEmail = (email) => {
  //Lecture 22.9
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};
//Lecture 22.12 validate lenth
exports.validateLength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};
//Lecture 23.1 validate username function
exports.validateUsername = async (username) => {
  let a = false;

  do {
    let check = await User.findOne({ username });
    if (check) {
      //change username
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      a = true;
    } else {
      a = false;
    }
  } while (a);
  return username;
};
