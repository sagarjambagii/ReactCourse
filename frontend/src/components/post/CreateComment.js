import {
  //Lecture 95.9 import useEffect
  useEffect,
  //Lecture 95.9 import useRef
  useRef,
  useState,
} from "react";
//Lecture 95.15 import picker
import Picker from "emoji-picker-react";
//Lecture 137.22 import comment fn
import { comment } from "../../functions/post";
//Lecture 137.30 import uploadImages
import { uploadImages } from "../../functions/uploadImages";
//Lecture 137.25 import dataURItoBlob
import dataURItoBlob from "../../helpers/dataURItoBlob";
//Lecture 137.33 import ClipLoader
import { ClipLoader } from "react-spinners";
//Lecture 95.1 Create components:post:CreateComment.js, RFC
export default function CreateComment({
  //Lecture 95.6 get the user
  user,
  //Lecture 137.16 get post._id
  postId,
  //Lecture 138.30 get setCount
  setCount,
  //Lecture 138.4 get setComments
  setComments,
}) {
  //Lecture 95.8 useState for picker
  const [picker, setPicker] = useState(false);
  //Lecture 95.10 useState for text
  const [text, setText] = useState("");
  //Lecture 95.31 useState for setError
  const [error, setError] = useState("");
  //Lecture 95.29 useState for setCommentImage
  const [commentImage, setCommentImage] = useState("");
  //Lecture 137.26 useState for loading
  const [loading, setLoading] = useState(false);
  //Lecture 95.9 copy paste from emojiPickerbackground.js - start
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);
  //Lecture 95.9 copy paste from emojiPickerbackground.js - end
  //Lecture 95.19 useref for imgInput
  const imgInput = useRef(null);
  //Lecture 95.9 copy paste from emojiPickerbackground.js - start
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  //Lecture 95.9 copy paste from emojiPickerbackground.js - end

  //Lecture 95.24 def handle img fn
  const handleImage = (e) => {
    //Lecture 95.25 get the img
    let file = e.target.files[0];
    //Lecture 95.32 check for file type
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    }
    //Lecture 95.33 check for file size
    else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }

    //Lecture 95.26 def reader
    const reader = new FileReader();
    //Lecture 95.27 read dataurl
    reader.readAsDataURL(file);
    //Lecture 95.28 reader onload
    reader.onload = (event) => {
      //Lecture 95.30 set setCommentImage
      setCommentImage(event.target.result);
    };
  };
  //Lecture 137.18 Create handleComment
  const handleComment = async (e) => {
    //Lecture 137.19 check if key is enter
    if (e.key === "Enter") {
      //Lecture 137.20 if commentimg not null
      if (commentImage != "") {
        //Lecture 137.24 copy paste components:CreatePostPopup:index.js
        setLoading(true);
        //Lecture 137.25 img to blob
        const img = dataURItoBlob(commentImage);
        //Lecture 137.27 get the path
        const path = `${user.username}/post_images/${postId}`;
        //Lecture 137.28 define formData
        let formData = new FormData();
        //Lecture 137.29 append data
        formData.append("path", path);
        formData.append("file", img);
        //Lecture 137.30 call uploadImages
        const imgComment = await uploadImages(formData, path, user.token);

        //Lecture 137.31 call comments
        const comments = await comment(
          postId,
          text,
          imgComment[0].url,
          user.token
        );
        //Lecture 138.4 get setComments
        setComments(comments);

        //Lecture 138.31 set setCount
        setCount((prev) => ++prev);
        //Lecture 137.32 set loading to false
        setLoading(false);
        //Lecture 137.35 set setText and setCommentImage
        setText("");
        setCommentImage("");
      }
      //Lecture 137.21 else only text
      else {
        setLoading(true);

        //Lecture 137.22 call comment fn
        const comments = await comment(postId, text, "", user.token);
        //Lecture 138.4 get setComments
        setComments(comments);
        //Lecture 138.31 set setCount
        setCount((prev) => ++prev);
        setLoading(false);
        setText("");
        setCommentImage("");
      }
    }
  };
  return (
    //Lecture 95.3 class create_comment_wrap
    <div className="create_comment_wrap">
      {/* //Lecture 95.3 class create_comment */}
      <div className="create_comment">
        {/* //Lecture 95.7 img */}
        <img src={user?.picture} alt="" />
        {/* //Lecture 95.7 class comment_input_wrap */}
        <div className="comment_input_wrap">
          {/* //Lecture 95.15 if picker true show picker  */}
          {picker && (
            //Lecture 95.18 class comment_emoji_picker
            <div className="comment_emoji_picker">
              {/* //Lecture 95.15 if picker true show picker  */}
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          {/* //Lecture 95.11 input file */}
          <input
            //Lecture 95.12 type to hidden
            type="file"
            hidden
            //Lecture 95.20 reference useref
            ref={imgInput}
            //Lecture 95.22 add accept
            accept="image/jpeg,image/png,image/gif,image/webp"
            //Lecture 95.23 onchange handle img
            onChange={handleImage}
          />
          {/* //Lecture 95.34 if error is true */}
          {error && (
            //Lecture 95.35 class postError comment_error
            <div className="postError comment_error">
              {/* //Lecture 95.35 class postError_error */}
              <div className="postError_error">{error}</div>
              {/* //Lecture 95.36 add button */}
              <button
                className="blue_btn"
                //Lecture 95.37 add onclick
                onClick={() => setError("")}
              >
                Try again
              </button>
            </div>
          )}
          {/* //Lecture 95.13 input for text  */}
          <input
            //Lecture 95.14 type to onChange
            type="text"
            ref={textRef}
            value={text}
            placeholder="Write a comment..."
            onChange={(e) => setText(e.target.value)}
            //Lecture 137.17 add on keyup
            onKeyUp={handleComment}
          />
          {/* //Lecture 137.34 ClipLoader and pass size color loading */}
          <div className="comment_circle" style={{ marginTop: "5px" }}>
            <ClipLoader size={20} color="#1876f2" loading={loading} />
          </div>
          {/* //Lecture 95.16 class  comment_circle_icon and icon */}
          <div
            className="comment_circle_icon hover2"
            //Lecture 95.17 onClick troggle emoji
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          >
            <i className="emoji_icon"></i>
          </div>
          {/* //Lecture 95.18 class comment_circle_icon and icon */}
          <div
            className="comment_circle_icon hover2"
            //Lecture 95.21 add onclick
            onClick={() => imgInput.current.click()}
          >
            <i className="camera_icon"></i>
          </div>
          {/* //Lecture 95.18 class comment_circle_icon and gif_icon */}
          <div className="comment_circle_icon hover2">
            <i className="gif_icon"></i>
          </div>
          {/* //Lecture 95.18 class comment_circle_icon and sticker_icon */}
          <div className="comment_circle_icon hover2">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {/* //Lecture 95.38 if comment img true  */}
      {commentImage && (
        //Lecture 95.38 class comment_img_preview
        <div className="comment_img_preview">
          {/* //Lecture 95.39 img */}
          <img src={commentImage} alt="" />
          {/* //Lecture 95.40 class small_white_circle and exit_icon */}
          <div
            className="small_white_circle"
            onClick={() => setCommentImage("")}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
}
