import LeftLink from "./LeftLink";
//Lecture 54.1 create and import style.css
import "./style.css";
//Lecture 54.14 import left from home.js
import { left } from "../../../data/home";
//Lecture 54.3 import link from react router dom
import { Link } from "react-router-dom";
//Lecture 55.0 import arrowdown
import { ArrowDown1 } from "../../../svg";
//Lecture 55.3 import useState
import { useState } from "react";
//Lecture 55.10 import shortcut
import Shortcut from "./Shortcut";

//Lecture 54.0 Left home menu part 1, Create home:left:index.js , RFC
// export default function LeftHome() {
//Lecture 54.6 get the user from props
export default function LeftHome({ user }) {
  //Lecture 55.3 useState for visible
  const [visible, setVisible] = useState(false);
  return (
    //Lecture 54.3 classname left_home
    <div className="left_home">
      {/* //Lecture 54.3 Link */}
      <Link to="/profile" className="left_link hover1">
        {/* //Lecture 54.7 show user picture  */}
        <img src={user?.picture} alt="" />
        {/* //Lecture 54.7 span  */}
        <span>
          {user?.first_name} {user.last_name}
        </span>
      </Link>
      {/* //Lecture 54.15 slice from 0 to 8 */}
      {left.slice(0, 8).map((link, i) => (
        //Lecture 54.9 import left Link
        // <LeftLink/>
        <LeftLink
          //Lecture 54.15 pass key, img, text nofification
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {/* //Lecture 55.5 visible only when unexpanded */}
      {!visible && (
        //Lecture 55.0 Left home menu part 2, classname left_link
        <div
          className="left_link hover1"
          //Lecture 55.6 adding onclick and setVisible to true
          onClick={() => {
            setVisible(true);
          }}
        >
          {/* //Lecture 55.0 classname small_circle  */}
          <div className="small_circle">
            {/* //Lecture 55.0 Arrow down  */}
            <ArrowDown1 />
          </div>
          {/* //Lecture 55.0 seemore text  */}
          <span>See more</span>
        </div>
      )}
      {/* //Lecture 55.4 if visible is true show */}
      {visible && (
        //Lecture 55.1 class more left
        <div className="more_left">
          {/* //Lecture 55.1 slice rest elements */}
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          {/* //Lecture 55.2 class left link hover1  */}
          <div
            className="left_link hover1 "
            //Lecture 55.7 adding onClick and setVisible to false
            onClick={() => {
              setVisible(false);
            }}
          >
            {/* //Lecture 55.2 class small_circle  */}
            <div className="small_circle rotate360">
              {/* //Lecture 55.2 ArrowDown1  */}
              <ArrowDown1 />
            </div>
            {/* //Lecture 55.2 showless  */}
            <span>Show less</span>
          </div>
        </div>
      )}
      {/* //Lecture 55.8 splitter */}
      <div className="splitter"></div>
      {/* //Lecture 55.8 class shortcut */}
      <div className="shortcut">
        {/* //Lecture 55.8 class heading and edit_shortcut */}
        <div className="heading">Your Shortcuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      {/* //Lecture 55.8 class shortcut_list */}
      <div className="shortcut_list">
        {/* //Lecture 55.10 import shortcut */}
        <Shortcut
          //Lecture 55.11 passing elements
          link="https://www.youtube.com/c/MohamedHaJJi1/featured"
          img="../../images/ytb.png"
          name="My Youtube channel"
        />
        {/* //Lecture 55.12 shortcut */}
        <Shortcut
          link="https://www.instagram.com/med_hajji7/"
          img="../../images/insta.png"
          name="My Instagram "
        />
      </div>
      {/* //Lecture 55.16 class fb_copyright */}
      {/* <div className="fb_copyright"}> */}
      {/* //Lecture 55.18 if visible is true */}
      <div className={`fb_copyright ${visible && "relative_fb_copyright"}`}>
        {/* //Lecture 55.17 link and span */}
        <Link to="/">Privacy </Link>
        <span>. </span>
        {/* //Lecture 55.17 link and span */}
        <Link to="/">Terms </Link>
        <span>. </span>
        {/* //Lecture 55.17 link and span */}
        <Link to="/">Advertising </Link>
        <span>. </span>
        {/* //Lecture 55.17 link and span */}
        <Link to="/">
          Ad Choices <i className="ad_choices_icon"></i>{" "}
        </Link>
        <span>. </span>
        {/* //Lecture 55.17 link and span */}
        <Link to="/"></Link>Cookies <span>. </span>
        {/* //Lecture 55.17 link and span br*/}
        <Link to="/">More </Link>
        <span>. </span> <br />
        {/* //Lecture 55.17 meta*/}
        Meta © 2022
      </div>
    </div>
  );
}
