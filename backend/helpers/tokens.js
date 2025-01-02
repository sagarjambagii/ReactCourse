//Lecture 24.0 JSON web tokens Create tokens.js in healpers folder, npm i jsonwebtoken
const jwt = require("jsonwebtoken");

//Lecture 24.1 create generateToken function
exports.generateToken = (payload, expired) => {
  //Lecture 24.3 return
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expired,
  });
};
