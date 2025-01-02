//Lecture 22.5 import user model
const User = require("../models/User");
//Lecture 104.0 import post
const Post = require("../models/Post");
//Lecture 22.15 npm i bcrypt
const bcrypt = require("bcrypt");
//Lecture 22.12 import validate email
//Lecture 22.13 import validate lenth fn
//Lecture 23.2 import validateUsername
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
//Lecture 26.3 import sendVerificationEmail
const {
  sendVerificationEmail,
  //Lecture 72.16 import send reset code
  sendResetCode,
} = require("../helpers/mailer");
//Lecture 27.4 import jwt
const jwt = require("jsonwebtoken");
//Lecture 24.4 import generateToken
const { generateToken } = require("../helpers/tokens");
//Lecture 72.15 import code
const Code = require("../models/Code");
//Lecture 72.9 import generateCode
const generateCode = require("../helpers/generateCode");
//Lecture 12.6 Create Controllers Folder: user.js
// exports.home = (req, res) => {
//   //Lecture 12.6
//   res.send("welcome from user home");
//   //Lecture 18.1 status code:200,204,400,403,404
//   // res.status(200).json({
//   //   message: "fafafafaf",
//   //   error: "fagagag",
//   // });
// };
//Lecture 22.2 EMPTY funtion , Create post request:http://localhost:8000/register
// exports.register = async (req, res) => {
//Lecture 22.4 async await function
exports.register = async (req, res) => {
  //Lecture 22.3
  // console.log(req.body);
  //Lecture 22.6 Adding try catch block
  try {
    //Lecture 22.6 extract information from req.body
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    //Lecture 22.11 validate email
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }

    //Lecture 22.14 check email already exist in data base
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email address already exists,try with a different email address",
      });
    }
    //Lecture 22.14 Check valited lenth of first name
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "first name must between 3 and 30 characters.",
      });
    }
    //Lecture 22.14 Check valited lenth of lastname
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "last name must between 3 and 30 characters.",
      });
    }
    //Lecture 22.14 Check valited lenth of password
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "password must be atleast 6 characters.",
      });
    }

    //Lecture 22.16 npm i bcrypt
    const cryptedPassword = await bcrypt.hash(password, 12);
    // console.log(cryptedPassword);

    //Lecture 23.0 Username live validation
    let tempUsername = first_name + last_name;
    //Lecture 23.2 validate and storing new username
    let newUsername = await validateUsername(tempUsername);
    //Lecture 22.10
    //Lecture 24.4
    // return;
    //Lecture 22.7 Save data to data base
    const user = await new User({
      first_name,
      last_name,
      email,
      // password,
      //Lecture 22.17
      password: cryptedPassword,
      // username,
      //Lecture 23.3
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    //Lecture 24.4 Email verification token
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    // console.log(emailVerificationToken);
    //Lecture 26.3 define url and send verification email
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    //Lecture 26.4 verify login token
    const token = generateToken({ id: user._id.toString() }, "7d");

    //Lecture 22.7 send response
    // res.json(user);
    //Lecture 26.5 send response
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success ! please activate your email to start",
    });
  } catch (error) {
    //Lecture 22.6 Adding try catch block
    res.status(500).json({ message: error.message });
  }
};

//Lecture 27.0 Activate email
exports.activateAccount = async (req, res) => {
  //Lecture 27.0 adding try catch block
  try {
    //Lecture 64.0 Activate Account and fix asecurity, validUser from req
    const validUser = req.user.id;
    //Lecture 27.2 send post request with token in json
    const { token } = req.body;
    // console.log(token);
    //Lecture 27.3 get user details
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(user);
    //Lecture 27.5 check account is already activated
    const check = await User.findById(user.id);
    //Lecture 64.1 if valid user is diffrent
    if (validUser !== user.id) {
      return res.status(400).json({
        message: "You don't have the authorization to complete this operation.",
      });
    }
    //Lecture 27.5 check account is already activated
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "this email is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has beeen activated successfully." });
    }
  } catch (error) {
    //Lecture 27.0 adding try catch block
    res.status(500).json({ message: error.message });
  }
};

