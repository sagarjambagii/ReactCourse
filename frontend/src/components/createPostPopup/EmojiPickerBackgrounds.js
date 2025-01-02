//Lecture 77.5 import all
import { useEffect, useRef, useState } from "react";
//Lecture 77.3 import picker
import Picker from "emoji-picker-react";
//Lecture 122.0 import useMediaQuery
import { useMediaQuery } from "react-responsive";

//Lecture 77.0 Refactoring,add to your post ,post
export default function EmojiPickerBackgrounds({
  //Lecture 77.8 get the props text textref
  text,
  setText,
  //Lecture 78.9 remove text ref
  // textRef,
  //Lecture 78.11 get the user
  user,
  type2,
  //Lecture 84.14 get background & setBackground
  background,
  setBackground,
}) {
  //Lecture 77.5 paste here picker to handle emoji
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  //Lecture 84.5 usestate for showbhs
  const [showBgs, setShowBgs] = useState(false);
  //Lecture 78.7 paste text ref
  const textRef = useRef(null);
  //Lecture 84.10 def bgref
  const bgRef = useRef(null);
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
  //Lecture 84.1 all the backgound img
  const postBackgrounds = [
    "../../../images/postbackgrounds/1.jpg",
    "../../../images/postbackgrounds/2.jpg",
    "../../../images/postbackgrounds/3.jpg",
    "../../../images/postbackgrounds/4.jpg",
    "../../../images/postbackgrounds/5.jpg",
    "../../../images/postbackgrounds/6.jpg",
    "../../../images/postbackgrounds/7.jpg",
    "../../../images/postbackgrounds/8.jpg",
    "../../../images/postbackgrounds/9.jpg",
  ];
  //Lecture 84.9 create backgroundHanlder fn
  const backgroundHanlder = (i) => {
    //Lecture 84.12 set bg img
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    //Lecture 84.15 setBackground
    setBackground(postBackgrounds[i]);
    //Lecture 84.16 add bgHandler class
    bgRef.current.classList.add("bgHandler");
  };
  //Lecture 84.20 define remove bg
  const removeBackground = (i) => {
    //Lecture 84.21 set bg img to empty
    bgRef.current.style.backgroundImage = "";
    //Lecture 84.22 setBackground ""
    setBackground("");
    //Lecture 84.23 remove class
    bgRef.current.classList.remove("bgHandler");
  };
  //Lecture 122.0 Make all popups responsive, define sm
  const sm = useMediaQuery({
    query: "(max-width:550px)",
  });
  return (
    //Lecture 78.25 when in type2 add class images_input
    <div className={type2 ? "images_input" : ""}>
      {/* //Lecture 78.5 add parent div */}
      {/* // <> */}
      {/* //Lecture 78.24 when not in type2 show class flex_center */}
      <div
        className={!type2 ? "flex_center" : ""}
        //Lecture 84.11 reference to it
        ref={bgRef}
      >
        {/* //Lecture 78.4 paste text area */}
        <textarea
          ref={textRef}
          // maxLength="100"
          //Lecture 84.17 max length
          maxLength="250"
          value={text}
          placeholder={`What's on your mind, ${user.first_name}`}
          //Lecture 78.23 when in type2 add class input2
          className={`post_input ${type2 ? "input2" : ""}
          // Lecture 122.1 if sm is true
          ${sm && !background && "l0"}`}
          onChange={(e) => setText(e.target.value)}
          //Lecture 84.18 inline style
          style={{
            paddingTop: `${
              background
                ? Math.abs(textRef.current.value.length * 0.1 - 32)
                : "0"
            }%`,
          }}
        ></textarea>
        {/* //Lecture 77.3 paste emojipicker div */}
        <div
          // className="post_emojis_wrap"
          //Lecture 78.22 when in type2 applied
          className={!type2 ? "post_emojis_wrap" : ""}
        >
          {picker && (
            <div
              // className="comment_emoji_picker rlmove"
              //Lecture 78.21 when in type2 add class movepicker2
              className={`comment_emoji_picker ${
                type2 ? "movepicker2" : "rlmove"
              }`}
            >
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          {/* <img src="../../../icons/colorful.png" alt="" /> */}
          {
            //Lecture 78.19 show in not type2
            !type2 && (
              <img
                src="../../../icons/colorful.png"
                alt=""
                //Lecture 84.6 troggle onlclick
                onClick={() => {
                  setShowBgs((prev) => !prev);
                }}
              />
            )
          }
          {/* //Lecture 84.7 not type2 and showbhs */}
          {!type2 && showBgs && (
            //Lecture 84.2 class post_backgrounds
            <div className="post_backgrounds">
              <div
                className="no_bg"
                //Lecture 84.19 add onclick
                onClick={() => {
                  removeBackground();
                }}
              ></div>
              {/* //Lecture 84.3 map througth */}
              {postBackgrounds.map((bg, i) => (
                <img
                  //Lecture 84.4 src to key
                  src={bg}
                  key={i}
                  alt=""
                  //Lecture 84.8 add backgroundHandler
                  onClick={() => {
                    backgroundHanlder(i);
                  }}
                />
              ))}
            </div>
          )}
          <i
            // className="emoji_icon_large"
            //Lecture 78.20 when in type2 add class moveleft
            className={`emoji_icon_large ${type2 ? "moveleft" : ""}`}
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          ></i>
        </div>
        {/* </> */}
      </div>
    </div>
  );
}
