//Lecture 81.2 Create controllers:post.js
const Post = require("../models/Post");
//Lecture 139.3 import user
const User = require("../models/User");

//Lecture 81.4 define createPost fn
exports.createPost = async (req, res) => {
  //Lecture 81.5 add trycatch
  try {
    //Lecture 81.7 get the post
    const post = await new Post(req.body).save();
    //Lecture 140.0 Refresh posts when creating post profile + home etc..., populate the user
    await post.populate("user", "first_name last_name cover picture username");
    //Lecture 81.8 res.json
    res.json(post);
  } catch (error) {
    //Lecture 81.6 return error
    return res.status(500).json({ message: error.message });
  }
};
//Lecture 90.1 create getAllPosts fn
exports.getAllPosts = async (req, res) => {
  //Lecture 90.2 add trycatch
  try {
    //Lecture 139.3 remove old code
    // //Lecture 90.4 get the posts
    // const posts = await Post.find()
    //   //Lecture 91.6 populate user
    //   .populate("user", "first_name last_name picture username gender")
    //   //Lecture 91.15 sort from new to old
    //   .sort({ createdAt: -1 });
    // //Lecture 90.5 return all posts, postman : get : localhost:8000/getallposts
    // res.json(posts);
    //Lecture 139.3 define followingTemp
    const followingTemp = await User.findById(req.user.id).select("following");
    //Lecture 139.4 get the following
    const following = followingTemp.following;
    //Lecture 139.5 wait for response promise
    const promises = following.map((user) => {
      //Lecture 139.6 return posts of following users
      return (
        Post.find({ user: user })
          //Lecture 139.7 populate user
          .populate("user", "first_name last_name picture username cover")
          //Lecture 139.8 populate comments.commentBy
          .populate(
            "comments.commentBy",
            "first_name last_name picture username"
          )
          //Lecture 139.9 sort and set the limit
          .sort({ createdAt: -1 })
          .limit(10)
      );
    });
    //Lecture 139.10 resolve all the promises
    const followingPosts = await (await Promise.all(promises)).flat();
    //Lecture 139.11 get our posts
    const userPosts = await Post.find({ user: req.user.id })
      //Lecture 139.12 populate all the data
      .populate("user", "first_name last_name picture username cover")
      .populate("comments.commentBy", "first_name last_name picture username")
      .sort({ createdAt: -1 })
      .limit(10);
    //Lecture 139.13 push to followingPosts
    followingPosts.push(...[...userPosts]);
    //Lecture 139.14 sort posts
    followingPosts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    //Lecture 139.15 return posts
    res.json(followingPosts);
  } catch (error) {
    //Lecture 90.3 return error message
    return res.status(500).json({ message: error.message });
  }
};

//Lecture 137.1 Create comment fn
exports.comment = async (req, res) => {
  //Lecture 137.2 adding trycatch
  try {
    //Lecture 137.4 get the data from body
    const { comment, image, postId } = req.body;
    //Lecture 137.5 get the new comments
    let newComments = await Post.findByIdAndUpdate(
      postId,
      {
        //Lecture 137.6 update comment
        $push: {
          comments: {
            comment: comment,
            image: image,
            commentBy: req.user.id,
            //Lecture 138.28 add commentAt
            commentAt: new Date(),
          },
        },
      },
      {
        //Lecture 137.7 return updated one
        new: true,
      }
    )
      //Lecture 137.8 populate comments
      .populate(
        "comments.commentBy",
        //Lecture 137.23 define which data we want
        "picture first_name last_name username"
      );
    //Lecture 137.10 return newComments
    res.json(newComments.comments);
  } catch (error) {
    //Lecture 137.3 return error message
    return res.status(500).json({ message: error.message });
  }
};
//Lecture 141.1 Create savePost fn
exports.savePost = async (req, res) => {
  //Lecture 141.2 adding trycatch
  try {
    //Lecture 141.4 get the postid
    const postId = req.params.id;
    //Lecture 141.5 get the user
    const user = await User.findById(req.user.id);
    //Lecture 141.7 check already saved
    const check = user?.savedPosts.find(
      (post) => post.post.toString() == postId
    );
    //Lecture 141.8 if check true
    if (check) {
      //Lecture 141.12 remove the post
      await User.findByIdAndUpdate(req.user.id, {
        $pull: {
          savedPosts: {
            _id: check._id,
          },
        },
      });
    }
    //Lecture 141.9 else create one
    else {
      //Lecture 141.10 create savepost
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          savedPosts: {
            //Lecture 141.11 post id and saved at
            post: postId,
            savedAt: new Date(),
          },
        },
      });
    }
  } catch (error) {
    //Lecture 141.3 return error message
    return res.status(500).json({ message: error.message });
  }
};
//Lecture 143.1 Create delete fn
exports.deletePost = async (req, res) => {
  //Lecture 143.2 adding trycatch
  try {
    //Lecture 143.4 find and remove post
    await Post.findByIdAndRemove(req.params.id);
    //Lecture 143.5 return okay
    res.json({ status: "ok" });
  } catch (error) {
    //Lecture 143.3 return error
    return res.status(500).json({ message: error.message });
  }
};
