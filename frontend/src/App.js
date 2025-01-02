//Lecture 29.1 import react-router-dom
import { Routes, Route } from "react-router-dom";
//Lecture 29.4 import login
import Login from "./pages/login";
//Lecture 29.6 import profile
import Profile from "./pages/profile";
//Lecture 29.8 import home
import Home from "./pages/home";
//Lecture 53.3 import LoggedInRoutes
import LoggedInRoutes from "./routes/LoggedInRoutes";
//Lecture 53.7 import NotLoggedInRoutes
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
//Lecture 62.1 Define route
import Activate from "./pages/home/activate";
//Lecture 67.1 import reset
import Reset from "./pages/reset";
//Lecture 75.2 import CreatePostPopup
import CreatePostPopup from "./components/createPostPopup";
//Lecture 75.5 import useSelector
import { useSelector } from "react-redux";
//Lecture 85.0 import usestate
import {
  useState,
  //Lecture 90.12 import useReducer
  useReducer,
  //Lecture 90.20 import useEffect
  useEffect,
} from "react";
//Lecture 90.17 import axios
import axios from "axios";
//Lecture 99.6 import postsReducer
import { postsReducer } from "./functions/reducers";
//Lecture 149.2 import Friends
import Friends from "./pages/friends";
//Lecture 99.4 cut the reducer fn
//Lecture 90.6 define reducer fn
// function reducer(state, action) {
//   //Lecture 90.7 add switch
//   switch (action.type) {
//     //Lecture 90.8 post request,
//     case "POSTS_REQUEST":
//       return { ...state, loading: true, error: "" };
//     //Lecture 90.9 when post success
//     case "POSTS_SUCCESS":
//       return {
//         ...state,
//         loading: false,
//         posts: action.payload,
//         error: "",
//       };
//     //Lecture 90.10 POSTS_ERROR
//     case "POSTS_ERROR":
//       return { ...state, loading: false, error: action.payload };

//     //Lecture 90.11 default
//     default:
//       return state;
//   }
// }
function App() {
  //Lecture 85.0 Hide-open click outside popup, useState for createpost
  const [visible, setVisible] = useState(false);
  //Lecture 75.5 pass the user
  const { user } = useSelector((state) => ({ ...state }));
  //Lecture 90.12 array with object and set default values
  const [{ loading, error, posts }, dispatch] = useReducer(
    // reducer,
    //Lecture 99.6 call postsReducer
    postsReducer,
    {
      loading: false,
      posts: [],
      error: "",
    }
  );
  //Lecture 90.20 useEffect when page loads
  useEffect(() => {
    //Lecture 90.21 call getallposts
    getAllPosts();
  }, []);
  //Lecture 90.13 define getAllPosts fn
  const getAllPosts = async () => {
    //Lecture 90.14 add trycatch
    try {
      //Lecture 90.16 dispatch POSTS_REQUEST
      dispatch({
        type: "POSTS_REQUEST",
      });
      //Lecture 90.17 get the data
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllposts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log(data);
      //Lecture 90.19 dispatch POSTS_SUCCESS
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      //Lecture 90.15 dispatch error
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  //Lecture 10.3
  // const get = async () => {
  //   const res = await fetch("http://localhost:8000");
  //   console.log(res);
  // };
  // get();
  //Lecture 6. Let's setup the basic frontend
  //Lecture 6.1 npm i ,npm start
  // return <div>welcome to frontend</div>;
  //Lecture 29.2 Define routes
  return (
    <div>
      {/* //Lecture 75.2 add CreatePostPopup */}
      {/* <CreatePostPopup  /> */}
      {/* //Lecture 75.5 pass the user */}
      {/* <CreatePostPopup user={user} /> */}
      {/* //Lecture 85.1 when visible is true  */}
      {visible && (
        <CreatePostPopup
          user={user}
          //Lecture 85.7 pass the setVisible to create post popup
          setVisible={setVisible}
          //Lecture 140.5 pass post and dispatch
          posts={posts}
          dispatch={dispatch}
        />
      )}
      <Routes>
        {/* //Lecture 29.4 set attribites and create pages folder:login:index.js,styles.css*/}
        {/* <Route path="/login" element={<Login />} exact /> */}
        {/* //Lecture 29.6 set attribites and create pages folder:profile:index.js,styles.css*/}
        {/* <Route path="/profile" element={<Profile />} exact /> */}
        {/* //Lecture 29.8 set attribites and create pages folder:profile:index.js,styles.css*/}
        {/* <Route path="/" element={<Home />} exact /> */}
        {/* //Lecture 53.3 Logged in routes */}
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/profile"
            element={
              <Profile
                //Lecture 103.8 pass setVisible
                setVisible={setVisible}
                //Lecture 140.17 pass getAllPosts
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          {/* //Lecture 99.0 Profile frontend setup and get profile details from backend, add username path */}
          <Route
            path="/profile/:username"
            element={
              <Profile
                //Lecture 103.8 pass setVisible
                setVisible={setVisible}
                //Lecture 140.22 pass it to profile
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          {/* //Lecture 149.1 Create route  */}
          <Route
            path="/friends"
            element={
              //Lecture 149.2 call Friends
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          {/* //Lecture 153.0 Filter by menu and switch pages and active menu */}
          <Route
            path="/friends/:type"
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          {/* <Route path="/" element={<Home />} exact /> */}
          {/* //Lecture 85.2 pass setVisible  */}
          <Route
            path="/"
            element={
              <Home
                setVisible={setVisible}
                //Lecture 90.22 pass posts to home
                posts={posts}
                //Lecture 139.0 Display posts for the people you follow and fix issues, pass loading
                loading={loading}
                //Lecture 140.23 pass it to home
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          {/* //Lecture 62.1 Define route  */}
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        {/* //Lecture 53.7 NotLoggedInRoutes */}
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        {/* //Lecture 67.1 add reset route  */}
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
