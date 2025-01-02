import { useState } from "react";
//Lecture 133.8 import reactPost
import { reactPost } from "../../functions/post";
//Lecture 133.9 import useSelector
import { useSelector } from "react-redux";

//Lecture 94.4 reactsArray
const reactsArray = [
  {
    name: "like",
    image: "../../../reacts/like.gif",
  },
  {
    name: "love",
    image: "../../../reacts/love.gif",
  },
  {
    name: "haha",
    image: "../../../reacts/haha.gif",
  },
  {
    name: "wow",
    image: "../../../reacts/wow.gif",
  },
  {
    name: "sad",
    image: "../../../reacts/sad.gif",
  },
  {
    name: "angry",
    image: "../../../reacts/angry.gif",
  },
];
//Lecture 94.3 Create components:post:ReactsPopup.js, RFC
export default function ReactsPopup({
  //Lecture 94.10 get visble and setVisible
  visible,
  setVisible,
  //Lecture 133.7 get postId
  // postId,
  //Lecture 134.7 get reactHandler and remove postid
  reactHandler,
}) {
  //Lecture 133.9 get the user
  //Lecture 134.2 remmove reactHandler fn and user
  // const { user } = useSelector((state) => ({ ...state }));
  //Lecture 134.2 remmove reactHandler fn and user
  //Lecture 133.5 define reactHandler
  // const reactHandler = async (type) => {
  //   //Lecture 133.8 call reactPost
  //   reactPost(postId, type, user.token);
  // };
  return (
    //Lecture 94.11 add emmty div
    <>
      {
        //Lecture 94.12 if visible is true
        visible && (
          //Lecture 94.6 class reacts_popup
          <div
            className="reacts_popup"
            //Lecture 94.16 onMouseOver
            onMouseOver={() => {
              setTimeout(() => {
                setVisible(true);
              }, 500);
            }}
            //Lecture 94.17 onMouseLeave
            onMouseLeave={() => {
              setTimeout(() => {
                setVisible(false);
              }, 500);
            }}
          >
            {/* //Lecture 94.7 map through reactsArray */}
            {reactsArray.map((react, i) => (
              <div
                className="react"
                key={i}
                //Lecture 133.4 add onClick
                onClick={() => reactHandler(react.name)}
              >
                <img src={react.image} alt="" />
              </div>
            ))}
          </div>
        )
      }
    </>
  );
}