//Lecture 28.2 Login Function
exports.login = async (req, res) => {
  //Lecture 28.2 adding try catch block
  try {
    //Lecture 28.3 get email and password
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //Lecture 28.4 send Post request through post man
    if (!user) {
      return res.status(400).json({
        message:
          "the email address you entered is not connected to an account.",
      });
    }
    //Lecture 28.5 Check password matches and send post request with email and password
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials.Please try again.",
      });
    }
    //Lecture 28.6 create token and send reponse login successful
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      //Lecture 43.20 remove message
      // message: "Register Success ! please activate your email to start",
    });
  } catch (error) {
    //Lecture 28.2 adding try catch block
    res.status(500).json({ message: error.message });
  }
};
//Lecture 61.2 Create authUser function
// exports.auth = (req, res, next) => {
//   //Lecture 61.3 response, name:test auth, post req : http://localhost:8000/auth ,
//   res.json("welcome from auth ");
// };
//Lecture 65.1 re-Send verification code, Create send verification fn
exports.sendVerification = async (req, res) => {
  //Lecture 65.2 try Catch block
  try {
    //Lecture 65.4 get the id from req
    const id = req.user.id;
    //Lecture 65.4 get the user
    const user = await User.findById(id);
    //Lecture 65.5 if verified is true
    if (user.verified === true) {
      return res.status(400).json({
        message: "This account is already activated.",
      });
    }
    //Lecture 65.6 generate verification token
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    //Lecture 65.6 create url
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    //Lecture 65.6 send verification email
    sendVerificationEmail(user.email, user.first_name, url);
    //Lecture 65.7 return
    return res.status(200).json({
      message: "Email verification link has been sent to your email.",
    });
  } catch (error) {
    //Lecture 65.3 error message
    res.status(500).json({ message: error.message });
  }
};
//Lecture 71.2 Create findUser fn
exports.findUser = async (req, res) => {
  //Lecture 71.3 add trycatch
  try {
    //Lecture 71.5 get the email
    const { email } = req.body;
    //Lecture 71.6 user in database
    const user = await User.findOne({ email }).select("-password");
    //Lecture 71.7 if no user
    if (!user) {
      return res.status(400).json({
        message: "Account does not exists.",
      });
    }
    //Lecture 71.8 return email and picture
    return res.status(200).json({
      email: user.email,
      picture: user.picture,
    });
  } catch (error) {
    //Lecture 71.4 return error
    res.status(500).json({ message: error.message });
  }
};
//Lecture 72.3 Create sendResetPasswordCode fn
exports.sendResetPasswordCode = async (req, res) => {
  //Lecture 72.4 add try catch
  try {
    //Lecture 72.6 get the email
    const { email } = req.body;
    //Lecture 72.7 get the user
    const user = await User.findOne({ email }).select("-password");
    //Lecture 72.8 remove if already exist
    await Code.findOneAndRemove({ user: user._id });
    //Lecture 72.9 generateCode
    const code = generateCode(5);
    //Lecture 72.15 save code to database
    const savedCode = await new Code({
      code,
      user: user._id,
    }).save();
    //Lecture 72.16 send reset code
    sendResetCode(user.email, user.first_name, code);
    //Lecture 72.17 return message
    return res.status(200).json({
      message: "Email reset code has been sent to your email",
    });
  } catch (error) {
    //Lecture 72.5 return error messaga
    res.status(500).json({ message: error.message });
  }
};
//Lecture 73.0 Validate reset code email
exports.validateResetCode = async (req, res) => {
  //Lecture 73.1 add try catch block
  try {
    //Lecture 73.3 get the email and code
    const { email, code } = req.body;
    //Lecture 73.4 get the user
    const user = await User.findOne({ email });
    //Lecture 73.5 get the code
    const Dbcode = await Code.findOne({ user: user._id });
    //Lecture 73.6 compare the code
    if (Dbcode.code !== code) {
      //Lecture 73.7 return message
      return res.status(400).json({
        message: "Verification code is wrong..",
      });
    }
    //Lecture 73.8 return ok message
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    //Lecture 73.2 error message
    res.status(500).json({ message: error.message });
  }
};
//Lecture 74.0 Change password fn
exports.changePassword = async (req, res) => {
  //Lecture 74.1 get the email and password
  const { email, password } = req.body;

  //Lecture 74.2 crypt password
  const cryptedPassword = await bcrypt.hash(password, 12);
  //Lecture 74.3 update password
  await User.findOneAndUpdate(
    { email },
    {
      password: cryptedPassword,
    }
  );
  //Lecture 74.4 return ok
  return res.status(200).json({ message: "ok" });
};
//Lecture 98.1 create getProfile fn
exports.getProfile = async (req, res) => {
  //Lecture 98.2 adding tryccatch
  try {
    //Lecture 98.4 get the username , postman : get :http://localhost:8000/getProfile/usename1 ,
    const { username } = req.params;
    //Lecture 98.5 find the user
    const profile = await User.findOne({ username }).select("-password");
    //Lecture 125.20 get the user
    const user = await User.findById(req.user.id);
    //Lecture 125.21 define object friendship
    const friendship = {
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    };
    //Lecture 99.20 if user not found
    if (!profile) {
      //Lecture 99.21 return false
      return res.json({ ok: false });
    }
    //Lecture 125.22 check we are friends
    if (
      user.friends.includes(profile._id) &&
      profile.friends.includes(user._id)
    ) {
      friendship.friends = true;
    }
    //Lecture 125.23 check following
    if (user.following.includes(profile._id)) {
      friendship.following = true;
    }
    //Lecture 125.24 check requestReceived
    if (user.requests.includes(profile._id)) {
      friendship.requestReceived = true;
    }
    //Lecture 125.25 check requestSent
    if (profile.requests.includes(user._id)) {
      friendship.requestSent = true;
    }
    //Lecture 98.6 return profile
    // res.json(profile);
    //Lecture 104.0 Display profile posts and check if the profile is yours or a visitor, get the posts
    const posts = await Post.find({ user: profile._id })
      .populate("user")
      //Lecture 138.0 List comments,load more,live update, populate comments.commentBy
      .populate(
        "comments.commentBy",
        "first_name last_name picture username commentAt"
      )
      //Lecture 109.28 sort by Created at
      .sort({ createdAt: -1 });
    //Lecture 130.1 populate profile
    await profile.populate("friends", "first_name last_name username picture");
    //Lecture 104.1 return posts
    res.json({
      ...profile.toObject(),
      posts,
      //Lecture 125.26 send friendship
      friendship,
    });
  } catch (error) {
    //Lecture 98.3 return error message
    res.status(500).json({ message: error.message });
  }
};
//Lecture 108.16 Create updateProfilePicture fn
exports.updateProfilePicture = async (req, res) => {
  //Lecture 108.17 adding trycatch
  try {
    //Lecture 108.19 get the url
    const { url } = req.body;

    //Lecture 108.20 update picture
    await User.findByIdAndUpdate(req.user.id, {
      picture: url,
    });
    //Lecture 108.21 return url
    res.json(url);
  } catch (error) {
    //Lecture 108.18 return error message
    res.status(500).json({ message: error.message });
  }
};
//Lecture 113.1 Create updateCover fn
exports.updateCover = async (req, res) => {
  //Lecture 113.2 add try catch
  try {
    //Lecture 113.4 get the url
    const { url } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      //Lecture 113.5 cover update
      cover: url,
    });
    //Lecture 113.6 return
    res.json(url);
  } catch (error) {
    //Lecture 113.3 return error
    res.status(500).json({ message: error.message });
  }
};
//Lecture 117.1 define updateDetails fn
exports.updateDetails = async (req, res) => {
  //Lecture 117.2 add trycatch
  try {
    //Lecture 117.4 get the infos
    const { infos } = req.body;
    //Lecture 117.5 update info
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      {
        details: infos,
      },
      {
        //Lecture 117.6 return updated one
        new: true,
      }
    );
    //Lecture 117.7 json response
    res.json(updated.details);
  } catch (error) {
    //Lecture 117.3 return error message
    res.status(500).json({ message: error.message });
  }
};
//Lecture 124.1 create addFriend fn
exports.addFriend = async (req, res) => {
  //Lecture 124.2 add try catch
  try {
    //Lecture 124.4 check user.id
    if (req.user.id !== req.params.id) {
      //Lecture 124.6 get the sender
      const sender = await User.findById(req.user.id);
      //Lecture 124.7 get the receiver
      const receiver = await User.findById(req.params.id);
      //Lecture 124.8 check your not in request and friends
      if (
        !receiver.requests.includes(sender._id) &&
        !receiver.friends.includes(sender._id)
      ) {
        //Lecture 124.10 update requests
        await receiver.updateOne({
          $push: { requests: sender._id },
        });
        //Lecture 124.11 updatefollowers
        await receiver.updateOne({
          $push: { followers: sender._id },
        });
        //Lecture 124.12 following
        await sender.updateOne({
          $push: { following: receiver._id },
        });
        //Lecture 124.13 return message
        res.json({ message: "friend request has been sent" });
      }
      //Lecture 124.9 return error
      else {
        return res.status(400).json({ message: "Already sent" });
      }
    }
    //Lecture 124.5 else return error
    else {
      return res
        .status(400)
        .json({ message: "You can't send a request to yourself" });
    }
  } catch (error) {
    //Lecture 124.3 return error message
    res.status(500).json({ message: error.message });
  }
};
//Lecture 124.15 Create cancelRequest, copy paste add friend
exports.cancelRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        //Lecture 124.34 your in request
        receiver.requests.includes(sender._id) &&
        !receiver.friends.includes(sender._id)
      ) {
        await receiver.updateOne({
          //Lecture 124.16 pull from request
          $pull: { requests: sender._id },
        });
        await receiver.updateOne({
          //Lecture 124.17 pull from followers
          $pull: { followers: sender._id },
        });
        await sender.updateOne({
          //Lecture 124.17 pull from following
          $pull: { following: sender._id },
        });
        //Lecture 124.20 suceesfull message
        res.json({ message: "you successfully canceled request" });
      } else {
        //Lecture 124.19 already canceld
        return res.status(400).json({ message: "Already Canceled" });
      }
    } else {
      return (
        res
          .status(400)
          //Lecture 124.18 return error message
          .json({ message: "You can't cancel a request to yourself" })
      );
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Lecture 124.22 Create follow fn, copy paste cancelRequest
exports.follow = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        //Lecture 124.35 not in followers
        !receiver.followers.includes(sender._id) &&
        !sender.following.includes(receiver._id)
      ) {
        await receiver.updateOne({
          //Lecture 124.23 push followers
          $push: { followers: sender._id },
        });

        await sender.updateOne({
          //Lecture 124.24 push following
          $push: { following: receiver._id },
        });
        //Lecture 124.25 follow success
        res.json({ message: "follow success" });
      } else {
        //Lecture 124.26 already following
        return res.status(400).json({ message: "Already following" });
      }
    } else {
      //Lecture 124.27 You can't follow yourself
      return res.status(400).json({ message: "You can't follow yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Lecture 124.28 Create unfollow fn, copy paste follow
exports.unfollow = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        //Lecture 124.36 in my followers list
        receiver.followers.includes(sender._id) &&
        sender.following.includes(receiver._id)
      ) {
        await receiver.updateOne({
          //Lecture 124.29 pull followers
          $pull: { followers: sender._id },
        });

        await sender.updateOne({
          //Lecture 124.30 pull following
          $pull: { following: receiver._id },
        });
        //Lecture 124.31 success message
        res.json({ message: "unfollow success" });
      } else {
        //Lecture 124.32 Already not following
        return res.status(400).json({ message: "Already not following" });
      }
    } else {
      //Lecture 124.33 You can't unfollow yourself
      return res.status(400).json({ message: "You can't unfollow yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Lecture 124.38 Create acceptRequest fn
exports.acceptRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      //Lecture 124.39 i am receiver
      const receiver = await User.findById(req.user.id);
      //Lecture 124.40 sender is other
      const sender = await User.findById(req.params.id);
      //Lecture 124.41 includes in request
      if (receiver.requests.includes(sender._id)) {
        //Lecture 124.45 reciver update friends
        await receiver.update({
          $push: { friends: sender._id, following: sender._id },
        });
        //Lecture 124.46 sender.update friends
        await sender.update({
          $push: { friends: receiver._id, followers: receiver._id },
        });
        //Lecture 124.46 receiver.updateOne requests
        await receiver.updateOne({
          $pull: { requests: sender._id },
        });
        //Lecture 124.42 friend request accepted
        res.json({ message: "friend request accepted" });
      } else {
        //Lecture 124.43 Already friends
        return res.status(400).json({ message: "Already friends" });
      }
    } else {
      return (
        res
          .status(400)
          //Lecture 124.44 You can't accept a request
          .json({ message: "You can't accept a request from  yourself" })
      );
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Lecture 125.1 Create unfriend fn, copy paste acceptRequest
exports.unfriend = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      //Lecture 125.6 i am sender
      const sender = await User.findById(req.user.id);
      //Lecture 125.7 is the reciver
      const receiver = await User.findById(req.params.id);
      if (
        //Lecture 125.5 you are in the request
        receiver.friends.includes(sender._id) &&
        sender.friends.includes(receiver._id)
      ) {
        //Lecture 125.8 receiver.update, pull friends following followers
        await receiver.update({
          $pull: {
            friends: sender._id,
            following: sender._id,
            followers: sender._id,
          },
        });
        //Lecture 125.9 sender.update, pull friends following followers
        await sender.update({
          $pull: {
            friends: receiver._id,
            following: receiver._id,
            followers: receiver._id,
          },
        });

        //Lecture 125.2 unfriend request success
        res.json({ message: "unfriend request accepted" });
      } else {
        //Lecture 125.3 Already not friends
        return res.status(400).json({ message: "Already not friends" });
      }
    } else {
      //Lecture 125.4 You can't unfriend yourself
      return res.status(400).json({ message: "You can't unfriend yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Lecture 125.11 Create deleteRequest fn, copy paste unfriend
exports.deleteRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      //Lecture 125.12 i am the receiver
      const receiver = await User.findById(req.user.id);
      //Lecture 125.13 other the sender
      const sender = await User.findById(req.params.id);
      //Lecture 125.14 sender is in my request
      if (receiver.requests.includes(sender._id)) {
        //Lecture 125.15 receiver.update, pull requests, followers
        await receiver.update({
          $pull: {
            requests: sender._id,
            followers: sender._id,
          },
        });
        //Lecture 125.16 sender.update, pull following
        await sender.update({
          $pull: {
            following: receiver._id,
          },
        });

        //Lecture 125.17 success message
        res.json({ message: "delete request accepted" });
      } else {
        //Lecture 125.18 Already deleted
        return res.status(400).json({ message: "Already deleted" });
      }
    } else {
      //Lecture 125.19 You can't delete yourself
      return res.status(400).json({ message: "You can't delete yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Lecture 145.1 Create search fn
exports.search = async (req, res) => {
  //Lecture 145.2 adding trycatch
  try {
    //Lecture 145.4 get the search term
    const searchTerm = req.params.searchTerm;
    //Lecture 145.5 get the results
    const results = await User.find({ $text: { $search: searchTerm } }).select(
      "first_name last_name username picture"
    );
    //Lecture 145.6 return response
    res.json(results);
  } catch (error) {
    //Lecture 145.3 return error message
    res.status(500).json({ message: error.message });
  }
};
//Lecture 146.2 Create addToSearchHistory fn
exports.addToSearchHistory = async (req, res) => {
  //Lecture 146.3 adding try catch
  try {
    //Lecture 146.5 get seachUser
    const { searchUser } = req.body;
    //Lecture 146.6 create user obj
    const search = {
      user: searchUser,
      createdAt: new Date(),
    };
    //Lecture 146.7 get the user
    const user = await User.findById(req.user.id);
    //Lecture 146.8 check if already exist
    const check = user.search.find((x) => x.user.toString() === searchUser);
    //Lecture 146.9 update time
    if (check) {
      //Lecture 146.10 User.updateOne
      await User.updateOne(
        {
          _id: req.user.id,
          "search._id": check._id,
        },
        {
          $set: { "search.$.createdAt": new Date() },
        }
      );
    }
    //Lecture 146.11 add to search
    else {
      //Lecture 146.12 User.findByIdAndUpdate
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          search,
        },
      });
    }
  } catch (error) {
    //Lecture 146.4 return error message
    res.status(500).json({ message: error.message });
  }
};
//Lecture 147.1 Create getSearchHistory fn
exports.getSearchHistory = async (req, res) => {
  //Lecture 147.2 adding trycatch
  try {
    //Lecture 147.4 get the results
    const results = await User.findById(req.user.id)
      .select("search")
      .populate("search.user", "first_name last_name username picture");
    //Lecture 147.5 return response
    res.json(results.search);
  } catch (error) {
    //Lecture 147.3 return error message
    res.status(500).json({ message: error.message });
  }
};
//Lecture 148.1 Create removeFromSearch fn
exports.removeFromSearch = async (req, res) => {
  //Lecture 148.2 adding try catch
  try {
    //Lecture 148.4 get the searchUser
    const { searchUser } = req.body;
    //Lecture 148.5 update the user
    await User.updateOne(
      {
        _id: req.user.id,
      },
      { $pull: { search: { user: searchUser } } }
    );
  } catch (error) {
    //Lecture 148.3 return error message
    res.status(500).json({ message: error.message });
  }
};
//Lecture 150.1 Create getFriendsPageInfos fn
exports.getFriendsPageInfos = async (req, res) => {
  //Lecture 150.2 adding trycatch
  try {
    //Lecture 150.4 get the user and populate friends and requests
    const user = await User.findById(req.user.id)
      .select("friends requests")
      .populate("friends", "first_name last_name picture username")
      .populate("requests", "first_name last_name picture username");
    //Lecture 150.5 get sentRequests
    const sentRequests = await User.find({
      requests: mongoose.Types.ObjectId(req.user.id),
    }).select("first_name last_name picture username");
    //Lecture 150.6 return response
    res.json({
      friends: user.friends,
      requests: user.requests,
      sentRequests,
    });
  } catch (error) {
    //Lecture 150.3 return error message
    res.status(500).json({ message: error.message });
  }
};
