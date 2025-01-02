//Lecture 61.5 get jsonwebtoken
const jwt = require("jsonwebtoken");

//Lecture 61.4 Create middlewares folder:auth.js
exports.authUser = async (req, res, next) => {
  //Lecture 61.6 adding try catch
  try {
    //Lecture 61.8 take value from authorization, Adding bearer
    let tmp = req.header("Authorization");

    //Lecture 61.9 get the token from 7
    const token = tmp ? tmp.slice(7, tmp.length) : "";
    //Lecture 61.10 if token is undefined , invalid authentification
    if (!token) {
      return res.status(400).json({ message: "Invalid Authentification" });
    }
    //Lecture 61.11 verify user
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      //Lecture 61.12 if error return
      if (err) {
        return res.status(400).json({ message: "Invalid Authentification" });
      }
      //Lecture 61.13 add user obj to req
      req.user = user;
      //Lecture 61.14 proceed to next
      next();
    });
  } catch (error) {
    //Lecture 61.7 return message
    return res.status(500).json({ message: error.message });
  }
};
