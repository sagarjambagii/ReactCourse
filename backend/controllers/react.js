//Lecture 132.7 import react model
const React = require("../models/React");
//Lecture 132.8 import mongoose
const mongoose = require("mongoose");
//Lecture 141.20 import user
const User = require("../models/User");
//Lecture 132.2 Create controllers:react.js, Create ReactPost fn
exports.reactPost = async (req, res) => {
  //Lecture 132.4 adding trycatch
  try {
    //Lecture 132.6 get the postid and react
    const { postId, react } = req.body;
    //Lecture 132.7 check
    const check = await React.findOne({
      postRef: postId,
      //Lecture 132.8 convert object id to moongoose
      reactBy: mongoose.Types.ObjectId(req.user.id),
    });
    //Lecture 132.9 if check is null
    if (check == null) {
      //Lecture 132.10 create new react
      const newReact = new React({
        react: react,
        postRef: postId,
        reactBy: req.user.id,
      });
      //Lecture 132.11 save in database
      await newReact.save();
    } else {
      //Lecture 132.12 if same remove it
      if (check.react == react) {
        await React.findByIdAndRemove(check._id);
      }
      //Lecture 132.13 if diffrent then update it
      else {
        await React.findByIdAndUpdate(check._id, {
          react: react,
        });
      }
    }
  } catch (error) {
    //Lecture 132.5 return error message
    return res.status(500).json({ message: error.message });
  }
};
//Lecture 133.11 Create getReacts fn
exports.getReacts = async (req, res) => {
  //Lecture 133.12 adding try catch
  try {
    //Lecture 133.14 get reacts
    // const reacts = await React.find({ postRef: req.params.id });
    //Lecture 135.7 make it reactsArray
    const reactsArray = await React.find({ postRef: req.params.id });
    /*
    const check1 = reacts.find(
      (x) => x.reactBy.toString() == req.user.id
    )?.react;
    */
    //Lecture 135.0 Show all reacts
    const newReacts = reactsArray.reduce(
      (group, react) => {
        //Lecture 135.2 define key
        let key = react["react"];
        //Lecture 135.3 if not defined
        group[key] = group[key] || [];
        //Lecture 135.4 push react and return
        group[key].push(react);
        return group;
      },
      //Lecture 135.1 pass empty object
      {}
    );

    //Lecture 135.5 create a new array reacts and count reacts
    const reacts = [
      {
        react: "like",
        count: newReacts.like ? newReacts.like.length : 0,
      },
      {
        react: "love",
        count: newReacts.love ? newReacts.love.length : 0,
      },
      {
        react: "haha",
        count: newReacts.haha ? newReacts.haha.length : 0,
      },
      {
        react: "sad",
        count: newReacts.sad ? newReacts.sad.length : 0,
      },
      {
        react: "wow",
        count: newReacts.wow ? newReacts.wow.length : 0,
      },
      {
        react: "angry",
        count: newReacts.angry ? newReacts.angry.length : 0,
      },
    ];
    //Lecture 136.11 cut the sort
    //Lecture 135.8 sort based on reacts count
    // reacts.sort((a, b) => {
    //   return b.count - a.count;
    // });
    //Lecture 133.27 check
    const check = await React.findOne({
      postRef: req.params.id,
      reactBy: req.user.id,
    });
    //Lecture 141.20 get the user
    const user = await User.findById(req.user.id);
    //Lecture 141.21 check savedpost
    const checkSaved = user?.savedPosts.find(
      (x) => x.post.toString() === req.params.id
    );
    //Lecture 133.15 return reacts
    res.json({
      //Lecture 133.15 return reacts
      // reacts,
      //Lecture 135.6 return reacts
      reacts,
      //Lecture 133.28 return check
      check: check?.react,
      //Lecture 135.13 pass total count
      total: reactsArray.length,
      //Lecture 141.22 return
      checkSaved: checkSaved ? true : false,
    });
  } catch (error) {
    //Lecture 133.13 return error message
    return res.status(500).json({ message: error.message });
  }
};
