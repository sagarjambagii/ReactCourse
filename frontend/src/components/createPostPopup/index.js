//Lecture 75.10 import useState
import {
  useState,
  //Lecture 76.7 import useRef
  useRef,
  //Lecture 76.17 import useEffect
  useEffect,
} from "react";
//Lecture 75.1 import styles
import "./style.css";
//Lecture 76.0 Emoji picker, npm i emoji-picker-react
import Picker from "emoji-picker-react";
//Lecture 77.2 import EmojiPickerBackgrounds
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
//Lecture 77.10 import AddToYourPost
import AddToYourPost from "./AddToYourPost";
//Lecture 78.2 import imagePreview
import ImagePreview from "./ImagePreview";
//Lecture 85.12 import useClickOutside
import useClickOutside from "../../helpers/clickOutside";
//Lecture 86.11 import Create post
import { createPost } from "../../functions/post";
//Lecture 86.13 import pulseLoader
import PulseLoader from "react-spinners/PulseLoader";
//Lecture 87.5 import posterror
import PostError from "./PostError";
//Lecture 88.7 import dataURItoBlob
import dataURItoBlob from "../../helpers/dataURItoBlob";
//Lecture 88.13 import uplaodImages fn
import { uploadImages } from "../../functions/uploadImages";
//Lecture 75.0 Create post popup, Create folder components:createPostPopup:index.js:style.css, RFC
// export default function CreatePostPopup() {
//Lecture 75.6 get the user
export default function CreatePostPopup({
  user,
  //Lecture 85.8 get the setVisible
  setVisible,
  //Lecture 140.6 get post and dispatch
  posts,
  dispatch,
  //Lecture 140.14 get profile
  profile,
}) {
  //Lecture 85.10 create popup reference
  const popup = useRef(null);
  //Lecture 75.10 useState for text
  const [text, setText] = useState("");
  //Lecture 75.12 useState for showPrev
  const [showPrev, setShowPrev] = useState(false);
  //Lecture 79.5 useState for images
  const [images, setImages] = useState([]);
  //Lecture 84.0 Post backgrounds
  const [background, setBackground] = useState("");
  //Lecture 86.0 Submit Post with background + loader
  const [loading, setLoading] = useState(false);
  //Lecture 87.0 Error popup & error handling, usestate for error
  const [error, setError] = useState("");
  //Lecture 85.12 call useClickOutside
  useClickOutside(popup, () => {
    setVisible(false);
  });
  //Lecture 86.2 define postSubmit
  const postSubmit = async () => {
    if (background) {
      //Lecture 86.10 setLoading true
      setLoading(true);
      //Lecture 86.11 get the reponse
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      //Lecture 86.12 setLoading to false
      setLoading(false);
      //Lecture 86.12 setBackground to ""
      // setBackground("");
      //Lecture 86.12 setText to ""
      // setText("");
      //Lecture 86.12 setText to false
      // setVisible(false);
      //Lecture 87.2 if ok
      // if (response === "ok") {
      //Lecture 140.2 change it to response.status
      if (response.status === "ok") {
        //Lecture 140.7 dispatch POSTS_SUCCESS
        dispatch({
          type:
            //Lecture 140.15 if profile is true
            profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [response.data, ...posts],
        });
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        //Lecture 87.3 else error
        setError(response);
      }
    }
    //Lecture 88.0 Upload images and submit post, have images
    else if (images && images.length) {
      //Lecture 88.5 setLoading to true
      setLoading(true);
      //Lecture 88.7 post images convert to blob
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      //Lecture 88.8 define the path
      // const path = `${user.username}/post Images`;
      //Lecture 98.13 Change post_images
      const path = `${user.username}/post_images`;
      //Lecture 88.10 define formdata
      let formData = new FormData();
      //Lecture 88.11 append path to formdata
      formData.append("path", path);
      //Lecture 88.12 append img to formdata
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      //Lecture 88.13 call the fn
      const response = await uploadImages(formData, path, user.token);
      //Lecture 88.18 send req to create post
      // await createPost(
      //Lecture 89.9 get the res
      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      //Lecture 88.19 setLoading to false
      setLoading(false);
      //Lecture 88.20 set text to empty
      // setText("");
      //Lecture 88.20 setImages to empty
      // setImages("");
      //Lecture 88.20 setVisible to false
      // setVisible(false);
      //Lecture 89.10 if res is ok
      // if (res === "ok") {
      //Lecture 140.3 change it to res.status
      if (res.status === "ok") {
        //Lecture 140.8 dispatch POSTS_SUCCESS
        dispatch({
          type:
            //Lecture 140.15 if profile is true
            profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [res.data, ...posts],
        });
        setText("");
        setImages("");
        setVisible(false);
      } else {
        //Lecture 89.11 else setError
        setError(res);
      }
    }
    //Lecture 88.1 have text
    else if (text) {
      //Lecture 88.3 paste from if (background)
      setLoading(true);
      const response = await createPost(
        null,
        //Lecture 88.4 change to null
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      // if (response === "ok") {
      //Lecture 140.4 change it to response.status
      if (response.status === "ok") {
        //Lecture 140.9 dispatch POSTS_SUCCESS
        dispatch({
          type:
            //Lecture 140.15 if profile is true
            profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [response.data, ...posts],
        });
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
    }
    //Lecture 88.2 nothing
    else {
      console.log("nothing");
    }
  };
  //Lecture 77.4 cut from here picker to handle emoji/ textref
  // //Lecture 76.2 useState for picker
  // const [picker, setPicker] = useState(false);
  //Lecture 78.6 cut text ref and paste
  //Lecture 76.7 define text ref
  // const textRef = useRef(null);
  // //Lecture 76.16 useState for cursur position
  // const [cursorPosition, setCursorPosition] = useState();
  // //Lecture 76.17 useEffect for cursorposition
  // useEffect(() => {
  //   //Lecture 76.18 textref cursor position
  //   textRef.current.selectionEnd = cursorPosition;
  // }, [cursorPosition]);
  // //Lecture 76.10 handleEmoji fn
  // const handleEmoji = (e, { emoji }) => {
  //   //Lecture 76.11 refenrence
  //   const ref = textRef.current;
  //   //Lecture 76.12 focus textarea
  //   ref.focus();
  //   //Lecture 76.13 define start and end
  //   const start = text.substring(0, ref.selectionStart);
  //   const end = text.substring(ref.selectionStart);
  //   //Lecture 76.14 newText start emoji and end
  //   const newText = start + emoji + end;
  //   console.log(emoji);
  //   //Lecture 76.15 setText to newtext
  //   setText(newText);
  //   //Lecture 76.19 setCursor position
  //   setCursorPosition(start.length + emoji.length);
  // };
  return (
    //Lecture 75.3 add class blur
    <div className="blur">
      {/* //Lecture 75.3  class postBox */}
      <div
        className="postBox"
        //Lecture 85.11 add to div
        ref={popup}
      >
        {/* //Lecture 87.5 if error true call PostError */}
        {error && <PostError error={error} setError={setError} />}
        {/* //Lecture 75.3  class box_header */}
        <div className="box_header">
          {/* //Lecture 75.3  class small_circle */}
          <div
            className="small_circle"
            //Lecture 85.9 onClick setVisible to false
            onClick={() => {
              setVisible(false);
            }}
          >
            {/* //Lecture 75.3  class exit_icon */}
            <i className="exit_icon"></i>
          </div>
          {/* //Lecture 75.3 span */}
          <span>Create Post</span>
        </div>
        {/* //Lecture 75.4 class box_profile */}
        <div className="box_profile">
          {/* //Lecture 75.7 img */}
          <img src={user.picture} alt="" className="box_profile_img" />
          {/* //Lecture 75.7 class box_col */}
          <div className="box_col">
            {/* //Lecture 75.7 class box_profile_name */}
            <div className="box_profile_name">
              {/* //Lecture 75.7 userfirstname and last name */}
              {user.first_name} {user.last_name}
            </div>
            {/* //Lecture 75.7 class box_privacy */}
            <div className="box_privacy">
              {/* //Lecture 75.7 img */}
              <img src="../../../icons/public.png" alt="" />
              {/* //Lecture 75.7 span */}
              <span>Public</span>
              {/* //Lecture 75.7 class arrowDown_icon */}
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        {/* //Lecture 75.13 showprev is false  */}
        {/* {!showPrev && ( */}
        {/* //Lecture 78.1 when show preview true */}
        {!showPrev ? (
          //Lecture 77.6 add empty tag
          <>
            {/* //Lecture 75.8 class flex_center */}
            <div className="flex_center">
              {/* //Lecture 78.3 cut the textarea and put it in emoji */}
              {/* //Lecture 75.8 textarea */}
              {/* <textarea
                //Lecture 76.8 ref textarea
                ref={textRef}
                //Lecture 75.9 define attributes, maxlength, value
                maxLength="100"
                value={text}
                //Lecture 75.11 placeholder to onChange
                placeholder={`What's on your mind, ${user.first_name}`}
                className="post_input"
                onChange={(e) => setText(e.target.value)}
              ></textarea> */}
            </div>
            {/* //Lecture 77.2 call EmojiPickerBackgrounds */}
            <EmojiPickerBackgrounds
              //Lecture 77.7 pass text to setText
              text={text}
              //Lecture 78.8 remove text ref
              // textRef={textRef}
              setText={setText}
              //Lecture 78.10 pass user
              user={user}
              //Lecture 84.13 pass background d setBackground
              background={background}
              setBackground={setBackground}
            />
          </>
        ) : (
          //Lecture 78.2 show imagePreview
          <ImagePreview
            //Lecture 78.14 pass from text to showPrev
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            //Lecture 79.6 pass images to setimages
            images={images}
            setImages={setImages}
            //Lecture 80.10 pass setShowPrev
            setShowPrev={setShowPrev}
            //Lecture 89.2 pass the seterror
            setError={setError}
          />
        )}
        {/* //Lecture 77.1 cut the emoji picker code */}
        {/* //Lecture 75.14 class post_emojis_wrap  */}
        {/* <div className="post_emojis_wrap"> */}
        {/* //Lecture 76.3 show only when picker is true */}
        {/* {picker && ( */}
        {/* //Lecture 75.14 class comment_emoji_picker */}
        {/* // <div className="comment_emoji_picker rlmove"> */}
        {/* //Lecture 76.1 show emoji picker */}
        {/* <Picker /> */}
        {/* <Picker */}
        {/* //Lecture 76.9 handle emoji click */}
        {/* // onEmojiClick={handleEmoji} */}
        {/* // /> */}
        {/* </div> */}
        {/* // )} */}
        {/* //Lecture 76.4 add image */}
        {/* <img src="../../../icons/colorful.png" alt="" /> */}
        {/* //Lecture 76.5 emoji icon */}
        {/* <i */}
        {/* // className="emoji_icon_large" */}
        {/* //Lecture 76.6 add onclick */}
        {/* // onClick={() => { */}
        {/* // setPicker((prev) => !prev); */}
        {/* // }} */}
        {/* // ></i> */}
        {/* </div> */}
        {/* //Lecture 77.10 call AddToYourPost */}
        <AddToYourPost
          //Lecture 80.13 pass setShowPrev
          setShowPrev={setShowPrev}
        />
        {/* //Lecture 77.14 add post button */}
        <button
          className="post_submit"
          //Lecture 86.1 onlclick for postSubmit
          onClick={() => {
            postSubmit();
          }}
          //Lecture 86.14 disabled true
          disabled={loading}
        >
          {/* //Lecture 77.14 add post button */}
          {/* Post */}
          {/* //Lecture 86.13 if loading true  */}
          {loading ? <PulseLoader color="#fff" size={5} /> : "Post"}
        </button>
      </div>
    </div>
  );
}
