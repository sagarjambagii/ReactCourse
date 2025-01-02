//Lecture 44.1 import style.css
import "./style.css";
//Lecture 44.5 import Link
import { Link } from "react-router-dom";
//Lecture 44.6 import Logo
//Lecture 44.11 import all svgs
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
  //Lecture 100.2 immport home
  Home,
  //Lecture 149.8 import FriendsActive
  FriendsActive,
} from "../../svg";
//Lecture 45.2 import useSelector from react redux
import { useSelector } from "react-redux";
//Lecture 47.13 import useState
//Lecture 48.33 import useRef
import { useRef, useState } from "react";
//Lecture 47.1 import Searchmenu
import SearchMenu from "./SearchMenu";
//Lecture 48.1 import AllMenu
import AllMenu from "./AllMenu";
//Lecture 48.34 import useClickOutside fn
import useClickOutside from "../../helpers/clickOutside";
//Lecture 49.1 Call UserMenu
import UserMenu from "./userMenu";
//Lecture 44.0 Header base part 1, Create Components:header:index.js
export default function Header(
  //Lecture 100.1 get the page
  page,
  //Lecture 140.20 get getAllPosts
  getAllPosts
) {
  //Lecture 45.3 extract the user
  const { user } = useSelector((user) => ({ ...user }));
  //Lecture 44.8 define color
  const color = "#65676b";
  //Lecture 47.13 showSearchMenu useState
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  //Lecture 48.29 showAllMenu useState
  const [showAllMenu, setShowAllMenu] = useState(false);
  //Lecture 50.32 useState for showUserMenu
  const [showUserMenu, setShowUserMenu] = useState(false);
  //Lecture 48.33 define useRef for all menu
  const allmenu = useRef(null);
  //Lecture 50.36 useRef for usermenu
  const usermenu = useRef(null);
  //Lecture 48.34 calling useClickOutside fn
  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });
  //Lecture 50.37 useClickOutside for usermenu
  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });
  return (
    //Lecture 44.3 return header
    <header>
      {/* //Lecture 44.4 header left */}
      <div className="header_left">
        {/* //Lecture 44.5 link to homepage */}
        <Link to="/" className="header_logo">
          <div className="circle">
            {/* //Lecture 44.6 add the logo */}
            <Logo />
          </div>
        </Link>
        {/* //Lecture 44.7 search div */}
        <div
          className="search search1"
          //Lecture 47.15 adding onclick event
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          {/* //Lecture 44.8 search logo with colour */}
          <Search color={color} />
          {/* //Lecture 44.9 search input */}
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      {/* //Lecture 47.1 import Searchmenu */}
      {/* <SearchMenu /> */}
      {/* //Lecture 47.14 show only when showSearchMenu is true */}
      {showSearchMenu && (
        // <SearchMenu color={color} />
        //Lecture 47.20 passing setShowSearchMenu prop
        <SearchMenu
          color={color}
          setShowSearchMenu={setShowSearchMenu}
          //Lecture 145.21 pass token
          token={user.token}
        />
      )}
      {/* //Lecture 44.4 header middle */}
      <div className="header_middle">
        {/* //Lecture 44.10 Home active link */}
        <Link
          to="/"
          //Lecture 44.10 Home active link
          // className="middle_icon active"
          //Lecture 100.3 text for class
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
          //Lecture 140.21 add onclick
          onClick={() => getAllPosts()}
        >
          {/* //Lecture 44.10 Home active link */}
          {/* <HomeActive /> */}
          {/* //Lecture 100.2 text check if page == home  */}
          {page === "home" ? <HomeActive /> : <Home color={color} />}
        </Link>
        {/* //Lecture 44.10 Friends link */}
        <Link
          // to="/" className="middle_icon hover1"
          //Lecture 149.3 link to friends
          to="/friends"
          //Lecture 149.7 add class name
          className={`middle_icon ${page === "friends" ? "active" : "hover1"}`}
        >
          {/* <Friends color={color} /> */}
          {/* //Lecture 149.8 change icon  */}
          {page === "friends" ? <FriendsActive /> : <Friends color={color} />}
        </Link>
        {/* //Lecture 44.10 Watch link */}
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          {/* //Lecture 44.12 adding 9+ sign */}
          <div className="middle_notification">9+</div>
        </Link>
        {/* //Lecture 44.10 Market link */}
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        {/* //Lecture 44.10 Gaming link */}
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      {/* //Lecture 44.4 header right */}
      <div className="header_right">
        {/* //Lecture 45.0 Header base part 2 */}
        <Link
          to="/profile"
          //Lecture 45.0 Header base part 2
          // className="profile_link hover1"
          //Lecture 100.6 text for class
          className={`profile_link hover1 ${
            page === "profile" ? "active_link" : ""
          }`}
        >
          {/* //Lecture 45.1 get the image from react redux */}
          <img src={user?.picture} alt="" />
          {/* //Lecture 45.2 if the user exist show first name */}
          <span>{user?.first_name}</span>
        </Link>
        {/* //Lecture 45.4 menu icon */}
        <div
          // className="circle_icon hover1"
          //Lecture 52.0 Finish Header and fix issues
          className={`circle_icon hover1 ${showAllMenu && "active_header"}`}
          //Lecture 48.32 hiding when clicked outside, set ref
          ref={allmenu}
        >
          {/* //Lecture 50.38 div for menu */}
          <div
            //Lecture 48.31 adding onClick
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            {/* //Lecture 50.39 menu icon */}
            {/* <Menu /> */}
            {/* //Lecture 56.18 add inline style */}
            <div style={{ transform: "translateY(2px)" }}>
              <Menu />
            </div>
          </div>
          {/* //Lecture 45.4 menu icon */}
          {/* <Menu /> */}
          {/* //Lecture 48.1 all menu */}
          {/* <AllMenu /> */}
          {/* //Lecture 48.30 show onlu when showAlllMenu true */}
          {showAllMenu && <AllMenu />}
        </div>
        {/* //Lecture 45.4 Messenger icon */}
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        {/* //Lecture 45.4 Notifications icon */}
        <div className="circle_icon hover1">
          <Notifications />
          {/* //Lecture 45.5 notification count */}
          <div className="right_notification">5</div>
        </div>
        {/* //Lecture 45.4 ArrowDown icon */}
        <div
          // className="circle_icon hover1"
          //Lecture 52.1 Finish Header and fix issues
          className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
          //Lecture 50.35 add reference usermenu
          ref={usermenu}
        >
          {/* //Lecture 50.34 div for onclick */}
          <div
            //Lecture 50.34 onclick for setting showUserMenu to true
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            {/* //Lecture 50.35 ArrowDown icon */}
            {/* <ArrowDown /> */}
            {/* //Lecture 56.19 add inline style */}
            <div style={{ transform: "translateY(2px)" }}>
              <ArrowDown />
            </div>
          </div>
          {/* //Lecture 45.4 ArrowDown icon */}
          {/* <ArrowDown /> */}
          {/* //Lecture 49.1 Call UserMenu */}
          {/* <UserMenu  /> */}
          {/* //Lecture 49.5 pass the user as prop */}
          {/* <UserMenu user={user} /> */}
          {/* //Lecture 50.33 showUserMenu when true */}
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
