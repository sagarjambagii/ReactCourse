//Lecture 99.15 import axios
import axios from "axios";
import {
  //Lecture 99.10 import useEffect
  useEffect,
  //Lecture 99.9 import useReducer
  useReducer,
  //Lecture 110.5 useState for photos
  useState,
  //Lecture 123.0 import useRef
  useRef,
} from "react";
//Lecture 99.2 import useSelector
import { useSelector } from "react-redux";
import {
  //Lecture 99.23 import useNavigate
  useNavigate,
  //Lecture 99.1 import useParams
  useParams,
  //Lecture 105.33 import Link
  Link,
} from "react-router-dom";
//Lecture 99.9 import profileReducer
import { profileReducer } from "../../functions/reducers";
//Lecture 100.0 import Header
import Header from "../../components/header";
//Lecture 100.9 import cover
import Cover from "./Cover";
//Lecture 100.14 import style
import "./style.css";
//Lecture 101.1 import ProfielPictureInfos
import ProfielPictureInfos from "./ProfielPictureInfos";
//Lecture 101.10 import profilemenu
import ProfileMenu from "./ProfileMenu";
//Lecture 102.2 import PplYouMayKnow
import PplYouMayKnow from "./PplYouMayKnow";
//Lecture 103.3 import CreatePost
import CreatePost from "../../components/createPost";
//Lecture 103.12 import GridPosts
import GridPosts from "./GridPosts";
//Lecture 104.5 import post
import Post from "../../components/post";
//Lecture 105.4 import photos
import Photos from "./Photos";
//Lecture 105.30 import Friends
import Friends from "./Friends";
//Lecture 115.2 import intro
import Intro from "../../components/intro";
//Lecture 123.6 import mediaquerry
import { useMediaQuery } from "react-responsive";
//Lecture 140.10 import CreatePostPopup
import CreatePostPopup from "../../components/createPostPopup";
/* //Lecture 29.5 Create Pages:Profile:index.js, Create component rfc*/
export default function Profile({
  //Lecture 140.12 remove setVisible
  //Lecture 103.9 get setVisible
  // setVisible
  //Lecture 140.18 get getAllPosts
  getAllPosts,
}) {
  //Lecture 140.11 useState for visible
  const [visible, setVisible] = useState(false);
  //Lecture 99.1 get the username
  const { username } = useParams();
  //Lecture 99.23 define useNavigate
  const navigate = useNavigate();
  //Lecture 99.2 get the user from store
  const { user } = useSelector((state) => ({ ...state }));
  //Lecture 110.5 useState for photos
  const [photos, setPhotos] = useState({});
  //Lecture 99.3 if username is undefined
  var userName = username === undefined ? user.username : username;
  //Lecture 99.9 get the data loading, error, profile
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  //Lecture 99.10 when the page loads
  useEffect(() => {
    //Lecture 99.18 call the fn
    getProfile();
  }, [userName]);
  //Lecture 120.39 when page loads, profilechanges
  useEffect(() => {
    //Lecture 120.40 setothername
    setOthername(profile?.details?.otherName);
  }, [profile]);
  //Lecture 104.7 check visitor
  var visitor = userName === user.username ? false : true;
  //Lecture 120.38 useState for othername
  const [othername, setOthername] = useState();
  //Lecture 110.12  paste data to sort
  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";
  // console.log(visitor);
  //Lecture 99.11 define getProfile
  const getProfile = async () => {
    //Lecture 99.12 add try catch
    try {
      //Lecture 99.14 dispatch request
      dispatch({
        type: "PROFILE_REQUEST",
      });
      //Lecture 99.15 get the data, add url
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      //Lecture 99.22 check ok
      if (data.ok === false) {
        //Lecture 99.24 navigate to profile
        navigate("/profile");
      } else {
        //Lecture 110.7 add trycatch
        try {
          //Lecture 110.9 paste data, change it to images
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, max },
            {
              headers: {
                //Lecture 110.10 user.token
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          //Lecture 110.13 set setPhotos
          setPhotos(images.data);
        } catch (error) {
          //Lecture 110.8 return error
          console.log(error);
        }
        //Lecture 99.17 if profile success, send data
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      //Lecture 99.13 dispatch error
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  //Lecture 99.19 cl
  // console.log(profile);
  //Lecture 123.0 Fixed scroll anmation(very cool), define profileTop
  const profileTop = useRef(null);
  //Lecture 123.7 useRef for leftside
  const leftSide = useRef(null);
  //Lecture 123.3 useState for setheight
  const [height, setHeight] = useState();
  //Lecture 123.8 useState for leftHeight
  const [leftHeight, setLeftHeight] = useState();
  //Lecture 123.11 useState for scrollHeight
  const [scrollHeight, setScrollHeight] = useState();
  //Lecture 123.2 when page loads
  useEffect(
    () => {
      //Lecture 123.4 set setHeight
      setHeight(profileTop.current.clientHeight + 300);
      //Lecture 123.10 set setLeftHeight
      setLeftHeight(leftSide.current.clientHeight);
      //Lecture 123.14 addEventListener
      window.addEventListener("scroll", getScroll, { passive: true });
      return () => {
        //Lecture 123.15 cleaner fn
        window.addEventListener("scroll", getScroll, { passive: true });
      };
    },
    //Lecture 123.5 dependency loading
    [
      loading,
      //Lecture 123.16 dependency
      scrollHeight,
    ]
  );
  //Lecture 123.6 check mediaquerry
  const check = useMediaQuery({
    query: "(min-width:901px)",
  });
  //Lecture 123.12 define getScroll
  const getScroll = () => {
    //Lecture 123.13 setScrollHeight
    setScrollHeight(window.pageYOffset);
  };
  /* //Lecture 29.5 Create component rfc*/
  // return <div>Profile</div>;
  return (
    //Lecture 100.7 class profile
    <div className="profile">
      {/* //Lecture 140.10 paste createPostPopup from app.js */}
      {visible && (
        <CreatePostPopup
          user={user}
          //Lecture 140.12 pass setVisible
          setVisible={setVisible}
          //Lecture 140.13 pass posts
          posts={profile?.posts}
          dispatch={dispatch}
          //Lecture 140.13 pass profile
          profile
        />
      )}
      {/* //Lecture 100.0 Profile header and cover section, call header  */}
      <Header
        //Lecture 100.5 pass profile
        page="profile"
        //Lecture 140.19 pass getAllPosts
        getAllPosts={getAllPosts}
      />
      {/* //Lecture 100.8 class profile_top */}
      <div
        className="profile_top"
        //Lecture 123.1 reference it
        ref={profileTop}
      >
        {/* //Lecture 100.8 class profile_container */}
        <div className="profile_container">
          {/* //Lecture 100.9 call cover  */}
          <Cover
            //Lecture 100.11 pass cover
            cover={profile.cover}
            //Lecture 104.8 pass visitor
            visitor={visitor}
            //Lecture 114.6 pass the photos
            photos={photos.resources}
          />
          {/* //Lecture 101.1 call ProfielPictureInfos */}
          <ProfielPictureInfos
            //Lecture 101.4 pass the profile
            profile={profile}
            //Lecture 104.11 pass visitor
            visitor={visitor}
            //Lecture 110.15 pass photos
            photos={photos.resources}
            //Lecture 120.41 pass othername
            othername={othername}
          />
          {/* //Lecture 101.10 call profilemenu  */}
          <ProfileMenu />
        </div>
      </div>
      {/* //Lecture 102.0 profile people you may know, class profile_bottom */}
      <div className="profile_bottom">
        {/* //Lecture 102.0 class profile_container */}
        <div className="profile_container">
          {/* //Lecture 102.0 class bottom_container */}
          <div className="bottom_container">
            {/* //Lecture 102.2 call PplYouMayKnow */}
            <PplYouMayKnow />
            {/* //Lecture 103.0 Profile create post & posts grid section, class profile_grid */}
            <div
              // className="profile_grid"
              //Lecture 123.17 test
              className={`profile_grid ${
                check && scrollHeight >= height && leftHeight > 1000
                  ? "scrollFixed showLess"
                  : check &&
                    scrollHeight >= height &&
                    leftHeight < 1000 &&
                    "scrollFixed showMore"
              }`}
            >
              {/* //Lecture 103.1 class profile_left */}
              <div
                className="profile_left"
                //Lecture 123.9 reference it
                ref={leftSide}
              >
                {/* //Lecture 115.2 call intro */}
                <Intro
                  //Lecture 115.6 pass profile.details
                  // details={profile.details}
                  //Lecture 117.18 add ss to details
                  detailss={profile.details}
                  //Lecture 116.1 pass visitor
                  visitor={visitor}
                  //Lecture 120.44 pass setOthername
                  setOthername={setOthername}
                />
                {/* //Lecture 105.4 call photos */}
                <Photos
                  //Lecture 105.22 pass username to token
                  username={userName}
                  token={user.token}
                  //Lecture 110.14 pass photos
                  photos={photos}
                />
                {/* //Lecture 105.30 call friends*/}
                <Friends
                  //Lecture 105.31 pass friends
                  friends={profile.friends}
                />
                {/* //Lecture 105.32 paste from components:home:left:index.js */}
                <div
                  //Lecture 105.33 class relative_fb_copyright
                  className="relative_fb_copyright"
                >
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Advertising </Link>
                  <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>{" "}
                  </Link>
                  <span>. </span>
                  <Link to="/"></Link>Cookies <span>. </span>
                  <Link to="/">More </Link>
                  <span>. </span> <br />
                  Meta © 2022
                </div>
              </div>
              {/* //Lecture 103.2 class profile_right */}
              <div className="profile_right">
                {/* //Lecture 104.15 if not visitor */}
                {!visitor && (
                  //Lecture 103.3 call CreatePost
                  <CreatePost
                    //Lecture 103.4 pass user to profile
                    user={user}
                    profile
                    //Lecture 103.10 pass setVisible
                    setVisible={setVisible}
                  />
                )}
                {/* //Lecture 103.12 call GridPosts */}
                <GridPosts />
                {/* //Lecture 104.2 class posts  */}
                <div className="posts">
                  {/* //Lecture 104.3 if posts exist  */}
                  {profile.posts && profile.posts.length ? (
                    //Lecture 104.4 map through
                    profile.posts.map((post) => (
                      //Lecture 104.5 call post
                      <Post
                        //Lecture 104.6 pass post to key
                        post={post}
                        user={user}
                        key={post._id}
                        //Lecture 105.0 Photos,Friends,Footer components, pass profile
                        profile
                      />
                    ))
                  ) : (
                    //Lecture 104.16 class no_posts
                    <div className="no_posts">No posts available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
