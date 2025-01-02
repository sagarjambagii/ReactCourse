import { useState } from "react";
//Lecture 66.6 import navigate
import { Link, useNavigate } from "react-router-dom";
//Lecture 49.30 import settigsPrivacy
import SettingsPrivacy from "./SettingsPrivacy";
//Lecture 50.11 import helpsupport
import HelpSupport from "./HelpSupport";
//Lecture 50.18 import DisplayAccessibility
import DisplayAccessibility from "./DisplayAccessibility";
//Lecture 66.3 import dispatch
import { useDispatch } from "react-redux";
//Lecture 66.5 import cookies
import Cookies from "js-cookie";
//Lecture 49.0 User menu part 1, Create header:userMenu folder:index.js
// export default function UserMenu() {
//Lecture 49.6 get the props
export default function UserMenu({ user }) {
  //Lecture 66.3 define dispatch
  const dispatch = useDispatch();
  //Lecture 66.6 define navigate
  const navigate = useNavigate();
  //Lecture 49.27 useState for visible
  const [visible, setVisible] = useState(0);
  //Lecture 66.2 define logout fn
  const logout = () => {
    //Lecture 66.5 set the cookies
    Cookies.set("user", "");
    //Lecture 66.4 dispatch type logout
    dispatch({
      type: "LOGOUT",
    });
    //Lecture 66.7 navigate to login page
    navigate("/login");
  };
  return (
    //Lecture 49.2 class name mmenu
    <div className="mmenu">
      {/* //Lecture 49.28 if visible is 0 show */}
      {visible === 0 && (
        <div>
          {/* //Lecture 49.3 Link to profile */}
          <Link to="/profile" className="mmenu_header hover3">
            {/* //Lecture 49.4  showing image */}
            <img src="" alt="" />
            {/* //Lecture 49.7 user picture */}
            <img src={user?.picture} alt="" />
            {/* //Lecture 49.8 class mmenu_col */}
            <div className="mmenu_col">
              {/* //Lecture 49.9 span for first name and last name */}
              <span>
                {user?.first_name} {user?.last_name}
              </span>
              {/* //Lecture 49.10 see your profile */}
              <span>See your profile</span>
            </div>
          </Link>
          {/* //Lecture 49.11 class menu splitter */}
          <div className="mmenu_splitter"></div>
          {/* //Lecture 49.12 class mmenu_main */}
          <div className="mmenu_main hover3">
            {/* //Lecture 49.13 class small_circle */}
            <div className="small_circle">
              {/* //Lecture 49.14 icon */}
              <i className="report_filled_icon"></i>
            </div>
            {/* //Lecture 49.15 menu col */}
            <div className="mmenu_col">
              {/* //Lecture 49.16 mmenu span1 and span2 */}
              <div className="mmenu_span1">Give feedback</div>
              <div className="mmenu_span2">Help us improve facebook</div>
            </div>
          </div>
          {/* //Lecture 49.17 class menu splitter */}
          <div className="mmenu_splitter"></div>
          {/* //Lecture 49.18 class menu item */}
          <div
            className="mmenu_item hover3"
            //Lecture 50.9 onClick and setVisible to 1
            onClick={() => {
              setVisible(1);
            }}
          >
            {/* //Lecture 49.19 class small_circle */}
            <div className="small_circle">
              {/* //Lecture 49.20 Icon */}
              <i className="settings_filled_icon"></i>
            </div>
            {/* //Lecture 49.21 span name */}
            <span>Settings & privacy</span>
            {/* //Lecture 49.22 class rArrow */}
            <div className="rArrow">
              {/* //Lecture 49.23 arrow icon */}
              <i className="right_icon"></i>
            </div>
          </div>
          {/* //Lecture 49.24 Help & support */}
          <div
            className="mmenu_item hover3"
            //Lecture 50.16 onClick and setVisible to 2
            onClick={() => {
              setVisible(2);
            }}
          >
            <div className="small_circle">
              <i className="help_filled_icon"></i>
            </div>
            <span>Help & support</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          {/* //Lecture 49.25 Display & Accessibility */}
          <div
            className="mmenu_item hover3"
            //Lecture 50.26 onClick and setVisible to 3
            onClick={() => {
              setVisible(3);
            }}
          >
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Display & Accessibility</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          {/* //Lecture 49.26 Logout */}
          <div
            className="mmenu_item hover3"
            //Lecture 66.1 add onClick
            onClick={() => {
              logout();
            }}
          >
            <div className="small_circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span>Logout</span>
          </div>
        </div>
      )}
      {/* //Lecture 49.30 if visible equals to 1 show SettingsPrivacy */}
      {/* {visible === 1 && <SettingsPrivacy />} */}
      {/* //Lecture 50.6 pass setVisible */}
      {visible === 1 && <SettingsPrivacy setVisible={setVisible} />}
      {/* //Lecture 50.11 show if visible == 2 */}
      {visible === 2 && <HelpSupport setVisible={setVisible} />}
      {/* //Lecture 50.18 show if visible == 3 */}
      {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
    </div>
  );
}
